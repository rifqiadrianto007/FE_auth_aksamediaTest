import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const { login } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleLogin(e) {
        e.preventDefault()

        const result = await login(username, password)

        if (result.success) {
            navigate("/")
        } else {
            setError(result.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded w-80 shadow"
            >

                <h2 className="text-xl font-bold mb-4">
                    Login
                </h2>

                {error && (
                    <div className="text-red-500 text-sm mb-2">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full border p-2 mb-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2"
                >
                    Login
                </button>

            </form>

        </div>
    )

}