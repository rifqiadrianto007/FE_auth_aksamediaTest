import { dbPromise } from "./db"

export const userRepo = {

  async create(user) {
    const db = await dbPromise
    return db.add("users", user)
  },

  async getAll() {
    const db = await dbPromise
    return db.getAll("users")
  },

  async getById(id) {
    const db = await dbPromise
    return db.get("users", id)
  },

  async update(id, data) {
    const db = await dbPromise

    const existing = await db.get("users", id)

    const updated = {
      ...existing,
      ...data,
      id
    }

    return db.put("users", updated)
  },

  async delete(id) {
    const db = await dbPromise
    return db.delete("users", id)
  }

}