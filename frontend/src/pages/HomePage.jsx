import { Link } from "react-router";
import { useProducts } from "../hook/useProducts";
import { PlusIcon, TrendingUp, Zap, Users, Star, ArrowRight, Activity, PackageIcon } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import Product from "../components/Product";

// ─── Loading Spinner ──────────────────────────────────────────────────────────
const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <span className="loading loading-ring loading-lg text-emerald-400" />
        <p className="text-emerald-300/60 text-sm tracking-widest uppercase">Loading products…</p>
    </div>
);

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product }) => (
    <Link
        to={`/product/${product.id}`}
        className="group card bg-slate-800/60 border border-slate-700/50 hover:border-emerald-500/40 shadow-md hover:shadow-emerald-900/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
        {product.imageUrl && (
            <figure className="relative overflow-hidden h-48">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
            </figure>
        )}

        <div className="card-body p-4 gap-2">
            <h3 className="card-title text-white text-base font-semibold group-hover:text-emerald-300 transition-colors line-clamp-1">
                {product.title}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                {product.description}
            </p>

            {product.user && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700/50">
                    {product.user.imageUrl ? (
                        <img
                            src={product.user.imageUrl}
                            alt={product.user.name}
                            className="w-5 h-5 rounded-full ring-1 ring-emerald-500/40"
                        />
                    ) : (
                        <div className="w-5 h-5 rounded-full bg-emerald-800 flex items-center justify-center text-[10px] text-emerald-300 font-bold">
                            {product.user.name?.[0]?.toUpperCase() ?? "?"}
                        </div>
                    )}
                    <span className="text-slate-500 text-xs truncate">{product.user.name}</span>
                    <span className="ml-auto flex items-center gap-0.5 text-yellow-400 text-xs">
                        <Star className="size-3 fill-yellow-400" /> 4.8
                    </span>
                </div>
            )}
        </div>
    </Link>
);

// ─── Stat Badge ───────────────────────────────────────────────────────────────
const StatBadge = ({ icon: Icon, label, value, color }) => (
    <div className={`flex items-center gap-3 bg-slate-800/70 border ${color} rounded-xl px-4 py-3 backdrop-blur-sm`}>
        <div className={`p-2 rounded-lg bg-slate-700/60`}>
            <Icon className="size-4 text-emerald-400" />
        </div>
        <div>
            <p className="text-white font-bold text-lg leading-none">{value}</p>
            <p className="text-slate-400 text-xs mt-0.5">{label}</p>
        </div>
    </div>
);

// ─── HomePage ─────────────────────────────────────────────────────────────────
const HomePage = () => {
    const { data: products, isLoading, error } = useProducts();
    const { isSignedIn } = useAuth();

    if (isLoading) return <LoadingSpinner />;

    if (error)
        return (
            <div role="alert" className="alert alert-error max-w-lg mx-auto mt-8">
                <span>Something went wrong. Please refresh the page.</span>
            </div>
        );

    return (
        <div className="min-h-screen">
            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden rounded-3xl mx-auto mt-6 mb-12 max-w-6xl">
                {/* BG layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/80 to-slate-900 rounded-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.18)_0%,_transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(5,150,105,0.12)_0%,_transparent_60%)]" />

                {/* Decorative grid */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(52,211,153,1) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,1) 1px,transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Floating orbs */}
                <div className="absolute top-8 right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-4 left-8 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative z-10 px-8 py-14 md:px-14 md:py-20 flex flex-col md:flex-row items-center gap-10">
                    {/* Left */}
                    <div className="flex-1 text-center md:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
                            <Activity className="size-3.5 animate-pulse" />
                            TRACK · IMPROVE · ACHIEVE
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                            Your Ultimate{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                                Fitness
                            </span>{" "}
                            Tracker
                        </h1>

                        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8 mx-auto md:mx-0">
                            Discover top-rated fitness tools, gear & apps shared by the community.
                            Level up your workout game — one product at a time.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <Link
                                to={isSignedIn ? "/create" : "#"}
                                className="btn bg-emerald-500 hover:bg-emerald-400 border-none text-white font-semibold gap-2 shadow-lg shadow-emerald-700/40 hover:shadow-emerald-400/50 transition-all duration-300"
                            >
                                <PlusIcon className="size-4" />
                                Share a Product
                            </Link>
                            <a
                                href="#products"
                                className="btn btn-outline border-emerald-700 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-400 gap-2 transition-all duration-300"
                            >
                                Explore Now
                                <ArrowRight className="size-4" />
                            </a>
                        </div>

                        {/* Stats row */}
                        <div className="flex flex-wrap gap-3 mt-10 justify-center md:justify-start">
                            <StatBadge icon={TrendingUp} label="Products Listed" value={`${products?.length ?? 0}+`} color="border-emerald-800/60" />
                            <StatBadge icon={Users} label="Active Users" value="1.2K" color="border-teal-800/60" />
                            <StatBadge icon={Zap} label="Avg Rating" value="4.8★" color="border-emerald-800/60" />
                        </div>
                    </div>

                    {/* Right — illustration */}
                    <div className="hidden md:flex flex-col items-center justify-center flex-shrink-0">
                        <div className="relative w-64 h-64">
                            {/* Pulsing ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" style={{ animationDuration: "3s" }} />
                            <div className="absolute inset-4 rounded-full border-2 border-emerald-400/30 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />

                            {/* Center circle */}
                            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/40 flex items-center justify-center backdrop-blur-sm">
                                <Activity className="size-16 text-emerald-400 drop-shadow-lg" strokeWidth={1.5} />
                            </div>

                            {/* Floating metric chips */}
                            {[
                                { label: "Steps", value: "12,430", pos: "top-2 -left-6" },
                                { label: "Calories", value: "842 kcal", pos: "bottom-4 -right-8" },
                                { label: "Heart Rate", value: "72 bpm", pos: "-bottom-2 left-0" },
                            ].map(({ label, value, pos }) => (
                                <div
                                    key={label}
                                    className={`absolute ${pos} bg-slate-800/90 border border-emerald-700/50 rounded-xl px-3 py-1.5 shadow-lg backdrop-blur-sm`}
                                >
                                    <p className="text-emerald-400 text-xs font-bold">{value}</p>
                                    <p className="text-slate-500 text-[10px]">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PRODUCTS SECTION ─────────────────────────────────────────── */}
            <section id="products" className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            All Product
                        </h2>
                        {products.length === 0 ? (
                          <div className="card bg-base-300">
                            <div className="card-body items-center py-16">
                            <PackageIcon className="size-16 text-base-content/20 "/>
                            <h2>No Products yet</h2>
                            <p className="text-base-content/40 text-sm">Be the first to share something</p>
                            <Link to="/create" className="btn btn-primary btn-sm mt-2">
                            Create Product
                            </Link>       
                            </div>
                          </div>
                        ):(
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  ">
                            {products.map((product)=>(
                              <Product key={product.id} product={product}/>
                            ))}
                          </div>
                        )}
                </div>
                </div>

              
            </section>
        </div>
    );
};

export default HomePage;