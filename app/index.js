import { storage } from "../script/storage"
import { Redirect } from "expo-router"

export default function index() {
  const role = storage.getString("role")
  var ref = "/"
  if (!role) {
    storage.set("role", "Guest")
    ref = "/Login"
  } else if (role === "Guest") {
    ref = "/Login"
  } else {
    ref = "/" + role + "/Home"
  }
  if (role && role !== "Guest") {
    const exp = storage.getNumber("exp")
    var now = Date.now()
    if (exp - now < 604800 && exp - now > 0) {
      refresh()
    }
  }
  return <Redirect href={ref} />
}
