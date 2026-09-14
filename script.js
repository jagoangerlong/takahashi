/* ============================================================
 TAKAHASHI FAMILY — SITE LOGIC
 Baca data dari Firestore (fallback ke DEFAULT_DATA di data.js).
 Gak perlu diedit kecuali mau ubah perilaku, bukan isi data.
 ============================================================ */

const peopleById = new Map();
let allMembers = [];

// Data aktif — diisi loadData() sebelum render.
let familyName = "";
let familyTagline = "";
let familyLogo = "";
let familyTree = null;
let familyHistory = [];
let galleryPhotos = [];

async function loadData() {
  try {
    const snap = await db.collection("site").doc("content").get();
    if (snap.exists) {
      const d = snap.data();
      familyName = d.familyName || DEFAULT_DATA.familyName;
      familyTagline = d.familyTagline || DEFAULT_DATA.familyTagline;
      familyLogo = d.familyLogo || DEFAULT_DATA.familyLogo || "";
      familyTree = d.familyTree || DEFAULT_DATA.familyTree;
      familyHistory = d.familyHistory || [];
      galleryPhotos = d.galleryPhotos || [];
      return;
    }
  } catch (err) {
    console.warn("Gagal ambil data dari Firestore, pakai data lokal:", err);
  }
  // Fallback: pakai data lokal (DEFAULT_DATA)
  familyName = DEFAULT_DATA.familyName;
  familyTagline = DEFAULT_DATA.familyTagline;
  familyLogo = DEFAULT_DATA.familyLogo || "";
  familyTree = DEFAULT_DATA.familyTree;
  familyHistory = DEFAULT_DATA.familyHistory;
  galleryPhotos = DEFAULT_DATA.galleryPhotos;
}

function yearOf(dateStr) {
  return dateStr ? dateStr.slice(0, 4) : "";
}

function yearsLabel(person) {
  const b = yearOf(person.birth);
  const d = person.death ? yearOf(person.death) : "";
  if (!b && !d) return "";
  return d ? `${b || "?"} — ${d}` : b;
}

function isDeceased(person) {
  return !!person.death;
}

function registerPerson(person) {
  peopleById.set(person.id, person);
  allMembers.push(person);
}

/* ---------- Build tree HTML recursively ---------- */
function renderUnit(person) {
  registerPerson(person);
  let html = `<div class="unit">${renderNode(person)}`;
  if (person.spouse) {
    registerPerson(person.spouse);
    html += `<span class="plus">+</span>${renderNode(person.spouse)}`;
  }
  html += `</div>`;
  return html;
}

function renderNode(person) {
  const dead = isDeceased(person);
  return `
  <div class="node${dead ? " deceased" : ""}" data-id="${person.id}">
    <div class="photo-wrap">
      <img src="${person.photo}" alt="${person.name}" loading="lazy" />
      ${dead ? '<span class="seal" title="Almarhum/almarhumah"></span>' : ""}
    </div>
    <div class="name">${person.name}</div>
    <div class="years">${yearsLabel(person)}</div>
  </div>`;
}

function renderSubtree(person) {
  let html = `<li>${renderUnit(person)}`;
  if (person.children && person.children.length) {
    html += `<ul>${person.children.map(renderSubtree).join("")}</ul>`;
  }
  html += `</li>`;
  return html;
}

function buildTree() {
  const container = document.getElementById("tree-list");
  container.innerHTML = `<ul class="tree-list">${renderSubtree(familyTree)}</ul>`;
}

/* ---------- Members grid ---------- */
function memberCardHTML(person) {
  const dead = isDeceased(person);
  const bioShort = person.bio || "";
  return `
  <div class="card${dead ? " deceased" : ""}" data-id="${person.id}">
    <div class="thumb"><img src="${person.photo}" alt="${person.name}" loading="lazy" /></div>
    <div class="card-body">
      <div class="card-name">${person.name}</div>
      <div class="card-years">${yearsLabel(person)}${dead ? " · Alm." : ""}</div>
      <div class="card-bio">${bioShort}</div>
    </div>
  </div>`;
}

function buildMembers(filterText = "") {
  const grid = document.getElementById("members-grid");
  const filtered = allMembers.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );
  grid.innerHTML = filtered.map(memberCardHTML).join("") ||
    `<p style="color:var(--stone)">Gak ada anggota keluarga dengan nama itu.</p>`;
}

/* ---------- History ---------- */
function buildHistory() {
  const el = document.getElementById("history-list");
  el.innerHTML = familyHistory.map(item => `
  <div class="tl-item">
    <div class="tl-year">${item.year}</div>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
  </div>`).join("");
}

/* ---------- Gallery ---------- */
function buildGallery() {
  const el = document.getElementById("gallery-grid");
  el.innerHTML = galleryPhotos.map((photo, i) => `
  <div class="gallery-item" data-index="${i}">
    <img src="${photo.src}" alt="${photo.caption}" loading="lazy" />
    <div class="cap">${photo.caption}</div>
  </div>`).join("");
}

/* ---------- Member modal ---------- */
function openMemberModal(id) {
  const person = peopleById.get(id);
  if (!person) return;
  const dead = isDeceased(person);
  const overlay = document.getElementById("member-overlay");
  const modal = document.getElementById("member-modal");
  modal.classList.toggle("deceased", dead);
  modal.innerHTML = `
  <button class="close-btn" aria-label="Tutup">&times;</button>
  <div class="modal-photo"><img src="${person.photo}" alt="${person.name}" /></div>
  <h3>${person.name}</h3>
  <div class="modal-years">${yearsLabel(person)}</div>
  ${dead ? `<div class="modal-status">Telah berpulang</div>` : ""}
  <p class="modal-bio">${person.bio || "Belum ada deskripsi."}</p>
  `;
  modal.querySelector(".close-btn").addEventListener("click", closeOverlays);
  overlay.classList.add("open");
}

function openLightbox(index) {
  const photo = galleryPhotos[index];
  const overlay = document.getElementById("gallery-overlay");
  const box = document.getElementById("lightbox");
  box.innerHTML = `
  <button class="close-btn" aria-label="Tutup">&times;</button>
  <img src="${photo.src}" alt="${photo.caption}" />
  <div class="cap">${photo.caption}</div>
  `;
  box.querySelector(".close-btn").addEventListener("click", closeOverlays);
  overlay.classList.add("open");
}

function closeOverlays() {
  document.querySelectorAll(".overlay").forEach(o => o.classList.remove("open"));
}

/* ---------- Tree zoom ---------- */
function setupZoom() {
  const zoomEl = document.getElementById("tree-zoom");
  const label = document.getElementById("zoom-label");
  let scale = 0.6;
  const apply = () => {
    zoomEl.style.transform = `scale(${scale})`;
    label.textContent = `${Math.round(scale * 100)}%`;
  };
  document.getElementById("zoom-in").addEventListener("click", () => {
    scale = Math.min(1.6, scale + 0.1);
    apply();
  });
  document.getElementById("zoom-out").addEventListener("click", () => {
    scale = Math.max(0.3, scale - 0.1);
    apply();
  });
  document.getElementById("zoom-reset").addEventListener("click", () => {
    const scrollEl = document.querySelector(".tree-scroll");
    const contentEl = document.getElementById("tree-zoom");
    const availW = scrollEl.clientWidth - 40;
    const contentW = contentEl.scrollWidth || 1;
    scale = Math.max(0.3, Math.min(1.2, availW / contentW));
    apply();
  });
  apply();
}

/* ---------- Stats ---------- */
function buildStats() {
  document.getElementById("stat-members").textContent = allMembers.length;
  const generations = new Set();
  (function walk(person, gen) {
    generations.add(gen);
    if (person.spouse) generations.add(gen);
    (person.children || []).forEach(c => walk(c, gen + 1));
  })(familyTree, 1);
  document.getElementById("stat-generations").textContent = generations.size;
}

/* ---------- Logo / crest ---------- */
function applyLogo() {
  const crest = document.getElementById("hero-crest");
  const img = document.getElementById("hero-crest-img");
  const video = document.getElementById("hero-logo-video");
  const isVideo = /\.(mp4|webm|mov)$/i.test(familyLogo || "");
  if (!familyLogo) {
    crest.hidden = false;
    img.hidden = true;
    video.hidden = true;
  } else if (isVideo) {
    crest.hidden = true;
    img.hidden = true;
    video.hidden = false;
    video.src = familyLogo;
  } else {
    crest.hidden = true;
    img.hidden = false;
    video.hidden = true;
    img.src = familyLogo;
  }
}

/* ---------- Wire up events ---------- */
async function init() {
  await loadData();

  document.getElementById("brand-name").textContent = familyName;
  document.getElementById("hero-name").textContent = familyName;
  document.getElementById("hero-tagline").textContent = familyTagline;
  document.getElementById("footer-name").textContent = familyName;
  applyLogo();

  buildTree();
  buildStats();
  buildMembers();
  buildHistory();
  buildGallery();
  setupZoom();

  document.getElementById("tree-list").addEventListener("click", e => {
    const node = e.target.closest(".node");
    if (node) openMemberModal(node.dataset.id);
  });

  document.getElementById("members-grid").addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (card) openMemberModal(card.dataset.id);
  });

  document.getElementById("gallery-grid").addEventListener("click", e => {
    const item = e.target.closest(".gallery-item");
    if (item) openLightbox(Number(item.dataset.index));
  });

  document.getElementById("member-search").addEventListener("input", e => {
    buildMembers(e.target.value);
  });

  document.querySelectorAll(".overlay").forEach(overlay => {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeOverlays();
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeOverlays();
  });
}

document.addEventListener("DOMContentLoaded", init);
