import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "../screens/Register";
import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/Home";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/Auth";
import * as SecureStore from "expo-secure-store";
import ButtonLogout from "../components/YouTube";
import AuthStack from "./AuthStack";
import BottomTab from "./BottomTab";
import AddCommentScreen from "../screens/AddComment";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function check(params) {
      const result = await SecureStore.getItemAsync("access_token");
      if (result) {
        authContext.setIsSignedIn(true);
      }
    }

    check();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authContext.isSignedIn ? (
          <>
            <Stack.Screen name="YouTube" component={BottomTab} />
            <Stack.Screen name="Comments" component={AddCommentScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
