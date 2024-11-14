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
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Tipo de arquivo não suportado. Apenas imagens são permitidas."
        )
      );
    }
  },
});
