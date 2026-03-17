import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Zap, History, Key, ArrowRight } from "lucide-react";
import Link from "next/link";

const btnOutline =
  "inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground";

const btnGhost =
  "inline-flex items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground";

const btnDefault =
  "inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as { id: string }).id;

  const [projectCount, generationCount, apiKeyCount, recentGenerations] = await Promise.all([
    prisma.project.count({ where: { userId } }),
    prisma.generation.count({ where: { userId } }),
    prisma.apiKey.count({ where: { userId } }),
    prisma.generation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { project: { select: { name: true } } },
    }),
  ]);

  const stats = [
    { label: "Projects", value: projectCount, icon: FolderOpen, href: "/projects" },
    { label: "Generations", value: generationCount, icon: Zap, href: "/history" },
    { label: "API Keys", value: apiKeyCount, icon: Key, href: "/api-keys" },
  ];

  const toolLabels: Record<string, string> = {
    "title-tag": "Title Tag",
    "meta-description": "Meta Description",
    "blog-outline": "Blog Outline",
    "blog-post": "Blog Post",
    "product-description": "Product Description",
    faq: "FAQ",
    "alt-text": "Alt Text",
    "schema-markup": "Schema Markup",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s an overview of your SEO content workspace.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/generate", icon: Zap, label: "Generate Content" },
            { href: "/projects", icon: FolderOpen, label: "New Project" },
            { href: "/history", icon: History, label: "View History" },
            { href: "/api-keys", icon: Key, label: "Manage API Keys" },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className={`${btnOutline} h-auto py-4 flex-col gap-2`}>
              <Icon className="h-5 w-5 text-primary" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent generations */}
      {recentGenerations.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Generations</h2>
            <Link href="/history" className={`${btnGhost} gap-1`}>
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentGenerations.map((gen) => (
              <Card key={gen.id} className="py-3 px-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {toolLabels[gen.toolType] || gen.toolType}
                    </Badge>
                    <p className="text-sm text-muted-foreground truncate">
                      {gen.output.slice(0, 80)}…
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-xs text-muted-foreground">
                    {gen.project && <span>{gen.project.name}</span>}
                    <span>{new Date(gen.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {apiKeyCount === 0 && (
        <Card className="border-dashed border-primary/40 bg-primary/5">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">No API keys configured</p>
              <p className="text-sm text-muted-foreground">
                Add an API key to start generating content.
              </p>
            </div>
            <Link href="/api-keys" className={btnDefault}>
              Add API Key
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
