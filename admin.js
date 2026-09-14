/* ============================================================
 TAKAHASHI FAMILY — ADMIN LOGIC
 Login (email/password) + edit data + simpan ke Firestore.
 ============================================================ */

let currentUser = null;
let people = [];       // flat list anggota (hasil flatten dari tree)
let history = [];
let gallery = [];
let familyName = "";
let familyTagline = "";
let familyLogo = "";

const contentDoc = () => db.collection("site").doc("content");

/* ---------- Flatten (nested tree -> flat list) ---------- */
function flattenTree(node, parentId = null, out = []) {
  out.push({
    id: node.id, name: node.name, birth: node.birth, death: node.death,
    photo: node.photo, bio: node.bio, parentId,
    spouseId: node.spouse ? node.spouse.id : null
  });
  if (node.spouse) {
    out.push({
      id: node.spouse.id, name: node.spouse.name, birth: node.spouse.birth,
      death: node.spouse.death, photo: node.spouse.photo, bio: node.spouse.bio,
      parentId: null, spouseId: node.id
    });
  }
  (node.children || []).forEach(c => flattenTree(c, node.id, out));
  return out;
}

/* ---------- Assemble (flat list -> nested tree) ---------- */
function toNode(p) {
  return { id: p.id, name: p.name, birth: p.birth, death: p.death, photo: p.photo, bio: p.bio };
}

function assembleTree(list) {
  if (!list.length) return null;
  const byId = {};
  list.forEach(p => byId[p.id] = p);
  const spouseIds = new Set(list.filter(p => p.spouseId).map(p => p.spouseId));
  const roots = list.filter(p => p.parentId == null && !spouseIds.has(p.id));
  const root = roots[0] || list[0];

  function build(p) {
    const node = toNode(p);
    if (p.spouseId && byId[p.spouseId]) node.spouse = toNode(byId[p.spouseId]);
    const kids = list.filter(c => c.parentId === p.id);
    if (kids.length) node.children = kids.map(k => build(k));
    return node;
  }
  return build(root);
}

/* ---------- Helpers ---------- */
function nameOf(id) {
  const p = people.find(x => x.id === id);
  return p ? p.name : "—";
}

function yearsLabel(p) {
  const b = p.birth ? p.birth.slice(0, 4) : "?";
  const d = p.death ? p.death.slice(0, 4) : "sekarang";
  return `${b} – ${d}`;
}

function newId() {
  return "p_" + Date.now().toString(36);
}

/* ---------- Load data dari Firestore (fallback DEFAULT_DATA) ---------- */
async function loadFromCloud() {
  const snap = await contentDoc().get();
  if (snap.exists) {
    const d = snap.data();
    familyName = d.familyName || "";
    familyTagline = d.familyTagline || "";
    familyLogo = d.familyLogo || "";
    history = d.familyHistory || [];
    gallery = d.galleryPhotos || [];
    people = flattenTree(d.familyTree || DEFAULT_DATA.familyTree);
  } else {
    familyName = DEFAULT_DATA.familyName;
    familyTagline = DEFAULT_DATA.familyTagline;
    familyLogo = DEFAULT_DATA.familyLogo || "";
    history = DEFAULT_DATA.familyHistory.map(x => ({ ...x }));
    gallery = DEFAULT_DATA.galleryPhotos.map(x => ({ ...x }));
    people = flattenTree(DEFAULT_DATA.familyTree);
  }
}

/* ---------- Render ---------- */
function renderMembers() {
  const el = document.getElementById("members-admin-list");
  if (!people.length) {
    el.innerHTML = "<p style='color:#8b8378'>Belum ada anggota.</p>";
    return;
  }
  el.innerHTML = people.map(p => `
    <div class="member-row${p.death ? " dead" : ""}">
      <img src="${p.photo || ""}" alt="" />
      <div class="m-info">
        <strong>${p.name}</strong>
        <span>${yearsLabel(p)}${p.death ? " · Alm." : ""}</span>
        <span class="m-meta">Orangtua: ${nameOf(p.parentId)} · Pasangan: ${nameOf(p.spouseId)}</span>
      </div>
      <div class="m-actions">
        <button data-edit="${p.id}">Edit</button>
        <button data-del="${p.id}" class="danger">Hapus</button>
      </div>
    </div>`).join("");
}

function renderHistory() {
  const el = document.getElementById("history-admin-list");
  el.innerHTML = history.map((h, i) => `
    <div class="item-row">
      <div class="i-body">
        <div class="i-title">${h.year} — ${h.title}</div>
        <div class="i-sub">${h.text}</div>
      </div>
      <div class="m-actions">
        <button data-hedit="${i}">Edit</button>
        <button data-hdel="${i}" class="danger">Hapus</button>
      </div>
    </div>`).join("") || "<p style='color:#8b8378'>Belum ada history.</p>";
}

function renderGallery() {
  const el = document.getElementById("gallery-admin-list");
  el.innerHTML = gallery.map((g, i) => `
    <div class="item-row">
      <img src="${g.src}" alt="" />
      <div class="i-body">
        <div class="i-sub">${g.caption}</div>
      </div>
      <div class="m-actions">
        <button data-gedit="${i}">Edit</button>
        <button data-gdel="${i}" class="danger">Hapus</button>
      </div>
    </div>`).join("") || "<p style='color:#8b8378'>Belum ada foto.</p>";
}

function renderSettings() {
  document.getElementById("set-name").value = familyName;
  document.getElementById("set-tagline").value = familyTagline;
  document.getElementById("set-logo").value = familyLogo;
}

function renderAll() {
  document.getElementById("fam-name").textContent = familyName;
  renderMembers();
  renderHistory();
  renderGallery();
  renderSettings();
}

/* ---------- Member modal (add/edit) ---------- */
function fillParentSpouseSelects() {
  const parentSel = document.querySelector('#member-form select[name="parentId"]');
  const spouseSel = document.querySelector('#member-form select[name="spouseId"]');
  const opts = people.map(p =>
    `<option value="${p.id}">${p.name}</option>`
  ).join("");
  parentSel.innerHTML = `<option value="">— root —</option>` + opts;
  spouseSel.innerHTML = `<option value="">— tidak ada —</option>` + opts;
}

function openMemberModal(person) {
  const modal = document.getElementById("member-modal");
  const form = document.getElementById("member-form");
  document.getElementById("member-modal-title").textContent =
    person ? "Edit Anggota" : "Tambah Anggota";
  fillParentSpouseSelects();
  form.reset();
  form.id.value = person ? person.id : "";
  form.name.value = person ? person.name : "";
  form.birth.value = person ? (person.birth || "") : "";
  form.death.value = person ? (person.death || "") : "";
  form.photo.value = person ? (person.photo || "") : "";
  form.bio.value = person ? (person.bio || "") : "";
  form.parentId.value = person ? (person.parentId || "") : "";
  form.spouseId.value = person ? (person.spouseId || "") : "";
  modal.hidden = false;
}

function closeMemberModal() {
  document.getElementById("member-modal").hidden = true;
}

function saveMemberFromForm() {
  const form = document.getElementById("member-form");
  const id = form.id.value || newId();
  const data = {
    id,
    name: form.name.value.trim(),
    birth: form.birth.value || null,
    death: form.death.value || null,
    photo: form.photo.value.trim(),
    bio: form.bio.value.trim(),
    parentId: form.parentId.value || null,
    spouseId: form.spouseId.value || null
  };
  const idx = people.findIndex(p => p.id === id);
  if (idx >= 0) {
    people[idx] = data;
  } else {
    people.push(data);
  }
  renderMembers();
  closeMemberModal();
}

/* ---------- Save ---------- */
async function saveToCloud() {
  const status = document.getElementById("save-status");
  status.textContent = "Menyimpan...";
  try {
    const tree = assembleTree(people);
    familyName = document.getElementById("set-name").value.trim();
    familyTagline = document.getElementById("set-tagline").value.trim();
    familyLogo = document.getElementById("set-logo").value.trim();
    await contentDoc().set({
      familyName,
      familyTagline,
      familyLogo,
      familyTree: tree,
      familyHistory: history,
      galleryPhotos: gallery
    });
    status.textContent = "✅ Tersimpan! Website otomatis update dalam beberapa detik.";
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Gagal menyimpan: " + err.message;
  }
}

/* ---------- Auth ---------- */
function showLogin() {
  document.getElementById("login-view").hidden = false;
  document.getElementById("dash-view").hidden = true;
}

async function showDashboard() {
  document.getElementById("login-view").hidden = true;
  document.getElementById("dash-view").hidden = false;
  await loadFromCloud();
  renderAll();
}

function bindEvents() {
  // Login
  document.getElementById("login-form").addEventListener("submit", async e => {
    e.preventDefault();
    let uname = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-pass").value;
    if (!uname.includes("@")) uname += "@takahashi.com";
    document.getElementById("login-error").textContent = "";
    try {
      await auth.signInWithEmailAndPassword(uname, pass);
    } catch (err) {
      document.getElementById("login-error").textContent =
        "Gagal masuk: " + err.message;
    }
  });

  document.getElementById("logout-btn").addEventListener("click", () => {
    auth.signOut();
  });

  document.getElementById("save-btn").addEventListener("click", saveToCloud);

  // Tabs
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".tab").forEach(t => t.hidden = true);
      document.getElementById("tab-" + btn.dataset.tab).hidden = false;
    });
  });

  // Members
  document.getElementById("add-member").addEventListener("click", () => openMemberModal(null));
  document.getElementById("members-admin-list").addEventListener("click", e => {
    const edit = e.target.closest("[data-edit]");
    const del = e.target.closest("[data-del]");
    if (edit) {
      const p = people.find(x => x.id === edit.dataset.edit);
      if (p) openMemberModal(p);
    } else if (del) {
      const p = people.find(x => x.id === del.dataset.del);
      const hasKids = people.some(x => x.parentId === del.dataset.del);
      const msg = hasKids
        ? `Hapus ${p.name}? Dia punya anak — anaknya akan hilang dari pohon!`
        : `Hapus ${p.name}?`;
      if (confirm(msg)) {
        people = people.filter(x => x.id !== del.dataset.del);
        renderMembers();
      }
    }
  });

  document.getElementById("member-form").addEventListener("submit", e => {
    e.preventDefault();
    saveMemberFromForm();
  });
  document.getElementById("member-cancel").addEventListener("click", closeMemberModal);
  document.getElementById("member-modal").addEventListener("click", e => {
    if (e.target === document.getElementById("member-modal")) closeMemberModal();
  });

  // History
  document.getElementById("history-form").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    history.push({
      year: f.year.value.trim(),
      title: f.title.value.trim(),
      text: f.text.value.trim()
    });
    f.reset();
    renderHistory();
  });
  document.getElementById("history-admin-list").addEventListener("click", e => {
    const edit = e.target.closest("[data-hedit]");
    const del = e.target.closest("[data-hdel]");
    if (edit) {
      const h = history[Number(edit.dataset.hedit)];
      const year = prompt("Tahun", h.year);
      const title = prompt("Judul", h.title);
      const text = prompt("Cerita", h.text);
      if (year && title) {
        history[Number(edit.dataset.hedit)] = { year, title, text };
        renderHistory();
      }
    } else if (del) {
      history.splice(Number(del.dataset.hdel), 1);
      renderHistory();
    }
  });

  // Gallery
  document.getElementById("gallery-form").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    gallery.push({ src: f.src.value.trim(), caption: f.caption.value.trim() });
    f.reset();
    renderGallery();
  });
  document.getElementById("gallery-admin-list").addEventListener("click", e => {
    const edit = e.target.closest("[data-gedit]");
    const del = e.target.closest("[data-gdel]");
    if (edit) {
      const g = gallery[Number(edit.dataset.gedit)];
      const src = prompt("URL foto", g.src);
      const caption = prompt("Caption", g.caption);
      if (src) {
        gallery[Number(edit.dataset.gedit)] = { src, caption };
        renderGallery();
      }
    } else if (del) {
      gallery.splice(Number(del.dataset.gdel), 1);
      renderGallery();
    }
  });
}

/* ---------- Boot ---------- */
auth.onAuthStateChanged(user => {
  currentUser = user;
  if (user) {
    showDashboard();
  } else {
    showLogin();
  }
});

document.addEventListener("DOMContentLoaded", bindEvents);
