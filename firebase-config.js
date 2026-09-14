/* ============================================================
 TAKAHASHI FAMILY — FIREBASE CONFIG
 Project: takahashi-fam
 Jangan edit file ini kecuali ganti project Firebase.
 ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyAMxdtyGT7XqUhAWiwx-BvEQp2v_p_gKrM",
  authDomain: "takahashi-fam.firebaseapp.com",
  projectId: "takahashi-fam",
  storageBucket: "takahashi-fam.firebasestorage.app",
  messagingSenderId: "245870690554",
  appId: "1:245870690554:web:e7cfa2354543176c118943"
};

// Init Firebase (object `firebase` global dari CDN compat yang dimuat duluan)
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
