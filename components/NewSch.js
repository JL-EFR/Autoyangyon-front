import { View, Text, TextInput, TouchableHighlight } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import colors from "../constants/colors"
import { useState } from "react"
import { Picker } from "@react-native-picker/picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import clone from "../function/clone"
import months from "../constants/months"
import { PostSchedule } from "../script/api"

export default NewSch = ({ onHide, Cars, allJobs }) => {
  const [remark, setRemark] = useState("")
  const [carData, setCarData] = useState({})
  const [selectedPlate, setSelectedPlate] = useState("")
  const [selectedJobs, setSelectedJobs] = useState([])
  const [date, setDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [newEntry, setNewEntry] = useState("")

  const IDtoName = (id) => {
    for (const element of allJobs) {
      if (element._id == id) {
        return element.FixTitle
      }
    }
    return "not found"
  }

  return (
    <View>
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
          แบบการจองคิว
        </Text>
        <View>
          <Text style={{ fontSize: 16, color: colors.white }}>
            ป้ายทะเบียน:
          </Text>
          <Picker
            selectedValue={selectedPlate}
            onValueChange={(itemValue) => {
              setSelectedPlate(itemValue)
              setCarData({ ...Cars[itemValue] })
            }}
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              marginTop: 5,
            }}
          >
            <Picker.Item label={"เลือกป้ายทะเบียน"} value={""} />
            {Object.keys(Cars)[0] &&
              Object.keys(Cars).map((car) => {
                return <Picker.Item label={car} value={car} key={car} />
              })}
          </Picker>
        </View>
        <Text style={{ fontSize: 16, color: colors.white }}>
          ยี่ห้อ: {carData.Brand && carData.Brand}
        </Text>
        <Text style={{ fontSize: 16, color: colors.white }}>
          รุ่น: {carData.Model && carData.Model}
        </Text>
        <Text style={{ fontSize: 16, color: colors.white }}>
          ปี: {carData.Year && carData.Year}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, color: colors.white }}>การซ่อม:</Text>
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
          <View style={{ flexDirection: "column" }}></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, color: colors.white, flex: 1 }}>
            วันที่:
            {date &&
              " " +
                date.getDate() +
                " " +
                months[date.getMonth()] +
                " " +
                date.getFullYear()}
          </Text>
          <Icon.Button
            style={{ flex: 1 }}
            name="calendar"
            color={colors.black}
            backgroundColor={colors.green}
            underlayColor={colors.blacktint}
            onPress={() => {
              setShowCalendar(true)
            }}
          >
            เลือกวัน
          </Icon.Button>
          {showCalendar && (
            <DateTimePicker
              mode="date"
              timeZoneName={"Asia/Bangkok"}
              minimumDate={new Date()}
              onChange={(date) => {
                setDate(new Date(date.nativeEvent.timestamp))
                setShowCalendar(false)
              }}
              value={date}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, color: colors.white }}>หมายเหตุ:</Text>
          <TextInput
            style={{
              backgroundColor: colors.white,
              borderRadius: 5,
              width: 150,
              paddingHorizontal: 5,
            }}
            onChangeText={(text) => {
              setRemark(text)
            }}
            value={remark}
          />
        </View>
        <Text style={{ fontSize: 16, color: colors.white }}>
          ชื่อลูกค้า: {carData.UserName && carData.UserName}
        </Text>
        <Icon.Button
          name="plus"
          color={colors.black}
          backgroundColor={colors.green}
          underlayColor={colors.blacktint}
          onPress={() => {
            onHide()
            let newjobs = []
            for (let i of selectedJobs) {
              newjobs.push({ JobID: i, Price: 0 })
            }
            const apiitem = {
              data: {
                Plate: selectedPlate,
                Jobs: newjobs,
                Remark: remark,
              },
              date: date,
            }
            PostSchedule(apiitem)
          }}
        >
          ยืนยันการนัด
        </Icon.Button>
        <Icon.Button
          name="minus"
          color={colors.white}
          backgroundColor={colors.red}
          underlayColor={colors.blacktint}
          onPress={onHide}
        >
          ยกเลิกการนัด
        </Icon.Button>
      </View>
    </View>
  )
}
