import { getCollection } from "astro:content";

export async function getSkills() {
  const skills = await getCollection("skills");
  return skills.sort((a, b) => a.data.order - b.data.order);
}

export async function getEducation() {
  const education = await getCollection("education");
  return education.sort((a, b) => a.data.order - b.data.order);
}