import { Link, useNavigate } from "react-router";
import { useMyProducts, useDeleteProduct } from "../hook/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { useUser } from "@clerk/clerk-react";
import {
  PlusIcon,
  PackageIcon,
  EyeIcon,
  EditIcon,
  Trash2Icon,
  MessageCircleIcon,
  CalendarIcon,
  UserCircleIcon,
  MailIcon,
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { data: products, isLoading } = useMyProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id) => {
    if (confirm("Delete this product?")) deleteProduct.mutate(id);
  };

  if (isLoading) return <LoadingSpinner />;

  const totalComments = products?.reduce(
    (acc, p) => acc + (p.comments?.length || 0),
    0
  ) ?? 0;

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* ── PROFILE HEADER ── */}
      <div className="card bg-base-300">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="avatar">
              <div className="w-20 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.imageUrl} alt={user?.fullName} />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left space-y-1">
              <h1 className="text-2xl font-bold">{user?.fullName || user?.firstName}</h1>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start text-sm text-base-content/60">
                {user?.primaryEmailAddress && (
                  <span className="flex items-center gap-1">
                    <MailIcon className="size-3.5" />
                    {user.primaryEmailAddress.emailAddress}
                  </span>
                )}
                {joinedDate && (
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="size-3.5" />
                    Joined {joinedDate}
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <Link to="/create" className="btn btn-primary btn-sm gap-1 self-center sm:self-start">
              <PlusIcon className="size-4" /> New Product
            </Link>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats bg-base-300 w-full shadow stats-vertical sm:stats-horizontal">
        <div className="stat">
          <div className="stat-figure text-primary">
            <PackageIcon className="size-8" />
          </div>
          <div className="stat-title">My Products</div>
          <div className="stat-value text-primary">{products?.length ?? 0}</div>
          <div className="stat-desc">Total listings</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <MessageCircleIcon className="size-8" />
          </div>
          <div className="stat-title">Comments Received</div>
          <div className="stat-value text-secondary">{totalComments}</div>
          <div className="stat-desc">Across all products</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <UserCircleIcon className="size-8" />
          </div>
          <div className="stat-title">Account Status</div>
          <div className="stat-value text-accent text-2xl">Active</div>
          <div className="stat-desc">Verified member</div>
        </div>
      </div>

      {/* ── PRODUCTS LIST ── */}
      <div>
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <PackageIcon className="size-5 text-primary" />
          My Listings
        </h2>

        {!products || products.length === 0 ? (
          <div className="card bg-base-300">
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-16 text-base-content/20" />
              <h3 className="card-title text-base-content/50">No products yet</h3>
              <p className="text-base-content/40 text-sm">Start by creating your first product</p>
              <Link to="/create" className="btn btn-primary btn-sm mt-4">
                Create Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <div key={product.id} className="card card-side bg-base-300 hover:bg-base-200 transition-colors">
                <figure className="w-32 shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="card-title text-base">{product.title}</h2>
                      <p className="text-sm text-base-content/60 line-clamp-1 mt-0.5">
                        {product.description}
                      </p>
                    </div>
                    {product.comments?.length > 0 && (
                      <span className="badge badge-neutral badge-sm gap-1 shrink-0">
                        <MessageCircleIcon className="size-3" />
                        {product.comments.length}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-base-content/40">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                    <div className="card-actions">
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="btn btn-ghost btn-xs gap-1"
                      >
                        <EyeIcon className="size-3" /> View
                      </button>
                      <button
                        onClick={() => navigate(`/edit/${product.id}`)}
                        className="btn btn-ghost btn-xs gap-1"
                      >
                        <EditIcon className="size-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-ghost btn-xs text-error gap-1"
                        disabled={deleteProduct.isPending}
                      >
                        {deleteProduct.isPending ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          <Trash2Icon className="size-3" />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;