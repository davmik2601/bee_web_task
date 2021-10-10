import multer from "multer";
import moment from "moment";


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/user_avatars');
  },
  filename(req, file, cb) {
    const date = moment().format("DD_MM_YYYY-HHmmss_SSS");
    cb(null, `${date}-${file.originalname}`);
  }
});

const imigeMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const fileFilter = (req, file, cb) => {
  if(!imigeMimeTypes.includes(file.mimetype)) {
    req.fileError = 'Image mimeType is wrong';
    return cb(null, false);
  }
  cb(null, true);
}

const limits = {
  fileSize: 1024 * 1024 * 5
}

export default multer({
  storage,
  fileFilter,
  limits
})