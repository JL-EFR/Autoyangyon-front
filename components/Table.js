import { View, Text, TouchableWithoutFeedback } from "react-native"

export default Table = ({ data, header, click, id }) => {
  return (
    <View key={"table"}>
      <View style={{ flexDirection: "row" }}>
        {header[0] &&
          header.map((key) => {
            return (
              <View
                style={{
                  backgroundColor: colors.green,
                  flex: 1,
                  borderWidth: 0.5,
                  borderColor: colors.grey,
                  padding: 5,
                }}
                key={"header" + key}
              >
                <Text style={{ textAlign: "center", fontSize: 18 }}>{key}</Text>
              </View>
            )
          })}
      </View>
      {data[0] &&
        data.map((value, index) => {
          const localheader = Object.keys(data[0])
          return (
            <View style={{ flexDirection: "row" }} key={"row" + value[id]}>
              {localheader[0] &&
                localheader.map((k, i) => {
                  if (i < header.length) {
                    return (
                      <TouchableWithoutFeedback
                        key={value[id] + k}
                        onPress={() => {
                          click(value[id])
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: colors.white,
                            flex: 1,
                            borderWidth: 0.5,
                            borderColor: colors.grey,
                            padding: 5,
                          }}
                        >
                          <Text style={{ textAlign: "center", fontSize: 16 }}>
                            {value[k]}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  }
                  return <View key={value[id] + index}></View>
                })}
            </View>
          )
        })}
    </View>
  )
}
