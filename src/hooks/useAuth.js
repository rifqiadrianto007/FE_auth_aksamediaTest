import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContextBase"

export function useAuth() {
  return useContext(AuthContext)
}