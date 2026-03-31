import React, { useState } from "react";

const ChangeRoleModal = ({user,close,updateRole}) => {

const [role,setRole] = useState(user.role)

const confirmChange = ()=>{
updateRole(user.id,role)
close()
}

return (

<div className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-white rounded-lg p-6 w-[350px]">

<h2 className="text-lg font-semibold mb-4">
Change Role
</h2>

<p className="text-sm mb-3">
User: <b>{user.name}</b>
</p>

<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="w-full border p-2 rounded mb-4"
>

<option>Admin</option>
<option>Auditor</option>
<option>Citizen</option>

</select>

<div className="flex justify-end gap-3">

<button
onClick={close}
className="px-4 py-2 bg-gray-200 rounded"
>
Cancel
</button>

<button
onClick={confirmChange}
className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
Confirm
</button>

</div>

</div>

</div>

)

}

export default ChangeRoleModal