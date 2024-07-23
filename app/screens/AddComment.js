import React, { useState } from "react";
import {
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT, GET_POST_BY_ID } from "../mutations/Post";

export default function AddCommentScreen() {
  const route = useRoute();
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation();
  const { loading, data, error, refetch } = useQuery(GET_POST_BY_ID, {
    variables: { id: postId },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      refetch();
      setComment("");
      setIsSubmitting(false);
      navigation.goBack();
    },
  });

  const handleComment = async () => {
    setIsSubmitting(true);
    try {
      await addComment({
        variables: {
          addComment: {
            postId,
            content: comment,
          },
        },
      });
    } catch (error) {
      Alert.alert("Error", error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>Comment</Text>
          <TextInput
            style={styles.input}
            placeholder="Comment here ..."
            value={comment}
            onChangeText={(text) => setComment(text)}
            multiline
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleComment}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? "Submitting..." : "Comment"}
            </Text>
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
  backButton: {
    alignSelf: "flex-start",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    minHeight: 50,
    borderColor: "#222",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
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
