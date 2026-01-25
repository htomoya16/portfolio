export type Certification = {
  title: string;
  issuer: string;
  year: string;
  note?: string;
};

export const certifications: Certification[] = [
  {
    title: "応用情報技術者試験",
    issuer: "IPA",
    year: "2025",
  },
];
