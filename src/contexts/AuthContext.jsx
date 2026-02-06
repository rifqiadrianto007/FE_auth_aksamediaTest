import { useSyncExternalStore } from "react"
import { authRepo } from "../database/authRepo"
import { STATIC_CREDENTIAL } from "../utils/auth"
import { AuthContext } from "./AuthContextBase"
import { authStore } from "../stores/authStore"

export function AuthProvider({ children }) {

    const { user, loading } = useSyncExternalStore(
        authStore.subscribe,
        authStore.getSnapshot
    )

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
            authStore.setUser(userData)

            return { success: true }
        }

        return {
            success: false,
            message: "Username atau password salah"
        }
    }

    async function logout() {
        await authRepo.logout()
        authStore.setUser(null)
    }

    async function updateProfile(data) {
        const updated = await authRepo.updateUser(data)
        authStore.setUser(updated)
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