import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { GET_USER, SEARCH_USER } from "../mutations/User";
import { FOLLOW_USER } from "../mutations/Follow"; 

export default function ProfileScreen() {
  const [isShowingFollowings, setIsShowingFollowings] = useState(true);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { loading, error, data, refetch: refetchUsers } = useQuery(GET_USER);
  const {
    loading: loadingSearch,
    data: dataSearch,
    error: errorSearch,
    refetch: refetchSearch,
  } = useQuery(SEARCH_USER, {
    variables: { username: searchTerm },
    skip: !isSearchActive,
  });

  const [followUser] = useMutation(FOLLOW_USER, {
    onCompleted: () => {
      Alert.alert("Success", "succes followed user!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetchUsers();
    }, [])
  );

  const user = data?.self;

  function handleSearch() {
    if (search) {
      setSearchTerm(search.toString());
      setIsSearchActive(true);
      refetchSearch();
    }
  }

  function handleFollow(userId) {
    followUser({
      variables: {
        newFollow: {
          followingId: userId,
        },
      },
    });
  }

  if (loading || loadingSearch) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (error) Alert.alert("Error", error.message);
  if (errorSearch) Alert.alert("Error", errorSearch.message);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.username}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Find user here..."
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={24} color="#0077b5" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.sectionContainer}>
            {loadingSearch && <ActivityIndicator size="large" />}
            {isSearchActive &&
              dataSearch &&
              dataSearch.searchUser.length === 0 && <Text>No users found</Text>}
            {isSearchActive &&
              dataSearch &&
              dataSearch.searchUser.length > 0 &&
              dataSearch.searchUser.map((user, index) => (
                <View key={index} style={styles.userContainer}>
                  <View style={styles.userInfo}>
                    <Text style={styles.otherName}>{user.name}</Text>
                    <Text style={styles.otherUsername}>{user.username}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleFollow(user._id)}
                    style={styles.followButton}
                  >
                    <Ionicons name="person-add" size={24} color="#0077b5" />
                  </TouchableOpacity>
                </View>
              ))}
            {!isSearchActive &&
              data &&
              data.users.map((user, index) => (
                <View key={index} style={styles.userContainer}>
                  <View style={styles.userInfo}>
                    <Text style={styles.otherName}>{user.name}</Text>
                    <Text style={styles.otherUsername}>{user.username}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleFollow(user._id)}
                    style={styles.followButton}
                  >
                    <Ionicons name="person-add" size={24} color="#0077b5" />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 0,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
    color: "gray",
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 0,
  },
  userInfo: {
    flex: 1,
  },
  otherName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  otherUsername: {
    fontSize: 14,
    color: "gray",
  },
  followButton: {
    padding: 10,
  },
});
