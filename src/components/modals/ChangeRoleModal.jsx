'use client'

import {useEffect, useState} from "react";


const ChangeRoleModal = ({ user, close, updateRole }) => {

    const [role, setRole] = useState("");

    useEffect(() => {
        setRole(user.role);
    }, [user?.id]);

    const confirmChange = () => {
        updateRole(user.id, role);
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white p-6 rounded w-[350px]">

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Admin">Admin</option>
                    <option value="Auditor">Auditor</option>
                    <option value="Citizen">Citizen</option>
                </select>

                <button onClick={confirmChange}>
                    Confirm
                </button>

            </div>

        </div>
    );
};

export default ChangeRoleModal;