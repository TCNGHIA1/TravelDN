import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import Item from "./ItemFood";
import { collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig.js";
export default function FoodScreen() {
  const [fullData, setFullData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  useEffect(() => {
    const toRef = collection(FIREBASE_DB, "foods");
    const getFoods = onSnapshot(toRef, {
      next: (snapshot) => {
        const foods = [];
        snapshot.docs.forEach((doc) => {
          foods.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFullData(foods);
        setSearchData(foods);
      },
    });
    return () => getFoods();
  }, []);

  //Tìm kiếm thông tin - tên
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
        margin: 10,
      }}
    >
      <View
        style={{
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        <TextInput
          placeholder="Bạn muốn ăn gì"
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
      <Text
        style={{
          fontSize: 20,
          marginBottom: 5,
        }}
      >
        Món ngon Đà thành
      </Text>
      {fullData.length > 0 && (
        <View>
          <FlatList
          horizontal={false}
          columnWrapperStyle={{ flexWrap: "wrap", flex: 1, marginTop: 5 }}
          showsVerticalScrollIndicator={false}
          data={searchData}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
        </View>
      )}
    </View>
  );
}
