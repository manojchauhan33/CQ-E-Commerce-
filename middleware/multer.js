import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));    //process is global object and cwd is currently working directory
    // console.log(process.cwd());
  },
  
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});




const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {

    cb(null, true);
    
  } else {
    cb(new Error("Only image files are allowed"), false);   
  }
};




const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});
export default upload;
