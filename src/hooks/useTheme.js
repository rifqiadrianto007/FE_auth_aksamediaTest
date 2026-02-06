import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContextBase"

export function useTheme() {
  return useContext(ThemeContext)
}