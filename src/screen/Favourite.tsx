import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View,Dimensions } from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const { width } = Dimensions.get("window"); 

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

const Favourite: React.FC=()=> {
    const [repos, setRepos] = useState<Repo[]>([]); 
    const FavouritePost = useSelector((state: RootState) => state.FavouritePost.FavouritePost);

    useEffect(()=>{
    setRepos(FavouritePost)
    },[])

    if(repos.length==0){
      return <View style={styles.empty}><Text style={styles.emptyText}>No Favourites !</Text></View>
    }

  return (
    <GestureHandlerRootView>
    <View style={styles.container}>
    
      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
            <View style={styles.details}>
              <Text style={styles.repoName}>{item.full_name}</Text>
              <Text style={styles.description}>{item.description || "No description available"}</Text>
              <Text style={styles.info}>👤 {item.owner.login}</Text>
              <Text style={styles.info}>🌍 {item.language || "Not Specified"}</Text>
              <Text style={styles.info}>Star {item.stargazers_count}      |      Fork {item.forks}</Text>
              <Text style={styles.date}>📅 Created: {new Date(item.created_at).toDateString()}</Text>
              <Text style={styles.date}>🕒 Updated: {new Date(item.updated_at).toDateString()}</Text>
            </View>
          </View>
        )}
      />
    </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    //marginBottom: 5,
    marginTop: 40,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  repoName: {
    fontSize: width > 380 ? 18 : 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  info: {
    fontSize: 14,
    color: "#777",
    marginTop: 3,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  empty:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:50
  },
  emptyText:{
    fontSize:20,
    fontWeight:'500',
    fontFamily: 'sans-serif',
  }
});

export default Favourite;