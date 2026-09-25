"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { resolveImageSrc } from "@/lib/images/resolve-image-src";
import type { UploadFolder } from "@/lib/uploads/constants";

type Toast = { type: "success" | "error"; message: string };

export function LocalImageField({
  name,
  folder,
  label = "Image",
  defaultValue = "",
  onChange,
  className,
}: {
  name: string;
  folder: UploadFolder;
  label?: string;
  defaultValue?: string;
  onChange?: (url: string) => void;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const updateValue = useCallback(
    (url: string) => {
      setValue(url);
      onChange?.(url);
    },
    [onChange]
  );

  const deleteStored = async (url: string) => {
    if (!url.startsWith("/api/uploads/")) return;
    try {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ url }),
      });
    } catch {
      /* best-effort cleanup */
    }
  };

  const onFile = async (file: File | null) => {
    if (!file) return;
    setUploading(true);
    setToast(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      if (value.startsWith("/api/uploads/")) {
        formData.append("replaceUrl", value);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = (await res.json()) as {
        success?: boolean;
        url?: string;
        error?: string;
      };

      if (!res.ok || !data.success || !data.url) {
        throw new Error(data.error || "Upload failed");
      }

      updateValue(data.url);
      setToast({ type: "success", message: "Image uploaded" });
    } catch (err) {
      setToast({
        type: "error",
        message: err instanceof Error ? err.message : "Upload failed",
      });
    } finally {
      setUploading(false);
    }
  };

  const onRemove = async () => {
    const prev = value;
    updateValue("");
    if (prev.startsWith("/api/uploads/")) {
      await deleteStored(prev);
      setToast({ type: "success", message: "Image removed" });
    }
  };

  const previewSrc = value ? resolveImageSrc(value) : null;

  return (
    <div className={cn("space-y-3", className)}>
      <span className="block text-sm text-steel">{label}</span>
      <input type="hidden" name={name} value={value} readOnly />

      {previewSrc ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-charcoal">
            <Image src={previewSrc} alt="" fill className="object-cover" sizes="112px" unoptimized={value.startsWith("/api/uploads/")} />
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex min-h-[44px] cursor-pointer items-center rounded-lg border border-white/20 bg-white/5 px-4 text-xs font-semibold uppercase tracking-wider hover:border-electric/40">
              {uploading ? "Uploading…" : "Replace"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="sr-only"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  void onFile(f ?? null);
                  e.target.value = "";
                }}
              />
            </label>
            <button
              type="button"
              disabled={uploading}
              onClick={() => void onRemove()}
              className="min-h-[44px] rounded-lg border border-red-400/30 px-4 text-xs font-semibold uppercase tracking-wider text-red-300 hover:bg-red-400/10"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.03] px-4 py-6 text-center hover:border-electric/40">
          <span className="text-xs font-semibold uppercase tracking-wider text-steel">
            {uploading ? "Uploading…" : "Choose image"}
          </span>
          <span className="mt-1 text-[10px] text-steel/80">PNG, JPEG, WebP, GIF · max 8MB</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              void onFile(f ?? null);
              e.target.value = "";
            }}
          />
        </label>
      )}

      {value && !value.startsWith("/api/uploads/") && (
        <p className="break-all text-[10px] text-steel">URL: {value}</p>
      )}

      {toast && (
        <p
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            toast.type === "success" ? "bg-green-500/15 text-green-300" : "bg-red-500/15 text-red-300"
          )}
          role="status"
        >
          {toast.message}
        </p>
      )}
    </div>
  );
}
