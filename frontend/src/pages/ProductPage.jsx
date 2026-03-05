import {
  ArrowLeftIcon,
  EditIcon,
  Trash2Icon,
  CalendarIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  TagIcon,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import CommentsSection from "../components/CommentsSection";
import { useAuth } from "@clerk/clerk-react";
import { useProduct, useDeleteProduct } from "../hook/useProducts";
import { useParams, Link, useNavigate } from "react-router";

function ProductPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(id);
  const deleteProduct = useDeleteProduct();

  const handleDelete = () => {
    if (confirm("Delete this product permanently?")) {
      deleteProduct.mutate(id, { onSuccess: () => navigate("/") });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto mt-20">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Product not found</h2>
          <Link to="/" className="btn btn-primary btn-sm">Go Home</Link>
        </div>
      </div>
    );
  }

  const isOwner = userId === product.userId;
  const formattedDate = new Date(product.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* ── HERO SECTION ── */}
      <div className="relative rounded-3xl overflow-hidden min-h-96">

        {/* Full-bleed image */}
        <img
          src={product.imageUrl}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* Top bar: back + actions */}
        <div className="relative z-10 flex items-center justify-between p-5">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full"
          >
            <ArrowLeftIcon className="size-3.5" />
            Back
          </Link>

          {isOwner && (
            <div className="flex gap-2">
              <Link
                to={`/edit/${product.id}`}
                className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full transition-colors"
              >
                <EditIcon className="size-3.5" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleteProduct.isPending}
                className="flex items-center gap-1.5 text-red-300 hover:text-red-200 text-sm font-medium bg-red-500/15 backdrop-blur-sm border border-red-400/20 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
              >
                {deleteProduct.isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Trash2Icon className="size-3.5" />
                )}
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Bottom text content over image */}
        <div className="relative z-10 p-7 pt-24">
          {/* Tag line */}
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest bg-primary/20 border border-primary/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
              <TagIcon className="size-3" />
              Product
            </span>
            {isOwner && (
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full backdrop-blur-sm">
                Your listing
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-2xl">
            {product.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="size-3.5" />
              {formattedDate}
            </span>
            {product.comments && (
              <span className="flex items-center gap-1.5">
                <MessageCircleIcon className="size-3.5" />
                {product.comments.length} comment{product.comments.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Description — 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-300 rounded-2xl border border-white/5 p-6">
            <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider mb-4">
              About this product
            </p>
            <p className="text-base text-base-content/80 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Comments */}
          <div className="bg-base-300 rounded-2xl border border-white/5 p-6">
            <CommentsSection
              productId={id}
              comments={product.comments}
              currentUserId={userId}
            />
          </div>
        </div>

        {/* Sidebar — 1/3 width */}
        <div className="space-y-4">

          {/* Creator card */}
          {product.user && (
            <div className="bg-base-300 rounded-2xl border border-white/5 p-5 space-y-4">
              <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider">
                Creator
              </p>

              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring-2 ring-primary/40 ring-offset-2 ring-offset-base-300">
                    <img src={product.user.imageUrl} alt={product.user.name} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{product.user.name}</p>
                  <p className="text-xs text-base-content/40 flex items-center gap-1 mt-0.5">
                    <ShieldCheckIcon className="size-3 text-primary" />
                    Verified Creator
                  </p>
                </div>
              </div>

              {isOwner && (
                <div className="bg-primary/10 border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary font-medium flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  This is your listing
                </div>
              )}
            </div>
          )}

          {/* Quick stats */}
          <div className="bg-base-300 rounded-2xl border border-white/5 p-5 space-y-3">
            <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider">
              Details
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-base-content/50 flex items-center gap-1.5">
                  <CalendarIcon className="size-3.5" />
                  Listed on
                </span>
                <span className="font-medium text-xs">
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </span>
              </div>

              <div className="divider my-0 opacity-20" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-base-content/50 flex items-center gap-1.5">
                  <MessageCircleIcon className="size-3.5" />
                  Comments
                </span>
                <span className="font-bold text-primary">
                  {product.comments?.length ?? 0}
                </span>
              </div>
            </div>
          </div>

          {/* Owner actions (repeated for sidebar convenience) */}
          {isOwner && (
            <div className="bg-base-300 rounded-2xl border border-white/5 p-5 space-y-2">
              <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider mb-3">
                Actions
              </p>
              <Link
                to={`/edit/${product.id}`}
                className="btn btn-outline btn-sm w-full gap-1.5"
              >
                <EditIcon className="size-3.5" />
                Edit Product
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleteProduct.isPending}
                className="btn btn-error btn-outline btn-sm w-full gap-1.5"
              >
                {deleteProduct.isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Trash2Icon className="size-3.5" />
                )}
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;