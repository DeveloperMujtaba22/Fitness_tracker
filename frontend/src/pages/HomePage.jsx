import { useProducts } from "../hook/useProducts";
import { PackageIcon, SparklesIcon, ZapIcon, HeartIcon, TrendingUpIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import { SignInButton, useAuth } from "@clerk/clerk-react";

const stats = [
  { icon: HeartIcon,      label: "Active Users",   value: "12K+" },
  { icon: ZapIcon,        label: "Workouts Logged", value: "98K+" },
  { icon: TrendingUpIcon, label: "Goals Reached",   value: "5K+"  },
];

function HomePage() {
  const { data, isLoading, error } = useProducts();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
    ? data.products
    : [];

  if (isLoading) return <LoadingSpinner />;

if (error) {
  return (
    <div role="alert" className="alert alert-error">
      <span>Something went wrong: {error?.message}</span>
    </div>
  );
}

  return (
    <div className="space-y-10">
      {/* ── HERO ── */}
      <div className="hero bg-gradient-to-br from-base-300 via-base-200 to-base-300 rounded-box overflow-hidden">
        <div className="hero-content flex-col lg:flex-row gap-10 py-12 w-full items-end">

          {/* LEFT: Text */}
          <div className="text-center lg:text-left flex-1 space-y-5 pb-4">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
              <ZapIcon className="size-3" />
              #1 Fitness Marketplace
            </span>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Track. Train.{" "}
              <span className="text-primary relative">
                Dominate.
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path
                    d="M1 5.5 Q50 1 100 5.5 Q150 10 199 5.5"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" fill="none" opacity="0.4"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base-content/60 text-base max-w-md">
              Discover top-rated fitness gear, workout plans, and nutrition
              products — all in one place. Built for athletes who never quit.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {isSignedIn ? (
                <button onClick={() => navigate("/create")} className="btn btn-primary gap-2">
                  <SparklesIcon className="size-4" />
                  Start Selling
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="btn btn-primary gap-2">
                    <SparklesIcon className="size-4" />
                    Start Selling
                  </button>
                </SignInButton>
              )}
              <Link to="/" className="btn btn-outline gap-2">
                <PackageIcon className="size-4" />
                Browse Products
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-2">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-none">{value}</p>
                    <p className="text-xs text-base-content/50">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Floating character — hidden on mobile, visible on lg+ */}
          <div className="hidden lg:flex relative flex-1 justify-center items-end self-end">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/15 blur-3xl rounded-full" />
            <img
              src="/image.png"
              alt="Fitness Trainer"
              className="relative z-10 h-72 lg:h-89 object-contain drop-shadow-2xl"
              style={{ marginBottom: "-2.5rem" }}
            />
          </div>

        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <PackageIcon className="size-5 text-primary" />
          All Products
        </h2>

        {products.length === 0 ? (
          <div className="card bg-base-300">
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-16 text-base-content/20" />
              <h3 className="card-title text-base-content/50">No products yet</h3>
              <p className="text-base-content/40 text-sm">Be the first to share something!</p>
              <Link to="/create" className="btn btn-primary btn-sm mt-2">
                Create Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;