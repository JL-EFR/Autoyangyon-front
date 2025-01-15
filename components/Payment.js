import { TextInput, View, Text } from "react-native"
import { useState, useEffect } from "react"
import CheckBox from "@react-native-community/checkbox"
import Icon from "react-native-vector-icons/FontAwesome"
import colors from "../constants/colors"
import clone from "../function/clone"
import { QRcodeGenerate, ReturnCar, Pay } from "../script/api"
import QRCode from "react-native-qrcode-svg"

export default Payment = ({ detail, onHide, allJobs }) => {
  const [price, setPrice] = useState([])
  const [mode, setMode] = useState(1)
  const [type, setType] = useState(1)
  const [first, setFirst] = useState(0)
  const [qrValue, setQRValue] = useState("empty")

  const IDtoName = (id) => {
    for (const element of allJobs) {
      if (element._id == id) {
        return element.FixTitle
      }
    }
    return "not found"
  }

  const sum = (array) => {
    let ans = 0
    for (let i of array) {
      ans += i
    }
    return ans
  }

  useEffect(() => {
    let newPrice = []
    for (element of detail["Jobs"]) {
      newPrice = [...newPrice, element.Price]
    }
    setPrice([...newPrice])
  }, [])

  const fetchqr = async () => {
    if (mode === 2) {
      if (type === 2) {
        const payload = await QRcodeGenerate({ amount: first })
        setQRValue(payload.qrcode)
      } else {
        const payload = await QRcodeGenerate({ amount: sum(price) })
        setQRValue(payload.qrcode)
      }
    }
  }

  useEffect(() => {
    fetchqr()
  }, [qrValue, first, price, type, mode])

  const qrcondition = () => {
    return qrValue !== "empty" && mode === 2
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
        คิดเงิน
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
      <View style={{ flexDirection: "column" }}>
        {detail["Jobs"][0] &&
          detail["Jobs"].map((job, index) => {
            return (
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
                key={"payment" + index + job.JobID}
              >
                <Text style={{ fontSize: 16, color: colors.white }}>
                  {IDtoName(job.JobID)}
                </Text>
                {price[index] !== undefined && (
                  <TextInput
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: 5,
                      width: 100,
                      paddingHorizontal: 5,
                    }}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      let newPrice = clone(price)
                      if (text && text !== "") {
                        newPrice[index] = Number(text.replace(/[^0-9]/g, ""))
                      } else {
                        newPrice[index] = 0
                      }

                      setPrice([...newPrice])
                    }}
                    value={price[index].toString()}
                    editable={detail.Paid === undefined}
                  />
                )}
              </View>
            )
          })}
        <Text style={{ fontSize: 16, color: colors.white }}>
          รวม: {sum(price)}
        </Text>
        {detail.Paid && (
          <Text style={{ fontSize: 16, color: colors.white }}>
            จ่ายแล้ว: {detail.Paid}
          </Text>
        )}
      </View>
      <Text style={{ fontSize: 16, color: colors.white }}>
        หมายเหตุ: {detail["Remark"]}
      </Text>
      <Text style={{ fontSize: 16, color: colors.white }}>ช่องทางจ่ายเงิน</Text>
      <View style={{ justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CheckBox
              value={mode === 1}
              onChange={() => {
                setMode(1)
              }}
            />
            <Text style={{ fontSize: 16, color: colors.white }}>เงินสด</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CheckBox
              value={mode === 2}
              onChange={() => {
                setMode(2)
                fetchqr(1)
              }}
            />
            <Text style={{ fontSize: 16, color: colors.white }}>QRcode</Text>
          </View>
          <View style={{ borderColor: colors.black, borderWidth: 3 }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CheckBox
              value={type === 1}
              onChange={() => {
                setType(1)
              }}
            />
            <Text style={{ fontSize: 16, color: colors.white }}>จ่ายเต็ม</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CheckBox
              value={type === 2}
              onChange={() => {
                setType(2)
              }}
            />
            <Text style={{ fontSize: 16, color: colors.white }}>ผ่อนจ่าย</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignContent: "center",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {qrcondition() && <QRCode size={150} value={qrValue} />}
          {type === 2 && (
            <TextInput
              placeholder="จำนวนเงินที่จ่าย"
              value={first.toString()}
              keyboardType="numeric"
              style={{ backgroundColor: colors.white, padding: 10 }}
              onChangeText={(text) => {
                setFirst(Number(text.replace(/[^0-9]/g, "")))
              }}
            />
          )}
        </View>
        <Icon.Button
          name="check"
          backgroundColor={colors.green}
          onPress={() => {
            onHide()
            let paid = {}
            if (mode === 1) {
              paid.Method = "Cash"
            } else {
              paid.Method = "QRcode"
            }
            if (detail.Paid === undefined) {
              if (type === 2) {
                paid.Amount = first
              } else {
                paid.Amount = sum(price)
              }
            } else {
              if (type === 2) {
                paid.Amount = first
              } else {
                paid.Amount = sum(price) - detail.Paid
              }
            }

            let jobarray = []
            for (let i = 0; i < price.length; i++) {
              let newjob = {
                JobID: detail["Jobs"][i]["JobID"],
                Price: price[i],
              }
              jobarray.push(newjob)
            }
            if (detail.Paid === undefined) {
              const data = { _id: detail._id, data: jobarray, paid: paid }
              ReturnCar(data)
            } else {
              const data = { _id: detail._id, paid: paid }
              Pay(data)
            }
          }}
        >
          ยืนยันการรับเงิน
        </Icon.Button>
      </View>
    </View>
  )
}
