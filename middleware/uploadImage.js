import multer from "multer";
export const uploadImageUser = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./upload/users");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const extensionImg = [
      "image/img",
      "image/png",
      "image/jpg",
      "image/jpeg",
    ].find((acceptFomater) => acceptFomater == file.mimetype);
    if (extensionImg) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
