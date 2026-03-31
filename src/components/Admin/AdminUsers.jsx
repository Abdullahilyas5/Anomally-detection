import React, { useState } from "react";
import { FaSearch, FaArrowLeft, FaArrowRight, FaBan } from "react-icons/fa";
import ChangeRoleModal from "../modals/ChangeRoleModal";
import BlockUserModal from "../modals/BlockUserModal";

const USERS_PER_PAGE = 15;

const AdminUsers = () => {

    const [users, setUsers] = useState([{
        id: 1,
        name: "John Doe",
        email: "john@gmail.com",
    }]);

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("All")
    const [page, setPage] = useState(1)

    const [selectedUser, setSelectedUser] = useState(null)
    const [blockUser, setBlockUser] = useState(null)


    // role update
    const handleRoleUpdate = (id, newRole) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, role: newRole } : user
        ))
    }

    // block confirm
    const confirmBlock = (id) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, status: "Blocked" } : user
        ))
        setBlockUser(null)
    }


    // search + filter
    const filteredUsers = users.filter(user => {

        const matchSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())

        const matchFilter =
            filter === "All" ? true : user.status === filter

        return matchSearch && matchFilter

    })


    // pagination
    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)

    const startIndex = (page - 1) * USERS_PER_PAGE
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE)



    return (

        <div className="bg-white shadow-xl rounded-xl p-6">

            <div className="flex justify-between mb-5">

                <div className="flex items-center border rounded-lg px-3">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="p-2 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    className="border p-2 rounded-lg"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All Users</option>
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                </select>

            </div>



            {/* TABLE */}

            <div className="border rounded-lg max-h-[450px] overflow-y-auto">

                <table className="w-full">

                    <thead className="bg-gray-100 sticky top-0">

                        <tr className="text-left text-sm">
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>

                    </thead>


                    <tbody>

                        {paginatedUsers.map(user => (

                            <tr key={user.id} className="border-t hover:bg-gray-50">

                                <td className="p-3 font-medium">{user.name}</td>

                                <td className="p-3 text-gray-500">{user.email}</td>

                                <td className="p-3">

                                    <span className={`px-3 py-1 rounded-full text-xs font-medium

${user.role === "Admin" && "bg-red-100 text-red-600"}
${user.role === "Auditor" && "bg-blue-100 text-blue-600"}
${user.role === "Citizen" && "bg-green-100 text-green-600"}

`}>
                                        {user.role}
                                    </span>

                                </td>


                                <td className="p-3">

                                    <span className={`text-sm font-medium

${user.status === "Active" ? "text-green-600" : "text-red-600"}

`}>
                                        {user.status}
                                    </span>

                                </td>


                                <td className="p-3 flex gap-2">

                                    <button
                                        onClick={() => setSelectedUser(user)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                    >
                                        Role
                                    </button>

                                    <button
                                        onClick={() => setBlockUser(user)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-red-600"
                                    >
                                        <FaBan /> Block
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>



            {/* PAGINATION */}

            <div className="flex justify-end items-center gap-4 mt-5">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="p-2 border rounded hover:bg-gray-100"
                >
                    <FaArrowLeft />
                </button>

                <span className="text-sm font-medium">
                    Page {page} / {totalPages || 1}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="p-2 border rounded hover:bg-gray-100"
                >
                    <FaArrowRight />
                </button>

            </div>



            {/* MODALS */}

            {selectedUser && (

                <ChangeRoleModal
                    user={selectedUser}
                    close={() => setSelectedUser(null)}
                    updateRole={handleRoleUpdate}
                />

            )}

            {blockUser && (

                <BlockUserModal
                    user={blockUser}
                    close={() => setBlockUser(null)}
                    confirmBlock={confirmBlock}
                />

            )}

        </div>

    )

}

export default AdminUsers