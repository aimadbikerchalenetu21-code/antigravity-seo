import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const { id } = await params;
  const existing = await prisma.apiKey.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();

  if (body.isDefault === true) {
    await prisma.apiKey.updateMany({ where: { userId }, data: { isDefault: false } });
  }

  const updated = await prisma.apiKey.update({
    where: { id },
    data: {
      label: body.label !== undefined ? body.label || null : existing.label,
      isDefault: body.isDefault !== undefined ? body.isDefault : existing.isDefault,
    },
    select: { id: true, provider: true, model: true, baseUrl: true, label: true, isDefault: true, createdAt: true },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const { id } = await params;
  const existing = await prisma.apiKey.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.apiKey.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
