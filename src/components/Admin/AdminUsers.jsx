import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaArrowLeft, FaArrowRight, FaBan } from "react-icons/fa";

import ChangeRoleModal from "../modals/ChangeRoleModal";
import BlockUserModal from "../modals/BlockUserModal";

import {
    fetchUsers,
    updateUserRole as updateRoleApi,
    blockUser as blockUserApi
} from "../../apis/admin";

import {
    setUsers,
    setSelectedUser,
    clearSelectedUser,
    updateUserRoleLocal as updateUserRole,
    blockUserLocal as updateUserStatus
} from "../../redux/features/auth/adminSlice";

const USERS_PER_PAGE = 15;

const AdminUsers = () => {

    const dispatch = useDispatch();

    const { users, selectedUser } = useSelector(state => state.admin);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [page, setPage] = useState(1);

    // ---------------- FETCH USERS ----------------
    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers();

            const usersArray =
                data?.users ||
                data?.data?.users ||
                data?.data ||
                [];

            const normalized = Array.isArray(usersArray)
                ? usersArray.map(u => ({
                    id: u.id || u._id,
                    name: u.name,
                    email: u.email,
                    role: u.role,
                    status: u.status
                }))
                : [];

            dispatch(setUsers(normalized));
        };

        loadUsers();
    }, [dispatch]);

    // ---------------- ROLE UPDATE ----------------
    const handleRoleUpdate = async (id, role) => {
        try {
            await updateRoleApi(id, role);

            // update redux state
            dispatch(updateUserRole({ id, role }));

        } catch (err) {
            console.error(err);
        }
    };

    // ---------------- BLOCK USER ----------------
    const handleBlockUser = async (id) => {
        try {
            await blockUserApi(id);

            dispatch(updateUserStatus({ id, status: "Blocked" }));

        } catch (err) {
            console.error(err);
        }
    };

    // ---------------- FILTER ----------------
    const filteredUsers = users.filter(user => {

        const matchSearch =
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase());

        const matchFilter =
            filter === "All" ? true : user.status === filter;

        return matchSearch && matchFilter;
    });

    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE) || 1;

    const paginatedUsers = filteredUsers.slice(
        (page - 1) * USERS_PER_PAGE,
        page * USERS_PER_PAGE
    );

    return (
        <div className="p-6 bg-white rounded-xl">

            {/* SEARCH + FILTER */}
            <div className="flex justify-between mb-4">

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="border p-2 rounded"
                />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                </select>

            </div>

            {/* TABLE */}
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedUsers.map(user => (
                        <tr key={user.id} className="border-t">

                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>

                            <td className="flex gap-2">

                                <button
                                    onClick={() => dispatch(setSelectedUser(user))}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Role
                                </button>

                                <button
                                    onClick={() => handleBlockUser(user.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    <FaBan />
                                </button>

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-end gap-3 mt-4">

                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    <FaArrowLeft />
                </button>

                <span>{page} / {totalPages}</span>

                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    <FaArrowRight />
                </button>

            </div>

            {/* MODAL */}
            {selectedUser && (
                <ChangeRoleModal
                    user={selectedUser}
                    close={() => dispatch(clearSelectedUser())}
                    updateRole={handleRoleUpdate}
                />
            )}

        </div>
    );
};

export default AdminUsers;