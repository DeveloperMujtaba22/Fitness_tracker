import { useProducts } from "../hook/useProducts"

const HomePage = () => {
 const {data:products,isLoading , error } =  useProducts
 if(isLoading) return <LoadingSpinner/>;

 if(error) {
     return (    
    <div role="alert" className="alert alert-error">
      <span>Something went wrong. Please refresh the page. </span>
    </div>
  )
 };
 return <div>HomePage</div>
 
}

export default HomePage