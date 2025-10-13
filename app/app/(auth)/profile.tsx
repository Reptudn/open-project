import { ThemeColors } from "@/constants/theme";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { registerProfile } from "@/lib/api/workoutTableUtils";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function Profile() {
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [items, setItems] = useState([
    { label: "Männlich", value: "male" },
    { label: "Weiblich", value: "female" },
    { label: "Divers", value: "diverse" },
  ]);
  const [date, setDate] = useState(new Date(2000, 0, 1)); // Standardwert
  const [show, setShow] = useState(false);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme === "dark");

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios"); // auf iOS bleibt es offen, auf Android schließt es
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  async function createProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) await registerProfile({ id: user?.id, gender: gender, weight_kg: Number.parseInt(weight), height_cm: Number.parseInt(height), birth_date: date });
    router.replace('/(tabs)');
  }
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.infoText}>Enter your gender</Text>
        <DropDownPicker
          open={open}
          value={gender}
          items={items}
          setOpen={setOpen}
          setValue={setGender}
          setItems={setItems}
          placeholder="Bitte auswählen..."
          style={styles.input}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={{ fontSize: 16 }}
          labelStyle={{
            color:
              colorScheme === "dark"
                ? ThemeColors.dark.text
                : ThemeColors.light.text,
          }}
        />
        <Text style={styles.infoText}>Birth Date</Text>
        <View style={styles.dateContainer}>
          <Text style={[styles.infoText, { fontSize: 30 }]}>
            {date.toLocaleDateString("de-DE")}
          </Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setShow(!show);
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>Date</Text>
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
            maximumDate={new Date()} // Keine zukünftigen Daten
          />
        )}
        <Text style={styles.infoText}>Height</Text>
        <TextInput
          style={styles.input}
          placeholder="starwars"
          value={height}
          onChangeText={setHeight}
          autoCapitalize={"none"}
        />
        <Text style={styles.infoText}>Weight</Text>
        <TextInput
          style={styles.input}
          placeholder="starwars"
          value={weight}
          onChangeText={setWeight}
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={createProfile}
          activeOpacity={0.7}
        >
          <Text style={styles.loginText}>Finish Registration</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      gap: 10,
    },
    topContainer: {
      marginTop: "50%",
      gap: 15,
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 2,
      borderColor: isDark
        ? ThemeColors.dark.borderTopColor
        : ThemeColors.light.borderTopColor,
      borderRadius: 17.6,
      backgroundColor: isDark
        ? ThemeColors.dark.borderTopColor
        : ThemeColors.light.borderTopColor,
    },
    input: {
      width: 352,
      height: 56.32,
      borderRadius: 17.6,
      borderWidth: 1,
      textAlign: "center",
      borderColor: isDark
        ? ThemeColors.dark.borderTopColor
        : ThemeColors.light.borderTopColor,
      color: isDark
        ? ThemeColors.dark.borderTopColor
        : ThemeColors.light.borderTopColor,
    },
    dateButton: {
      backgroundColor: isDark
        ? ThemeColors.dark.button
        : ThemeColors.light.button,
      height: 56.32,
      width: 56.32,
      borderRadius: 17.6,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      backgroundColor: isDark
        ? ThemeColors.dark.button
        : ThemeColors.light.button,
      width: 352,
      height: 56.32,
      borderRadius: 17.6,
      alignItems: "center",
      justifyContent: "center",
    },
    infoText: {
      color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
    },
    loginText: {
      color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
      fontWeight: "bold",
      fontSize: 16,
    },
    dropdownContainer: {
      borderColor: isDark
        ? ThemeColors.dark.borderTopColor
        : ThemeColors.light.borderTopColor,
      borderRadius: 17.6,
      width: 352,
    },
    selected: { marginTop: 15, fontSize: 16, fontStyle: "italic" },
  });
