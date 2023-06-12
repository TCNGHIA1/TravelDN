import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import Item from "./ItemLocation";
import {collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig.js";
export default function ListScreen() {
  const [fullData, setFullData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");

  useEffect(() => {
    const toRef = collection(FIREBASE_DB, "locations");
    const getLocations = onSnapshot(toRef, {
      next: (snapshot) => {
        const locations = [];
        snapshot.docs.forEach((doc) => {
          locations.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFullData(locations);
        setSearchData(locations);
      },
    });
    return ()=> getLocations()
  }, []);

  const handeSearch = (text) => {
    if (text) {
      const newData = fullData.filter((item) => {
        const itemData = item.ten ? item.ten.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchData(newData);
      setsearchQuery(text);
    } else {
      setSearchData(fullData);
      setsearchQuery(text);
    }
  };


  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        marginHorizontal: 12,
      }}
    >
      <View
        style={{
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        <TextInput
          placeholder="Bạn muốn đi đâu"
          value={searchQuery}
          onChangeText={(text) => handeSearch(text)}
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 10,
          }}
        ></TextInput>
      </View>
      {/* List locations */}
      <View style={{flex:1}}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 5,
        }}
      >
        Danh sách địa điểm
      </Text>
      {fullData.length> 0 && (
        <View style={{flex:1}}>
          <FlatList
        showsVerticalScrollIndicator={false}
        data={searchData}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item) => item.id}
      />
        </View>
      )}
      </View>
    </View>
  );
}
