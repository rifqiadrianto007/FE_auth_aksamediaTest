import { useAuth } from "../hooks/useAuth"

export default function Dashboard() {

    const { user, logout } = useAuth()

    return (
        <div className="p-10">

            <h1 className="text-2xl font-bold">
                Dashboard
            </h1>

            <p className="mt-4">
                Login sebagai: {user?.fullName}
            </p>

            <button
                onClick={logout}
                className="mt-4 bg-red-500 text-white px-4 py-2"
            >
                Logout
            </button>

        </div>
    )

}