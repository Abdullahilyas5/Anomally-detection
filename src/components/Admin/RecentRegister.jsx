import React from 'react'

const RecentRegister = () => {


    const recentUsers = [
        { id: 1, name: "Abdullah Ilyas", email: "abdullah@example.com", role: "admin", date: "2026-04-01" },
        { id: 2, name: "sania Khan", email: "sania@example.com", role: "Admin", date: "2026-04-02" },
        { id: 3, name: "Ali Raza", email: "ali@example.com", role: "Citizen", date: "2026-04-03" },
        { id: 4, name: "Sara Ahmed", email: "sara@example.com", role: "Auditor", date: "2026-04-04" },
    ];

    return (
        <div>
            <div className="bg-white rounded-lg shadow p-4 mt-2">
                <h3 className="text-lg font-bold text-primary mb-4">Recent User Registrations</h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-100 text-left text-gray-600">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user) => (
                                <tr key={user.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3 font-medium">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RecentRegister