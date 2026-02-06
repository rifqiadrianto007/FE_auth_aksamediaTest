import { openDB } from "idb"

const DB_NAME = "aksamedia-db"
const DB_VERSION = 1

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {

    // store untuk auth user
    if (!db.objectStoreNames.contains("auth")) {
      db.createObjectStore("auth", {
        keyPath: "id"
      })
    }

    // store untuk data users CRUD
    if (!db.objectStoreNames.contains("users")) {
      const store = db.createObjectStore("users", {
        keyPath: "id",
        autoIncrement: true
      })

      store.createIndex("name", "name")
    }

    // store untuk settings
    if (!db.objectStoreNames.contains("settings")) {
      db.createObjectStore("settings", {
        keyPath: "key"
      })
    }

  },
})