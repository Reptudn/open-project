import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";

export default function Profile() {
  const [gender, setGender] = useState("");
  return (
    <View style={styles.topContainer}>
      <Text style={styles.infoText}>Enter your gender</Text>
      <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
        <RadioButton.Item label="Männlich" value="male" />
        <RadioButton.Item label="Weiblich" value="female" />
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  topContainer: {
    marginTop: "50%",
    gap: 15,
  },
  bottomContainer: {
    gap: 10,
  },
  input: {
    width: 352,
    height: 56.32,
    borderRadius: 17.6,
    borderWidth: 1,
    textAlign: "center",
    borderColor: "#d0d0c0",
    color: "#d0d0c0",
  },
  button: {
    backgroundColor: "#d0d0c0",
    width: 352,
    height: 56.32,
    borderRadius: 17.6,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    color: "#d0d0c0",
  },
  loginText: {
    color: "#242c40",
    fontWeight: "bold",
    fontSize: 16,
  },
});
