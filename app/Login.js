import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { useState } from "react"
import colors from "../constants/colors"
import Icon from "react-native-vector-icons/FontAwesome"
import reurl from "../function/reurl"
import { LoginManual, LoginGoogle } from "../script/api"
import { saveToken } from "../function/token"
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin"
import { router } from "expo-router"

export default Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_CLIENTIDW,
    androidClientId: process.env.EXPO_PUBLIC_CLIENTIDA,
  })
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        width: "auto",
        backgroundColor: colors.grey,
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            gap: 10,
            margin: 15,
            backgroundColor: colors.lightgrey,
            padding: 10,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: colors.white, fontSize: 20 }}>Login</Text>
          <View style={{ rowGap: 5 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: colors.white, flex: 1 }}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text.toString())
                }}
                style={{ backgroundColor: colors.white, flex: 2 }}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: colors.white, flex: 1 }}>Password</Text>
              <TextInput
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => {
                  setPassword(text.toString())
                }}
                style={{ backgroundColor: colors.white, flex: 2 }}
              />
            </View>
            <Icon.Button
              name="user"
              onPress={async () => {
                try {
                  console.log(email, password)
                  const cred = { email: email, password: password }
                  const response = await LoginManual(cred)
                  await saveToken(response.token)
                  router.replace("/")
                } catch (error) {
                  console.log(error)
                }
              }}
              backgroundColor={colors.green}
            >
              Login
            </Icon.Button>
          </View>
          <Text style={{ color: colors.white }}>หรือ</Text>
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
                await saveToken(result.token)
                router.replace(reurl("/Home"))
              } catch (error) {
                console.log(error)
              }
            }}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={{ color: colors.white }}>หากยังไม่มี Account </Text>
            <TouchableOpacity
              onPress={() => {
                router.replace("/Register")
              }}
            >
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              GoogleSignin.signOut()
            }}
          >
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
