import multer from "multer";
import path from "path";

const temp = path.join(process.cwd(), "/tmp/uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, temp);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1e9);

    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
