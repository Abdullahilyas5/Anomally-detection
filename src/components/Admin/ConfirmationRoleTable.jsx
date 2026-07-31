import React, { useState, useEffect } from "react";
import Button from "../button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

import {
  approveUser,
  declineUser
} from "../../apis/dashboard";

const ConfirmationRoleTable = ({ data = [] }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingId, setLoadingId] = useState(null);
  const [localData, setLocalData] = useState(data);

  const usersPerPage = 5;

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const displayedUsers = localData.slice(startIndex, endIndex);
  const totalPages = Math.max(1, Math.ceil(localData.length / usersPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  /* ================= APPROVE ================= */
  const handleApprove = async (user) => {
    try {
      setLoadingId(user.id);

      await approveUser(user.id, user.role);

      // 🔥 remove instantly for smooth UX
      setLocalData(prev => prev.filter(u => u.id !== user.id));

    } catch (err) {
      console.error("Approve failed:", err);
    } finally {
      setLoadingId(null);
    }
  };

  /* ================= DECLINE ================= */
  const handleDecline = async (user) => {
    try {
      setLoadingId(user.id);

      await declineUser(user.id);

      // 🔥 remove instantly
      setLocalData(prev => prev.filter(u => u.id !== user.id));

    } catch (err) {
      console.error("Decline failed:", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-2">

      <h3 className="text-lg font-bold text-primary mb-4">
        Confirmation Requests
      </h3>

      <div className="overflow-x-auto">

        <table className="w-full text-sm border">

          <thead className="bg-gray-100 text-left text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayedUsers.length > 0 ? (
              displayedUsers.map(user => (
                <tr
                  key={user.id}
                  className={`border-t hover:bg-gray-50 transition-opacity duration-300 ${
                    loadingId === user.id ? "opacity-50" : "opacity-100"
                  }`}
                >

                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>

                  <td className="flex gap-3 p-3">

                    <Button
                      text={loadingId === user.id ? "Processing..." : "Confirm"}
                      variant="neutral_blue"
                      Icon={<ThumbUpIcon />}
                      onClick={() => handleApprove(user)}
                      disabled={loadingId === user.id}
                    />

                    <Button
                      text={loadingId === user.id ? "Processing..." : "Decline"}
                      variant="accent"
                      Icon={<ThumbDownAltIcon />}
                      onClick={() => handleDecline(user)}
                      disabled={loadingId === user.id}
                    />

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-600">
                  No confirmation requests found.
                </td>
              </tr>
            )}
          </tbody>

        </table>

        {/* Pagination */}
        {localData.length > 0 && (
          <div className="flex justify-between items-center mt-4">

            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default ConfirmationRoleTable;