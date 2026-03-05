import { Link } from "react-router";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";
import { PlusIcon, UserIcon, Sparkles } from "lucide-react";

function Navbar() {
    const { isSignedIn } = useAuth();

    return (
        <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 shadow-lg shadow-emerald-950/60 border-b border-emerald-800/30">
            {/* shimmer accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

                {/* LOGO — always visible on all screen sizes */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img
                        src="/logo1.png"
                        alt="Productify Logo"
                        className="h-30 w-auto object-contain"
                    />
                </Link>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-2">
                    {isSignedIn ? (
                        <>
                            <Link
                                to="/create"
                                className="btn btn-sm gap-1.5 bg-emerald-500 hover:bg-emerald-400 border-none text-white font-semibold shadow-md shadow-emerald-700/40 hover:shadow-emerald-400/60 transition-all duration-300"
                            >
                                <PlusIcon className="size-3.5" />
                                <span className="hidden sm:inline">New Product</span>
                                <span className="sm:hidden">New</span>
                            </Link>

                            <Link
                                to="/profile"
                                className="btn btn-sm btn-ghost gap-1.5 text-emerald-200 hover:text-white hover:bg-white/10 border-none transition-all duration-200"
                            >
                                <UserIcon className="size-4" />
                                <span className="hidden md:inline">Profile</span>
                            </Link>

                            <div className="pl-1">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-8 h-8 ring-2 ring-emerald-400/40 hover:ring-emerald-300 transition-all duration-300",
                                        },
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <SignInButton mode="modal">
                                <button className="btn btn-sm btn-ghost text-emerald-200 hover:text-white hover:bg-white/10 border-none">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="btn btn-sm gap-1.5 bg-emerald-500 hover:bg-emerald-400 border-none text-white font-semibold shadow-md shadow-emerald-700/40">
                                    <Sparkles className="size-3.5" />
                                    <span className="hidden sm:inline">Get Started</span>
                                    <span className="sm:hidden">Join</span>
                                </button>
                            </SignUpButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;