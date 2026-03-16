import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function getProvider(
  providerName: string,
  apiKey: string,
  baseUrl?: string
) {
  switch (providerName) {
    case "openai":
      return createOpenAI({ apiKey });
    case "anthropic":
      return createAnthropic({ apiKey });
    case "google":
      return createGoogleGenerativeAI({ apiKey });
    case "custom":
      return createOpenAI({ apiKey, baseURL: baseUrl || "" });
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
}

export function getModelId(provider: string, model: string) {
  return model;
}

export const PROVIDERS = [
  {
    id: "openai",
    name: "OpenAI",
    models: [
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    models: [
      { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4" },
      { id: "claude-opus-4-0-20250514", name: "Claude Opus 4" },
      { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5" },
    ],
  },
  {
    id: "google",
    name: "Google Gemini",
    models: [
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
    ],
  },
  {
    id: "custom",
    name: "Custom (OpenAI-compatible)",
    models: [],
  },
] as const;

export type ProviderId = (typeof PROVIDERS)[number]["id"];
