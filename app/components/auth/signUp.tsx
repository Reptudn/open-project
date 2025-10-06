import { signUpUser } from "@/lib/authUser";
import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

// Login
const [email, setEmail] = useState("");
const [pass, setPass] = useState("");
const [confirmPass, setConfirm] = useState("");

const checkSignUp = async () => {
	if (!email || !pass) {
		alert("You need to fill email and password!");
	}
	else {
		const data = await signUpUser(email, pass);
		alert(data);
	}
};
const googleSignUp = async () => {

};

export function signUpPage() {
  return (
    <View style={[login.container]}>
      <TextInput 
        style={login.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}/>
      <TextInput 
        style={login.input}
        placeholder="Password"
        value={pass}
        onChangeText={setPass}/>
      <TextInput 
        style={login.input}
        placeholder="Confirm Password"
        value={confirmPass}
        onChangeText={setConfirm}/>
      <Button
        title="Sign Up"
        onPress={checkSignUp}/>
      <Button
        title="Continue with Google"
        onPress={googleSignUp}/>
      <Button
        title="Continue with Apple"
        onPress={googleSignUp}/>
      <Button
        title="Continue with Facebook"
        onPress={googleSignUp}/>
    </View>
  );
}

const login = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: "20",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#d0d0c0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});