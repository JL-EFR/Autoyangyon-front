import { View, Text, ScrollView, SafeAreaView, TextInput } from "react-native"
import { useEffect, useState } from "react"
import colors from "../../constants/colors"
import Icon from "react-native-vector-icons/FontAwesome"
import DragList from "react-native-draglist"
import clone from "../../function/clone"
import { EditProfile, GetFixes, Profile, EditFixes } from "../../script/api"

export default Setting = () => {
  const [name, setName] = useState("")
  const [savedName, setSavedName] = useState("")
  const [phone, setPhone] = useState("")
  const [savedPhone, setSavedPhone] = useState("")
  const [showEdit, setShowEdit] = useState(false)
  const [showList, setShowList] = useState(false)
  const [list, setList] = useState([])
  const [newID, setNewID] = useState(1)
  const [savedList, setSavedList] = useState([])

  const fetchdata = async () => {
    const newfix = await GetFixes()
    const pro = await Profile()
    setList([...newfix.data])
    setSavedList([...newfix.data])
    setName(pro.data.UserName)
    setSavedName(pro.data.UserName)
    setSavedPhone(pro.data.Phone)
    setPhone(pro.data.Phone)
  }

  useEffect(() => {
    fetchdata()
  }, [])

  async function onReordered(fromIndex, toIndex) {
    const copy = clone(list)
    const removed = copy.splice(fromIndex, 1)

    copy.splice(toIndex, 0, removed[0])
    setList(copy)
  }

  function renderItem(info) {
    const { item, onDragStart, onDragEnd } = info

    return (
      <TextInput
        key={item._id}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
        value={item.FixTitle}
        style={{
          backgroundColor: colors.white,
          borderRadius: 5,
          margin: 5,
          paddingHorizontal: 10,
        }}
        onChangeText={(text) => {
          let i = 0
          while (item._id !== list[i]._id && i < list.length) {
            i++
          }
          let copy = clone(list)
          copy[i]["FixTitle"] = text
          setList([...copy])
        }}
      />
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        width: "auto",
        backgroundColor: colors.grey,
      }}
    >
      {!showList && (
        <ScrollView>
          <View style={{ flex: 1, gap: 10, margin: 15 }}>
            <Text style={{ color: colors.white, fontSize: 20 }}>
              การตั้งค่า
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: colors.white, fontSize: 18 }}>
                ชื่อ: {name && !showEdit && name}
              </Text>
              {showEdit && (
                <TextInput
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: 5,
                    width: 150,
                    paddingHorizontal: 5,
                  }}
                  onChangeText={(text) => {
                    setName(text)
                  }}
                  value={name}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: colors.white, fontSize: 18 }}>
                เบอร์โทรศัพท์: {phone && !showEdit && phone}
              </Text>
              {showEdit && (
                <TextInput
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: 5,
                    width: 150,
                    paddingHorizontal: 5,
                  }}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setPhone(text.replace(/[^0-9]/g, ""))
                  }}
                  value={phone}
                />
              )}
            </View>
            {!showEdit && (
              <View>
                <Icon.Button
                  name="pencil"
                  backgroundColor={colors.green}
                  onPress={() => {
                    setShowEdit(true)
                  }}
                >
                  แก้ไขข้อมูล
                </Icon.Button>
              </View>
            )}
            {showEdit && (
              <View>
                <Icon.Button
                  name="check"
                  backgroundColor={colors.green}
                  onPress={() => {
                    setSavedPhone(phone)
                    setSavedName(name)
                    setShowEdit(false)
                    EditProfile({ username: name, phone: phone })
                  }}
                >
                  ยืนยัน
                </Icon.Button>
                <Icon.Button
                  name="close"
                  backgroundColor={colors.red}
                  onPress={() => {
                    setPhone(savedPhone)
                    setName(savedName)
                    setShowEdit(false)
                  }}
                >
                  ยกเลิก
                </Icon.Button>
              </View>
            )}
            <View style={{ borderWidth: 1, borderColor: colors.black }}></View>
            <Icon.Button
              name="wrench"
              backgroundColor={colors.green}
              onPress={() => {
                setShowList(true)
              }}
            >
              รายการรูปแบบการซ่อม
            </Icon.Button>
          </View>
        </ScrollView>
      )}
      {showList && (
        <View
          style={{
            backgroundColor: colors.lightgrey,
            borderRadius: 10,
            gap: 10,
            padding: 15,
          }}
        >
          <DragList
            data={list}
            keyExtractor={(item) => {
              return item._id
            }}
            onReordered={onReordered}
            renderItem={renderItem}
          />
          <Icon.Button
            name="plus"
            backgroundColor={colors.green}
            onPress={() => {
              const id = "newobject" + newID.toString()
              const newobject = {
                _id: id,
                FixTitle: "กรุณาเขียน",
                Order: list.length,
              }
              setList([...list, newobject])
              setNewID(newID + 1)
            }}
          >
            เพิ่มงานใหม่
          </Icon.Button>
          <Icon.Button
            name="check"
            backgroundColor={colors.green}
            onPress={() => {
              setShowList(false)
              setSavedList(clone(list))
              let int = 1
              let newfix = []

              for (let i of list) {
                let entry = {
                  FixTitle: i.FixTitle,
                  Order: int,
                }
                if (i._id.includes("newobject")) {
                  entry._id = "empty"
                } else {
                  entry._id = i._id
                }
                int++
                newfix.push(entry)
              }
              EditFixes({ data: newfix })
            }}
          >
            แก้ไขรายการ
          </Icon.Button>
          <Icon.Button
            name="close"
            backgroundColor={colors.red}
            onPress={() => {
              setShowList(false)
              setList(clone(savedList))
            }}
          >
            ยกเลิกการแก้ไข
          </Icon.Button>
        </View>
      )}
    </SafeAreaView>
  )
}
