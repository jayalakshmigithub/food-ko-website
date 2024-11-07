import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,  
    },
    date: {
        type: Date,
        default: Date.now, 
    },
    customerName: {
        type: String,
        required: true,  
    },
    product: {
      type: String,  
      required: true,
  },
  productName: {
      type: String, 
      required: true,
  },
    quantity: {
        type: Number,
        required: true,  
        min: 1,  
    },
    price: {
        type: Number,
        required: true,  
        min: 0,  
    },
    location: {
        type: String,
        required: true,  
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'delivered'],  
        default: 'pending',  
    },
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel
