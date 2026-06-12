import { useEffect, useState } from "react";

const ChangeRoleModal = ({ user, close, updateRole }) => {
    const [role, setRole] = useState("");

    useEffect(() => {
        setRole(user?.role || "");
    }, [user]);

    const handleSubmit = () => {
        updateRole(user.id, role);
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[360px] rounded-xl shadow-lg p-6">

                <h2 className="text-lg font-semibold mb-4">
                    Change Role
                </h2>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                >
                    <option value="admin">Admin</option>
                    <option value="auditor">Auditor</option>
                    <option value="citizen">Citizen</option>
                </select>

                <div className="flex justify-end gap-2">

                    <button
                        onClick={close}
                        className="px-3 py-2 border rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-3 py-2 bg-blue-600 text-white rounded"
                    >
                        Confirm
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ChangeRoleModal;