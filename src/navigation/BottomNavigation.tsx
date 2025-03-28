import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from './AppNavigation'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type BottomNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const BottomNavigation: React.FC<BottomNavigationProps>=({navigation})=> {
  return (
    <View style={Styles.container}>
      <TouchableOpacity style={Styles.tab} onPress={()=>navigation.navigate('Home')}>
        <Text style={Styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.tab} onPress={()=>navigation.navigate('Favourite')}>
        <Text style={Styles.text}>Favourites</Text>
      </TouchableOpacity>
    </View>
  )
}

const Styles= StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  tab: {
    flex: 1, 
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
})

export default BottomNavigation;