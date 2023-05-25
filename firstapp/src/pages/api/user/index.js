import { connectDB } from "@/server/config/db"

import {
    updateStatus,
} from "@/server/controllers/users"

connectDB()
export default (req, res) => {
    // code
    if (req.method === 'POST') {
        updateStatus(req, res)
    } else {
        res.status(400).send("Error!!")
    }
}