import styledAs from "../../meta/styledAs.yml";

export type styledAsI = {
  readonly slug: string;
  readonly name: string;
};

const styledAsMap: { [key: string]: styledAsI } = generateStyledAsMap();

function generateStyledAsMap(): { [key: string]: styledAsI } {
  let result: { [key: string]: styledAsI } = {};
  console.log("lib -> ", styledAs);
  for (const item of styledAs.styledAs) {
    result[item.slug] = item;
  }
  return styledAs;
}

export function getStyledAs(slug: string) {
  console.log(styledAsMap);
  return styledAsMap[slug];
}

export function listStyledAs(): styledAsI[] {
  return styledAs.items;
}
