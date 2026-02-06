import { useAuth } from "../hooks/useAuth"
import Dropdown from "./Dropdown"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../hooks/useTheme"

export default function Navbar() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const { theme, changeTheme } = useTheme()
    async function handleLogout() {
        await logout()
        navigate("/login")
    }

    return (
        <div className="
            bg-white dark:bg-gray-900
            border-b dark:border-gray-700
            px-4 sm:px-6 py-3
            flex flex-wrap gap-3 justify-between items-center
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
                    onClick={() => navigate("/users")}
                    className="
    block w-full text-left
    px-4 py-2
    hover:bg-gray-100 dark:hover:bg-gray-700
  "
                >
                    Users
                </button>

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

                <div className="border-t dark:border-gray-700 my-1"></div>

                <button
                    onClick={() => changeTheme("light")}
                    aria-pressed={theme === "light"}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "light" ? "font-semibold" : ""
                        }`}
                >
                    Light
                </button>

                <button
                    onClick={() => changeTheme("dark")}
                    aria-pressed={theme === "dark"}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "dark" ? "font-semibold" : ""
                        }`}
                >
                    Dark
                </button>

                <button
                    onClick={() => changeTheme("system")}
                    aria-pressed={theme === "system"}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "system" ? "font-semibold" : ""
                        }`}
                >
                    System
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