import * as orderService from '../services/orderServices.js'





const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = await orderService.createOrder(orderData);

        res.status(201).json({
            message: 'Order created successfully!',
            order: newOrder 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};





const getAllOrders = async (req, res) => {
    try {
        
        const page = parseInt(req.query.page) || 0;  
        const rowsPerPage = parseInt(req.query.rowsPerPage) || 4;  

        const { orders, totalOrders } = await orderService.getAllOrders(page, rowsPerPage);

        
        res.status(200).json({
            orders,  
            totalOrders,  
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};


const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderService.getOrderById(orderId);
       

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch order', error: error.message });
    }
};


const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedData = req.body;

        const updatedOrder = await orderService.updateOrder(orderId, updatedData);

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
};


const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await orderService.deleteOrder(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
};

export {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};