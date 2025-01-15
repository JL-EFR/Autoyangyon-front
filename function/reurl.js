import { storage } from "../script/storage"

export default reurl = async (url) => {
  const role = storage.getString("role")
  if (role === "Guest" && (url === "/Login" || url === "/Register")) {
    return url
  } else if (role === "Guest") {
    return "/Login"
  } else if (role !== "Guest" && (url === "/Login" || url === "/Register")) {
    return "/" + role + "/Home"
  } else if (role === "Wait") {
    return "/Wait/Info"
  } else {
    return "/" + role + url
  }
}
