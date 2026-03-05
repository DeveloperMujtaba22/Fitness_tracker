import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SaveIcon,
  TypeIcon,
  CheckCircleIcon,
  Pencil,
} from "lucide-react";

function EditProductForm({ product, onSubmit, isPending, isError }) {
  // Guard: if product is not yet available, render nothing
  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
  });

  const [saved, setSaved] = useState(false);

  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const hasChanges =
    formData.title !== product.title ||
    formData.description !== product.description ||
    formData.imageUrl !== product.imageUrl;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to={`/product/${product.id}`} className="btn btn-ghost btn-sm gap-1">
          <ArrowLeftIcon className="size-4" /> Back
        </Link>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Pencil className="size-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">Edit Product</h1>
            <p className="text-xs text-base-content/50 mt-0.5">Update your listing details</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* ── FORM ── */}
        <div className="card bg-base-300">
          <div className="card-body gap-4">
            <h2 className="font-semibold text-sm text-base-content/60 uppercase tracking-wide">
              Product Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div className="form-control gap-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <TypeIcon className="size-3.5 text-primary" />
                  Title
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-base-200 focus:border-primary transition-colors"
                  placeholder="Product title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              {/* Image URL */}
              <div className="form-control gap-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <ImageIcon className="size-3.5 text-primary" />
                  Image URL
                </label>
                <input
                  type="url"
                  className="input input-bordered bg-base-200 focus:border-primary transition-colors"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-control gap-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <FileTextIcon className="size-3.5 text-primary" />
                  Description
                </label>
                <textarea
                  className="textarea textarea-bordered bg-base-200 min-h-32 focus:border-primary transition-colors resize-none"
                  placeholder="Describe your product..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              {isError && (
                <div role="alert" className="alert alert-error alert-sm py-2">
                  <span className="text-sm">Failed to update. Please try again.</span>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-2 pt-1">
                <Link to={`/product/${product.id}`} className="btn btn-ghost btn-sm flex-1">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className={`btn btn-sm flex-1 gap-1.5 ${saved ? "btn-success" : "btn-primary"}`}
                  disabled={isPending || !hasChanges}
                >
                  {isPending ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : saved ? (
                    <>
                      <CheckCircleIcon className="size-4" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <SaveIcon className="size-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>

              {!hasChanges && (
                <p className="text-center text-xs text-base-content/40">No changes made yet</p>
              )}
            </form>
          </div>
        </div>

        {/* ── LIVE PREVIEW ── */}
        <div className="space-y-3">
          <div className="card bg-base-300">
            <div className="card-body gap-3 p-4">
              <h2 className="font-semibold text-sm text-base-content/60 uppercase tracking-wide">
                Live Preview
              </h2>

              <div className="rounded-xl overflow-hidden bg-base-200 h-44 flex items-center justify-center">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-base-content/30">
                    <ImageIcon className="size-10" />
                    <span className="text-xs">Image preview</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-base">
                  {formData.title || (
                    <span className="text-base-content/30 font-normal italic">Product title...</span>
                  )}
                </h3>
                <p className="text-sm text-base-content/60 line-clamp-3">
                  {formData.description || (
                    <span className="italic text-base-content/30">Description will appear here...</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {hasChanges && (
            <div className="alert alert-warning alert-sm py-2">
              <span className="text-xs">⚠ You have unsaved changes</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProductForm;