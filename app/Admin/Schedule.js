import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import colors from "../../constants/colors"
import Table from "../../components/Table"
import DateDetail from "../../components/DateDetail"
import Detail from "../../components/Detail"
import Icon from "react-native-vector-icons/FontAwesome"
import NewSche from "../../components/NewSch"
import { GetFixes, GetCars, GetSchedule } from "../../script/api"
import months from "../../constants/months"
import timeout from "../../function/timeout"

const Schedule = () => {
  const [clickID, setClickID] = useState("")
  const [clickDate, setClickDate] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [hideMain, setHideMain] = useState(false)
  const [jobs, setJobs] = useState({})
  const [carInfo, setCarInfo] = useState({})
  const [detail, setDetail] = useState({})
  const [data, setData] = useState([])

  useEffect(() => {
    setHideMain(showAdd || clickID !== "" || clickDate !== "")
  }, [showAdd, clickID, hideMain, clickDate])

  const fetchdata = async () => {
    const newjobs = await GetFixes()
    setJobs(newjobs.data)
    const cars = await GetCars()
    let newcardetail = {}
    for (let i of cars.data) {
      newcardetail[i.Plate] = { ...i }
    }
    setCarInfo({ ...newcardetail })
    const allsch = await GetSchedule()
    let newdetail = {}
    for (let entry of allsch.data) {
      const date = new Date(entry.Date)
      const datestring = `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`
      if (!newdetail[datestring]) {
        newdetail[datestring] = {}
      }
      newdetail[datestring][entry.ScheduleDetail[0]["Plate"]] = {
        ...entry.ScheduleDetail[0],
      }
    }

    setDetail(newdetail)
    let tabledata = []
    for (let entry of Object.keys(newdetail)) {
      let newtabledata = {}
      newtabledata.Date = entry
      newtabledata.Amount = Object.keys(newdetail[entry]).length
      tabledata.push(newtabledata)
    }
    setData(tabledata)
  }

  useEffect(() => {
    fetchdata()
  }, [])

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
          <Text style={{ color: colors.white, fontSize: 20 }}>นัดซ่อมรถ</Text>
          {!hideMain && (
            <>
              <Table
                data={data}
                header={["วันที่", "จำนวนรถ"]}
                id={"Date"}
                click={setClickDate}
              />
              <Icon.Button
                name="plus"
                color={colors.black}
                backgroundColor={colors.green}
                underlayColor={colors.blacktint}
                onPress={() => setShowAdd(true)}
              >
                เพิ่มนัด
              </Icon.Button>
            </>
          )}
          {clickDate !== "" && clickID === "" && (
            <DateDetail
              date={clickDate}
              clickCar={setClickID}
              data={detail[clickDate]}
            />
          )}
          {clickID !== "" && (
            <Detail
              detail={detail[clickDate][clickID]}
              onHide={() => {
                setClickID("")
                setClickDate("")
              }}
              date={clickDate}
              carDetail={carInfo[clickID]}
              allJobs={jobs}
            />
          )}
          {showAdd && (
            <NewSche
              onHide={() => {
                setShowAdd(false)
                timeout(500)
                fetchdata()
              }}
              Cars={carInfo}
              allJobs={jobs}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Schedule
