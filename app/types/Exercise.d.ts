/*
{
  "exerciseId": "exr_41n2hTs4q3ihihZs",
  "name": "Seated Calf Raise",
  "imageUrl": "https://cdn.exercisedb.dev/w/images/ny7VIEO/41n2hTs4q3ihihZs__Barbell-Seated-Calf-Raise_Calves.png",
  "bodyParts": [
    "CALVES"
  ],
  "equipments": [
    "BARBELL"
  ],
  "exerciseType": "STRENGTH",
  "targetMuscles": [],
  "secondaryMuscles": [],
  "keywords": [
    "Seated Calf Raise workout",
    "Barbell Calf exercises",
    "Strengthening Calves with Barbell",
    "Seated Calf Raise technique",
    "Barbell exercises for calves",
    "How to do Seated Calf Raises",
    "Gym workouts for calf muscles",
    "Seated Barbell Calf Raise",
    "Calf muscle building exercises",
    "Detailed guide on Seated Calf Raises."
  ]
}
*/

interface Exercise {
  exercise_id: string;
  name?: string;
  image_url?: string;
  target_muscles?: string[];
  body_parts?: string[];
  equipments?: string[];
  secondary_muscles?: string[];
  keywords?: string[];
  exercise_type?: string;
  overview?: string;
  instructions?: string[];
  exercise_tips?: string[];
  variations?: string[];
  video_url?: string;
  related_exercise_ids?: string[];
}


// interface Exercise {
//   exerciseId: string;
//   name: string;
//   imageUrl: string;
//   bodyParts?: string[];
//   equipments?: string[];
//   exerciseType?: string;
//   targetMuscles?: string[];
//   secondaryMuscles?: string[];
//   instructions?: string[];
//   keywords?: string[];
//   variations?: string[];
//   exerciseTips?: string[];
//   videoUrl?: string;
//   relatedExerciseIds?: string[];
//   overview?: string;
// }
