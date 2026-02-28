import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../lib/api"

export const useProducts = () => {
   return useQuery({
     queryKey: ["products"],
     queryFn: getProducts,
     select: (data) => data?.products ?? data ?? [], // ← response se array nikaalo
   })
}