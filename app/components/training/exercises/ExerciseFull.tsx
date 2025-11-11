import { getThemeColor } from "@/constants/theme";
import { View, Text, useColorScheme, Image, ScrollView } from "react-native";
import ExerciseTag, { ExerciseTagType } from "./ExerciseTag";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState, useCallback } from "react";
import ExerciseItem from "./ExerciseItem";
import { supabase } from "@/lib/supabase";
import { GymHeader, GymTitle } from "@/components/ui/Text";

export default function ExerciseFull({
  exercise,
  workoutId,
}: {
  exercise: Exercise;
  workoutId: string;
}) {
  const theme = getThemeColor(useColorScheme());

  const [relatedExercises, setRelatedExercises] = useState<Exercise[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const player = useVideoPlayer(exercise.video_url || "", (player) => {
    player.loop = true;
    player.muted = false;
  });

  useEffect(() => {
    if (exercise.video_url) {
      player.play();
    }
  }, [exercise.video_url, player]);

  const fetchRelatedExercises = useCallback(async () => {
    if (
      !exercise.related_exercise_ids ||
      exercise.related_exercise_ids.length === 0
    ) {
      return;
    }

    try {
      setLoadingRelated(true);
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .in("exercise_id", exercise.related_exercise_ids);

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
  }, [exercise.related_exercise_ids]);

  useEffect(() => {
    fetchRelatedExercises();
  }, [fetchRelatedExercises]);

  return (
    <View className="p-10">
      <GymTitle style={{textAlign: "center", color: theme.text}}
      >
        {exercise.name}
      </GymTitle>
      <ScrollView
        style={{
          backgroundColor: theme.background,
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {exercise.video_url ? (
            <>
              <View style={{ marginBottom: 16 }}>
                <VideoView
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 12,
                  }}
                  player={player}
                  allowsPictureInPicture
                  contentFit="contain"
                />
              </View>
            </>
          ) : (
            <Image
              source={{ uri: exercise.image_url }}
              style={{
                width: "100%",
                height: 200,
                borderRadius: 12,
                marginVertical: 12,
              }}
              resizeMode="cover"
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {exercise.target_muscles &&
            exercise.target_muscles.length > 0 &&
            exercise.target_muscles.map((muscle, index) => (
              <ExerciseTag
                key={index}
                name={muscle.toLocaleUpperCase()}
                type={ExerciseTagType.MUSCLE_PRIMARY}
              />
            ))}
          {exercise.secondary_muscles &&
            exercise.secondary_muscles.length > 0 &&
            exercise.secondary_muscles.map((muscle, index) => (
              <ExerciseTag
                key={index}
                name={muscle.toLocaleUpperCase()}
                type={ExerciseTagType.MUSCLE_SECONDARY}
              />
            ))}
          {exercise.body_parts &&
            exercise.body_parts.length > 0 &&
            exercise.body_parts.map((part, index) => (
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
                  color: theme.text,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                Overview:
              </Text>
              <Text
                style={{
                  color: theme.text,
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
                  color: theme.text,
                  marginBottom: 8,
                }}
              >
                {step}
              </Text>
            ))
          ) : (
            <Text
              style={{
                color: theme.text,
              }}
            >
              No instructions available.
            </Text>
          )}
        </View>
        <View>
          {exercise.exercise_tips && exercise.exercise_tips.length > 0 && (
            <>
              <Text
                style={{
                  color: theme.text,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                Tips:
              </Text>
              {exercise.exercise_tips.map((tip, index) => (
                <Text
                  key={index}
                  style={{
                    color: theme.text,
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
                  color: theme.text,
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
                    color: theme.text,
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
          {exercise.related_exercise_ids &&
            exercise.related_exercise_ids.length > 0 && (
              <>
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "bold",
                    marginBottom: 8,
                  }}
                >
                  Related Exercises:
                </Text>
                {loadingRelated ? (
                  <Text
                    style={{
                      color: theme.text,
                      fontStyle: "italic",
                      marginBottom: 8,
                    }}
                  >
                    Loading related exercises...
                  </Text>
                ) : relatedExercises.length > 0 ? (
                  relatedExercises.map((relEx: Exercise) => (
                    <ExerciseItem
                      key={relEx.exercise_id || `related-${Math.random()}`}
                      exercise={relEx}
                      workoutId={workoutId}
                    />
                  ))
                ) : (
                  <Text
                    style={{
                      color: theme.text,
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
      </ScrollView>
    </View>
  );
}
