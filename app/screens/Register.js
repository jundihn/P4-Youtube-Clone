import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { REGISTER } from "../mutations/Auth";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [register, { data, loading, error }] = useMutation(REGISTER);

  async function handleRegister() {
    try {
      const result = await register({
        variables: {
          register: {
            email,
            name,
            password,
            username,
          },
        },
      });

      // console.log(result.data.register);
      if (result.data.register) {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Input your email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Input your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Input your username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Input your password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
});
