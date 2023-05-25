import { connectDB } from "@/server/config/db"
import nc from 'next-connect'
import multer from "multer"


import {
    update
} from "@/server/controllers/account"

connectDB()

export const config = {
    api: {
        bodyParser: false
    }
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            'file_' +
            Date.now() +
            '.' +
            file.originalname.split('.')[file.originalname.split('.').length - 1]
        );
    },
});
let upload = multer({
    storage: storage,
});
let uploadFile = upload.single("file");

const handler = nc({})

handler.use(uploadFile)









handler.put(update)
handler.post((req, res) => {
    res.send("hello connect post")
})
handler.get((req, res) => {
    res.send("hello connect get")
})

export default handler

// export default (req, res) => {
//     // code
//     if (req.method === 'PUT') {
//         res.send('hello working account')
//     } else {
//         res.status(400).send("Error!!")
//     }
// }