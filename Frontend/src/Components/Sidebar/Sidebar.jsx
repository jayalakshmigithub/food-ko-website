import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, IconButton } from "@mui/material";
import {
  Menu,
  MenuItem,
  useProSidebar,
  Sidebar as ProSidebar,
} from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { LuHome } from "react-icons/lu";
import { MdOutlineChat } from "react-icons/md";
import { BsListColumnsReverse } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";
import { VscEdit } from "react-icons/vsc";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { MdOutlineFastfood } from "react-icons/md";
import { LuUser2 } from "react-icons/lu";
import { BiDetail } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CiWallet } from "react-icons/ci";
import picture1 from "../../assets/picture1.png";

const iconStyle = { color: "#357793" };

const Sidebar = () => {
  const { collapseSidebar } = useProSidebar();
  const handleMenuClick = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
    setDrawerOpen(false);
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", height: "auto", color: "black" }}>
      <ProSidebar
        className="app"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Menu>
          <MenuItem icon={<MenuOpenIcon onClick={collapseSidebar} />} />
          <MenuItem
            icon={<LuHome />}
            onClick={() => handleMenuClick("/dashboard")}
          >
            {" "}
            Dashboard{" "}
          </MenuItem>
          <MenuItem
            icon={<BsListColumnsReverse sx={iconStyle} />}
            onClick={() => handleMenuClick("/orderlist")}
          >
            {" "}
            Order List{" "}
          </MenuItem>
          <MenuItem
            icon={<MdOutlineInsertDriveFile sx={iconStyle} />}
            onClick={() => handleMenuClick("/orderdetails")}
          >
            {" "}
            Order Details{" "}
          </MenuItem>
          <MenuItem
            icon={<TbUsers sx={iconStyle} />}
            onClick={() => handleMenuClick("/dashboard")}
          >
            {" "}
            Customer{" "}
          </MenuItem>
          <MenuItem
            icon={<SiSimpleanalytics sx={iconStyle} />}
            onClick={() => handleMenuClick("/dashboard")}
          >
            {" "}
            Analytics
          </MenuItem>
          <MenuItem
            icon={<VscEdit sx={iconStyle} />}
            onClick={() => handleMenuClick("/dashboard")}
          >
            {" "}
            Reviews{" "}
          </MenuItem>
          <MenuItem
            icon={<MdOutlineFastfood sx={iconStyle} />}
            onClick={() => handleMenuClick("/dashboard")}
          >
            {" "}
            Foods{" "}
          </MenuItem>
          <MenuItem
            icon={<BiDetail sx={iconStyle} />}
            onClick={() => handleMenuClick("/dashboard")}
          >
            {" "}
            Food Details{" "}
          </MenuItem>
          <MenuItem
            icon={<LuUser2 sx={iconStyle} />}
            onClick={() => handleMenuClick("/dashboard")}
          >
            {" "}
            Customer Details{" "}
          </MenuItem>
          <MenuItem
            icon={<MdOutlineInsertDriveFile sx={iconStyle} />}
            onClick={() => handleMenuClick("/dashboard")}
          >
            {" "}
            Calender{" "}
          </MenuItem>
          <MenuItem
            icon={<IoCalendarNumberOutline sx={iconStyle} />}
            onClick={() => handleMenuClick("/dashboard")}
          >
            {" "}
            Food Details{" "}
          </MenuItem>
          <MenuItem icon={<MdOutlineChat />}> Chat</MenuItem>
          <MenuItem icon={<CiWallet sx={iconStyle} />}> Wallet </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
