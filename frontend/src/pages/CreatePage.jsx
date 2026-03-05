import { Link, useNavigate } from "react-router";
import { useCreateProduct } from "../hook/useProducts";
import { useState } from "react";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SparklesIcon,
  TypeIcon,
  PackageIcon,
  EyeIcon,
} from "lucide-react";

function CreatePage() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct.mutate(formData, { onSuccess: () => navigate("/") });
  };

  const hasPreview = formData.title || formData.description || formData.imageUrl;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="btn btn-ghost btn-sm gap-1.5 text-base-content/60 hover:text-base-content">
          <ArrowLeftIcon className="size-4" />
          Back
        </Link>
        <div className="flex items-center gap-2 text-base-content/40 text-xs">
          <EyeIcon className="size-3.5" />
          Live preview
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">

        {/* ── FORM ── */}
        <div className="space-y-2">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                <SparklesIcon className="size-4 text-primary" />
              </div>
              <h1 className="text-xl font-extrabold tracking-tight">Create a Product</h1>
            </div>
            <p className="text-xs text-base-content/40 ml-9">
              Fill in the details and watch your listing come to life.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-base-content/50 uppercase tracking-wider flex items-center gap-1.5">
                <TypeIcon className="size-3" />
                Title
              </label>
              <input
                type="text"
                placeholder="Give your product a great name…"
                className="input input-bordered w-full bg-base-200 focus:border-primary/60 transition-colors text-sm"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-base-content/50 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="size-3" />
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full bg-base-200 focus:border-primary/60 transition-colors text-sm"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-base-content/50 uppercase tracking-wider flex items-center gap-1.5">
                <FileTextIcon className="size-3" />
                Description
              </label>
              <textarea
                placeholder="Describe what makes your product special…"
                className="textarea textarea-bordered w-full bg-base-200 focus:border-primary/60 transition-colors text-sm min-h-32 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            {createProduct.isError && (
              <div role="alert" className="alert alert-error py-2 text-sm">
                <span>Failed to create product. Please try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full mt-2 gap-2"
              disabled={createProduct.isPending}
            >
              {createProduct.isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <SparklesIcon className="size-4" />
                  Publish Product
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── LIVE PREVIEW ── */}
        <div className="lg:sticky lg:top-6">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider mb-3">
            Preview
          </p>

          <div className="bg-base-300 rounded-2xl overflow-hidden border border-white/5 transition-all duration-300">
            {/* Image area */}
            <div className="relative h-52 bg-base-200 flex items-center justify-center overflow-hidden">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              {/* Fallback placeholder */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-base-content/20"
                style={{ display: formData.imageUrl ? "none" : "flex" }}
              >
                <ImageIcon className="size-10" />
                <span className="text-xs">Image preview</span>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-base-300/10 to-transparent" />
            </div>

            {/* Text area */}
            <div className="p-5 space-y-2">
              {formData.title ? (
                <h2 className="font-bold text-base leading-snug">{formData.title}</h2>
              ) : (
                <div className="h-5 w-2/3 bg-base-200 rounded-md animate-pulse" />
              )}

              {formData.description ? (
                <p className="text-xs text-base-content/50 leading-relaxed line-clamp-3">
                  {formData.description}
                </p>
              ) : (
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-base-200 rounded animate-pulse" />
                  <div className="h-3 w-4/5 bg-base-200 rounded animate-pulse" />
                </div>
              )}

              {/* Fake author row */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/5 mt-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <PackageIcon className="size-3 text-primary/60" />
                </div>
                <span className="text-xs text-base-content/30">You</span>
              </div>
            </div>
          </div>

          {!hasPreview && (
            <p className="text-center text-xs text-base-content/25 mt-4">
              Start typing to see a live preview →
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePage;