import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
} from "@mui/material";

const EditOrderPage = ({ open, order, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState(order || {});

  useEffect(() => {
    setEditedOrder(order || {});
  }, [order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedOrder);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginTop: "auto" }}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              name="productName"
              value={editedOrder.productName || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              type="number"
              name="price"
              value={editedOrder.price || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product"
              name="product"
              value={editedOrder.product || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={editedOrder.location || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              type="number"
              name="quantity"
              value={editedOrder.quantity || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Status"
              name="status"
              value={editedOrder.status || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrderPage;
