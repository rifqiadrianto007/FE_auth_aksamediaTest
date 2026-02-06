import { useMemo, useState, useSyncExternalStore } from "react"
import Navbar from "../components/Navbar"
import { userRepo } from "../database/userRepo"
import Pagination from "../components/Pagination"
import { useSearchParams } from "react-router-dom"
import { usersStore } from "../stores/usersStore"

const LIMIT = 5

export default function Users() {

    const users = useSyncExternalStore(
        usersStore.subscribe,
        usersStore.getSnapshot
    )

    const [editingId, setEditingId] = useState(null)
    const [editingName, setEditingName] = useState("")

    const [searchParams, setSearchParams] = useSearchParams()

    const page = Number(searchParams.get("page")) || 1
    const keyword = searchParams.get("keyword") || ""

    const [name, setName] = useState("")

    const filtered = useMemo(() => {
        if (!keyword) return users

        return users.filter(u =>
            u.name.toLowerCase().includes(keyword.toLowerCase())
        )
    }, [users, keyword])

    function changePage(newPage) {
        setSearchParams({
            page: newPage,
            keyword
        })
    }

    function changeSearch(value) {
        setSearchParams({
            page: 1,
            keyword: value
        })
    }

    async function handleCreate() {

        if (!name) return

        await userRepo.create({
            name,
            email: name.toLowerCase() + "@mail.com"
        })

        setName("")
        await usersStore.refresh()
    }

    async function handleDelete(id) {
        await userRepo.delete(id)
        await usersStore.refresh()
    }

    function startEdit(user) {
        setEditingId(user.id)
        setEditingName(user.name)
    }

    function cancelEdit() {
        setEditingId(null)
        setEditingName("")
    }

    async function saveEdit(id) {

        await userRepo.update(id, {
            name: editingName
        })

        setEditingId(null)
        setEditingName("")

        await usersStore.refresh()
    }

    const totalPages = Math.ceil(filtered.length / LIMIT)

    const start = (page - 1) * LIMIT
    const end = start + LIMIT

    const pageData = filtered.slice(start, end)

    return (
        <div>

            <Navbar />

            <div className="p-6">

                <h1 className="text-xl font-bold mb-4">
                    Users
                </h1>

                <div className="mb-4 flex gap-2">

                    <input
                        placeholder="Search"
                        value={keyword}
                        onChange={(e) => changeSearch(e.target.value)}
                        className="border p-2"
                    />

                    <input
                        placeholder="New user"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2"
                    />

                    <button
                        onClick={handleCreate}
                        className="bg-blue-500 text-white px-4"
                    >
                        Add
                    </button>

                </div>

                <table className="w-full border">

                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {pageData.map(user => (
                            <tr key={user.id}>

                                <td className="p-2 border">
                                    {user.id}
                                </td>

                                <td className="p-2 border">

                                    {editingId === user.id ? (

                                        <input
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            className="border p-1"
                                        />

                                    ) : (
                                        user.name
                                    )}

                                </td>

                                <td className="p-2 border flex gap-2">

                                    {editingId === user.id ? (
                                        <>
                                            <button
                                                onClick={() => saveEdit(user.id)}
                                                className="text-blue-500"
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={cancelEdit}
                                                className="text-gray-500"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => startEdit(user)}
                                                className="text-blue-500"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-500"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={changePage}
                />

            </div>

        </div>
    )

}