import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { encrypt, maskApiKey } from "@/lib/crypto";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const keys = await prisma.apiKey.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      provider: true,
      model: true,
      baseUrl: true,
      label: true,
      isDefault: true,
      createdAt: true,
      encryptedKey: true,
      iv: true,
      authTag: true,
    },
  });

  return NextResponse.json(
    keys.map((k) => ({
      id: k.id,
      provider: k.provider,
      model: k.model,
      baseUrl: k.baseUrl,
      label: k.label,
      isDefault: k.isDefault,
      createdAt: k.createdAt,
      maskedKey: maskApiKey(k.encryptedKey),
    }))
  );
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const { apiKey, provider, model, baseUrl, label, isDefault } = await req.json();

  if (!apiKey || !provider || !model) {
    return NextResponse.json({ error: "apiKey, provider, and model are required" }, { status: 400 });
  }

  const { encrypted, iv, authTag } = encrypt(apiKey);

  if (isDefault) {
    await prisma.apiKey.updateMany({ where: { userId }, data: { isDefault: false } });
  }

  const key = await prisma.apiKey.create({
    data: {
      userId,
      provider,
      model,
      encryptedKey: encrypted,
      iv,
      authTag,
      baseUrl: baseUrl || null,
      label: label || null,
      isDefault: isDefault ?? false,
    },
    select: { id: true, provider: true, model: true, baseUrl: true, label: true, isDefault: true, createdAt: true },
  });

  return NextResponse.json(key, { status: 201 });
}
