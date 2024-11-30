import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import { Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat"; // Import the chat icon
import { useState } from "react";
import ChatDrawer from "../chat/index"; // Import the ChatDrawer

const Layout = () => {
  const [openChat, setOpenChat] = useState(false); // State for chat visibility

  const handleChatOpen = () => {
    setOpenChat(true);
  };

  const handleChatClose = () => {
    setOpenChat(false);
  };

  return (
    <>
      <Navbar />
      <Outlet />
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={handleChatOpen}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Drawer */}
      <ChatDrawer open={openChat} onClose={handleChatClose} />
    </>
  );
};

export default Layout;
