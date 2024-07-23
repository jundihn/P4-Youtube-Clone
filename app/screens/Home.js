import React, { useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../contexts/Auth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST, ADD_LIKE } from "../mutations/Post";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Search from "../components/Search";

export default function HomeScreen() {
  const navigation = useNavigation();

  const { loading, data, error, refetch } = useQuery(GET_POST);

  const [addLike] = useMutation(ADD_LIKE, { refetchQueries: [GET_POST] });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  function formatDate(date) {
    const dates = new Date(date.toString());

    return dates.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleLike(postId) {
    try {
      await addLike({
        variables: {
          userLiked: {
            postId,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(data);
  const renderPosts = () => {
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return data?.posts?.map((post) => (
      <View key={post._id} style={styles.imgContainer}>
        <Image source={{ uri: post.imgUrl }} style={styles.videoThumbnail} />
        <View style={styles.titleContainer}>
          <Text style={styles.Title}>{post.content}</Text>
          <View style={styles.iconContainer}>
            <Text style={styles.stats}>{post.likes.length}</Text>
            <TouchableOpacity>
              <Icon
                onPress={() => handleLike(post._id)}
                name="thumb-up"
                size={24}
                color="#000"
              />
            </TouchableOpacity>
            <Text style={styles.statsCom}>{post.comments.length}</Text>
            <TouchableOpacity
              onPress={() => {
                // console.log(post._id);
                navigation.navigate("Comments", {
                  postId: post._id,
                });
              }}
              style={styles.commentIcon}
            >
              <Icon name="comment" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.dateText}>{formatDate(post.createdAt)}</Text>
      </View>
    ));
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Search />
        <ScrollView style={styles.content}>{renderPosts()}</ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imgContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  videoThumbnail: {
    width: "100%",
    height: 220,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  Title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
  },
  commentIcon: {
    marginLeft: 10,
  },
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    backgroundColor: "#ffffff",
  },
  tabButton: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    color: "#000",
  },
  dateText: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginLeft: 12,
  },
  stats: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 80,
    marginTop: 7,
    marginRight: 5,
  },
  statsCom: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 7,
  },
});
