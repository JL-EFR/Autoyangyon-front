import { View, TextInput, Text, TouchableHighlight } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import colors from "../constants/colors"
import { RecFromSchedule } from "../script/api"
import { useState } from "react"
import { Picker } from "@react-native-picker/picker"

export default RecFormSch = ({ detail, onHide, allJobs }) => {
  const [mile, setMile] = useState(0)
  const [newEntry, setNewEntry] = useState("")
  const [selectedJobs, setSelectedJobs] = useState([])
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
        แบบการรับรถ
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
        {detail.Jobs[0] &&
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
        {!detail.Jobs[0] && (
          <View style={{ flexDirection: "column", flex: 2, rowGap: 5 }}>
            {selectedJobs[0] &&
              selectedJobs.map((job, index) => {
                return (
                  <TouchableHighlight
                    style={{ backgroundColor: colors.white, padding: 5 }}
                    key={job}
                    onPress={() => {
                      let newselectedJobs = clone(selectedJobs)
                      newselectedJobs[index] = newEntry
                      setSelectedJobs(newselectedJobs)
                      setNewEntry("empty")
                    }}
                  >
                    <Text style={{ color: colors.black }}>{IDtoName(job)}</Text>
                  </TouchableHighlight>
                )
              })}
            <Picker
              selectedValue={newEntry}
              style={{ backgroundColor: colors.white }}
              onValueChange={(itemValue) => {
                console.log(itemValue)
                setNewEntry(itemValue)
              }}
            >
              <Picker.Item label={"เลือกการซ่อม"} value={"empty"} />
              {allJobs[0] &&
                allJobs.map((job) => {
                  return (
                    <Picker.Item
                      label={job.FixTitle}
                      value={job._id}
                      key={"picker" + job._id}
                    />
                  )
                })}
            </Picker>
            <Icon.Button
              name="plus"
              color={colors.black}
              backgroundColor={colors.green}
              underlayColor={colors.blacktint}
              onPress={() => {
                setSelectedJobs([...selectedJobs, newEntry])
              }}
            >
              เพิ่มงาน
            </Icon.Button>
          </View>
        )}
      </View>
      <Text style={{ fontSize: 16, color: colors.white }}>
        หมายเหตุ: {detail["Remark"]}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, color: colors.white }}>เลขไมล์</Text>
        <TextInput
          value={mile.toString()}
          keyboardType="numeric"
          style={{
            backgroundColor: colors.white,
            borderRadius: 5,
            width: 150,
            paddingHorizontal: 5,
          }}
          onChangeText={(text) => {
            setMile(Number(text.replace(/[^0-9]/g, "")))
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      ></View>
      <Icon.Button
        name="plus"
        color={colors.black}
        backgroundColor={colors.green}
        underlayColor={colors.blacktint}
        onPress={() => {
          RecFromSchedule({ _id: detail._id, mile: mile, jobs: selectedJobs })
          onHide()
        }}
      >
        ยืนยันการรับรถ
      </Icon.Button>
      <Icon.Button
        name="minus"
        color={colors.white}
        backgroundColor={colors.red}
        underlayColor={colors.blacktint}
        onPress={onHide}
      >
        ยกเลิกการรับรถ
      </Icon.Button>
    </View>
  )
}
