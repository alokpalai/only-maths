export type SearchResult = {
  id: string;
  label: string;
  href: string;
};

export type SearchGroup = {
  heading: string;
  results: SearchResult[];
};

// Mock index for the Ctrl/Cmd+K command palette. Real search lands in a later
// phase (Question Bank / global search backend) — this is UI only.
export const mockSearchIndex: SearchGroup[] = [
  {
    heading: "Topics",
    results: [
      {
        id: "search-topic-1",
        label: "Integration by Parts",
        href: "/learn/mathematics-1/integration-techniques/integration-by-parts",
      },
      {
        id: "search-topic-2",
        label: "Laplace Transform",
        href: "/learn/mathematics-1/laplace-transform/laplace-transform",
      },
    ],
  },
  {
    heading: "Questions",
    results: [
      { id: "search-question-1", label: "Definite Integral — DTU 2025", href: "/practice" },
    ],
  },
  {
    heading: "Formulas",
    results: [{ id: "search-formula-1", label: "Integration by Parts Formula", href: "/learn" }],
  },
];
