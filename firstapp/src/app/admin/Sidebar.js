import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/admin/profile">Profile</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/admin/manage">Manage</Link>
            </li>
        </ul>
    )
}

export default Sidebar