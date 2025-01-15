import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import colors from "../constants/colors"
import { Camera } from "expo-camera"
import { useState } from "react"
import { Picker } from "@react-native-picker/picker"
import clone from "../function/clone"
import { RecFromScratch, LPR } from "../script/api"
import * as ImageManipulator from "expo-image-manipulator"

export default RecForm = ({ onHide, allJobs }) => {
  let camera
  const [remark, setRemark] = useState("")
  const [lprData, setLprData] = useState({})
  const [mile, setMile] = useState(0)
  const [selectedJobs, setSelectedJobs] = useState([])
  const [startCamera, setStartCamera] = useState(false)
  const [newEntry, setNewEntry] = useState("")
  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === "granted") {
      // start the camera
      setStartCamera(true)
    } else {
      Alert.alert("Access denied")
    }
  }

  const __takePicture = async () => {
    const photo = await camera.takePictureAsync((options = { quality: 0 }))
    setStartCamera(false)
    const manipResult = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 480, height: 640 } }],
      {
        compress: 1,
        base64: true,
      }
    )
    const response = await LPR({ image: manipResult.base64 })
    if (response.carinfo) {
      setLprData(response.carinfo)
    } else {
      CreateAlertInvalidPhoto({ code: response.code, plate: response["plate"] })
    }
  }

  const IDtoName = (id) => {
    for (const element of allJobs) {
      if (element._id == id) {
        return element.FixTitle
      }
    }
    return "not found"
  }

  const CreateAlertNeedData = () => {
    Alert.alert("กรอกข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบ", [{ text: "OK" }])
  }

  const CreateAlertInvalidPhoto = (info) => {
    if (info.code === "image error") {
      Alert.alert("กรุณาถ่ายรูปอีกครั้ง", "", [{ text: "OK" }])
    } else {
      Alert.alert(`ไม่พบข้อมูลของ ${info.plate}`, "", [{ text: "OK" }])
    }
  }

  const checkJobs = () => {
    let count = 0
    for (let i of selectedJobs) {
      if (i === "empty") {
        count++
      }
    }
    return count !== selectedJobs.length
  }

  return (
    <View>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            height: 500,
          }}
        >
          <Camera
            type={Camera.Constants.Type.back}
            flashMode="off"
            style={{ flex: 1 }}
            ref={(r) => {
              camera = r
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: colors.transparent,
                flexDirection: "column",
                justifyContent: "flex-end",
                borderWidth: 5,
              }}
            >
              <View style={{ flex: 5 }}></View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.transparent,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={__takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    borderWidth: 5,
                    backgroundColor: colors.white,
                  }}
                />
              </View>
            </View>
          </Camera>
        </View>
      ) : (
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
          <View>
            <Text style={{ fontSize: 16, color: colors.white }}>
              ป้ายทะเบียน: {lprData.Plate && lprData.Plate}
            </Text>
            {!lprData.Plate && (
              <Icon.Button
                name="camera"
                backgroundColor={colors.transparent}
                underlayColor={colors.blacktint}
                color={colors.white}
                onPress={__startCamera}
              >
                ถ่ายรูป
              </Icon.Button>
            )}
          </View>
          <Text style={{ fontSize: 16, color: colors.white }}>
            ยี่ห้อ: {lprData.Brand && lprData.Brand}
          </Text>
          <Text style={{ fontSize: 16, color: colors.white }}>
            รุ่น: {lprData.Model && lprData.Model}
          </Text>
          <Text style={{ fontSize: 16, color: colors.white }}>
            ปี: {lprData.Year && lprData.Year}
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
                      <Text style={{ color: colors.black }}>
                        {IDtoName(job)}
                      </Text>
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
              console.log()
              if (lprData.Plate && checkJobs()) {
                let jobslist = []
                for (let i of selectedJobs) {
                  jobslist.push({ JobID: i, Price: 0 })
                }
                const newrec = {
                  data: {
                    Plate: lprData.Plate,
                    Jobs: jobslist,
                    Remark: remark,
                    Mile: mile,
                  },
                }
                RecFromScratch(newrec)
                onHide()
              } else {
                CreateAlertNeedData()
              }
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
      )}
    </View>
  )
}
