const imageUrl =
  "https://storage.googleapis.com/rvko-11.appspot.com/foto/gambar3.jpeg?GoogleAccessId=firebase-adminsdk-e35xz%40rvko-11.iam.gserviceaccount.com&Expires=16730298000&Signature=Qdd8KiKEaFoG14VQ%2B2jFyEJeuan9%2FlMvko9QQhSiqOh9lEt8ngNEjWoAcwzGSLXXRsOsBHdbU5%2B5iNEFbIr7QPz0PXDH6ub1nj5GJASFKi3Mu79z86iHC5HS%2BmxXEn8%2Ftsfw1Mf5rrnLXC5BsCJA4fxXvRg8%2F9K%2Fg5t7nNV2sY5v0omrtysl8A8PAU0vTn%2FVBi283BpzA7kwTer%2Fdgvs%2BN2G9DKcHqdhdTPdgsODdoRQydg2VevMqDZIwJO9AkRe0fixhL%2BLisLO8ibFUUn%2FZ%2FFvGiFYK83OvRtMvGJKRBeAGQ5%2B%2BLJIO6TKcwhr%2Bqtx3eRLZTCZ0zLbDvFs8827NA%3D%3D";

// Mencari indeks tanda "?"
const questionMarkIndex = imageUrl.indexOf("?");

// Memisahkan URL berdasarkan tanda "?"
const urlBeforeQuestionMark = imageUrl.substring(0, questionMarkIndex);

// Memisahkan URL berdasarkan tanda "/"
const splitUrl = urlBeforeQuestionMark.split("/");

// Mengambil data setelah ".com/"
const dataAfterDomain = splitUrl.slice(4).join("/"); // Bergantung pada struktur URL, Anda mungkin perlu menyesuaikan indeksnya

console.log("Data setelah .com/ dan sebelum ?:", dataAfterDomain);
