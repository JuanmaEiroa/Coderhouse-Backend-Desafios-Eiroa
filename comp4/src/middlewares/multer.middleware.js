import multer from "multer";
import * as path from "path";

const storageDocs = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd() + "/public/data/documents"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storageProf = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd() + "/public/data/profiles"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storageProds = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd() + "/public/data/products"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploadDocs = multer({ storageDocs });
export const uploadProf = multer({ storageProf });
export const uploadProds = multer({ storageProds });
