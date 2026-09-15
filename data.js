/* ============================================================
 TAKAHASHI FAMILY — DEFAULT / SEED DATA
 Dipakai sebagai cadangan + buat seed Firestore pertama kali.
 Setelah data masuk Firestore, edit lewat admin.html (bukan file ini).

 FORMAT:
 familyTree = ARRAY of roots (bisa lebih dari satu root sejajar).
 Tiap orang: id, name, birth, death (null kalau hidup/tidak diketahui),
 photo, bio, relation ("kandung" | "angkat" | null), children.
 death keisi => foto grayscale + titik merah.
 relation => badge "Kandung" / "Angkat" (untuk 22 bersaudara).
 ============================================================ */

const DEFAULT_DATA = {
  familyName: "Takahashi",
  familyTagline: "Bukan warisan darah, tapi pilihan untuk berdiri bersama.",
  familyLogo: "assets/logo.png",

  familyTree: [
    {
      id: "ryosukein",
      name: "Ryosukein Takahashi",
      birth: "1970-01-01",
      death: "2013-01-01",
      photo: "assets/ryosukein.png",
      bio: "Leluhur keluarga — ayah kandung Narzan dan Davis.",
      relation: null,
      children: [
        {
          id: "narzan",
          name: "Narzan Takahashi",
          birth: "1998-01-01",
          death: null,
          photo: "assets/narzan.png",
          bio: "Kepala keluarga (abang ke-1). Anak kandung Ryosukein.",
          relation: "kandung",
          children: [
            {
              id: "sunshine",
              name: "Sun Shine Takahashi",
              birth: "2008-10-10",
              death: null,
              photo: "assets/sunshine.png",
              bio: "Anak Narzan."
            },
            {
              id: "molly",
              name: "Molly Shine Takahashi",
              birth: "2008-09-26",
              death: null,
              photo: "assets/molly.png",
              bio: "Anak Narzan."
            }
          ]
        },
        {
          id: "davis",
          name: "Davis Takahashi",
          birth: "1999-07-29",
          death: "2026-04-02",
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=DavisTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-2. Adik kandung Narzan.",
          relation: "kandung",
          children: [
            {
              id: "archa",
              name: "Archa Takahashi",
              birth: null,
              death: null,
              photo: "https://api.dicebear.com/7.x/notionists/svg?seed=ArchaTakahashi&backgroundColor=e6dcc4",
              bio: "Anak Davis."
            }
          ]
        },
        {
          id: "isoma",
          name: "Isoma Takahashi",
          birth: "2000-06-19",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=IsomaTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-3. Saudara pertama yang bergabung di luar garis darah.",
          relation: "angkat"
        },
        {
          id: "ate",
          name: "Ate Kaito Takahashi",
          birth: "2000-01-01",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=AteTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-4.",
          relation: "angkat",
          children: [
            {
              id: "sara",
              name: "Sara Takahashi",
              birth: "2004-02-29",
              death: null,
              photo: "assets/sara.png",
              bio: "Anak Ate."
            }
          ]
        },
        {
          id: "obi",
          name: "Obi Takahashi",
          birth: "2000-10-10",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=ObiTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-5.",
          relation: "angkat"
        },
        {
          id: "kemal",
          name: "Kemal Sigmaal Takahashi",
          birth: "2000-07-08",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=KemalTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-6.",
          relation: "angkat"
        },
        {
          id: "xyro",
          name: "Xyroo Takahashi",
          birth: "2000-01-01",
          death: null,
          photo: "assets/xyroo.png",
          bio: "Abang ke-7.",
          relation: "angkat"
        },
        {
          id: "mike",
          name: "Mike Takahashi",
          birth: "2003-11-11",
          death: null,
          photo: "assets/mike.png",
          bio: "Abang ke-8.",
          relation: "angkat"
        },
        {
          id: "ashura",
          name: "Jendral Ashura Takahashi",
          birth: "2000-10-01",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=AshuraTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-9.",
          relation: "angkat"
        },
        {
          id: "jarot",
          name: "Jarot Siomay Takahashi",
          birth: "1992-08-30",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=JarotTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-10.",
          relation: "angkat"
        },
        {
          id: "leticia",
          name: "Leticia Takahashi",
          birth: "2004-12-04",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=LeticiaTakahashi&backgroundColor=e6dcc4",
          bio: "Kakak ke-11.",
          relation: "angkat"
        },
        {
          id: "jocelyn",
          name: "Jocelyn Takahashi",
          birth: "2005-05-05",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=JocelynTakahashi&backgroundColor=e6dcc4",
          bio: "Kakak ke-12.",
          relation: "angkat"
        },
        {
          id: "jo",
          name: "Mas Joo Takahashi",
          birth: "2004-07-12",
          death: "2026-06-02",
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=JoTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-13.",
          relation: "angkat"
        },
        {
          id: "rikan",
          name: "Rikan Takahashi",
          birth: "2003-10-25",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=RikanTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-14.",
          relation: "angkat"
        },
        {
          id: "ega",
          name: "Ega Bauer Takahashi",
          birth: "2005-06-10",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=EgaTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-15.",
          relation: "angkat"
        },
        {
          id: "marvel",
          name: "Marvel Sahistya Whitney Takahashi",
          birth: "2004-04-04",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=MarvelTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-16.",
          relation: "angkat"
        },
        {
          id: "emy",
          name: "Emysyu Takahashi",
          birth: "2004-11-23",
          death: "2026-03-07",
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=EmyTakahashi&backgroundColor=e6dcc4",
          bio: "Kakak ke-17.",
          relation: "angkat"
        },
        {
          id: "denbo",
          name: "Denbo Takahashi",
          birth: null,
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=DenboTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-18.",
          relation: "angkat"
        },
        {
          id: "maul",
          name: "Maulana Aja Takahashi",
          birth: "2000-01-05",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=MaulTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-19.",
          relation: "angkat"
        },
        {
          id: "raven",
          name: "Raven Takahashi",
          birth: "2005-09-05",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=RavenTakahashi&backgroundColor=e6dcc4",
          bio: "Abang ke-20.",
          relation: "angkat"
        },
        {
          id: "lucia",
          name: "Lucia La Vysta Takahashi",
          birth: "2000-11-21",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=LuciaTakahashi&backgroundColor=e6dcc4",
          bio: "Kakak ke-21.",
          relation: "angkat"
        },
        {
          id: "gyo",
          name: "Gyo Takahashi",
          birth: "2007-05-31",
          death: null,
          photo: "https://api.dicebear.com/7.x/notionists/svg?seed=GyoTakahashi&backgroundColor=e6dcc4",
          bio: "Bungsu (adik terakhir).",
          relation: "angkat"
        }
      ]
    },
    {
      id: "ventra",
      name: "Ventra Kertanegara",
      birth: null,
      death: null,
      photo: "https://api.dicebear.com/7.x/notionists/svg?seed=VentraKertanegara&backgroundColor=e6dcc4",
      bio: "Kakek angkat (Opung). Bukan marga Takahashi.",
      relation: "angkat"
    }
  ],

  familyHistory: [
    {
      year: "Awal",
      title: "Ryosukein Takahashi",
      text: "Takahashi Family berasal dari satu garis darah: Ryosukein Takahashi, pria egois yang berpindah-pindah pasangan. Dari perbuatannya lahir Narzan dan Davis dari ibu yang berbeda."
    },
    {
      year: "Tragedi",
      title: "Kematian Ryosukein",
      text: "Narzan dan Davis berhadapan dengan ayah mereka. Amarah memuncak, Narzan menusuk Ryosukein hingga tewas. Kejadian itu menjadi luka besar bagi keluarga."
    },
    {
      year: "Perpisahan",
      title: "12 Tahun Terpisah",
      text: "Setelah insiden itu, Narzan dan Davis terpisah, memilih jalan masing-masing dan memutus komunikasi selama bertahun-tahun, meninggalkan marga Takahashi."
    },
    {
      year: "Pertemuan",
      title: "Rekonsiliasi",
      text: "Dua belas tahun kemudian mereka bertemu lagi. Davis mengungkap ingin kembali memakai nama Takahashi, bukan karena melupakan, tapi karena memilih memaafkan."
    },
    {
      year: "Babak Baru",
      title: "Kembali ke Takahashi",
      text: "Narzan luluh. Keduanya memutuskan menerima masa lalu dan kembali menggunakan nama Takahashi, bertekad membangun nama itu dengan makna yang berbeda."
    },
    {
      year: "Keluarga",
      title: "Tumbuh Menjadi 22 Bersaudara",
      text: "Setelah kembali memakai nama Takahashi, mereka perlahan menemukan saudara-saudara lain, anak-anak Ryosukein dari ibu-ibu berbeda yang dulu ditelantarkan. Satu per satu mereka bertemu karena marga yang sama, lalu memilih bergabung. Tidak semua terikat darah, tapi semua terikat pilihan."
    }
  ],

  galleryPhotos: []
};
