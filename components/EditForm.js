import { View, Text, TouchableHighlight } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import colors from "../constants/colors"
import { useState } from "react"
import clone from "../function/clone"
import { Picker } from "@react-native-picker/picker"
import { EditWork, FinishWorking } from "../script/api"

export default EditForm = ({ detail, onHide, allJobs }) => {
  const [show, setShow] = useState(false)
  const [befEdit, setBefEdit] = useState([...detail["Jobs"]])
  const [edit, setEdit] = useState([...detail["Jobs"]])
  const [newEntry, setNewEntry] = useState("")

  console.log(detail["Jobs"])
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
        ข้อมูลการซ่อม
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
        <Text style={{ fontSize: 16, color: colors.white, flex: 1 }}>
          การซ่อม:
        </Text>
        {!show && (
          <View style={{ flexDirection: "column" }}>
            {edit[0] &&
              edit.map((job) => {
                return (
                  <Text
                    style={{ fontSize: 16, color: colors.white }}
                    key={job.JobID}
                  >
                    {IDtoName(job.JobID)}
                  </Text>
                )
              })}

            <Icon.Button
              name="pencil"
              color={colors.black}
              backgroundColor={colors.green}
              underlayColor={colors.blacktint}
              onPress={() => {
                setShow(true)
              }}
            >
              แก้ไข
            </Icon.Button>
          </View>
        )}
        {show && (
          <View style={{ flexDirection: "column", flex: 3 }}>
            {edit[0] &&
              edit.map((job, index) => {
                return (
                  <TouchableHighlight
                    style={{ backgroundColor: colors.white, padding: 5 }}
                    key={job.JobID}
                    onPress={() => {
                      let edited = clone(edit)
                      edited[index]["JobID"] = newEntry
                      setEdit(edited)
                      setNewEntry("empty")
                    }}
                  >
                    <Text style={{ color: colors.black }}>
                      {IDtoName(job.JobID)}
                    </Text>
                  </TouchableHighlight>
                )
              })}
            <Picker
              selectedValue={newEntry}
              onValueChange={(itemValue) => {
                setNewEntry(itemValue)
              }}
              style={{
                backgroundColor: colors.white,
                borderRadius: 10,
                marginTop: 5,
              }}
            >
              <Picker.Item label={"เลือกการซ่อม"} value={"empty"} />
              {allJobs[0] &&
                allJobs.map((j, i) => {
                  return (
                    <Picker.Item
                      label={j.FixTitle}
                      value={j._id}
                      key={j.JobID + i.toString}
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
                setEdit([...edit, { JobID: newEntry, Price: 0 }])
              }}
            >
              เพิ่ม
            </Icon.Button>
            <Icon.Button
              name="close"
              color={colors.black}
              backgroundColor={colors.red}
              underlayColor={colors.blacktint}
              onPress={() => {
                setShow(false)
                setEdit({ data: clone(befEdit), _id: detail._id })
                setNewEntry("empty")
              }}
            >
              ยกเลิกแก้ไข
            </Icon.Button>
            <Icon.Button
              name="check"
              color={colors.black}
              backgroundColor={colors.green}
              underlayColor={colors.blacktint}
              onPress={() => {
                setShow(false)
                setBefEdit(clone(edit))
                const editdata = { data: clone(edit), _id: detail._id }
                console.log(editdata)
                EditWork(editdata)
                setNewEntry("empty")
              }}
            >
              ยืนยันแก้ไข
            </Icon.Button>
          </View>
        )}
      </View>
      <Text style={{ fontSize: 16, color: colors.white }}>
        หมายเหตุ: {detail["Remark"]}
      </Text>
      <Text style={{ fontSize: 16, color: colors.white }}>
        เลขไมล์: {detail["Mile"]}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      ></View>
      <Icon.Button
        name="close"
        color={colors.white}
        backgroundColor={colors.red}
        underlayColor={colors.blacktint}
        onPress={onHide}
      >
        ปิดหน้าต่าง
      </Icon.Button>
      <Icon.Button
        name="check"
        color={colors.white}
        backgroundColor={colors.green}
        underlayColor={colors.blacktint}
        onPress={() => {
          FinishWorking({ _id: detail._id })
          onHide()
        }}
      >
        ซ่อมเสร็จสิ้น
      </Icon.Button>
    </View>
  )
}
