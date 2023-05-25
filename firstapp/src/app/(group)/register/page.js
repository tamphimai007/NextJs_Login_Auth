// rafce
'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const RegisterPage = () => {
  const [formData, setFormData] = useState({})


  const handleSubmit = async (e) => {
    const uri = 'http://localhost:3000/api/auth'
    e.preventDefault()
    await axios.post(uri, formData)
      .then((res) => {
        console.log(res)
        toast.info(res.data)
      }).catch(err => console.log(err))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  console.log(formData)
  return (
    <>
      <div className="container container-fluid">
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-10 col-lg-5 ">
            <form
              className="border border-secondary rounded p-4"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-4">Register</h1>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email_field">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email_field">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password_field">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                />
              </div>

              <button
                type="submit"
                className="btn btn-block w-100 btn-primary btn-block mb-4"
              >
                Register
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage