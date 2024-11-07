import orderModel from "../model/orderModel.js";


const createOrder = async (orderData) => {
    try {
        const existingOrder = await orderModel.findOne({ orderId: orderData.orderId });
        if (existingOrder) {
            throw new Error('Order ID already exists');
        }
        const newOrder = new orderModel(orderData);
        return await newOrder.save();
    } catch (error) {
        throw new Error('Error creating order: ' + error.message);
    }
};

    const getAllOrders = async (page, rowsPerPage) => {
        const skip = page * rowsPerPage;
        
      
        const orders = await orderModel.find()
        .skip(skip)
        .limit(rowsPerPage);
        
       
        const totalOrders = await orderModel.countDocuments();
        
        return { orders, totalOrders };
    };
    
    
    const findOrderById = async (orderId) => {
        return await orderModel.findById(orderId);
    };
const updateOrder = async (orderId, updatedData) => {
    return await orderModel.findByIdAndUpdate(orderId, updatedData, { new: true });
};


const deleteOrder = async (orderId) => {
    return await orderModel.findByIdAndDelete(orderId);
};

export  {
    createOrder,
    findOrderById,
    getAllOrders,
    updateOrder,
    deleteOrder
};