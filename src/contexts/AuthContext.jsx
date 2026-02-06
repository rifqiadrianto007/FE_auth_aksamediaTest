import { createContext, useEffect, useState } from "react"
import { authRepo } from "../database/authRepo"
import { STATIC_CREDENTIAL } from "../utils/auth"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        initAuth()
    }, [])

    async function initAuth() {
        const currentUser = await authRepo.getCurrentUser()
        setUser(currentUser || null)
        setLoading(false)
    }

    async function login(username, password) {

        if (
            username === STATIC_CREDENTIAL.username &&
            password === STATIC_CREDENTIAL.password
        ) {

            const userData = {
                id: "current-user",
                username,
                fullName: STATIC_CREDENTIAL.fullName
            }

            await authRepo.login(userData)
            setUser(userData)

            return { success: true }
        }

        return {
            success: false,
            message: "Username atau password salah"
        }
    }

    async function logout() {
        await authRepo.logout()
        setUser(null)
    }

    async function updateProfile(data) {
        const updated = await authRepo.updateUser(data)
        setUser(updated)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                updateProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}