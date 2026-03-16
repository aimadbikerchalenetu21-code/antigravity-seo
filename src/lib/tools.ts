export interface ToolInput {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea" | "select";
  options?: { value: string; label: string }[];
  required?: boolean;
}

export interface SeoTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  inputs: ToolInput[];
  buildPrompt: (inputs: Record<string, string>) => string;
}

export const SEO_TOOLS: SeoTool[] = [
  {
    id: "title-tag",
    name: "Title Tag Generator",
    description: "Generate SEO-optimized title tags under 60 characters",
    icon: "Type",
    inputs: [
      { id: "keyword", label: "Primary Keyword", placeholder: "e.g. best running shoes", type: "text", required: true },
      { id: "brand", label: "Brand Name", placeholder: "e.g. Nike", type: "text" },
      { id: "page_type", label: "Page Type", placeholder: "", type: "select", options: [
        { value: "homepage", label: "Homepage" },
        { value: "product", label: "Product Page" },
        { value: "category", label: "Category Page" },
        { value: "blog", label: "Blog Post" },
        { value: "landing", label: "Landing Page" },
      ]},
    ],
    buildPrompt: (inputs) =>
      `Generate 5 SEO-optimized title tags for a ${inputs.page_type || "webpage"} targeting the keyword "${inputs.keyword}"${inputs.brand ? ` for the brand "${inputs.brand}"` : ""}. Each title should be under 60 characters, compelling, and click-worthy. Format as a numbered list.`,
  },
  {
    id: "meta-description",
    name: "Meta Description",
    description: "Write compelling meta descriptions under 160 characters",
    icon: "AlignLeft",
    inputs: [
      { id: "keyword", label: "Primary Keyword", placeholder: "e.g. best running shoes", type: "text", required: true },
      { id: "page_summary", label: "Page Summary", placeholder: "Briefly describe what this page is about", type: "textarea", required: true },
      { id: "cta", label: "Call to Action", placeholder: "e.g. Shop now, Learn more, Get started", type: "text" },
    ],
    buildPrompt: (inputs) =>
      `Write 3 compelling meta descriptions for a page about: "${inputs.page_summary}". The primary keyword is "${inputs.keyword}"${inputs.cta ? ` and should include a call to action like "${inputs.cta}"` : ""}. Each description must be under 160 characters and entice users to click. Format as a numbered list.`,
  },
  {
    id: "blog-outline",
    name: "Blog Outline",
    description: "Create structured, SEO-friendly blog post outlines",
    icon: "List",
    inputs: [
      { id: "topic", label: "Blog Topic", placeholder: "e.g. How to choose running shoes for beginners", type: "text", required: true },
      { id: "target_audience", label: "Target Audience", placeholder: "e.g. beginner runners aged 25-40", type: "text" },
      { id: "word_count", label: "Target Word Count", placeholder: "", type: "select", options: [
        { value: "500", label: "500 words (short)" },
        { value: "1000", label: "1,000 words (medium)" },
        { value: "1500", label: "1,500 words (long)" },
        { value: "2500", label: "2,500 words (comprehensive)" },
      ]},
    ],
    buildPrompt: (inputs) =>
      `Create a detailed blog post outline for the topic: "${inputs.topic}"${inputs.target_audience ? ` targeting ${inputs.target_audience}` : ""}${inputs.word_count ? ` with approximately ${inputs.word_count} words` : ""}. Include an H1 title, introduction, H2 sections with H3 subsections, key points for each section, and a conclusion. Make it SEO-friendly.`,
  },
  {
    id: "blog-post",
    name: "Blog Post Writer",
    description: "Write complete, SEO-optimized blog posts",
    icon: "FileText",
    inputs: [
      { id: "topic", label: "Topic / Title", placeholder: "e.g. 10 Best Running Shoes for Beginners in 2025", type: "text", required: true },
      { id: "keywords", label: "Target Keywords", placeholder: "e.g. running shoes, beginner running, best sneakers", type: "text" },
      { id: "tone", label: "Writing Tone", placeholder: "", type: "select", options: [
        { value: "professional", label: "Professional" },
        { value: "conversational", label: "Conversational" },
        { value: "educational", label: "Educational" },
        { value: "persuasive", label: "Persuasive" },
      ]},
      { id: "word_count", label: "Target Word Count", placeholder: "", type: "select", options: [
        { value: "500", label: "~500 words" },
        { value: "800", label: "~800 words" },
        { value: "1200", label: "~1,200 words" },
      ]},
    ],
    buildPrompt: (inputs) =>
      `Write a ${inputs.tone || "professional"} SEO blog post of approximately ${inputs.word_count || "800"} words about: "${inputs.topic}"${inputs.keywords ? `. Naturally incorporate these keywords: ${inputs.keywords}` : ""}. Include a compelling introduction, well-structured body with H2 headings, and a conclusion with a call to action.`,
  },
  {
    id: "product-description",
    name: "Product Description",
    description: "Write SEO-friendly product descriptions that convert",
    icon: "ShoppingBag",
    inputs: [
      { id: "product_name", label: "Product Name", placeholder: "e.g. Nike Air Zoom Pegasus 41", type: "text", required: true },
      { id: "features", label: "Key Features / Benefits", placeholder: "List the main features and benefits", type: "textarea", required: true },
      { id: "target_audience", label: "Target Audience", placeholder: "e.g. long-distance runners", type: "text" },
    ],
    buildPrompt: (inputs) =>
      `Write an SEO-optimized product description for "${inputs.product_name}"${inputs.target_audience ? ` targeted at ${inputs.target_audience}` : ""}. Key features/benefits: ${inputs.features}. Include a compelling opening, feature highlights, benefits-focused copy, and a call to action. Keep it under 300 words.`,
  },
  {
    id: "faq",
    name: "FAQ Generator",
    description: "Generate FAQ sections optimized for featured snippets",
    icon: "HelpCircle",
    inputs: [
      { id: "topic", label: "Topic / Page Subject", placeholder: "e.g. running shoes, marathon training", type: "text", required: true },
      { id: "audience", label: "Target Audience", placeholder: "e.g. beginner runners", type: "text" },
      { id: "count", label: "Number of FAQs", placeholder: "", type: "select", options: [
        { value: "5", label: "5 FAQs" },
        { value: "8", label: "8 FAQs" },
        { value: "10", label: "10 FAQs" },
      ]},
    ],
    buildPrompt: (inputs) =>
      `Generate ${inputs.count || "5"} frequently asked questions and detailed answers about "${inputs.topic}"${inputs.audience ? ` for ${inputs.audience}` : ""}. Format each as a clear question followed by a concise, helpful answer. Optimize for featured snippets and voice search.`,
  },
  {
    id: "alt-text",
    name: "Alt Text Generator",
    description: "Write descriptive, keyword-rich alt text for images",
    icon: "Image",
    inputs: [
      { id: "image_description", label: "Image Description", placeholder: "Describe what is shown in the image", type: "textarea", required: true },
      { id: "context", label: "Page Context / Keyword", placeholder: "e.g. running shoes product page", type: "text" },
    ],
    buildPrompt: (inputs) =>
      `Generate 3 alt text options for an image showing: "${inputs.image_description}"${inputs.context ? `. The image is on a page about: ${inputs.context}` : ""}. Make the alt text descriptive, include relevant keywords naturally, and keep each under 125 characters. Format as a numbered list.`,
  },
  {
    id: "schema-markup",
    name: "Schema Markup",
    description: "Generate JSON-LD structured data for rich snippets",
    icon: "Code",
    inputs: [
      { id: "schema_type", label: "Schema Type", placeholder: "", type: "select", required: true, options: [
        { value: "Article", label: "Article / Blog Post" },
        { value: "Product", label: "Product" },
        { value: "LocalBusiness", label: "Local Business" },
        { value: "FAQPage", label: "FAQ Page" },
        { value: "HowTo", label: "How-To Guide" },
        { value: "Organization", label: "Organization" },
      ]},
      { id: "content_details", label: "Content Details", placeholder: "Provide relevant details (name, description, etc.)", type: "textarea", required: true },
    ],
    buildPrompt: (inputs) =>
      `Generate a complete, valid JSON-LD schema markup of type "${inputs.schema_type}" based on the following details: ${inputs.content_details}. Include all relevant properties for the schema type. Format as clean, properly indented JSON-LD code ready to paste into a webpage.`,
  },
];

export function getToolById(id: string): SeoTool | undefined {
  return SEO_TOOLS.find((t) => t.id === id);
}
