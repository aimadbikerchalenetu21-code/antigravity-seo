"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Key, Plus, Trash2, Star } from "lucide-react";
import { PROVIDERS } from "@/lib/ai/provider";

interface ApiKeyRecord {
  id: string;
  provider: string;
  model: string;
  baseUrl: string | null;
  label: string | null;
  isDefault: boolean;
  maskedKey: string;
  createdAt: string;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [label, setLabel] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [customModel, setCustomModel] = useState("");

  const fetchKeys = useCallback(async () => {
    const res = await fetch("/api/api-keys");
    if (res.ok) setKeys(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchKeys(); }, [fetchKeys]);

  const selectedProvider = PROVIDERS.find((p) => p.id === provider);
  const models = selectedProvider?.models ?? [];

  function openCreate() {
    setProvider("openai");
    setModel("gpt-4o");
    setApiKey("");
    setLabel("");
    setBaseUrl("");
    setIsDefault(keys.length === 0);
    setCustomModel("");
    setDialogOpen(true);
  }

  async function handleSave() {
    const finalModel = provider === "custom" ? customModel : model;
    if (!apiKey.trim() || !provider || !finalModel) {
      toast.error("API key, provider, and model are required");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey, provider, model: finalModel, label, baseUrl: baseUrl || null, isDefault }),
    });
    setSaving(false);
    if (!res.ok) { toast.error("Failed to save API key"); return; }
    toast.success("API key added");
    setDialogOpen(false);
    fetchKeys();
  }

  async function handleSetDefault(id: string) {
    const res = await fetch(`/api/api-keys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDefault: true }),
    });
    if (!res.ok) { toast.error("Failed to update"); return; }
    toast.success("Default API key updated");
    fetchKeys();
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/api-keys/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Failed to delete"); return; }
    toast.success("API key deleted");
    setDeleteId(null);
    fetchKeys();
  }

  const providerLabels: Record<string, string> = {
    openai: "OpenAI",
    anthropic: "Anthropic",
    google: "Google Gemini",
    custom: "Custom",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-muted-foreground mt-1">
            Manage your AI provider API keys. Keys are encrypted at rest.
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add API Key
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => <Card key={i} className="animate-pulse h-20" />)}
        </div>
      ) : keys.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Key className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="font-semibold mb-1">No API keys yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add your first API key to start generating SEO content.
            </p>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="h-4 w-4" /> Add API Key
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {keys.map((k) => (
            <Card key={k.id} className={k.isDefault ? "border-primary/50" : ""}>
              <CardContent className="flex items-center justify-between py-4 gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <Key className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">
                        {k.label || `${providerLabels[k.provider] || k.provider} — ${k.model}`}
                      </span>
                      {k.isDefault && (
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <Star className="h-2.5 w-2.5" /> Default
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{providerLabels[k.provider] || k.provider}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{k.maskedKey}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!k.isDefault && (
                    <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => handleSetDefault(k.id)}>
                      <Star className="h-3 w-3" /> Set default
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(k.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add API Key</DialogTitle>
            <DialogDescription>
              Your API key is encrypted with AES-256-GCM before being stored.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select value={provider} onValueChange={(v) => { if (!v) return; setProvider(v); setModel(PROVIDERS.find(p => p.id === v)?.models[0]?.id || ""); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PROVIDERS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {provider !== "custom" ? (
              <div className="space-y-2">
                <Label>Model</Label>
                <Select value={model} onValueChange={(v) => { if (v) setModel(v); }}>
                  <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
                  <SelectContent>
                    {models.map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Base URL</Label>
                  <Input placeholder="https://api.example.com/v1" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Model ID</Label>
                  <Input placeholder="gpt-4o" value={customModel} onChange={(e) => setCustomModel(e.target.value)} />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>API Key *</Label>
              <Input type="password" placeholder="sk-..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Label (optional)</Label>
              <Input placeholder="My OpenAI Key" value={label} onChange={(e) => setLabel(e.target.value)} />
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={isDefault} onCheckedChange={setIsDefault} id="is-default" />
              <Label htmlFor="is-default" className="cursor-pointer">Set as default key</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Add Key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete API Key</DialogTitle>
            <DialogDescription>
              This API key will be permanently deleted and cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
