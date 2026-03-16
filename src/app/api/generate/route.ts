import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { generateText } from "ai";
import { getProvider, getModelId } from "@/lib/ai/provider";
import { decrypt } from "@/lib/crypto";
import { getToolById } from "@/lib/tools";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;

  try {
    const { toolId, inputs, projectId, apiKeyId } = await req.json();

    if (!toolId || !inputs) {
      return NextResponse.json({ error: "toolId and inputs are required" }, { status: 400 });
    }

    const tool = getToolById(toolId);
    if (!tool) {
      return NextResponse.json({ error: "Unknown tool" }, { status: 400 });
    }

    // Resolve API key
    let apiKeyRecord;
    if (apiKeyId) {
      apiKeyRecord = await prisma.apiKey.findFirst({ where: { id: apiKeyId, userId } });
    } else {
      apiKeyRecord = await prisma.apiKey.findFirst({ where: { userId, isDefault: true } });
      if (!apiKeyRecord) {
        apiKeyRecord = await prisma.apiKey.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } });
      }
    }

    if (!apiKeyRecord) {
      return NextResponse.json(
        { error: "No API key configured. Please add an API key in Settings." },
        { status: 400 }
      );
    }

    const decryptedKey = decrypt(apiKeyRecord.encryptedKey, apiKeyRecord.iv, apiKeyRecord.authTag);
    const provider = getProvider(apiKeyRecord.provider, decryptedKey, apiKeyRecord.baseUrl || undefined);
    const modelId = getModelId(apiKeyRecord.provider, apiKeyRecord.model);

    const prompt = tool.buildPrompt(inputs);

    const { text, usage } = await generateText({
      model: provider(modelId),
      prompt,
    });

    const generation = await prisma.generation.create({
      data: {
        userId,
        projectId: projectId || null,
        toolType: toolId,
        inputs: JSON.stringify(inputs),
        output: text,
        promptUsed: prompt,
        provider: apiKeyRecord.provider,
        model: apiKeyRecord.model,
        tokensUsed: usage?.totalTokens ?? null,
      },
    });

    return NextResponse.json({ output: text, generationId: generation.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
