const { User, Foto, bucket } = require("../config/config.js");

exports.GetTinder = async (req, res) => {
  const directoryName = "foto/";
  const id = req.params.id;

  const options = {
    prefix: directoryName,
  };

  try {
    const querySnapshot = await User.doc(id).get();
    const tinder = querySnapshot.data().tinder;
    const [files] = await bucket.getFiles(options);
    const fileUrls = files.map((file) => {
      return file.getSignedUrl({
        action: "read",
        expires: "03-01-2500",
      });
    });

    const signedUrls = await Promise.all(fileUrls);
    const imageUrls = signedUrls.map((url) => url[0]);

    const imagesWithPath = [];
    const data = [];
    for (const imageUrl of imageUrls) {
      const questionMarkIndex = imageUrl.indexOf("?");
      const urlBeforeQuestionMark = imageUrl.substring(0, questionMarkIndex);
      const splitUrl = urlBeforeQuestionMark.split("/");
      const dataAfterDomain = splitUrl.slice(4).join("/");

      imagesWithPath.push({
        imageUrl,
      });
      data.push({
        path: dataAfterDomain,
        like: 0,
        dislike: 0,
      });
    }
    return res.json({ images: imagesWithPath, tinder: tinder, data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch image URLs.", details: error.message });
  }
};

exports.PostTinder = async (req, res) => {
  const id = req.params.id;
  const { images } = req.body;
  console.log(images.length);
  try {
    for (let i = 0; i < images.length; i++) {
      const item = images[i];
      const { like, dislike, path } = item;
      console.log(like, dislike, path);
      const querySnapshot = await Foto.where("filePath", "==", path).get();
      const doc = querySnapshot.docs[0];

      if (!doc.empty) {
        let currentLike = doc.data().like;
        let currentDislike = doc.data().dislike;

        currentLike += like;
        currentDislike += dislike;

        await doc.ref.update({
          like: currentLike,
          dislike: currentDislike,
        });
      } else {
        return res
          .status(404)
          .json({ error: "cannot save data to the server" });
      }
    }

    return res.status(200).json({ massage: "addend data successfully" });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};
