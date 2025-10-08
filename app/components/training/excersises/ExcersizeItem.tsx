import { TouchableOpacity, Text, Image } from "react-native";
import ExcersizeTag, { ExcersizeTagType } from "./ExcersizeTag";
import { AddExcersizeSmall } from "./AddExcersise";

export interface ExcersizeItemProps {
  excersizeId: string;
  name: string;
  gifUrl: string;
  tags: { type: ExcersizeTagType; name: string }[];
}

export default function ExcersizeItem(props: ExcersizeItemProps) {
  return (
    <TouchableOpacity>
      <Text>{props.name}</Text>
      <Image source={{ uri: props.gifUrl }} />
      {props.tags.map((tag, index) => (
        <ExcersizeTag key={index} name={tag.name} type={tag.type} />
      ))}
      <AddExcersizeSmall excersizeId={props.excersizeId} />
    </TouchableOpacity>
  );
}
