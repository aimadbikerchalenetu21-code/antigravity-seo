"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { FolderOpen, Plus, Pencil, Trash2, Globe, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  createdAt: string;
  _count: { generations: number };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  const fetchProjects = useCallback(async () => {
    const res = await fetch("/api/projects");
    if (res.ok) setProjects(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  function openCreate() {
    setEditProject(null);
    setName("");
    setDescription("");
    setWebsite("");
    setDialogOpen(true);
  }

  function openEdit(p: Project) {
    setEditProject(p);
    setName(p.name);
    setDescription(p.description || "");
    setWebsite(p.website || "");
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!name.trim()) { toast.error("Project name is required"); return; }
    setSaving(true);
    const url = editProject ? `/api/projects/${editProject.id}` : "/api/projects";
    const method = editProject ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, website }),
    });
    setSaving(false);
    if (!res.ok) { toast.error("Failed to save project"); return; }
    toast.success(editProject ? "Project updated" : "Project created");
    setDialogOpen(false);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Failed to delete project"); return; }
    toast.success("Project deleted");
    setDeleteId(null);
    fetchProjects();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Organize your content generation by project.</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader><div className="h-5 bg-muted rounded w-2/3" /></CardHeader>
              <CardContent><div className="h-4 bg-muted rounded w-full" /></CardContent>
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="font-semibold mb-1">No projects yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create a project to organize your SEO content.
            </p>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="h-4 w-4" /> Create your first project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.id} className="group hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base line-clamp-1">{p.name}</CardTitle>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(p)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteId(p.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                {p.description && (
                  <CardDescription className="line-clamp-2">{p.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {p.website && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3 shrink-0" />
                    <span className="truncate">{p.website}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Zap className="h-3 w-3" />
                    {p._count.generations} generations
                  </Badge>
                  <Link
                    href={`/generate?projectId=${p.id}`}
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-7 text-xs")}
                  >
                    Generate
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editProject ? "Edit Project" : "New Project"}</DialogTitle>
            <DialogDescription>
              {editProject ? "Update project details." : "Create a new project to organize your content."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="proj-name">Project Name *</Label>
              <Input id="proj-name" placeholder="My Website SEO" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proj-desc">Description</Label>
              <Textarea id="proj-desc" placeholder="What is this project for?" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proj-url">Website URL</Label>
              <Input id="proj-url" placeholder="https://example.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editProject ? "Save Changes" : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure? This will delete the project and all associated generations. This action cannot be undone.
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
