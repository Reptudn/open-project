import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory-native";

const data = [
  { x: "Tag 1", y: 70 },
  { x: "Tag 2", y: 71 },
  { x: "Tag 3", y: 69 },
  { x: "Tag 4", y: 72 },
  { x: "Tag 5", y: 70 },
];

export default function TableStats() {
	return (
	  <View style={styles.container}>
		<Text style={styles.title}>Gewichtstabelle</Text>
		<VictoryChart theme={VictoryTheme.material}>
		  <VictoryAxis
			label="Datum"
			tickFormat={data.map((d) => d.x)}
			style={{
			  axisLabel: { padding: 30, fill: "#FFFFFF" }, // Textfarbe für Label auf Weiß
			  tickLabels: { fontSize: 10, fill: "#FFFFFF" }, // Textfarbe für Tick-Labels auf Weiß
			}}
		  />
		  <VictoryAxis
			dependentAxis
			label="Gewicht (kg)"
			style={{
			  axisLabel: { padding: 40, fill: "#FFFFFF" }, // Textfarbe für Label auf Weiß
			  tickLabels: { fontSize: 10, fill: "#FFFFFF" }, // Textfarbe für Tick-Labels auf Weiß
			}}
		  />
		  <VictoryLine
			data={data}
			interpolation="monotoneX"
			style={{
			  data: { stroke: "#FFFFFF", strokeWidth: 2 },
			}}
		  />
		</VictoryChart>
	  </View>
	);
  }
  
const styles = StyleSheet.create({
container: {
	flex: 1,
	padding: 20,
	backgroundColor: "rgba(56, 182, 255, 0.5)", // Hintergrundfarbe mit 50% Transparenz
	borderRadius: 20,
},
title: {
	fontSize: 18,
	fontWeight: "bold",
	marginBottom: 20,
	textAlign: "center",
	color: "#fff", // Textfarbe des Titels auf Weiß
},
});