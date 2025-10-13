import { ThemeColors } from "@/constants/theme";
import { View, Text, useColorScheme, Image, ScrollView } from "react-native";
import AddExerciseFull from "./AddExercise";
import ExerciseTag, { ExerciseTagType } from "./ExerciseTag";
import { Exercise } from "@/types/Exercise";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState, useCallback } from "react";
import ExerciseItem from "./ExerciseItem";
import { supabase } from "@/lib/supabase";

export default function ExerciseFull({ exercise }: { exercise: Exercise }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [relatedExercises, setRelatedExercises] = useState<Exercise[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const player = useVideoPlayer(exercise.videoUrl || "", (player) => {
    player.loop = true;
    player.muted = false;
  });

  useEffect(() => {
    if (exercise.videoUrl) {
      player.play();
    }
  }, [exercise.videoUrl, player]);

  const fetchRelatedExercises = useCallback(async () => {
    if (
      !exercise.relatedExerciseIds ||
      exercise.relatedExerciseIds.length === 0
    ) {
      return;
    }

    try {
      setLoadingRelated(true);
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .in("exercise_id", exercise.relatedExerciseIds);

      if (error) {
        console.error("Error fetching related exercises:", error);
        setRelatedExercises([]);
      } else if (data && data.length > 0) {
        setRelatedExercises(
          data.map((item) => ({
            exerciseId: item.exercise_id,
            exercise_id: item.exercise_id,
            name: item.name,
            videoUrl: item.video_url,
            imageUrl: item.image_url,
            bodyParts: item.body_parts,
            equipments: item.equipments,
            exerciseType: item.exercise_type,
            targetMuscles: item.target_muscles,
            secondaryMuscles: item.secondary_muscles,
            instructions: item.instructions,
            keywords: item.keywords,
            variations: item.variations,
            exerciseTips: item.exercise_tips,
            relatedExerciseIds: item.related_exercise_ids,
            overview: item.overview,
          })) as Exercise[]
        );
      } else {
        setRelatedExercises([]);
      }
    } catch (error) {
      console.error("Failed to fetch related exercises:", error);
      setRelatedExercises([]);
    } finally {
      setLoadingRelated(false);
    }
  }, [exercise.relatedExerciseIds]);

  useEffect(() => {
    fetchRelatedExercises();
  }, [fetchRelatedExercises]);

  return (
    <>
      <Text
        style={{
          color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
          marginVertical: 12,
        }}
      >
        {exercise.name}
      </Text>
      <ScrollView
        style={{
          backgroundColor: isDark
            ? ThemeColors.dark.background
            : ThemeColors.light.background,
        }}
        showsVerticalScrollIndicator={true}
      >
        <Image
          source={{ uri: exercise.imageUrl }}
          style={{
            width: "100%",
            height: 400,
            borderRadius: 12,
            marginVertical: 12,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {exercise.targetMuscles &&
            exercise.targetMuscles.length > 0 &&
            exercise.targetMuscles.map((muscle, index) => (
              <ExerciseTag
                key={index}
                name={muscle.toLocaleUpperCase()}
                type={ExerciseTagType.MUSCLE_PRIMARY}
              />
            ))}
          {exercise.secondaryMuscles &&
            exercise.secondaryMuscles.length > 0 &&
            exercise.secondaryMuscles.map((muscle, index) => (
              <ExerciseTag
                key={index}
                name={muscle.toLocaleUpperCase()}
                type={ExerciseTagType.MUSCLE_SECONDARY}
              />
            ))}
          {exercise.bodyParts &&
            exercise.bodyParts.length > 0 &&
            exercise.bodyParts.map((part, index) => (
              <ExerciseTag
                key={index}
                name={part.toLocaleUpperCase()}
                type={ExerciseTagType.BODYPART}
              />
            ))}
          {exercise.equipments &&
            exercise.equipments.length > 0 &&
            exercise.equipments.map((equipment, index) => (
              <ExerciseTag
                key={index}
                name={equipment.toLocaleUpperCase()}
                type={ExerciseTagType.EQUIPMENT}
              />
            ))}
        </View>
        <View>
          {exercise.overview ? (
            <>
              <Text
                style={{
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                Overview:
              </Text>
              <Text
                style={{
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                  marginBottom: 8,
                }}
              >
                {exercise.overview}
              </Text>
            </>
          ) : (
            <Text>No overview available.</Text>
          )}
        </View>
        <View>
          {exercise.instructions && exercise.instructions.length > 0 ? (
            exercise.instructions.map((step, index) => (
              <Text
                key={index}
                style={{
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                  marginBottom: 8,
                }}
              >
                {step}
              </Text>
            ))
          ) : (
            <Text
              style={{
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
              }}
            >
              No instructions available.
            </Text>
          )}
        </View>
        <View>
          {exercise.exerciseTips && exercise.exerciseTips.length > 0 && (
            <>
              <Text
                style={{
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                Tips:
              </Text>
              {exercise.exerciseTips.map((tip, index) => (
                <Text
                  key={index}
                  style={{
                    color: isDark
                      ? ThemeColors.dark.text
                      : ThemeColors.light.text,
                    marginBottom: 8,
                  }}
                >
                  {tip}
                </Text>
              ))}
            </>
          )}
        </View>
        <View>
          {exercise.variations && exercise.variations.length > 0 && (
            <>
              <Text
                style={{
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                Variations:
              </Text>
              {exercise.variations.map((variation, index) => (
                <Text
                  key={index}
                  style={{
                    color: isDark
                      ? ThemeColors.dark.text
                      : ThemeColors.light.text,
                    marginBottom: 8,
                  }}
                >
                  {variation}
                </Text>
              ))}
            </>
          )}
        </View>
        <View>
          {exercise.relatedExerciseIds &&
            exercise.relatedExerciseIds.length > 0 && (
              <>
                <Text
                  style={{
                    color: isDark
                      ? ThemeColors.dark.text
                      : ThemeColors.light.text,
                    fontWeight: "bold",
                    marginBottom: 8,
                  }}
                >
                  Related Exercises:
                </Text>
                {loadingRelated ? (
                  <Text
                    style={{
                      color: isDark
                        ? ThemeColors.dark.text
                        : ThemeColors.light.text,
                      fontStyle: "italic",
                      marginBottom: 8,
                    }}
                  >
                    Loading related exercises...
                  </Text>
                ) : relatedExercises.length > 0 ? (
                  relatedExercises.map((relEx: Exercise) => (
                    <ExerciseItem
                      key={relEx.exerciseId || `related-${Math.random()}`}
                      exercise={relEx}
                    />
                  ))
                ) : (
                  <Text
                    style={{
                      color: isDark
                        ? ThemeColors.dark.text
                        : ThemeColors.light.text,
                      fontStyle: "italic",
                      marginBottom: 8,
                    }}
                  >
                    No related exercises found.
                  </Text>
                )}
              </>
            )}
        </View>
        <View>
          {exercise.videoUrl && (
            <>
              <Text
                style={{
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                Video:
              </Text>
              <View style={{ marginBottom: 16 }}>
                <VideoView
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 12,
                    backgroundColor: isDark ? "#333" : "#f0f0f0",
                  }}
                  player={player}
                  allowsFullscreen
                  allowsPictureInPicture
                  contentFit="contain"
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <AddExerciseFull name={exercise.name} />
    </>
  );
}
