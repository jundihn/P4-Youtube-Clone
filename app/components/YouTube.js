import { Image } from "react-native";

export default function YouTube() {
  return (
    <Image
      source={require("../assets/youtube-logo.png")}
      style={{ width: 100, height: 30 }}
      resizeMode="contain"
    />
  );
}
