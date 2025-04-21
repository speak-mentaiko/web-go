export interface Question {
  id: string;
  question: string;
  answer: string;
  tags: Tag[];
}

export const tags = ["person", "organization", "ability", "others"] as const;

export type Tag = (typeof tags)[number];
