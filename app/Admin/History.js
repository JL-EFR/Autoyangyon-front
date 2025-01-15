import { View, Text, ScrollView, SafeAreaView } from "react-native"
import { useEffect, useState } from "react"
import Table from "../../components/Table"
import HistoryDetail from "../../components/HistoryDetail"
import { GetHistory, GetCars, GetFixes } from "../../script/api"
import months from "../../constants/months"
import Payment from "../../components/Payment"
import timeout from "../../function/timeout"
import { Picker } from "@react-native-picker/picker"

export default History = () => {
  const [clickID, setClickID] = useState("")
  const [data, setData] = useState([])
  const [detail, setDetail] = useState({})
  const [allJobs, setAllJobs] = useState([])
  const [mode, setMode] = useState(0)
  const [car, setCar] = useState("empty")
  const [carInfo, setCarInfo] = useState([])

  const sumprice = (jobs) => {
    let ans = 0
    for (let i of jobs) {
      ans += i.Price
    }
    return ans
  }
  const sumpaid = (paid) => {
    let ans = 0
    for (let i of paid) {
      ans += i.Amount
    }
    return ans
  }
  const fetchdata = async () => {
    const cars = await GetCars()
    let newcardetail = {}
    for (let i of cars.data) {
      newcardetail[i.Plate] = { ...i }
    }
    setCarInfo({ ...newcardetail })
    const response = await GetHistory()
    const jobs = await GetFixes()
    setAllJobs(jobs.data)
    let newdata = []
    let newdetail = {}
    for (let i of response.underpaid) {
      for (let car of cars["data"]) {
        if (car.Plate === i.Plate) {
          const date = new Date(i.Date)
          const dateformat =
            date.getDate() +
            " " +
            months[date.getMonth()] +
            " " +
            date.getFullYear()

          const newentry = {
            Date: dateformat,
            Plate: i.Plate,
            Status: "จ่ายไม่ครบ",
            _id: i._id,
          }
          newdetail[i._id] = {
            ...car,
            _id: i._id,
            Date: dateformat,
            Jobs: i.Jobs,
            Status: "จ่ายไม่ครบ",
            Price: sumprice(i.Jobs),
            Paid: sumpaid(i.Payment),
            Mile: i.Mile,
          }
          newdata.push(newentry)
          break
        }
      }
    }

    for (let i of response.finished) {
      for (let car of cars["data"]) {
        if (car.Plate === i.Plate) {
          const date = new Date(i.Date)
          const dateformat =
            date.getDate() +
            " " +
            months[date.getMonth()] +
            " " +
            date.getFullYear()

          const newentry = {
            Date: dateformat,
            Plate: i.Plate,
            Status: "เสร็จสิ้น",
            _id: i._id,
          }
          newdetail[i._id] = {
            ...car,
            Date: dateformat,
            Jobs: i.Jobs,
            Status: "เสร็จสิ้น",
            Price: sumprice(i.Jobs),
            Mile: i.Mile,
          }
          newdata.push(newentry)
          break
        }
      }
    }
    setDetail({ ...newdetail })
    setData([...newdata])
  }
  useEffect(() => {
    fetchdata()
  }, [])

  const changeMode = (cid, pay = false) => {
    if (pay) {
      setMode(2)
      return
    }
    setClickID(cid)
    if (cid !== "") {
      setMode(1)
    } else {
      setMode(0)
    }
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
      <ScrollView>
        <View style={{ flex: 1, gap: 10, margin: 15 }}>
          <Text style={{ color: colors.white, fontSize: 20 }}>
            ประวัติการซ่อม
          </Text>
          <Picker
            selectedValue={car}
            style={{ backgroundColor: colors.white }}
            onValueChange={(itemValue) => {
              setCar(itemValue)
            }}
          >
            <Picker.Item label={"เลือกรถ"} value={"empty"} />
            {Object.keys(carInfo)[0] &&
              Object.keys(carInfo).map((c) => {
                return <Picker.Item label={c} value={c} key={"picker" + c} />
              })}
          </Picker>
          {mode === 0 && (
            <Table
              data={data.filter(
                (entry) => car === "empty" || car === entry.Plate
              )}
              header={["วันที่", "ป้ายทะเบียน", "สถานะ"]}
              id={"_id"}
              click={changeMode}
            />
          )}
          {mode === 1 && (
            <HistoryDetail
              detail={detail[clickID]}
              onHide={() => changeMode("")}
              onPay={() => changeMode(clickID, true)}
              allJobs={allJobs}
            />
          )}
          {mode === 2 && (
            <Payment
              detail={detail[clickID]}
              onHide={async () => {
                changeMode("")
                await timeout(500)
                fetchdata()
              }}
              allJobs={allJobs}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
