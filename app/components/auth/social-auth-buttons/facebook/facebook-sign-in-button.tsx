import { TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Text } from "@react-navigation/elements";
import signInWithProvider from "../../social-auth-provider";

export default function FacebookSignInButton() {
  return (
	<TouchableOpacity
	  onPress={async () => {
		await signInWithProvider("facebook");
	  }}
	  style={styles.button}
	  activeOpacity={0.8}
	>
	  <Image
		source={{
		  uri: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png",
		}}
		style={styles.image}
	  />
	  <Text style={styles.text}>Sign in with Facebook</Text>
	</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
	flexDirection: "row",
	alignItems: "center",
	backgroundColor: "#ffffff",
	borderWidth: 1,
	borderColor: "#dbdbdb",
	borderRadius: 4,
	paddingVertical: 10,
	paddingHorizontal: 15,
	justifyContent: "center",
	shadowColor: "#000",
	shadowOffset: { width: 0, height: 1 },
	shadowOpacity: 0.1,
	shadowRadius: 2,
	elevation: 2,
  },
  image: {
	width: 24,
	height: 24,
	marginRight: 10,
  },
  text: {
	fontSize: 16,
	color: "#757575",
	fontFamily: "Roboto-Regular",
	fontWeight: "500",
  },
});
