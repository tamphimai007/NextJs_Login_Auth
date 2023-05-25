// rafce
'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from "moment/min/moment-with-locales";




const ManagePage = () => {
    const [data, setData] = useState([])

    const uriUser = 'http://localhost:3000/api/user'
    useEffect(() => {
        // code
        loadData()
    }, [])

    const loadData = async () => {
        const res = await axios.get(process.env.NEXT_API + '/auth')
        setData(res.data)
    }

    const handleChangeRole = async (e, id) => {
        const role = e.target.value
        await axios.put(process.env.NEXT_API + '/user/' + id, { role })
            .then(res => {
                console.log(res)
                loadData()
            }).catch(err => console.log(err))
    }
    const roles = ['admin', 'user']

    const handleChange = async (e, id) => {
        const status = e.target.checked
        await axios.post(process.env.NEXT_API + '/user/', { id, status })
            .then(res => {
                console.log(res)
                loadData()
            }).catch(err => console.log(err))
    }
    const handleDelete = async (id) => {
        await axios.delete(process.env.NEXT_API + '/user/' + id)
            .then(res => {
                console.log(res)
                loadData()
            }).catch(err => console.log(err))
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">UpdatedAt</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>

                {data && data.map((item, index) =>
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                            <select
                                onChange={(e) => handleChangeRole(e, item._id)}
                                className='form-control'
                                value={item.role}
                            >
                                {roles.map((item, index) =>
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                )}
                            </select>

                        </td>
                        <td>
                            <div className="form-check form-switch">
                                <input
                                    onChange={(e) => handleChange(e, item._id)}
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckChecked"
                                    checked={item.status}
                                />
                            </div>
                        </td>
                        <td>
                            {moment(item.updatedAt)
                                .locale('th')
                                .startOf(item.updatedAt)
                                .fromNow()}
                        </td>
                        <td>
                            <i
                                onClick={() => handleDelete(item._id)}
                                className="bi bi-trash text-danger">
                            </i>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default ManagePage