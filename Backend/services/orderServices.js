import * as orderRepository from '../repository/orderRepository.js'

const createOrder = async (orderData) => {
    try {
       
        const newOrder = await orderRepository.createOrder(orderData);
        return newOrder;
    } catch (error) {
        throw new Error('Error creating order: ' + error.message);
    }
};




const getAllOrders = async (page, rowsPerPage) => {
    try {
     
        const { orders, totalOrders } = await orderRepository.getAllOrders(page, rowsPerPage);

    
        return { orders, totalOrders };
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
    }
};


const getOrderById = async (orderId) => {
    try {
        const order = await orderRepository.findOrderById(orderId);
        return order;
    } catch (error) {
        throw new Error('Error fetching order: ' + error.message);
    }
};


const updateOrder = async (orderId, updatedData) => {
    try {
        const updatedOrder = await orderRepository.updateOrder(orderId, updatedData);
        return updatedOrder;
    } catch (error) {
        throw new Error('Error updating order: ' + error.message);
    }
};


const deleteOrder = async (orderId) => {
    try {
        const deletedOrder = await orderRepository.deleteOrder(orderId);
        return deletedOrder;
    } catch (error) {
        throw new Error('Error deleting order: ' + error.message);
    }
};

export {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};