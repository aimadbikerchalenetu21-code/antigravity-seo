import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  const toolType = searchParams.get("toolType");
  const favoritesOnly = searchParams.get("favorites") === "true";
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

  const generations = await prisma.generation.findMany({
    where: {
      userId,
      ...(projectId ? { projectId } : {}),
      ...(toolType ? { toolType } : {}),
      ...(favoritesOnly ? { isFavorite: true } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      project: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(generations);
}
