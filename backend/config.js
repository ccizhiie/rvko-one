const firebase = require("firebase");
require("firebase/storage");
const admin = require("firebase-admin");
const service = require("./service.json");
require("dotenv").config();
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGINGSENDER_ID,
  appId: process.env.APP_ID,
};

admin.initializeApp({
  credential: admin.credential.cert(service),
  storageBucket: "rvko-11.appspot.com",
});

const bucket = admin.storage().bucket();

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
const Foto = db.collection("Foto");
const del = firebase.firestore.FieldValue.delete();
const time = firebase.firestore.Timestamp.now();
module.exports = { del, User, Foto, time, bucket };
