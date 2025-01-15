import {
  GoogleSignin,
  GoogleSigninButton,
  // statusCodes,
} from "@react-native-google-signin/google-signin"
import { View } from "react-native"
import { RegisterGoogle } from "../script/api"
import { saveToken } from "../function/token"
import { router } from "expo-router"

export default AuthRegister = ({ phone, password }) => {
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
              password: password,
              phone: phone,
            }
            const result = await RegisterGoogle(item)
            console.log(result)
            saveToken(result.token)
            router.replace("/")
          } catch (error) {
            console.log(error)
          }
        }}
      />
    </View>
  )
}
