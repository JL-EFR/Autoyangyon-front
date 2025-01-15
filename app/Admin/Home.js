import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import colors from "../../constants/colors"
import Table from "../../components/Table"
import RecForm from "../../components/RecForm"
import RecFormSch from "../../components/RecFormSch"
import EditForm from "../../components/EditForm"
import RetForm from "../../components/RetForm"
import Payment from "../../components/Payment"
import timeout from "../../function/timeout"
import { GetOverall, GetFixes } from "../../script/api"
import Icon from "react-native-vector-icons/FontAwesome"

export default Home = () => {
  const [clickID, setClickID] = useState("")
  const [mode, setMode] = useState(0)
  const [data, setData] = useState([])
  const [detail, setDetail] = useState({})
  const [jobs, setJobs] = useState([])
  const [ignore, setIgnore] = useState(false)

  const fetchdata = async () => {
    setIgnore(true)
    const overall = await GetOverall()
    let newdata = []
    let newdetail = {}
    for (let item of overall.Receiving) {
      newdata.push({ Plate: item.Plate, Status: "Receiving" })
      newdetail[item.Plate] = {
        ...item,
        Status: "Receiving",
        ...overall["CarsInfo"][item.Plate],
      }
    }
    for (let item of overall.Working) {
      newdata.push({ Plate: item.Plate, Status: "Working" })
      newdetail[item.Plate] = {
        ...item,
        Status: "Working",
        ...overall["CarsInfo"][item.Plate],
      }
    }
    for (let item of overall.Returning) {
      newdata.push({ Plate: item.Plate, Status: "Returning" })
      newdetail[item.Plate] = {
        ...item,
        Status: "Returning",
        ...overall["CarsInfo"][item.Plate],
      }
    }
    setDetail(newdetail)
    setData(newdata)
    const newjobs = await GetFixes()
    setJobs(newjobs.data)
  }

  useEffect(() => {
    if (!ignore) {
      fetchdata()
    }
  }, [jobs, ignore, data, detail])

  const changeID = (id) => {
    setClickID(id)
    if (id !== "") {
      if (detail[id]["Status"] === "Receiving") {
        setMode(2)
      }
      if (detail[id]["Status"] === "Working") {
        setMode(3)
      }
      if (detail[id]["Status"] === "Returning") {
        setMode(4)
      }
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
          <Text style={{ color: colors.white, fontSize: 20 }}>ภาพรวม</Text>
          {mode === 0 && (
            <>
              <Table
                data={data}
                header={["ป้ายทะเบียน", "สถานะ"]}
                click={changeID}
                id={"Plate"}
              />
              <Icon.Button
                name="plus"
                color={colors.black}
                backgroundColor={colors.green}
                underlayColor={colors.blacktint}
                onPress={() => setMode(1)}
              >
                รับรถ
              </Icon.Button>
            </>
          )}
          {mode === 1 && (
            <RecForm
              onHide={async () => {
                setMode(0)
                await timeout(500)
                fetchdata()
              }}
              allJobs={jobs}
            />
          )}
          {mode === 2 && (
            <RecFormSch
              onHide={async () => {
                changeID("")
                await timeout(500)
                fetchdata()
              }}
              detail={detail[clickID]}
              allJobs={jobs}
            />
          )}
          {mode === 3 && (
            <EditForm
              onHide={async () => {
                changeID("")
                await timeout(500)
                fetchdata()
              }}
              detail={detail[clickID]}
              allJobs={jobs}
            />
          )}
          {mode === 4 && (
            <RetForm
              onPayment={() => {
                setMode(5)
              }}
              onHide={async () => {
                changeID("")
                await timeout(500)
                fetchdata()
              }}
              detail={detail[clickID]}
              allJobs={jobs}
            />
          )}
          {mode === 5 && (
            <Payment
              onHide={async () => {
                changeID("")
                await timeout(500)
                fetchdata()
              }}
              detail={detail[clickID]}
              allJobs={jobs}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
