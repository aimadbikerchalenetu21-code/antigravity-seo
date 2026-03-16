"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Star, Trash2, Copy, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Generation {
  id: string;
  toolType: string;
  inputs: string;
  output: string;
  provider: string;
  model: string;
  tokensUsed: number | null;
  isFavorite: boolean;
  createdAt: string;
  project: { id: string; name: string } | null;
}

const TOOL_LABELS: Record<string, string> = {
  "title-tag": "Title Tag",
  "meta-description": "Meta Description",
  "blog-outline": "Blog Outline",
  "blog-post": "Blog Post",
  "product-description": "Product Description",
  "faq": "FAQ",
  "alt-text": "Alt Text",
  "schema-markup": "Schema Markup",
};

export default function HistoryPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [viewGen, setViewGen] = useState<Generation | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchGenerations = useCallback(async () => {
    const params = new URLSearchParams({ limit: "100" });
    if (favoritesOnly) params.set("favorites", "true");
    const res = await fetch(`/api/generations?${params}`);
    if (res.ok) setGenerations(await res.json());
    setLoading(false);
  }, [favoritesOnly]);

  useEffect(() => { fetchGenerations(); }, [fetchGenerations]);

  async function toggleFavorite(id: string) {
    const res = await fetch(`/api/generations/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
    if (!res.ok) { toast.error("Failed to update"); return; }
    setGenerations((prev) => prev.map((g) => g.id === id ? { ...g, isFavorite: !g.isFavorite } : g));
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/generations/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Failed to delete"); return; }
    toast.success("Deleted");
    setDeleteId(null);
    setGenerations((prev) => prev.filter((g) => g.id !== id));
  }

  function copyOutput(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-muted-foreground mt-1">All your generated content.</p>
        </div>
        <Button
          variant={favoritesOnly ? "default" : "outline"}
          size="sm"
          className="gap-2"
          onClick={() => { setFavoritesOnly((v) => !v); setLoading(true); }}
        >
          <Star className="h-4 w-4" />
          {favoritesOnly ? "All" : "Favorites"}
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Card key={i} className="animate-pulse h-16" />)}
        </div>
      ) : generations.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <History className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="font-semibold mb-1">
              {favoritesOnly ? "No favorites yet" : "No generations yet"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {favoritesOnly ? "Star a generation to save it here." : "Generate content to see it here."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {generations.map((g) => (
            <Card key={g.id} className="group">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {TOOL_LABELS[g.toolType] || g.toolType}
                  </Badge>
                  <p
                    className="flex-1 text-sm text-muted-foreground truncate cursor-pointer hover:text-foreground"
                    onClick={() => setViewGen(g)}
                  >
                    {g.output.slice(0, 100)}…
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    {g.project && (
                      <Badge variant="outline" className="text-xs hidden sm:inline-flex">{g.project.name}</Badge>
                    )}
                    <span className="text-xs text-muted-foreground hidden md:inline">
                      {new Date(g.createdAt).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyOutput(g.output)}>
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 ${g.isFavorite ? "text-yellow-500" : "text-muted-foreground"}`}
                      onClick={() => toggleFavorite(g.id)}
                    >
                      <Star className="h-3.5 w-3.5" fill={g.isFavorite ? "currentColor" : "none"} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setDeleteId(g.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setExpanded(expanded === g.id ? null : g.id)}>
                      {expanded === g.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>
                {expanded === g.id && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-xs text-muted-foreground mb-2">
                      {g.model} · {g.tokensUsed ? `${g.tokensUsed} tokens` : ""}
                    </div>
                    <div className="prose prose-sm max-w-none text-sm bg-muted/30 rounded-md p-3">
                      <ReactMarkdown>{g.output}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Full View Dialog */}
      <Dialog open={!!viewGen} onOpenChange={() => setViewGen(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Badge variant="secondary">{viewGen && (TOOL_LABELS[viewGen.toolType] || viewGen.toolType)}</Badge>
              {viewGen?.project && <span className="text-sm font-normal text-muted-foreground">· {viewGen.project.name}</span>}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="prose prose-sm max-w-none p-1">
              {viewGen && <ReactMarkdown>{viewGen.output}</ReactMarkdown>}
            </div>
          </ScrollArea>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-muted-foreground">
              {viewGen?.model} · {viewGen?.tokensUsed ? `${viewGen.tokensUsed} tokens` : ""}
            </span>
            <Button size="sm" className="gap-2" onClick={() => viewGen && copyOutput(viewGen.output)}>
              <Copy className="h-3.5 w-3.5" /> Copy
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Generation</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This generation will be permanently deleted.</p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
