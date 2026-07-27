import type { FormulaPreview } from "@/types/ui";

export const mockFormulas: FormulaPreview[] = [
  {
    id: "f-1",
    name: "Integration by Parts",
    latex: "\\int u\\,dv = uv - \\int v\\,du",
    explanation:
      "Used to integrate a product of functions by shifting the derivative from one factor to the other.",
    topic: "Integration Techniques",
    bookmarked: true,
  },
  {
    id: "f-2",
    name: "Laplace Transform of a Derivative",
    latex: "\\mathcal{L}\\{f'(t)\\} = sF(s) - f(0)",
    explanation: "Turns a differential equation in t into an algebraic equation in s.",
    topic: "Laplace Transform",
    bookmarked: false,
  },
  {
    id: "f-3",
    name: "Divergence Theorem",
    latex:
      "\\iiint_V (\\nabla \\cdot \\mathbf{F})\\, dV = \\oiint_S \\mathbf{F} \\cdot d\\mathbf{S}",
    explanation:
      "Relates the flux of a vector field through a closed surface to its divergence inside.",
    topic: "Gradient, Divergence and Curl",
    bookmarked: false,
  },
];
