import { userRepo } from "./userRepo"

export async function seedUsers() {

  const users = await userRepo.getAll()

  if (users.length > 0) return

  const dummy = [
    { name: "Agus Setiawan", email: "agus@mail.com" },
    { name: "Budi Santoso", email: "budi@mail.com" },
    { name: "Citra Dewi", email: "citra@mail.com" },
    { name: "Dedi Kurniawan", email: "dedi@mail.com" },
    { name: "Eko Prasetyo", email: "eko@mail.com" },
  ]

  for (const user of dummy) {
    await userRepo.create(user)
  }

}