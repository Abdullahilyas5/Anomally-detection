
import { Card } from "../../components/card";
import { RiAdminLine } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

const Homepage = () => {
    return (
        <div className="flex bg-background h-screen items-center justify-center gap-10">
            <div className="flex flex-1 gap-4 p-10  flex-col flex-2">
                <h2 className="text-4xl font-heading mb-4 text-primary font-bold">Anomaly Detection in public procurement</h2>
                <Card title="Admin" description="Manage all system settings and user accounts." icons={<RiAdminLine className="text-accent text-3xl" />} cls="" />
                <Card title="Auditor" description="Generate and view system reports and analytics." icons={<TbUserEdit className="text-accent text-3xl" />} cls="" />
                <Card title="Citizen" description="View and manage personal profile and preferences." icons={<FaRegUser className="text-accent text-3xl" />}
                    cls="" />
            </div>
            <img className=" max-w-2xl object-cover rounded-2xl h-full " src="/homepage.webp" alt="homepage image" />
        </div>

    )
};

export default Homepage;