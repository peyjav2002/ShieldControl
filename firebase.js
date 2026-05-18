import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
  getFirestore
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

import {
  getStorage
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-storage.js";

const firebaseConfig = {

  apiKey:
  "AIzaSyDWRUE_-JcA6R1W3lwPVys0tM5MMqJpbyo",

  authDomain:
  "shieldcontrol.firebaseapp.com",

  projectId:
  "shieldcontrol",

  storageBucket:
  "shieldcontrol.firebasestorage.app",

  messagingSenderId:
  "1018951977084",

  appId:
  "1:1018951977084:web:4b782c2f6b3ded7dcae1f9",

  measurementId:
  "G-4M9QTE10FL"

};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

const storage =
getStorage(app);

export { db, storage };