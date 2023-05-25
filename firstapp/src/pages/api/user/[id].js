import { connectDB } from "@/server/config/db"

import {
    update,
    remove,
    read
} from "@/server/controllers/users"

connectDB()
export default (req, res) => {
    // code
    if (req.method === 'PUT') {
        update(req, res)
    } else if (req.method === 'DELETE') {
        remove(req, res)
    } else if (req.method === 'GET') {
        read(req, res)
    } else {
        res.status(400).send("Error!!")
    }
}