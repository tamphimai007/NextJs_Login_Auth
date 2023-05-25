'use client'

import Sidebar from "./Sidebar"

export default function Layout({ children }) {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}