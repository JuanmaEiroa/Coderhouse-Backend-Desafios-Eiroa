import multer from "multer";
import * as path from "path";

export const multerGenerator = (destination, extension) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd() + destination));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname + extension);
    },
  });

  return multer({storage})
}
