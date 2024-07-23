import { useMutation } from "@apollo/client";
import { useState } from "react";
import { TextInput, TouchableOpacity, Text } from "react-native";
import { SafeAreaView, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ADD_POST, GET_POST } from "../mutations/Post";

export default function AddPostScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");

  const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [GET_POST],
  });

  async function handlePost() {
    try {
      const result = await addPost({
        variables: {
          newPosts: {
            content,
            imgUrl,
            tags,
          },
        },
      });

      if (result) {
        Alert.alert("Post Created Successfully");
        navigation.navigate("Home");
      }

      setContent("");
      setImgUrl("");
      setTags("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.header}>Create a New Post</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Content Post"
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={10}
          />
          <TextInput
            style={styles.input}
            placeholder="Image Url"
            value={imgUrl}
            onChangeText={setImgUrl}
          />
          <TextInput
            style={styles.input}
            placeholder="Tags"
            value={tags}
            onChangeText={setTags}
          />
          <TouchableOpacity style={styles.button} onPress={handlePost}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
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
  scrollViewContainer: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#222",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
