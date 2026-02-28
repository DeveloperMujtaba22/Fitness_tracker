import { useProducts } from "../hook/useProducts"
import LoadingSpinner from "../components/LoadingSpinner"  // add this

const HomePage = () => {
  const {data:products, isLoading, error} = useProducts()  // also add () here!
  
  if(isLoading) return <LoadingSpinner/>;

  if(error) {
    return (    
      <div role="alert" className="alert alert-error">
        <span>Something went wrong. Please refresh the page.</span>
      </div>
    )
  };
  
  return <div>HomePage</div>
}

export default HomePage