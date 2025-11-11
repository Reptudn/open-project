import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getThemeColor } from "@/constants/theme";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modalize } from "react-native-modalize";
import { useRef, useEffect, useState } from "react";
import { GymButtonMedium } from "@/components/ui/Button";
import { GymText, GymHeader } from "@/components/ui/Text";
import { addExercise } from "@/lib/api/workout/workoutInsert";
import { useAuthContext } from "@/hooks/use-auth-context";
import ExerciseFull from "@/components/training/exercises/ExerciseFull";

export let excerciseList: string[] = [];

export default function ExerciseInfo() {
  const modalizeRef = useRef<Modalize>(null);
  const theme = getThemeColor(useColorScheme());
  const { width, height } = Dimensions.get("window");
  const { name, overview, imageUrl, excerciseId, workoutId, exercise } =
	useLocalSearchParams();
  const exerciseT = JSON.parse(exercise as string) as Exercise;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { session } = useAuthContext();

  // Convert params to strings
  const exerciseName = Array.isArray(name) ? name[0] : name || "";
  const exerciseOverview = Array.isArray(overview)
	? overview[0]
	: overview || "";
  const exerciseImageUrl = Array.isArray(imageUrl)
	? imageUrl[0]
	: imageUrl || "";

  const workoutIdNumber = Array.isArray(workoutId)
	? Number(workoutId[0])
	: Number(workoutId);

  const exerciseIdString = Array.isArray(excerciseId)
	? String(excerciseId[0])
	: String(excerciseId);

  useEffect(() => {
	modalizeRef.current?.open();
  }, []);

  const handleModalClose = () => {
	setIsModalOpen(false);
	router.push({
	  pathname: "/(tabs)/training",
	  params: { workoutId: workoutId },
	});
  };

  return (
	<SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
	  <Modalize
		ref={modalizeRef}
		onClose={handleModalClose}
		modalHeight={height}
		modalStyle={{ backgroundColor: theme.background }}
		handleStyle={{ backgroundColor: theme.text }}
		handlePosition="inside"
	  >
		<ExerciseFull
		  exercise={exerciseT}
		  workoutId={workoutId as string}
		></ExerciseFull>
	  </Modalize>
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
	flexDirection: "row",
	justifyContent: "flex-end",
	marginBottom: 10,
  },
  closeButton: {
	width: 40,
	height: 40,
	borderRadius: 20,
	justifyContent: "center",
	alignItems: "center",
  },
  imageContainer: {
	alignItems: "center",
	marginBottom: 25,
  },
  exerciseImage: {
	width: "100%",
	height: 300,
	borderRadius: 15,
	borderWidth: 1,
  },
  descriptionContainer: {
	padding: 20,
	borderRadius: 15,
	marginBottom: 30,
  },
  buttonContainer: {
	flexDirection: "row",
	gap: 15,
	paddingTop: 20,
  },
  secondaryButton: {
	flex: 1,
	paddingVertical: 15,
	borderRadius: 12,
	borderWidth: 2,
	alignItems: "center",
	justifyContent: "center",
  },
  primaryButton: {
	flex: 1,
	paddingVertical: 15,
	borderRadius: 12,
	alignItems: "center",
	justifyContent: "center",
  },
});
