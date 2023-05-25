import User from '@/server/models/users'
import fs from 'fs'

export const update = async (req, res) => {
    try {
        // console.log(req.file)
        console.log(req.body.fileold)

        var newData = req.body

        if (typeof req.file !== 'undefined') {
            newData.file = req.file.filename

            await fs.unlink('public/images/' + req.body.fileold, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('remove success')
                }
            })


        } else {
            newData.file = req.body.fileold
        }

        const id = req.query.id
        const updated = await User
            .findOneAndUpdate({ _id: id }, newData, { new: true })
            .select('-password')
            .exec()
        console.log(updated)
        res.send(updated)
    } catch (err) {
        console.log(err)
        res.status(400).send('Server update Error!!!')
    }
}