import { Text, View, TouchableOpacity } from "react-native"
import colors from "../constants/colors"

export default DateDetail = ({ date, clickCar, data }) => {
  const header = Object.keys(data)
  return (
    <View
      style={{
        gap: 10,
        padding: 15,
        backgroundColor: colors.lightgrey,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 18, textAlign: "center", color: colors.white }}>
        {date}
      </Text>
      <View style={{ alignItems: "center", padding: 5, gap: 15 }}>
        {header[0] &&
          header.map((car) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.green,
                  borderRadius: 10,
                  padding: 15,
                }}
                key={car}
                onPress={() => {
                  clickCar(car)
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.white,
                    textAlign: "center",
                  }}
                >
                  {car}
                </Text>
              </TouchableOpacity>
            )
          })}
      </View>
    </View>
  )
}
