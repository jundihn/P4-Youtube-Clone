import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Image, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Search() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image
          source={require("../assets/youtube-logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.headerCenter}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 34,
    resizeMode: "contain",
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  searchInput: {
    flex: 1,
    height: 36,
    backgroundColor: "#f1f1f1",
    borderRadius: 18,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    padding: 5,
  },
});
