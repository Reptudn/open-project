import { StyleSheet, View} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import GymView from "@/components/ui/GymView";
import { GymText } from "@/components/ui/Text";
import { getThemeColor } from "@/constants/theme";
import {
  getWorkoutExercises,
  getWorkouts,
} from "@/lib/api/workout/workoutSelecte";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";


export default function TrainingScreen() {
  const theme = getThemeColor(useColorScheme());
  const [test, setTest] = useState<Workout[]>([])
  
  useEffect(() => {
    const workouts = async () => {
      const { data, error } = await getWorkouts();
      if (error){
        alert('Didnt get workouts')
      }
      if (data)
        setTest(data)
    };
    workouts();
  },[])
  

  return (
    <GymView>
      <ScrollView>
         {test.length > 0 ? (
                    test.map((workout) => (
                      <GymText>{workout.name}</GymText>
                    ))
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <GymText>No exercises found.</GymText>
                    </View>
                  )}
      </ScrollView>
    </GymView>
  );
}
