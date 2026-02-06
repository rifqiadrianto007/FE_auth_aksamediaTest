import { useSyncExternalStore } from "react"
import { themeStore } from "../stores/themeStore"
import { ThemeContext } from "./ThemeContextBase"

export function ThemeProvider({ children }) {

    const { theme } = useSyncExternalStore(
        themeStore.subscribe,
        themeStore.getSnapshot
    )

    const changeTheme = themeStore.changeTheme

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}