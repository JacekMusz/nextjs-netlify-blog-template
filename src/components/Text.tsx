import { Text } from "@mbank-design/components-library/components";

type myTextProps = {
  slug: string;
  name: string;
  styledAs: React.ComponentPropsWithoutRef<typeof Text>["styledAs"];
};
export default function MyText(props: myTextProps) {
  return <Text styledAs={props.styledAs}>{props.name}</Text>;
}
