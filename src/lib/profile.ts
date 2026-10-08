import { getCollection } from "astro:content";
import type Fact from "../types/fact";

export async function getSkills() {
  const skills = await getCollection("skills");
  return skills.sort((a, b) => a.data.order - b.data.order);
}

export async function getEducation() {
  const education = await getCollection("education");
  return education.sort((a, b) => a.data.order - b.data.order);
}

export async function getFacts(): Promise<Fact[]> {
  const [skills, education] = await Promise.all([getSkills(), getEducation()]);
  const [current] = education;
  const topSkills = skills.flatMap(({ data }) => data.items.slice(0, 2));

  return [
    { label: "Based in", value: "Fort Collins, CO" },
    current && {
      label: "Studying",
      value: current.data.degree,
      detail: `${current.data.school} · ${current.data.period}`,
    },
    { label: "Experience", value: "5+ years in web development" },
    { label: "Works with", value: topSkills.join(", ") },
  ].filter((fact) => !!fact);
}
