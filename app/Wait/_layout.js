import { Redirect, Slot } from "expo-router"
import { useRole } from "../../function/token"

export default Layout = () => {
  const role = useRole()
  if (role === "Guest") {
    return <Redirect href="/Login" />
  }
  return <Slot />
}
