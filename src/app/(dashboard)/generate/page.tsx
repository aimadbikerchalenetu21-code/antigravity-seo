"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Zap, Copy, Star, RotateCcw, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { SEO_TOOLS, type SeoTool } from "@/lib/tools";

interface ApiKeyRecord {
  id: string;
  provider: string;
  model: string;
  label: string | null;
  isDefault: boolean;
}

interface Project {
  id: string;
  name: string;
}

function GeneratePage() {
  const searchParams = useSearchParams();
  const [selectedTool, setSelectedTool] = useState<SeoTool>(SEO_TOOLS[0]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKeyRecord[]>([]);
  const [selectedKeyId, setSelectedKeyId] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const projId = searchParams.get("projectId");
    if (projId) setSelectedProjectId(projId);
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    const [keysRes, projRes] = await Promise.all([
      fetch("/api/api-keys"),
      fetch("/api/projects"),
    ]);
    if (keysRes.ok) {
      const keys: ApiKeyRecord[] = await keysRes.json();
      setApiKeys(keys);
      const def = keys.find((k) => k.isDefault) ?? keys[0];
      if (def) setSelectedKeyId(def.id);
    }
    if (projRes.ok) setProjects(await projRes.json());
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function handleToolSelect(tool: SeoTool) {
    setSelectedTool(tool);
    setInputs({});
    setOutput("");
    setGenerationId(null);
    setIsFavorite(false);
  }

  function setInput(id: string, value: string) {
    setInputs((prev) => ({ ...prev, [id]: value }));
  }

  async function handleGenerate() {
    const missing = selectedTool.inputs.filter((i) => i.required && !inputs[i.id]?.trim());
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.map((i) => i.label).join(", ")}`);
      return;
    }
    if (!selectedKeyId) {
      toast.error("Please add an API key in the API Keys settings first.");
      return;
    }

    setLoading(true);
    setOutput("");
    setGenerationId(null);
    setIsFavorite(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: selectedTool.id,
          inputs,
          projectId: selectedProjectId || null,
          apiKeyId: selectedKeyId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Generation failed");
        return;
      }

      setOutput(data.output);
      setGenerationId(data.generationId);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleFavorite() {
    if (!generationId) return;
    const res = await fetch(`/api/generations/${generationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorite: !isFavorite }),
    });
    if (res.ok) setIsFavorite((v) => !v);
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  }

  const selectedKey = apiKeys.find((k) => k.id === selectedKeyId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Generate</h1>
        <p className="text-muted-foreground mt-1">AI-powered SEO content generation.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Tool Selector */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Tools</p>
          <div className="space-y-1">
            {SEO_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolSelect(tool)}
                className={`w-full text-left rounded-md px-3 py-2.5 text-sm transition-colors flex items-center justify-between gap-2 ${
                  selectedTool.id === tool.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{tool.name}</span>
                {selectedTool.id === tool.id && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Config Bar */}
          <Card>
            <CardContent className="py-3 px-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs text-muted-foreground shrink-0">API Key</span>
                  <Select value={selectedKeyId} onValueChange={(v) => { if (v) setSelectedKeyId(v); }}>
                    <SelectTrigger className="h-8 text-xs w-[180px]">
                      <SelectValue placeholder="Select key" />
                    </SelectTrigger>
                    <SelectContent>
                      {apiKeys.map((k) => (
                        <SelectItem key={k.id} value={k.id} className="text-xs">
                          {k.label || `${k.provider} / ${k.model}`}
                          {k.isDefault && " (default)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator orientation="vertical" className="h-5 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground shrink-0">Project</span>
                  <Select value={selectedProjectId || "none"} onValueChange={(v) => setSelectedProjectId(v === "none" || !v ? "" : v)}>
                    <SelectTrigger className="h-8 text-xs w-[160px]">
                      <SelectValue placeholder="No project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none" className="text-xs">No project</SelectItem>
                      {projects.map((p) => (
                        <SelectItem key={p.id} value={p.id} className="text-xs">{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedKey && (
                  <Badge variant="secondary" className="text-xs hidden md:inline-flex">
                    {selectedKey.model}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tool Form */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">{selectedTool.name}</CardTitle>
              <CardDescription>{selectedTool.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedTool.inputs.map((input) => (
                <div key={input.id} className="space-y-2">
                  <Label htmlFor={input.id}>
                    {input.label}
                    {input.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {input.type === "textarea" ? (
                    <Textarea
                      id={input.id}
                      placeholder={input.placeholder}
                      value={inputs[input.id] || ""}
                      onChange={(e) => setInput(input.id, e.target.value)}
                      rows={3}
                    />
                  ) : input.type === "select" ? (
                    <Select
                      value={inputs[input.id] || input.options?.[0]?.value || ""}
                      onValueChange={(v) => { if (v) setInput(input.id, v); }}
                    >
                      <SelectTrigger id={input.id}>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {input.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={input.id}
                      placeholder={input.placeholder}
                      value={inputs[input.id] || ""}
                      onChange={(e) => setInput(input.id, e.target.value)}
                    />
                  )}
                </div>
              ))}

              <Button onClick={handleGenerate} disabled={loading} className="w-full gap-2 mt-2">
                <Zap className="h-4 w-4" />
                {loading ? "Generating..." : "Generate"}
              </Button>
            </CardContent>
          </Card>

          {/* Output */}
          {(output || loading) && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Output</CardTitle>
                  {output && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyOutput}>
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      {generationId && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${isFavorite ? "text-yellow-500" : "text-muted-foreground"}`}
                          onClick={toggleFavorite}
                        >
                          <Star className="h-3.5 w-3.5" fill={isFavorite ? "currentColor" : "none"} />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleGenerate} disabled={loading}>
                        <RotateCcw className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-4/5" />
                    <div className="h-4 bg-muted rounded w-3/5" />
                  </div>
                ) : (
                  <ScrollArea className="max-h-[500px]">
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{output}</ReactMarkdown>
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GeneratePageWrapper() {
  return (
    <Suspense>
      <GeneratePage />
    </Suspense>
  );
}
