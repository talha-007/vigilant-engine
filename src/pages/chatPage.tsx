import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  TextField,
  Button,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import ScrollableFeed from "react-scrollable-feed";
import Navbar from "../components/navbar";
import { Add } from "@mui/icons-material";
import chatServices from "../redux/api/chatServices";
import { useDispatch, useSelector } from "react-redux";
import { getChatRooms } from "../redux/slice/chatSlice";

// Dummy data for chats and messages
const chats = [
  { id: 1, name: "John Doe", avatar: "/avatar1.jpg" },
  { id: 2, name: "Jane Smith", avatar: "/avatar2.jpg" },
];

const messages = [
  {
    id: 1,
    text: "Hi, how can I help you?",
    sender: "John Doe",
    type: "received",
  },
  { id: 2, text: "I need help with my project.", sender: "Me", type: "sent" },
];

const ChatPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [messageList, setMessageList] = useState(messages);
  const [newMessage, setNewMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"list" | "chat">("list"); // Added state for mobile view
  const [email, setEmail] = useState<string>("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const profile = useSelector((s) => s?.profile);
  const userChats = useSelector((s) => s?.chat);
  console.log("profile", profile);
  console.log("userChats", userChats);

  useEffect(() => {
    if (profile?.profile?.email) {
      dispatch(getChatRooms(profile?.profile?.email));
    }
  }, [profile?.profile?.email]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessageList([
        ...messageList,
        {
          id: messageList.length + 1,
          text: newMessage,
          sender: "Me",
          type: "sent",
        },
      ]);
      setNewMessage("");
    }
  };

  const handleStartChat = () => {
    const datas = {
      second_participant: email,
    };
    try {
      const res = chatServices.createRoom(datas);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          background: "#000",
          width: "100%",
          height: "100px",
        }}
      >
        <Navbar position="static" />
      </Box>
      <Box
        sx={{
          height: { md: "85vh", xs: "89vh" },
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          height="100%"
          bgcolor="#f5f5f5"
          sx={{
            padding: { xs: "0rem", md: "1rem" },
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* Sidebar or Chat List */}
          {isMobile ? (
            view === "list" ? (
              <Box
                sx={{
                  width: "100%",
                  background: "#fff",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0rem 1rem",
                  }}
                >
                  <Typography variant="h6" textAlign="center" padding={2}>
                    Chats
                  </Typography>
                  <IconButton onClick={() => setOpen(true)}>
                    <Add />
                  </IconButton>
                </Box>
                <Divider />
                <List>
                  {chats.map((chat) => (
                    <ListItem
                      key={chat.id}
                      button
                      selected={activeChat.id === chat.id}
                      onClick={() => {
                        setActiveChat(chat);
                        setView("chat"); // Switch to chat view
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={chat.avatar} alt={chat.name} />
                      </ListItemAvatar>
                      <ListItemText primary={chat.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ) : (
              // Chat Box for Mobile
              <Box
                flexGrow={1}
                display="flex"
                flexDirection="column"
                bgcolor="#e9ecef"
              >
                <Box
                  sx={{
                    padding: 2,
                    background: "#fff",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <IconButton
                    sx={{ display: "flex" }}
                    onClick={() => setView("list")} // Back to chat list
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6">{activeChat.name}</Typography>
                </Box>
                <Box
                  flexGrow={1}
                  overflow="hidden"
                  padding={2}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  bgcolor="#f9f9f9"
                >
                  <ScrollableFeed>
                    {messageList.map((msg, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent:
                            msg.type === "sent" ? "flex-end" : "flex-start",
                          marginBottom: 2,
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: "60%",
                            padding: 1.5,
                            borderRadius: "12px",
                            background:
                              msg.type === "sent" ? "#4caf50" : "#fff",
                            color: msg.type === "sent" ? "#fff" : "#000",
                            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Typography variant="body1">{msg.text}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </ScrollableFeed>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    padding: 2,
                    background: "#fff",
                  }}
                >
                  <TextField
                    variant="outlined"
                    placeholder="Type your message..."
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    sx={{ marginRight: 2 }}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{ borderRadius: "12px", width: 50, height: 50 }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            )
          ) : (
            // Desktop Layout
            <>
              <Box
                sx={{
                  width: "25%",
                  background: "#fff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0rem 1rem",
                  }}
                >
                  <Typography variant="h6" textAlign="center" padding={2}>
                    Chats
                  </Typography>
                  <IconButton onClick={() => setOpen(true)}>
                    <Add />
                  </IconButton>
                </Box>
                <Divider />
                <List>
                  {chats.map((chat) => (
                    <ListItem
                      key={chat.id}
                      button
                      selected={activeChat.id === chat.id}
                      onClick={() => setActiveChat(chat)}
                    >
                      <ListItemAvatar>
                        <Avatar src={chat.avatar} alt={chat.name} />
                      </ListItemAvatar>
                      <ListItemText primary={chat.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              {/* Chat Box */}
              <Box
                flexGrow={1}
                display="flex"
                flexDirection="column"
                bgcolor="#e9ecef"
              >
                <Box
                  sx={{
                    padding: 2,
                    background: "#e4e4e4",

                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography variant="h6">{activeChat.name}</Typography>
                </Box>
                <Box
                  flexGrow={1}
                  overflow="hidden"
                  padding={2}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  bgcolor="#f9f9f9"
                >
                  <ScrollableFeed>
                    {messageList.map((msg, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent:
                            msg.type === "sent" ? "flex-end" : "flex-start",
                          marginBottom: 2,
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: "60%",
                            padding: 1.5,
                            borderRadius: "12px",
                            background:
                              msg.type === "sent" ? "#4caf50" : "#fff",
                            color: msg.type === "sent" ? "#fff" : "#000",
                          }}
                        >
                          <Typography variant="body1">{msg.text}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </ScrollableFeed>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    padding: 2,
                    background: "#e4e4e4",
                  }}
                >
                  <TextField
                    variant="outlined"
                    placeholder="Type your message..."
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    sx={{ marginRight: 2 }}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{
                      borderRadius: "12px",
                      width: 50,
                      height: 50,
                      border: "1px solid",
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Start Chat</DialogTitle>
        <DialogContent sx={{ minWidth: "320px" }}>
          <Box sx={{ marginTop: "10px" }}>
            <TextField
              fullWidth
              label="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <DialogActions>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleStartChat}>
              Start Chat
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatPage;
