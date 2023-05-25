// rafce
'use client'
import React, { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const LoginPage = () => {
  const router = useRouter();
  const { data } = useSession();

  const [email, setEmail] = useState("tam@admin5")
  const [password, setPassword] = useState("555555")
  // javascript

  useEffect(() => {
    // code
    if (data && data.user) {
      if (data.user.role === 'admin') {
        router.push('/admin')
      } else if (data.user.role === 'user') {
        router.push('/user')
      }
    }
  }, [data, router])

  console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // code
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      })

      console.log(result)
    } catch (err) {
      // err
      console.log(err)
    }

  }

  return (
    <>
      <div className="container container-fluid">
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-10 col-lg-5 ">
            <form
              className="border border-secondary rounded p-4"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-4">Login</h1>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email_field">
                  Email address
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  value={email}

                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password_field">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  value={password}

                />
              </div>

              <button
                type="submit"
                className="btn btn-block w-100 btn-primary btn-block mb-4"
              >
                Login
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage