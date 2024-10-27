// import multer from 'multer';
// import path from "path"
// import { dirname } from 'path';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     //   cb(null, './files')
//     const uploadPath = path.join(__dirname, './files'); // Ensure this directory exists
//     cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() 
//     //   cb(null, uniqueSuffix.originalname)
//     const fileExtension = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); 
//     }
//   })
  
// const upload = multer({ storage: storage });
// export default upload;

// middlewares/multer.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, './files'); // Ensure this directory exists
        cb(null, uploadPath); // Pass the destination to the callback
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Set the file name
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;



// const storage = multer.memoryStorage();
// const singleUpload = multer({ storage }).fields([
//     { name: 'file', maxCount: 1 },
//     { name: 'logo', maxCount: 1 }
// ]);

// export default singleUpload;
