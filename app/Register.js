import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { useState } from "react"
import AuthRegister from "../components/AuthRegister"
import colors from "../constants/colors"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { router } from "expo-router"

export default Register = () => {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
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
          <Text style={{ color: colors.white, fontSize: 20 }}>Register</Text>
          <View style={{ rowGap: 5 }}>
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: colors.white, flex: 1 }}>
                เบอร์โทรศัพท์
              </Text>
              <TextInput
                value={phone}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setPhone(text.toString())
                }}
                style={{ backgroundColor: colors.white, flex: 2 }}
              />
            </View>
          </View>
          <AuthRegister phone={phone} password={password} />
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={{ color: colors.white }}>มี Account อยู่แล้ว </Text>
            <TouchableOpacity
              onPress={() => {
                router.replace("/Login")
              }}
            >
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => GoogleSignin.signOut()}>
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
