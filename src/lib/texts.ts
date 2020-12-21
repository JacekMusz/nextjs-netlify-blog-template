import styledAs from "../../meta/styledAs.yml";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const postsDirectory = path.join(process.cwd(), "src/pages/myComponent/text");

export type TextContent = {
  readonly name: string;
  readonly styledAs: string;
  readonly slug: string;
};

let textCache: TextContent[];

function fetchTextContent(): TextContent[] {
  if (textCache) {
    return textCache;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allTextsData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        name: string;
        styledAs: string;
        slug: string;
      };
      const slug = fileName.replace(/\.mdx$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });
  //Sort name
  textCache = allTextsData.sort((a, b) => {
    if (a.name < b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  return allTextsData;
}

// export function countPosts(tag?: string): number {
//   return fetchTextContent().filter(
//     (it) => !tag || (it.tags && it.tags.includes(tag))
//   ).length;
// }

export function listTextContent(): TextContent[] {
  return fetchTextContent();
  // .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
  // .slice((page - 1) * limit, page * limit);
}
