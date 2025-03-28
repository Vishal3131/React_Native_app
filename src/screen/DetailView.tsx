import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, Button, Alert } from "react-native";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window"); 

import { DetailsScreenProps, RootStackParamList } from "../navigation/AppNavigation";
import {RouteProp, useRoute } from "@react-navigation/native";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/FavouriteSlice";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

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

const DetailView: React.FC<DetailsScreenProps> = ({navigation}) => {
  const [repos, setRepos] = useState<Repo[]>([]); 
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch= useDispatch()

  const route = useRoute<DetailsScreenRouteProp>();
  const { id } = route.params;

  useEffect(() => {
     filterRepo(id)
  }, []);

const filterRepo=(userId:number)=>{
   const newPost= posts.filter((val)=> val?.id === userId)
   setRepos(newPost)
}

 const handlePress=(data:Repo)=>{
  setIsFavorite(true)
  dispatch(addItem(data))
 }



  return (
    <View style={styles.container}>
      <Button  title="Mark as Favourite" onPress={()=>handlePress(repos[0])} />
      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
               style={styles.favoriteIcon}
               
                >
               <MaterialIcons
                 name={isFavorite ? "favorite" : "favorite-border"}
                 size={24}
                 color={isFavorite ? "red" : "gray"}
               />
             </TouchableOpacity>
            <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
            <View style={styles.details}>
              <Text style={styles.repoName}>{item.full_name}</Text>
              <Text style={styles.description}>{item.description || "No description available"}</Text>
              <Text style={styles.info}>👤 {item.owner.login}</Text>
              <Text style={styles.info}>🌍 {item.language || "Not Specified"}</Text>
              <Text style={styles.info}>Star: {item.stargazers_count}      |      Fork: {item.forks}</Text>
              <Text style={styles.date}>📅 Created: {new Date(item.created_at).toDateString()}</Text>
              <Text style={styles.date}>🕒 Updated: {new Date(item.updated_at).toDateString()}</Text>
            </View>
          </View>
        )}
      />

      
    </View>
   
  );
};

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
    marginBottom: 10,
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

  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default DetailView;
