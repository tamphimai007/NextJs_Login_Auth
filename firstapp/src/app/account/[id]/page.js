'use client'
// rafce

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { usePathname } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const AcountPage = () => {
    const [formData, setFormData] = useState({})
    const [id, setId] = useState()
    const { data, update } = useSession();

    console.log("Edit Page", data?.user.file)



    const pathName = usePathname()

    useEffect(() => {
        // code
        const regex = /^\/account\/(.+)$/;
        const match = pathName.match(regex);
        const id = match ? match[1] : null;
        //console.log(id)
        setId(id)
        loadData(id)
    }, [])
    const loadData = async (id) => {
        await axios.get(process.env.NEXT_API + '/user/' + id)
            .then((res) => {
                setFormData(res.data)
            })
    }
    const handleSubmit = async (e) => {
        // console.log(formData)
        e.preventDefault()

        const formDataWithImage = new FormData();
        for (const key in formData) {
            formDataWithImage.append(key, formData[key])
        }
        formDataWithImage.append('fileold', data?.user.file)

        //console.log(formDataWithImage)
        // const uri = 'http://localhost:3000/api/'
        await axios.put(
            process.env.NEXT_API + '/account/' + id,
            formDataWithImage,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then((res) => {
                //console.log(res)
                update(res.data)
                toast.success('Update ' + res.data.name + ' Success')
            }).catch(err => console.log(err))
    }
    const handleChange = (e) => {
        // console.log(e.target.files[0])
        if (e.target.name === 'file') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    }

    return (
        <div className="container container-fluid">
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-10 col-lg-5 ">
                    <form
                        className="border border-secondary rounded p-4"
                        onSubmit={handleSubmit}
                        encType='multipart/form-data'
                    >
                        <h1 className="mb-4">Edit Profile {formData.name}</h1>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email_field">
                                Name
                            </label>
                            <input
                                value={formData.name}
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
                                value={formData.email}
                                name="email"
                                type="email"
                                onChange={(e) => handleChange(e)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="password_field">
                                Upload Image
                            </label>
                            <input
                                name="file"
                                type="file"
                                accept='image/*'
                                onChange={(e) => handleChange(e)}
                                className="form-control"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-block w-100 btn-primary btn-block mb-4"
                        >
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AcountPage