import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import ChangeRoleModal from "../modals/ChangeRoleModal";

import {
  fetchUsers,
  updateUserRole,
  updateUserStatus,
} from "../../apis/admin";

import {
  setUsers,
  setSelectedUser,
  clearSelectedUser,
} from "../../redux/features/auth/adminSlice";

const USERS_PER_PAGE = 15;

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users = [], selectedUser } = useSelector((s) => s.admin);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD USERS ================= */
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers();

      const usersArray = res?.data?.users || [];

      const normalized = usersArray.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status || "active",
      }));

      dispatch(setUsers(normalized));
      setPage(1); // reset pagination after reload
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [dispatch]);

  /* ================= ROLE UPDATE ================= */
  const handleRoleUpdate = async (id, role) => {
    try {
      await updateUserRole(id, role);
      await loadUsers(); // 🔥 refresh UI
    } catch (err) {
      console.error("Role update failed:", err);
    }
  };

  /* ================= STATUS UPDATE ================= */
  const changeStatus = async (id, status) => {
    try {
      await updateUserStatus(id, status);
      await loadUsers(); // 🔥 refresh UI
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  /* ================= FILTER ================= */
  const filteredUsers = users.filter((u) => {
    const searchMatch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      filter === "All"
        ? true
        : u.status === filter.toLowerCase();

    return searchMatch && statusMatch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  );

  const paginated = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  /* ================= STATUS BADGE ================= */
  const badge = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-yellow-100 text-yellow-700";
      case "blocked":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-2xl shadow-md">

        {/* HEADER */}
        <div className="flex justify-between mb-5">

          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg w-1/3">
            <FaSearch />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
              placeholder="Search users..."
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Blocked</option>
          </select>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-6">
                    Loading users...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                paginated.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-gray-50">

                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 capitalize">{u.role}</td>

                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs rounded ${badge(u.status)}`}>
                        {u.status}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2 flex-wrap">

                      {/* ROLE */}
                      <button
                        onClick={() => dispatch(setSelectedUser(u))}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium
                                   bg-blue-50 text-blue-700 border border-blue-200
                                   hover:bg-blue-100 transition"
                      >
                        Role
                      </button>

                      {/* ACTIVE */}
                      {u.status === "active" && (
                        <>
                          <button
                            onClick={() => changeStatus(u.id, "inactive")}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium
                                       bg-yellow-50 text-yellow-700 border border-yellow-200
                                       hover:bg-yellow-100 transition"
                          >
                            Inactive
                          </button>

                          <button
                            onClick={() => changeStatus(u.id, "blocked")}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium
                                       bg-red-50 text-red-700 border border-red-200
                                       hover:bg-red-100 transition"
                          >
                            Block
                          </button>
                        </>
                      )}

                      {/* INACTIVE */}
                      {u.status === "inactive" && (
                        <>
                          <button
                            onClick={() => changeStatus(u.id, "active")}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium
                                       bg-green-50 text-green-700 border border-green-200
                                       hover:bg-green-100 transition"
                          >
                            Activate
                          </button>

                          <button
                            onClick={() => changeStatus(u.id, "blocked")}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium
                                       bg-red-50 text-red-700 border border-red-200
                                       hover:bg-red-100 transition"
                          >
                            Block
                          </button>
                        </>
                      )}

                      {/* BLOCKED */}
                      {u.status === "blocked" && (
                        <>
                          <button
                            onClick={() => changeStatus(u.id, "active")}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium
                                       bg-green-50 text-green-700 border border-green-200
                                       hover:bg-green-100 transition"
                          >
                            Activate
                          </button>

                          <button
                            onClick={() => changeStatus(u.id, "inactive")}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium
                                       bg-yellow-50 text-yellow-700 border border-yellow-200
                                       hover:bg-yellow-100 transition"
                          >
                            Inactive
                          </button>
                        </>
                      )}

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-end gap-3 mt-4">

          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <FaArrowLeft />
          </button>

          <span className="font-medium">{page}</span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <FaArrowRight />
          </button>

        </div>

      </div>

      {/* ROLE MODAL */}
      {selectedUser && (
        <ChangeRoleModal
          user={selectedUser}
          close={() => dispatch(clearSelectedUser())}
          updateRole={handleRoleUpdate}
        />
      )}
    </>
  );
};

export default AdminUsers;