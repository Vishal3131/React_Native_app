

import axios from 'axios';
import { useState } from 'react';
import { Button, StyleSheet,Text, TextInput, View ,FlatList, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeScreenProps } from '../navigation/AppNavigation';
import BottomNavigation from '../navigation/BottomNavigation';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchRepos } from '../redux/repoSlice';
const { width, height } = Dimensions.get('window');
  
interface Repo {
  id: number;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  language: string;
  forks: number;
  stargazers_count: number;
  created_at: string;
  updated_at: string;
}

 const Home: React.FC<HomeScreenProps> = ({navigation}) =>{
   const [query, setQuery] = useState("");
    const { posts, loading, error } = useAppSelector((state) => state.posts);
    const dispatch= useAppDispatch()

  const handlePress = async() => {
    dispatch(fetchRepos(query))
  };

  const handleNavigate=(id:number)=>{
    navigation.navigate("Details", { id });
  }
  return (
    <>
    <View style={styles.container}>
      
      <TextInput
        style={ styles.textInput }
        placeholder="Search..."
        value={query}
        onChangeText={(value) => setQuery(value)}
        />
         <Button  title="Search" onPress={handlePress} />
         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

             {loading && <ActivityIndicator size="large" color="#007AFF" />}
             {error && (
               <View>
                 <Text style={{ color: "red" }}>{error}</Text>
               </View>
             )}
           </View>
 
        <FlatList
               data={posts}
               keyExtractor={(item) => item.id.toString()}
               renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleNavigate(item.id)}>
                <View style={styles.cart}>
                   <Text style={{fontWeight:500, fontFamily:'sans-serif'}}>{item.full_name}</Text>
                </View>
                </TouchableOpacity>
               )}
           />

    </View>
          <BottomNavigation navigation={navigation}/>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop:50,
    // justifyContent: 'center',
    padding:10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  textarea:{
    flexDirection: "row"
  },
  textInput: {
    fontFamily: 'sans-serif',
    fontWeight: '500',
    height: height * 0.05,
    width: width * 0.9, 
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: height * 0.02, 
    paddingHorizontal: width * 0.03, 
    fontSize: width * 0.045, 
  },
  cart:{
     marginTop:20,
     borderColor:'grey',
     borderWidth:1,
     padding:10,
     borderRadius:8,
     backgroundColor:'#fff',
     shadowColor: "#000",
     shadowOffset: { width: 0, height: 4 },
     shadowOpacity: 0.3,
     shadowRadius: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;