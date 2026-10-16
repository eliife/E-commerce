const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename(req, file, cb) {
   
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});


const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpeg|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Sadece resim dosyaları (jpg, jpeg, png, webp) yüklenebilir!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

module.exports = upload;