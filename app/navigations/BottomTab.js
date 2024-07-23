import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import YouTube from "../components/YouTube";
import HomeScreen from "../screens/Home";
import { TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import AddPostScreen from "../screens/AddPost";
import UserScreen from "../screens/User";

const Tab = createBottomTabNavigator();

export default function BottomTab({ navigation }) {
  const authContext = useContext(AuthContext);

  async function handleLogout() {
    await SecureStore.deleteItemAsync("access_token");
    authContext.setIsSignedIn(false);
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitle: <YouTube />,
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
            <Ionicons name="log-out-outline" size={28} color="#ff0000" />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: "#ff0000",
        tabBarInactiveTintColor: "#222",
        tabBarIcon: ({ color, size }) => {
          let nameIcon;

          switch (route.name) {
            case "Home":
              nameIcon = "home";
              break;
            case "Post":
              nameIcon = "add-circle";
              break;
            case "User":
              nameIcon = "person";
              break;
          }

          return <Ionicons name={nameIcon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Post" component={AddPostScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}
