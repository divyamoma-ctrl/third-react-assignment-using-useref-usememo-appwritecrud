import ProductOrderForm from "../components/ProductOrderForm";


import { Toaster } from "sonner";

const ProductForm = () => {
  return (
    <>
     <Toaster position="top-right" richColors />
    <ProductOrderForm/>
    </>
  )
}

export default ProductForm
