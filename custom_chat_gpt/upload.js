const multer = require('multer');
// const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//                 cb(null, "./uploads")
//                 s
//         },
//         filename: (req, file, cb) => {
//                 cb(null, Date.now() + "-" + file.originalname)
//         }
// });

const memStorage = multer.memoryStorage()

const upload = multer({ storage: memStorage })
module.exports = upload 