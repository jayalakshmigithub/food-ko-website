import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import Sidebar from "../Sidebar/Sidebar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import invoice from "../../assets/invoice.png";
import revenue from "../../assets/revenue.png";
import cancelled from "../../assets/cancelled.png";
import delivered from "../../assets/delivered.png";
import add from "../../assets/add.png";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);
import AddOrderPage from "../Orders/AddOrderPage";
import userAxiosInstance from "../../utils/axiosInstance";
import EditOrderPage from "../Orders/EditOrderPage";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [paginatedOrders, setPaginatedOrders] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalDelivered, setTotalDelivered] = useState(0);
  const [totalCancelled, setTotalCancelled] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortCriteria, setSortCriteria] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    fetchOrders();
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const metrics = [
    { label: "Total Order", value: 81, color: "primary" },
    { label: "Growth", value: 60, color: "secondary" },
    { label: "Total Revenue", value: 75, color: "success" },
  ];
  const [lineData, setLineData] = useState({
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Order",
        data: [0, 0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: "#42A5F5",
        tension: 0.1,
      },
    ],
  });

  const [revenueData, setRevenueData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "2020 Revenue",
        data: new Array(12).fill(0),
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "2021 Revenue",
        data: new Array(12).fill(0),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  });

  const fetchOrders = async () => {
    try {
      const response = await userAxiosInstance.get("/orders", {
        params: { page, rowsPerPage },
      });
      if (response && response.data && Array.isArray(response.data.orders)) {
        let fetchedOrders = response.data.orders;

        if (filterStatus !== "all") {
          fetchedOrders = fetchedOrders.filter(
            (order) => order.status === filterStatus
          );
        }

        fetchedOrders = fetchedOrders.sort((a, b) => {
          if (sortCriteria === "date") {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
          } else if (sortCriteria === "price") {
            return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
          }
          return 0;
        });

        const ordersPerDay = [0, 0, 0, 0, 0, 0, 0];
        fetchedOrders.forEach((order) => {
          const orderDate = new Date(order.date);
          const dayOfWeek = orderDate.getDay();
          ordersPerDay[dayOfWeek] += 1;
        });

        setLineData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: ordersPerDay,
            },
          ],
        }));

        const revenuePerMonth = new Array(12).fill(0);

        fetchedOrders.forEach((order) => {
          const orderDate = new Date(order.date);
          const month = orderDate.getMonth();
          revenuePerMonth[month] += order.price;
        });

        setRevenueData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: revenuePerMonth,
            },
          ],
        }));

        setOrders(fetchedOrders);
        setTotalOrders(response.data.totalOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus, sortCriteria, sortOrder, page, rowsPerPage]);


  

  const handleChangePage = (event, newPage) => {
    setPage(Math.max(0, newPage));
  };

  const totalPages = Math.ceil(orders.length / rowsPerPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const selectedOrders = orders.slice(startIndex, startIndex + rowsPerPage);
    setPaginatedOrders(selectedOrders);
  }, [orders, page, rowsPerPage]);

  useEffect(() => {
    let deliveredCount = 0;
    let cancelledCount = 0;
    let revenue = 0;

    orders.forEach((order) => {
      if (order.status === "delivered") {
        deliveredCount += 1;
      } else if (order.status === "cancelled") {
        cancelledCount += 1;
      }

      revenue += order.price;
    });

    setTotalDelivered(deliveredCount);
    setTotalCancelled(cancelledCount);
    setTotalRevenue(revenue);
  }, [orders]);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedOrder(null);
  };
  const handleSaveOrder = (updatedOrder) => {
    const saveOrder = async () => {
      try {
        const response = await userAxiosInstance.put(
          `/orders/${updatedOrder._id}`,
          updatedOrder
        );
        if (response.status === 200) {
          const updatedOrders = orders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          );
          setOrders(updatedOrders);
        }
      } catch (error) {
        console.error("Error saving order:", error);
      }
    };
    saveOrder();
  };


  const handleDeleteOrder = async (orderId) => {
    try {
     
      const confirmDelete = window.confirm("Are you sure you want to delete this order?");
      if (!confirmDelete) return;
  
     
      const response = await userAxiosInstance.delete(`/orders/${orderId}`);
      
      if (response.status === 200) {
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
        alert("Order deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order");
    }
  };
  
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "#ececed",
          width: "100%",
          height: "100vh",
          display: "flex",
          overflowX: "hidden",
        }}
      >
        <Sidebar sx={{ flexShrink: 0, width: "250px" }} />

        <Box sx={{ flexGrow: 1, padding: 3, overflowY: "auto" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4">Dashboard</Typography>
            <Typography>Hi, Samantha. Welcome back!</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={invoice}
                    alt="Invoice Image"
                    style={{
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                  <Box>
                    <Typography variant="h3" sx={{ fontFamily: "poppins" }}>
                      {totalOrders}
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: "poppins" }}>
                      Total Orders
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={delivered}
                    alt="delivered Image"
                    style={{
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                  <Box>
                    <Typography variant="h3" sx={{ fontFamily: "poppins" }}>
                      {totalDelivered}
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: "poppins" }}>
                      Total Delivered
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={cancelled}
                    alt="cancelled Image"
                    style={{
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                  <Box>
                    <Typography variant="h3" sx={{ fontFamily: "poppins" }}>
                      {totalCancelled}
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: "poppins" }}>
                      Total Cancelled
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={revenue}
                    alt="revenue Image"
                    style={{
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                  <Box>
                    <Typography variant="h3" sx={{ fontFamily: "poppins" }}>
                      ${totalRevenue}
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: "poppins" }}>
                      Total Revenue
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <Typography sx={{ padding: "15px", margin: "auto" }}>
                  Pie Chart
                </Typography>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  {metrics.map((metric, index) => (
                    <Box key={index} textAlign="center">
                      <Box position="relative" display="inline-flex">
                        <CircularProgress
                          variant="determinate"
                          value={metric.value}
                          color={metric.color}
                          size={100}
                          thickness={12}
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            color="textSecondary"
                          >
                            {`${metric.value}%`}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="subtitle1" gutterBottom>
                        {metric.label}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Chart Order
                  </Typography>
                  <Line data={lineData} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Line data={revenueData} height={50} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <Card>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      display: "flex",
                      padding: "8px",
                      marginLeft: "10px",
                      marginTop: "5px",
                      fontFamily: "poppins",
                    }}
                    variant="h6"
                    gutterBottom
                  >
                    Order List
                  </Typography>

                  <Box display="flex" gap={2} mb={3}>
                    <FormControl
                      variant="outlined"
                      size="small"
                      sx={{ minWidth: 150 }}
                    >
                      <InputLabel>Filter by Status</InputLabel>
                      <Select
                        value={filterStatus}
                        onChange={handleFilterChange}
                        label="Filter by Status"
                      >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl variant="outlined" size="small">
                      <InputLabel>Sort by</InputLabel>
                      <Select
                        value={sortCriteria}
                        onChange={handleSortCriteriaChange}
                        label="Sort by"
                      >
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                      </Select>
                    </FormControl>

                    <Button variant="outlined" onClick={handleSortOrderChange}>
                      Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
                    </Button>
                  </Box>
                </Box>

                <Button
                  sx={{
                    color: "green",
                    fontFamily: "poppins",
                    marginRight: "15px",
                    marginTop: "5px",
                    alignItems: "center",
                    display: "flex",
                    height: "2.5rem",
                    padding: "0 10px",
                  }}
                  onClick={handleOpen}
                >
                  <img
                    src={add}
                    alt="addImage"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      marginRight: "8px",
                      marginTop: "auto",
                      padding: "8px",
                    }}
                  />
                  Add Order
                </Button>
                <AddOrderPage open={openModal} handleClose={handleClose} />
              </Box>

              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#E5E4E2" }}>
                        <TableCell>Date</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedOrders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {new Date(order.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{order.orderId}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>{order.productName}</TableCell>
                          <TableCell>{order.price}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{order.location}</TableCell>
                          <TableCell
                            sx={{
                              backgroundColor:
                                order.status === "pending"
                                  ? "orange"
                                  : order.status === "cancelled"
                                  ? "red"
                                  : order.status === "delivered"
                                  ? "green"
                                  : "transparent",
                              color: "white",
                              marginTop: "10px",
                              textAlign: "center",
                              padding: "8px 16px",
                              borderRadius: "12px",
                              display: "inline-block",
                              fontWeight: "bold",
                              textTransform: "capitalize",
                              cursor: "pointer",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                              "&:hover": {
                                opacity: 0.8,
                              },
                            }}
                          >
                            {order.status}
                            {console.log(order.status)}
                          </TableCell>

                          <TableCell>
                            <Button color="primary">
                              <FaRegEdit
                                style={{ fontSize: "24px", color: "orange" }}
                                onClick={() => handleEditClick(order)}
                              />
                            </Button>
                            <EditOrderPage
                              open={isEditModalOpen}
                              order={selectedOrder}
                              onClose={handleModalClose}
                              onSave={handleSaveOrder}
                            />

                            <Button color="secondary">
                              <RiDeleteBin6Line
                                style={{ fontSize: "24px", color: "red" }}
                                onClick={() => handleDeleteOrder(order.orderId)}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[8]}
                  component="div"
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={Math.min(page, totalPages - 1)}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
