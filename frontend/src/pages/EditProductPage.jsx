import { useNavigate, useParams, Link } from "react-router";
import { useProduct, useUpdateProduct } from "../hook/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";
import { useAuth } from "@clerk/clerk-react";

function EditProductPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(id);
  const updateProduct = useUpdateProduct();

  // Still fetching
  if (isLoading) return <LoadingSpinner />;

  // Fetch error
  if (error) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto mt-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Failed to load product</h2>
          <Link to="/" className="btn btn-primary btn-sm mt-2">Go Home</Link>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto mt-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Product not found</h2>
          <Link to="/" className="btn btn-primary btn-sm mt-2">Go Home</Link>
        </div>
      </div>
    );
  }

  // Not the owner — let backend enforce it too, but show friendly message
  if (userId && product.userId && product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto mt-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Access Denied</h2>
          <p className="text-sm text-base-content/60">You can only edit your own products.</p>
          <Link to={`/product/${id}`} className="btn btn-primary btn-sm mt-2">View Product</Link>
        </div>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { id, ...formData },
          { onSuccess: () => navigate(`/product/${id}`) }
        );
      }}
    />
  );
}

export default EditProductPage;