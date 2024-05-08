const firebase = require("firebase");
require("firebase/storage");
const admin = require("firebase-admin");
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
  credential: admin.credential.cert({
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
  }),
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
