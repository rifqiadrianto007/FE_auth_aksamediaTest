import { dbPromise } from "./db"

const AUTH_KEY = "current-user"

export const authRepo = {

    async login(user) {
    const db = await dbPromise
    return db.put("auth", {
      id: AUTH_KEY,
      ...user
    })
  },

  async logout() {
    const db = await dbPromise
    return db.delete("auth", AUTH_KEY)
  },

  async getCurrentUser() {
    const db = await dbPromise
    return db.get("auth", AUTH_KEY)
  },

  async updateUser(data) {
    const db = await dbPromise
    const current = await db.get("auth", AUTH_KEY)

    if (!current) return null

    const updated = {
      ...current,
      ...data
    }

    await db.put("auth", updated)

    return updated
  }

}