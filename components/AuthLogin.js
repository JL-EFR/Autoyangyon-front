import {
  GoogleSignin,
  GoogleSigninButton,
  // statusCodes,
} from "@react-native-google-signin/google-signin"
import { View } from "react-native"
import { LoginGoogle } from "../script/api"
import { saveToken } from "../function/token"

export default AuthLogin = () => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_CLIENTIDW,
    androidClientId: process.env.EXPO_PUBLIC_CLIENTIDA,
  })
  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            const item = {
              idToken: userInfo.idToken,
            }
            const result = await LoginGoogle(item)
            console.log(result)
            saveToken(result.token)
          } catch (error) {
            console.log(error)
          }
        }}
      />
    </View>
  )
}
