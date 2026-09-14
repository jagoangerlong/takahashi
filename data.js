/* ============================================================
 TAKAHASHI FAMILY — DEFAULT / SEED DATA
 Dipakai sebagai cadangan + buat seed Firestore pertama kali.
 Setelah data masuk Firestore, edit lewat admin.html (bukan file ini).

 FORMAT:
 familyTree = nested (anak di dalam "children" ayah/ibunya).
 Tiap orang: id, name, birth, death (null kalau hidup/tidak diketahui),
 photo, bio. death keisi => foto grayscale + titik merah.
 ============================================================ */

const DEFAULT_DATA = {
  familyName: "Takahashi",
  familyTagline: "Bukan warisan darah — tapi pilihan untuk berdiri bersama.",
  familyLogo: "assets/logo.png",

  familyTree: {
    id: "ryosukein",
    name: "Ryosukein Takahashi",
    birth: null,
    death: null,
    photo: "https://api.dicebear.com/7.x/identicon/svg?seed=Ryosukein&backgroundColor=1a1a1a",
    bio: "Leluhur keluarga — ayah kandung Narzan dan Davis. Wujud tidak diketahui (siluet).",
    children: [
      {
        id: "narzan",
        name: "Narzan Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=NarzanTakahashi&backgroundColor=e6dcc4",
        bio: "Kepala keluarga (abang ke-1). Anak sulung Ryosukein.",
        children: [
          {
            id: "sunshine",
            name: "Sunshine Takahashi",
            birth: null,
            death: null,
            photo: "https://api.dicebear.com/7.x/notionists/svg?seed=SunshineTakahashi&backgroundColor=e6dcc4",
            bio: "Anak Narzan."
          },
          {
            id: "molly",
            name: "Molly Takahashi",
            birth: null,
            death: null,
            photo: "https://api.dicebear.com/7.x/notionists/svg?seed=MollyTakahashi&backgroundColor=e6dcc4",
            bio: "Anak Narzan."
          }
        ]
      },
      {
        id: "davis",
        name: "Davis Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=DavisTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-2. Adik kandung Narzan.",
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
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=IsomaTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-3. Saudara pertama yang bergabung di luar garis darah."
      },
      {
        id: "ate",
        name: "Ate Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=AteTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-4.",
        children: [
          {
            id: "sara",
            name: "Sara Takahashi",
            birth: null,
            death: null,
            photo: "https://api.dicebear.com/7.x/notionists/svg?seed=SaraTakahashi&backgroundColor=e6dcc4",
            bio: "Anak Ate."
          }
        ]
      },
      {
        id: "obi",
        name: "Obi Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=ObiTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-5."
      },
      {
        id: "kemal",
        name: "Kemal Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=KemalTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-6."
      },
      {
        id: "xyro",
        name: "Xyro Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=XyroTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-7."
      },
      {
        id: "mike",
        name: "Mike Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=MikeTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-8."
      },
      {
        id: "ashura",
        name: "Ashura Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=AshuraTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-9."
      },
      {
        id: "jarot",
        name: "Jarot Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=JarotTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-10."
      },
      {
        id: "leticia",
        name: "Leticia Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=LeticiaTakahashi&backgroundColor=e6dcc4",
        bio: "Kakak ke-11."
      },
      {
        id: "jocelyn",
        name: "Jocelyn Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=JocelynTakahashi&backgroundColor=e6dcc4",
        bio: "Kakak ke-12."
      },
      {
        id: "jo",
        name: "Jo Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=JoTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-13."
      },
      {
        id: "rikan",
        name: "Rikan Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=RikanTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-14."
      },
      {
        id: "ega",
        name: "Ega Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=EgaTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-15."
      },
      {
        id: "marvel",
        name: "Marvel Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=MarvelTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-16."
      },
      {
        id: "emy",
        name: "Emy Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=EmyTakahashi&backgroundColor=e6dcc4",
        bio: "Kakak ke-17."
      },
      {
        id: "denbo",
        name: "Denbo Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=DenboTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-18."
      },
      {
        id: "maul",
        name: "Maul Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=MaulTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-19."
      },
      {
        id: "raven",
        name: "Raven Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=RavenTakahashi&backgroundColor=e6dcc4",
        bio: "Abang ke-20."
      },
      {
        id: "lucia",
        name: "Lucia Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=LuciaTakahashi&backgroundColor=e6dcc4",
        bio: "Kakak ke-21."
      },
      {
        id: "gyo",
        name: "Gyo Takahashi",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=GyoTakahashi&backgroundColor=e6dcc4",
        bio: "Bungsu (adik terakhir)."
      },
      {
        id: "ventra",
        name: "Ventra Kertanegara",
        birth: null,
        death: null,
        photo: "https://api.dicebear.com/7.x/notionists/svg?seed=VentraKertanegara&backgroundColor=e6dcc4",
        bio: "Kakek angkat (opung). Bukan marga Takahashi."
      }
    ]
  },

  familyHistory: [
    {
      year: "Awal",
      title: "Ryosukein Takahashi",
      text: "Takahashi Family berasal dari satu garis darah: Ryosukein Takahashi — pria egois yang berpindah-pindah pasangan. Dari perbuatannya lahir Narzan dan Davis dari ibu yang berbeda."
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
      text: "Dua belas tahun kemudian mereka bertemu lagi. Davis mengungkap ingin kembali memakai nama Takahashi — bukan karena melupakan, tapi karena memilih memaafkan."
    },
    {
      year: "Babak Baru",
      title: "Kembali ke Takahashi",
      text: "Narzan luluh. Keduanya memutuskan menerima masa lalu dan kembali menggunakan nama Takahashi, bertekad membangun nama itu dengan makna yang berbeda."
    },
    {
      year: "Keluarga",
      title: "Tumbuh Menjadi 22 Bersaudara",
      text: "Isoma bergabung sebagai saudara ketiga, disusul seorang pemuda 16 tahun yang ingin jadi yang termuda. Perlahan keluarga tumbuh — tidak semua terikat darah, tapi semua terikat pilihan."
    },
    {
      year: "Warisan",
      title: "Warisan Balap",
      text: "Dunia otomotif dan balap jalanan tidak pernah benar-benar hilang. Bagi Takahashi, mobil adalah simbol kebebasan dan kendali atas hidup mereka sendiri."
    }
  ],

  galleryPhotos: []
};
