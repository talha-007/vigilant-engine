import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Avatar, Divider, Stack, Tooltip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { get_profile } from "../../redux/slice/profileSlice";
import { toast } from "react-toastify";
import { Chat } from "@mui/icons-material";

const pages = [
  { id: 1, pageName: "Home", path: "/" },
  { id: 2, pageName: "List", path: "/list" },
  { id: 3, pageName: "Blog", path: "/blog" },
];

function Navbar({ position }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [scrolled, setScrolled] = React.useState(false);

  const profile = useSelector((s) => s?.profile);
  // console.log("profile", profile);
  React.useEffect(() => {
    dispatch(get_profile());
  }, []);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const accessToken = Cookies.get("accessToken");
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    setAnchorElUser(null);
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    toast.success("Logout successful");
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position={position}
      sx={{
        background: scrolled ? "#fff" : "transparent",
        transition: "background 0.3s ease",
        boxShadow: scrolled ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
        padding: "1rem 0rem",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AdbIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: scrolled ? "#000" : "#fff",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: scrolled ? "#000" : "#fff",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={() => {
                    navigate(page.path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "#000",
                    }}
                  >
                    {page.pageName}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: scrolled ? "#000" : "#fff",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => {
                  navigate(page.path);
                  handleCloseNavMenu();
                }}
                sx={{
                  my: 2,
                  color: scrolled ? "#000" : "#fff",
                  display: "block",
                  borderRadius: "0px",
                  borderBottom: scrolled
                    ? location.pathname === page.path
                      ? "1px solid #000"
                      : "1px solid transparent"
                    : location.pathname === page.path
                    ? "1px solid #fff"
                    : "1px solid transparent",
                  ":hover": {
                    borderBottom: "1px solid #fff",
                    background: "none",
                  },
                }}
              >
                {page.pageName}
              </Button>
            ))}
          </Box>
          {accessToken ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconButton onClick={() => navigate("/chat")}>
                <Chat
                  sx={{
                    color: scrolled ? "#000" : "#fff",
                    ":hover": { color: "#1877F2" },
                  }}
                />
              </IconButton>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={profile?.profile?.name}
                      src={profile?.profile?.profile?.picture}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px", width: "250px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Typography sx={{ textAlign: "center" }}>
                      {profile?.profile?.name || "N/A"}
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography sx={{ textAlign: "center" }}>
                      {" "}
                      {profile?.profile?.email || "N/A"}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center", color: "red" }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          ) : (
            <Stack spacing={2} direction={"row"}>
              <Button variant="outlined" onClick={() => navigate("/login")}>
                Log In
              </Button>
              <Button variant="contained" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
