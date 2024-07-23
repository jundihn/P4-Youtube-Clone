import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LOGIN } from "../mutations/Auth";
import { AuthContext } from "../contexts/Auth";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, loading, error }] = useMutation(LOGIN);
  const authContext = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/youtube-logo.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          // navigation.navigate("Home");
          // console.log(username, password);
          const result = await login({
            variables: {
              login: {
                username,
                password,
              },
            },
          });
          //   console.log(result, "ahahhaha");
          await SecureStore.setItemAsync(
            "access_token",
            result.data.login.access_token
          );
          authContext.setIsSignedIn(true);
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={[styles.buttonText, styles.signUpButtonText]}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    height: 40,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#ff0000",
  },
  signUpButtonText: {
    color: "#fff",
  },
});
