import { View, SafeAreaView, Text } from "react-native"
import colors from "../../constants/colors"
import Icon from "react-native-vector-icons/FontAwesome"
import { router } from "expo-router"
import { removeToken } from "../../function/token"
import refresh from "../../function/refresh"

export default Home = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        width: "auto",
        backgroundColor: colors.grey,
      }}
    >
      <View style={{ justifyContent: "center", padding: 30, margin: 10 }}>
        <Text style={{ color: colors.white }}>กรณารอการยืนยันจากช่างใหญ่</Text>
        <Icon.Button
          name="refresh"
          backgroundColor={colors.green}
          onPress={async () => {
            await refresh()
            router.replace("/")
          }}
        >
          Refresh
        </Icon.Button>
        <Icon.Button
          name="user-times"
          backgroundColor={colors.green}
          onPress={async () => {
            await removeToken()
            router.replace("/")
          }}
        >
          Logout
        </Icon.Button>
      </View>
    </SafeAreaView>
  )
}
