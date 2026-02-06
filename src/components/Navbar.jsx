import { useAuth } from "../hooks/useAuth"
import Dropdown from "./Dropdown"
import { useNavigate } from "react-router-dom"

export default function Navbar() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate("/login")
    }

    return (
        <div className="
      bg-white dark:bg-gray-900
      border-b dark:border-gray-700
      px-6 py-3
      flex justify-between items-center
    ">

            <div className="font-bold">
                Aksamedia App
            </div>

            <Dropdown
                trigger={
                    <button className="
            px-3 py-2
            bg-gray-100 dark:bg-gray-800
            rounded
          ">
                        {user?.fullName}
                    </button>
                }
            >

                <button
                    onClick={() => navigate("/profile")}
                    className="
            block w-full text-left
            px-4 py-2
            hover:bg-gray-100 dark:hover:bg-gray-700
          "
                >
                    Profile
                </button>

                <button
                    onClick={handleLogout}
                    className="
            block w-full text-left
            px-4 py-2
            text-red-500
            hover:bg-gray-100 dark:hover:bg-gray-700
          "
                >
                    Logout
                </button>

            </Dropdown>

        </div>
    )
}