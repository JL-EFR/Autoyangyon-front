import { View, SafeAreaView, ScrollView, Text } from "react-native"
import { router } from "expo-router"
import reurl from "../../function/reurl"
import colors from "../../constants/colors"
import Icon from "react-native-vector-icons/FontAwesome"
import { removeToken } from "../../function/token"
import { storage } from "../../script/storage"

export default Menu = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        width: "auto",
        backgroundColor: colors.grey,
        padding: 15,
      }}
    >
      <ScrollView>
        <View style={{ flex: 1, gap: 10 }}>
          <Text style={{ color: colors.white }}>Menu</Text>
          <Icon.Button
            name="th"
            color={colors.black}
            backgroundColor={colors.green}
            underlayColor={colors.blacktint}
            onPress={() => {
              router.replace("/Admin/Home")
            }}
          >
            ภาพรวม
          </Icon.Button>
          <Icon.Button
            name="calendar"
            color={colors.black}
            backgroundColor={colors.green}
            underlayColor={colors.blacktint}
            onPress={() => {
              router.replace("/Admin/Schedule")
            }}
          >
            นัดซ่อมรถ
          </Icon.Button>
          <Icon.Button
            name="file-text"
            color={colors.black}
            backgroundColor={colors.green}
            underlayColor={colors.blacktint}
            onPress={() => {
              router.replace("/Admin/History")
            }}
          >
            ประวัติการซ่อม
          </Icon.Button>
          <Icon.Button
            name="gear"
            color={colors.black}
            backgroundColor={colors.green}
            underlayColor={colors.blacktint}
            onPress={() => {
              router.replace("/Admin/Setting")
            }}
          >
            ตั้งค่า
          </Icon.Button>
          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: 1,
            }}
          />
          <Text style={{ color: colors.white }}>Profile</Text>
          <Text style={{ color: colors.white }}>
            {storage.getString("UserName")}
          </Text>
          <Icon.Button
            name="arrow-left"
            color={colors.black}
            backgroundColor={colors.green}
            underlayColor={colors.blacktint}
            onPress={async () => {
              await removeToken()
              router.replace("/")
            }}
          >
            Logout
          </Icon.Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
