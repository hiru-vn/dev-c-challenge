import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    bg: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    weatherContainer: {
      padding: 20,
      width: "90%",
      borderWidth: 1,
      maxWidth: "90%",
      minHeight: "20%",
      marginTop: "2%",
      borderRadius: 25,
      marginBottom: "2%",
      borderColor: "white",
      backgroundColor: "rgba(0,0,0,0.4)"
    },
    text: {
      fontSize: 20,
      color: "white",
      marginLeft: 10,
      fontWeight: "bold"
    },
    row: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center"
    },
    cityContainer: {
      flex: 1,
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-around"
    },
    cityName: {
      fontSize: 12,
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    cityButton: {
      margin: 3,
      height: 40,
      padding: 3,
      width: "25%",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "white",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.5)"
    },
    tempRow: {
      alignSelf: "center",
      flexDirection: "row"
    },
    locationText: {
      fontSize: 25,
      color: "white",
      marginLeft: 10,
      fontWeight: "bold",
      textDecorationLine: "underline"
    },
    loading: {
      position: 'absolute',
      alignSelf: 'center',
      top: '50%',
    },
    currentLocation: {
      margin: 3,
      height: 40,
      padding: 3,
      width: "72.5%",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "white",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(20,33,61,0.6)"
    },
  });