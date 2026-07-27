import type { SubjectDetail, SubjectSummary, TopicDetail } from "@/types/ui";

export const mockSubjects: SubjectSummary[] = [
  {
    id: "sub-1",
    slug: "mathematics-1",
    name: "Mathematics-I",
    code: "MA101",
    progress: 46,
    unitCount: 4,
    chapterCount: 12,
    questionCount: 324,
  },
  {
    id: "sub-2",
    slug: "engineering-mathematics",
    name: "Engineering Mathematics",
    code: "MA201",
    progress: 22,
    unitCount: 3,
    chapterCount: 9,
    questionCount: 210,
  },
];

export const mockSubjectDetail: SubjectDetail = {
  ...mockSubjects[0],
  units: [
    {
      id: "unit-calculus",
      name: "Calculus",
      chapters: [
        {
          id: "ch-limits-continuity",
          slug: "limits-continuity",
          name: "Limits and Continuity",
          topicCount: 5,
          questionCount: 48,
          pyqPaperCount: 2,
          testCount: 1,
          progress: 82,
        },
        {
          id: "ch-integration",
          slug: "integration",
          name: "Integration Techniques",
          topicCount: 6,
          questionCount: 64,
          pyqPaperCount: 3,
          testCount: 1,
          progress: 58,
        },
      ],
    },
    {
      id: "unit-matrices",
      name: "Matrices",
      chapters: [
        {
          id: "ch-matrix-algebra",
          slug: "matrix-algebra",
          name: "Matrix Algebra",
          topicCount: 4,
          questionCount: 52,
          pyqPaperCount: 2,
          testCount: 1,
          progress: 63,
        },
        {
          id: "ch-eigenvalues",
          slug: "eigenvalues-eigenvectors",
          name: "Eigenvalues and Eigenvectors",
          topicCount: 3,
          questionCount: 38,
          pyqPaperCount: 2,
          testCount: 1,
          progress: 40,
        },
      ],
    },
    {
      id: "unit-differential-equations",
      name: "Differential Equations",
      chapters: [
        {
          id: "ch-first-order-de",
          slug: "first-order-differential-equations",
          name: "First Order Differential Equations",
          topicCount: 5,
          questionCount: 46,
          pyqPaperCount: 2,
          testCount: 1,
          progress: 72,
        },
        {
          id: "ch-laplace-transform",
          slug: "laplace-transform",
          name: "Laplace Transform",
          topicCount: 4,
          questionCount: 40,
          pyqPaperCount: 1,
          testCount: 1,
          progress: 35,
        },
      ],
    },
    {
      id: "unit-vector-calculus",
      name: "Vector Calculus",
      chapters: [
        {
          id: "ch-gradient-divergence-curl",
          slug: "gradient-divergence-curl",
          name: "Gradient, Divergence and Curl",
          topicCount: 3,
          questionCount: 24,
          pyqPaperCount: 1,
          testCount: 1,
          progress: 48,
        },
        {
          id: "ch-line-surface-integrals",
          slug: "line-surface-integrals",
          name: "Line and Surface Integrals",
          topicCount: 4,
          questionCount: 32,
          pyqPaperCount: 1,
          testCount: 1,
          progress: 20,
        },
      ],
    },
  ],
};

export const mockTopicDetail: TopicDetail = {
  id: "topic-first-order-de",
  slug: "first-order-differential-equations",
  name: "First Order Differential Equations",
  chapterName: "First Order Differential Equations",
  subjectName: "Mathematics-I",
  masteryScore: 72,
  masteryState: "practising",
  concept:
    "A first order differential equation relates a function to its first derivative. Many physical processes — cooling, population growth, circuits — are modelled this way. The general first order equation is written dy/dx = f(x, y), and solving it means finding y as a function of x that satisfies the relation.",
  definitions: [
    {
      term: "Order",
      body: "The order of a differential equation is the order of the highest derivative that appears in it.",
    },
    {
      term: "Linear equation",
      body: "A first order equation is linear if it can be written as dy/dx + P(x)y = Q(x), with y and dy/dx appearing only to the first power.",
    },
  ],
  formulaLatex: "\\frac{dy}{dx} + P(x)y = Q(x)",
  formulaMeaning:
    "The standard linear form. Multiplying through by the integrating factor e^{\\int P(x)\\,dx} makes the left side an exact derivative.",
  workedExample: {
    problem: "Solve \\frac{dy}{dx} + 2y = e^{-x} with y(0) = 1.",
    steps: [
      "Identify P(x) = 2, so the integrating factor is \\mu(x) = e^{\\int 2\\,dx} = e^{2x}.",
      "Multiply through: \\frac{d}{dx}\\left[e^{2x}y\\right] = e^{2x}\\cdot e^{-x} = e^{x}.",
      "Integrate both sides: e^{2x}y = e^{x} + C.",
      "Solve for y: y = e^{-x} + Ce^{-2x}.",
      "Apply y(0) = 1: 1 = 1 + C, so C = 0, giving y = e^{-x}.",
    ],
  },
  commonMistake:
    "Forgetting to multiply the right-hand side by the integrating factor as well — the whole equation must be multiplied through, not just the y term.",
  examTip:
    "If the equation isn't in standard form dy/dx + P(x)y = Q(x) yet, rearrange it first. DTU papers often disguise the standard form inside a slightly rearranged equation.",
  siblingTopics: [
    { id: "t-1", slug: "separable-equations", name: "Separable Equations", mastery: "mastered" },
    {
      id: "t-2",
      slug: "first-order-differential-equations",
      name: "First Order Differential Equations",
      mastery: "practising",
    },
    { id: "t-3", slug: "exact-equations", name: "Exact Equations", mastery: "learning" },
    { id: "t-4", slug: "bernoulli-equations", name: "Bernoulli Equations", mastery: "not_started" },
  ],
};
