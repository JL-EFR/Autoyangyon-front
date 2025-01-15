import { View, Text, Linking, TouchableHighlight } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import colors from "../constants/colors"

export default HistoryDetail = ({
  detail,
  onHide,
  allJobs,
  onPay = () => {},
}) => {
  const IDtoName = (id) => {
    for (const element of allJobs) {
      if (element._id == id) {
        return element.FixTitle
      }
    }
    return "not found"
  }
  console.log(typeof detail["Phone"])
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
        ข้อมูลการซ่อม
      </Text>
      <Text style={{ fontSize: 16, color: colors.white }}>
        ป้ายทะเบียน: {detail["Plate"]}
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
      <Text style={{ fontSize: 16, color: colors.white }}>
        เลขไมล์: {detail["Mile"]}
      </Text>
      <Text style={{ fontSize: 16, color: colors.white }}>
        วันที่: {detail["Date"]}
      </Text>
      {detail["Price"] && (
        <Text style={{ fontSize: 16, color: colors.white }}>
          ราคา: {detail["Price"]}
        </Text>
      )}
      <Text style={{ fontSize: 16, color: colors.white }}>
        ชื่อลูกค้า: {detail["UserName"]}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <Text style={{ fontSize: 16, color: colors.white }}>
          เบอร์โทรศัพท์:&nbsp;
        </Text>
        <TouchableHighlight
          underlayColor={colors.blacktint}
          style={{ borderRadius: 5 }}
          onPress={() => Linking.openURL(`tel:${detail["Phone"]}`)}
        >
          <Text style={{ fontSize: 16, color: colors.blue }}>
            {detail["Phone"] && detail["Phone"]}
          </Text>
        </TouchableHighlight>
      </View>
      <Icon.Button
        name="close"
        color={colors.black}
        backgroundColor={colors.red}
        underlayColor={colors.blacktint}
        onPress={onHide}
      >
        ปิดหน้าต่าง
      </Icon.Button>
      {detail["Paid"] && (
        <Icon.Button
          name="money"
          color={colors.black}
          backgroundColor={colors.green}
          underlayColor={colors.blacktint}
          onPress={onPay}
        >
          จ่ายเงิน
        </Icon.Button>
      )}
    </View>
  )
}
