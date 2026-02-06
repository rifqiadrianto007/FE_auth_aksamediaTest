import { useState } from "react"
import Navbar from "../components/Navbar"
import { useAuth } from "../hooks/useAuth"

export default function Profile() {

    const { user, updateProfile } = useAuth()

    const [fullName, setFullName] = useState(user.fullName)

    async function handleSubmit(e) {
        e.preventDefault()

        await updateProfile({
            fullName
        })

        alert("Profile berhasil diupdate")
    }

    return (
        <div>

            <Navbar />

            <div className="p-6 max-w-md">

                <h1 className="text-xl font-bold mb-4">
                    Edit Profile
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="border p-2 w-full mb-4"
                    />

                    <button className="
            bg-blue-500 text-white
            px-4 py-2
          ">
                        Save
                    </button>

                </form>

            </div>

        </div>
    )

}