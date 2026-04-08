import React from 'react'
import Button from '../button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useLocation } from 'react-router-dom';

const ConfirmationRoleTable = () => {

    const [currentPage, setCurrentPage] = React.useState(1);
    const usersPerPage = 5;

    const confirmationRequests = [
        { id: 1, name: "Abdullah Ilyas", email: "abdullah@example.com", role: "admin" },
        { id: 2, name: "Sania Khan", email: "sania@example.com", role: "Admin" },
        { id: 4, name: "Sara Ahmed", email: "sara@example.com", role: "Auditor" },
        { id: 5, name: "Ali Raza", email: "ali@example.com", role: "Citizen" },
        { id: 6, name: "Ali Raza", email: "ali@example.com", role: "Citizen" },
        { id: 7, name: "Ali Raza", email: "ali@example.com", role: "Citizen" },
        { id: 8, name: "Ali Raza", email: "ali@example.com", role: "Citizen" },
    ];

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const totalPages = Math.ceil(confirmationRequests.length / usersPerPage);

    // ✅ Correct way
    const displayedUsers = confirmationRequests.slice(startIndex, endIndex)
       

    return (
        <div className="bg-white rounded-lg shadow p-4 mt-2">
            <h3 className="text-lg font-bold text-primary mb-4">Confirmation Requests</h3>

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
                        {displayedUsers.map((user) => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-medium">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.role}</td>
                                <td className='flex gap-3 p-3'>
                                    <Button
                                        text="Confirm"
                                        variant='neutral_blue'
                                        Icon={<ThumbUpIcon />}
                                        onsuccess={() => alert("User confirmed!")}
                                    />
                                    <Button
                                        text="Decline"
                                        variant='accent'
                                        Icon={<ThumbDownAltIcon />}
                                        onsuccess={() => alert("User declined!")}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ConfirmationRoleTable;