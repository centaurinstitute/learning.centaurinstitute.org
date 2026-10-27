// utility function to map tag ID to its plaintext representation (ID --> String)

// => map definition
const tagLabels: Readonly<Record<string, string>> = {
  agi: "AGI",
  ai_for_edu: "AI for Education",
  ai_for_math: "AI for Mathematics",
  autoformalization: "Autoformalization",
  atp: "Automated Theorem Proving",
  applications: "Applications",
  causal_reasoning: "Causal Reasoning",
  code_generation: "Code Generation",
  cognitive_architectures: "Cognitive Architectures",
  compositionality: "Compositionality",
  computational_complexity: "Computational Complexity",
  computational_learning_theory: "Computational Learning Theory",
  computer_vision: "Computer Vision",
  concept_bottleneck: "Concept bottleneck",
  explainability_interpretability: "Explainability / Interpretability",
  formal_verification: "Formal verification",
  future_of_AI: "Future of AI",
  general_audience: "General Audience",
  general_overview: "General Overview",
  grand_challenges: "Grand Challenges",
  hallucinations_factuality: "Hallucinations / Factuality",
  inductive_reasoning: "Inductive Reasoning",
  knowledge_extraction: "Knowledge Extraction",
  knowledge_graphs: "Knowledge Graphs",
  knowledge_representation: "Knowledge Representation",
  learning_with_constraints: "Learning with Constraints",
  limitations_of_llms: "Limitations of LLMs",
  logical_reasoning: "Logical Reasoning",
  math_foundations: "Mathematical Foundations",
  ns_framework: "Neuro-Symbolic Framework",
  ns_taxonomy: "Neuro-Symbolic Taxonomy",
  neurally_guided_search: "Neurally Guided Search",
  neural_reasoning: "Neural Reasoning",
  ns_benchmark: "Neuro-Symbolic Benchmark",
  nlp: "Natural Language Processing (NLP)",
  open_source: "Open source",
  planning: "Planning",
  probabilistic_reasoning: "Probabilistic Reasoning",
  rl: "Reinforcement Learning",
  safety: "Safety",
  self_driving_cars: "Self-driving Cars",
  semantic_parsing: "Semantic Parsing",
  startup: "Startup",
  tensor_logics: "Tensor Logics",
  transformers: "Transformers",
};

// => define utility function that uses mapping
const getTagLabel = (tagId: string): string =>
  Object.prototype.hasOwnProperty.call(tagLabels, tagId)
    ? tagLabels[tagId]
    : tagId;

export { getTagLabel };
