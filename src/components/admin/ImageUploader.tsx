import { useState } from "react";
import { toast } from "sonner";
import { Upload, ImageIcon, Loader2, Film } from "lucide-react";
import { uploadSiteImage } from "@/lib/storage";

export function ImageUploader({
  value,
  onChange,
  folder,
  accept = "image/*",
  kind = "image",
}: {
  value: string;
  onChange: (url: string) => void;
  folder: "plots" | "projects" | "misc";
  accept?: string;
  kind?: "image" | "video";
}) {
  const [uploading, setUploading] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadSiteImage(file, folder);
      onChange(url);
      toast.success(`${kind === "video" ? "Video" : "Image"} uploaded`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-zinc-100 ring-1 ring-black/5 grid place-items-center">
          {value ? (
            kind === "video" ? (
              <video src={value} muted playsInline className="h-full w-full object-cover" />
            ) : (
              <img src={value} alt="" className="h-full w-full object-cover" />
            )
          ) : kind === "video" ? (
            <Film className="size-6 text-zinc-300" />
          ) : (
            <ImageIcon className="size-6 text-zinc-300" />
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium ring-1 ring-black/10 hover:ring-brand/40">
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {uploading ? "Uploading…" : `Upload ${kind}`}
          <input type="file" accept={accept} className="hidden" onChange={onFile} disabled={uploading} />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-600 hover:underline"
          >
            Remove
          </button>
        )}
      </div>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Or paste a ${kind} URL`}
        className="w-full rounded-lg bg-white px-3 py-2 ring-1 ring-black/10 text-xs outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  );
}
