import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  CssBaseline,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userAxiosInstance from "../../utils/axiosInstance";

const AddOrderPage = ({ open, handleClose }) => {
  const [orderData, setOrderData] = useState({
    orderId: "",
    customerName: "",
    product: "",
    productName: "",
    quantity: "",
    price: "",
    location: "",
    status: "pending",
  });
  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);

  const products = [
    { id: "1", name: "Pizza" },
    { id: "2", name: "Burger" },
    { id: "3", name: "Pasta" },
    { id: "4", name: "Salad" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleProductChange = (e) => {
    const selectedProduct = products.find(
      (product) => product.id === e.target.value
    );
    setOrderData({
      ...orderData,
      product: selectedProduct.id,
      productName: selectedProduct.name,
     
    });
  };

  const handleQuantityChange = (e) => {
    setOrderData({ ...orderData, quantity: e.target.value });
  };

 

  const validateForm = () => {
    const errors = {};
    if (!orderData.orderId) errors.orderId = "Order ID is required";
    if (!orderData.customerName)
      errors.customerName = "Customer Name is required";
    if (!orderData.product) errors.product = "Product is required";
    if (
      !orderData.quantity ||
      isNaN(orderData.quantity) ||
      orderData.quantity <= 0 ||
      !Number.isInteger(Number(orderData.quantity))
    ) {
      errors.quantity = "Quantity must be a positive whole number";
    }
    if (!orderData.price || isNaN(orderData.price))
      errors.price = "Price must be a number";
    if (!orderData.location || !/^[A-Za-z\s]+$/.test(orderData.location))
      errors.location = "Location must contain only letters";
    if (!orderData.status) errors.status = "Status is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await userAxiosInstance.post("/orders", orderData);
        toast.success("Order created successfully!");
        console.log("Order created:", response.data);

        setOrders((prevOrders) => [...prevOrders, response.data.order]);
        handleClose();
        resetForm();
      } catch (error) {
        toast.error(
          "Error creating order: " +
            (error.response ? error.response.data.message : error.message)
        );
      }
    } else {
      toast.error("Please fill out all fields correctly!");
    }
  };

  const resetForm = () => {
    setOrderData({
      orderId: "",
      customerName: "",
      product: "",
      productName: "",
      quantity: "",
      price: "",
      location: "",
      status: "pending",
    });
  };

  return (
    <>
      <CssBaseline />
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          resetForm();
        }}
      >
        <DialogTitle>Create Order</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Order */}
              <Grid item xs={12}>
                <TextField
                  label="Order ID"
                  name="orderId"
                  value={orderData.orderId}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={Boolean(errors.orderId)}
                  helperText={errors.orderId}
                />
              </Grid>

              {/* Customer */}
              <Grid item xs={12}>
                <TextField
                  label="Customer Name"
                  name="customerName"
                  value={orderData.customerName}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={Boolean(errors.customerName)}
                  helperText={errors.customerName}
                />
              </Grid>

              {/* Product */}
              <Grid item xs={12}>
                <FormControl fullWidth required error={Boolean(errors.product)}>
                  <InputLabel>Product</InputLabel>
                  <Select
                    name="product"
                    value={orderData.product}
                    onChange={handleProductChange}
                  >
                    <MenuItem value=" " sx={{ paddingLeft: 0 }}>
                      <em>Select Product</em>
                    </MenuItem>
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.product && (
                    <p style={{ color: "red" }}>{errors.product}</p>
                  )}
                </FormControl>
              </Grid>

              {/* Quantity */}
              <Grid item xs={12}>
                <TextField
                  label="Quantity"
                  type="number"
                  name="quantity"
                  value={orderData.quantity}
                  onChange={handleQuantityChange}
                  fullWidth
                  required
                  error={Boolean(errors.quantity)}
                  helperText={errors.quantity}
                  inputProps={{
                    step: "1",
                    min: "1",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Price"
                  type="number"
                  name="price"
                  value={orderData.price}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={Boolean(errors.price)}
                  helperText={errors.price}
                />
              </Grid>

              {/* Location */}
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  name="location"
                  value={orderData.location}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={Boolean(errors.location)}
                  helperText={errors.location}
                />
              </Grid>

              {/* Status */}
              <Grid item xs={12}>
                <FormControl fullWidth required error={Boolean(errors.status)}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={orderData.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                  </Select>
                  {errors.status && (
                    <p style={{ color: "red" }}>{errors.status}</p>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              resetForm();
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddOrderPage;
