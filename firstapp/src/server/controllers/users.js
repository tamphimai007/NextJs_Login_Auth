import User from '@/server/models/users'


export const update = async (req, res) => {
    try {
        const id = req.query.id
        const updated = await User
            .findOneAndUpdate({ _id: id }, req.body, { new: true })
            .exec()
        console.log(updated)
        res.send(updated)
    } catch (err) {
        console.log(err)
        res.status(400).send('Server update Error!!!')
    }
}
export const updateStatus = async (req, res) => {
    try {
        const id = req.body.id
        const updated = await User
            .findOneAndUpdate(
                { _id: id },
                { status: req.body.status },
                { new: true })
            .exec()
        console.log(updated)
        res.send(updated)
    } catch (err) {
        console.log(err)
        res.status(400).send('Server update Error!!!')
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.query.id
        const deleted = await User
            .findByIdAndDelete({ _id: id })
            .exec()

        console.log(deleted)
        res.send(deleted)
    } catch (err) {
        console.log(err)
        res.status(400).send('Server remove Error!!!')
    }
}


export const read = async (req, res) => {
    try {
        const readData = await User
        .findOne({ _id: req.query.id })
        .select('-password')
        .exec()



        console.log(readData)
        res.send(readData)
    } catch (err) {
        console.log(err)
        res.status(400).send('Server read Error!!!')
    }
}