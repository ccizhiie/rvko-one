const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDlvZjGMD_HRjbo-spMtRr3McYOaiCT7LI",
  authDomain: "rvko-11.firebaseapp.com",
  projectId: "rvko-11",
  storageBucket: "rvko-11.appspot.com",
  messagingSenderId: "321267929362",
  appId: "1:321267929362:web:02184bb86dccac056263cb",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;
