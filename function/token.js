import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store"
import { storage } from "../script/storage"
import { jwtDecode } from "jwt-decode"
import "core-js/stable/atob"

export const useRole = () => {
  return storage.getString("role")
}

export async function saveToken(value) {
  await setItemAsync("token", value)
  const payload = jwtDecode(value)
  storage.set("role", payload.role)
  storage.set("UserName", payload.UserName)
  storage.set("exp", payload.exp)
  console.log(payload)
}

export async function getToken() {
  const token = await getItemAsync("token")

  if (token) {
    return jwtDecode(token)
  } else {
    return null
  }
}

export async function removeToken() {
  await deleteItemAsync("token")
  storage.set("role", "Guest")
  storage.set("UserName", "")
}
