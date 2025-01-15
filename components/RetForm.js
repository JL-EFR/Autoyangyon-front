import { View, Text } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import colors from "../constants/colors"

export default RetForm = ({ onPayment, detail, onHide, allJobs }) => {
  const IDtoName = (id) => {
    for (const element of allJobs) {
      if (element._id == id) {
        return element.FixTitle
      }
    }
    return "not found"
  }
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        margin: 15,
        backgroundColor: colors.lightgrey,
        padding: 15,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: colors.white,
        }}
      >
        แบบการคืนรถ
      </Text>
      <Text style={{ fontSize: 16, color: colors.white }}>
        ป้ายทะเบียน: {detail.Plate}
      </Text>
      <Text style={{ fontSize: 16, color: colors.white }}>
        ยี่ห้อ: {detail["Brand"]}
      </Text>
      <Text style={{ fontSize: 16, color: colors.white }}>
        รุ่น: {detail["Model"]}
      </Text>
      <Text style={{ fontSize: 16, color: colors.white }}>
        ปี: {detail["Year"]}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, color: colors.white }}>การซ่อม:</Text>
        <View style={{ flexDirection: "column" }}>
          {detail["Jobs"][0] &&
            detail["Jobs"].map((job) => {
              return (
                <Text
                  style={{ fontSize: 16, color: colors.white }}
                  key={job.JobID}
                >
                  {IDtoName(job.JobID)}
                </Text>
              )
            })}
        </View>
      </View>
      <Text style={{ fontSize: 16, color: colors.white }}>
        หมายเหตุ: {detail["Remark"]}
      </Text>
      <Icon.Button
        name="plus"
        color={colors.black}
        backgroundColor={colors.green}
        underlayColor={colors.blacktint}
        onPress={onPayment}
      >
        ยืนยันการคืนรถ
      </Icon.Button>
      <Icon.Button
        name="minus"
        color={colors.white}
        backgroundColor={colors.red}
        underlayColor={colors.blacktint}
        onPress={onHide}
      >
        ยกเลิกการคืนรถ
      </Icon.Button>
    </View>
  )
}
