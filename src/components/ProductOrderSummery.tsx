import { Box, Divider, Paper, Typography } from "@mui/material";
import type { ProductType } from "../services/json/ProductOrderForm.json";


interface Props {
  product: ProductType | undefined;
  quantity: number;
}

const ProductOrderSummary = ({ product, quantity }: Props) => {
  const totalPrice = product ? product.price * quantity : 0;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {product ? (
        <>
          <Box sx={{display:"flex", justifyContent:"space-between",mb:2}}>
            <Typography color="text.secondary">Product</Typography>
            <Typography sx={{fontWeight:600}} >{product.name}</Typography>
          </Box>

          <Box sx={{display:"flex", justifyContent:"space-between",mb:2}}>
            <Typography color="text.secondary">Unit Price</Typography>
            <Typography>
              ₹{product.price.toLocaleString("en-IN")}
            </Typography>
          </Box>

          <Box sx={{display:"flex", justifyContent:"space-between",mb:2}}>
            <Typography color="text.secondary">Quantity</Typography>
            <Typography>{quantity}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <Typography sx={{fontWeight: 700}}>Total Price</Typography>

            <Typography variant="h6" color="primary.main" sx={{fontWeight: 700}}>
              ₹{totalPrice.toLocaleString("en-IN")}
            </Typography>
          </Box>
        </>
      ) : (
        <Typography color="text.secondary">
          Select a product to view your order summary.
        </Typography>
      )}
    </Paper>
  );
};

export default ProductOrderSummary;