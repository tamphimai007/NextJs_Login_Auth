import User from '@/server/models/users'
import bcrypt from 'bcryptjs'

export const create = async (req, res) => {
    try {
        // code
        const { name, email, password } = req.body
        var user = await User.findOne({ email })
        if (user) {
            return res.send('User Already exists!!')
        }
        user = await new User({ name, email, password })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()
        // const newUser = await new User(req.body).save()
        // console.log(newUser)
        res.send('Register Success')
    } catch (err) {
        // check err
        console.log(err)
        res.status(400).send('Server Create Error!!')
    }
}
export const list = async (req, res) => {
    try {
        const listUser = await User.find({}).exec()
        res.send(listUser)
    } catch (err) {
        console.log(err)
        res.status(400).send('Server List Error!!!')
    }
}