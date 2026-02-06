import { dbPromise } from "./db"

const KEY = "theme"

export const themeRepo = {

  async getTheme() {
    const db = await dbPromise
    const result = await db.get("settings", KEY)
    return result?.value || "system"
  },

  async setTheme(theme) {
    const db = await dbPromise
    await db.put("settings", {
      key: KEY,
      value: theme
    })
  }

}