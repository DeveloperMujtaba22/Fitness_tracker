import { Link } from "react-router";
import { MessageCircleIcon, ArrowUpRightIcon } from "lucide-react";

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

const ProductCard = ({ product }) => {
  const isNew = new Date(product.createdAt) > oneWeekAgo;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col bg-base-300 rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-base-300/20 to-transparent" />

        {isNew && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-primary text-primary-content px-2 py-1 rounded-md shadow-lg">
              New
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <ArrowUpRightIcon className="size-4 text-primary-content" />
          </div>
        </div>

        {product.comments?.length > 0 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white/70 text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
            <MessageCircleIcon className="size-3" />
            {product.comments.length}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 pb-4 pt-3 gap-2">
        <h2 className="font-bold text-base leading-snug line-clamp-1 group-hover:text-primary transition-colors duration-200">
          {product.title}
        </h2>

        <p className="text-xs text-base-content/50 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {product.user && (
          <div className="flex items-center gap-2 pt-2 border-t border-white/5 mt-1">
            <div className="avatar">
              <div className="w-5 h-5 rounded-full ring-1 ring-primary/40">
                <img src={product.user.imageUrl} alt={product.user.name} />
              </div>
            </div>
            <span className="text-xs text-base-content/50 font-medium truncate">
              {product.user.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;