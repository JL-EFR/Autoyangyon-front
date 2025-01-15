import { Text, TouchableOpacity } from "react-native"
import { Stack, router } from "expo-router"
import Icon from "react-native-vector-icons/FontAwesome"
import { Redirect } from "expo-router"
import { useRole } from "../../function/token"

export default Layout = () => {
  const role = useRole()
  if (role === "Guest") {
    return <Redirect href="/Login" />
  }
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          flex: 1,
          backgroundColor: colors.green,
        },
        headerLeft: () => {
          return (
            <Icon.Button
              name="navicon"
              color={colors.black}
              backgroundColor={colors.transparent}
              underlayColor={colors.blacktint}
              onPress={() => {
                router.replace("/Admin/Menu")
              }}
            >
              Menu
            </Icon.Button>
          )
        },
        headerTitle: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.replace("/")
              }}
            >
              <Text style={{ fontSize: 23 }}>Autoyangyon</Text>
            </TouchableOpacity>
          )
        },
        headerTitleAlign: "center",
      }}
    />
  )
}
