import { RefreshToken } from "../script/api"
import { saveToken } from "../function/token"
import { getItemAsync } from "expo-secure-store"

export default refresh = async () => {
  const oldtoken = await getItemAsync("token")
  if (oldtoken) {
    const newtoken = await RefreshToken(oldtoken)
    await saveToken(newtoken.token)
  }
}
