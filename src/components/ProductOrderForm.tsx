

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


// import {
//   inputFieldsData,
//   products,
//   type OrderFormData,
// } from "../services/json/ProductOrderForm.json";


import {
  inputFieldsData,
  products,
} from "../services/json/ProductOrderForm.json";

import orderSchema, {
  type OrderFormData,
} from "../services/validation/productOrderFormSchema";


import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useCallback, useMemo } from "react";
import ProductOrderSummary from "./ProductOrderSummery";
import { toast } from "sonner";

const ProductOrderForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      quantity: 1,
      productId: 0,
    },
  });

  // Watch product and quantity
  const productId = watch("productId");
  const quantity = watch("quantity");

  // Find selected product using useMemo
  const selectedProduct = useMemo(
    () => products.find((product) => product.id === Number(productId)),
    [productId],
  );

  // Handle form submission
  const onSubmit = useCallback(
    async (data: OrderFormData) => {
      try {
        console.log("Order Details:", data);

        toast.success("Your order has been placed successfully!");

        reset();
      } catch (error) {
        console.error("Order submission failed:", error);

        toast.error("Something went wrong. Please try again.");
      }
    },
    [reset],
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 4, md: 6 },
        px: 2,
      }}
    >
      {/* Main Layout */}
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1.5fr 1fr",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* Left Side - Product Order Form */}
        <Paper
          sx={{
            p: { xs: 3, sm: 4 },
          }}
        >
          <Typography variant="h4" sx={{ mb: 1 }}>
            Product Order Form
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Enter your details and select a product to place your order.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            {/* Dynamic Input Fields */}
            {inputFieldsData.map((input) => (
              <TextField
                key={input.name}
                label={input.label}
                type={input.type}
                placeholder={input.placeholder}
                {...register(
                  input.name,
                  input.name === "quantity" ? { valueAsNumber: true } : {},
                )}
                slotProps={{
                  htmlInput:
                    input.name === "quantity" ? { min: 1, step: 1 } : {},
                }}
                error={!!errors[input.name]}
                helperText={errors[input.name]?.message}
              />
            ))}

            {/* Product Dropdown */}
            <Controller
              name="productId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Select Product"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  error={!!errors.productId}
                  helperText={errors.productId?.message}
                >
                  <MenuItem value={0} disabled>
                    <em>Select a product</em>
                  </MenuItem>

                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name} — ₹{product.price.toLocaleString("en-IN")}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" variant="contained" size="large">
              Place Order
            </Button>
          </Box>
        </Paper>

        {/* Right Side - Product Summary */}
        <ProductOrderSummary
          product={selectedProduct}
          quantity={Number(quantity) || 0}
        />
      </Box>
    </Box>
  );
};

export default ProductOrderForm;
