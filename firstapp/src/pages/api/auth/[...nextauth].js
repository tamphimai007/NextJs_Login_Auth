import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

import { connectDB } from "@/server/config/db";
import User from "@/server/models/users";
import bcrypt from 'bcryptjs'

connectDB()

export default NextAuth({
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const { email, password } = credentials
                const user = await User.findOne({ email })

                if (!user) {
                    throw new Error('Invalid User!!!')
                }

                if (!user.status) {
                    throw new Error('User is Disable!!!')
                }

                const isPassword = await bcrypt.compare(password, user.password)
                if (!isPassword) {
                    throw new Error('Password is not Correct!!')
                }

                return user
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = user.role
                token.id = user._id
                token.file = user.file
            }

            if (trigger === 'update') {
                // console.log('trigger', session)
                token = session
            }

            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role
                session.user.id = token.id
                session.user.file = token.file
            }
            return session
        }
    },
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET
})