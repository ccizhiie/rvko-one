const firebase = require("firebase");
require("firebase/storage");
const admin = require("firebase-admin");
const serviceAccount = require("./service.json");
const firebaseConfig = {
  apiKey: "AIzaSyDlvZjGMD_HRjbo-spMtRr3McYOaiCT7LI",
  authDomain: "rvko-11.firebaseapp.com",
  projectId: "rvko-11",
  storageBucket: "rvko-11.appspot.com",
  messagingSenderId: "321267929362",
  appId: "1:321267929362:web:02184bb86dccac056263cb",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "rvko-11.appspot.com",
});

const bucket = admin.storage().bucket();

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
const Foto = db.collection("Vidio");
const del = firebase.firestore.FieldValue.delete();
const time = firebase.firestore.Timestamp.now();
module.exports = { del, User, Foto, time, bucket };
