import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUid } from "./UidContext";

const defaultpages = ["登入/註冊", "領養認養", "刊登送養"];
const defaultSettings = ["資訊管理", "送養資訊", "媒合系統", "登出"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { uid, logout } = useUid();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pages, setPages] = useState(defaultpages);
  const [isAdmin, setIsAdmin] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    // Mock API call to check if user is logged in and if they are an admin
    const checkLoginStatus = async () => {
      try {
        // setPages(['會員中心', '領養認養', '刊登送養']);
        // setSettings(['資訊管理', '送養資訊', '媒合系統', '管理員介面', '登出']);

        if (uid != null) {
          setPages(["會員中心", "領養認養", "刊登送養"]);
          setIsLoggedIn(true);
          const checkadmin = await axios.get(
            `http://localhost:8000/administrator/checkIsAdmin?userId=${uid}`
          );

          if (checkadmin.status === 200) {
            setIsAdmin(true);
            if (checkadmin.data.isAdmin) {
              setSettings(["資訊管理", "送養資訊", "媒合系統", "登出"]);
            } else {
              setIsAdmin(false);
            }
          }
        }
      } catch (error) {
        setIsAdmin(false);
        console.error("Error checking login status", error);
      }
    };

    checkLoginStatus();
  }, [uid]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page === "登入/註冊") {
      navigate("/signin");
    } else if (page === "領養認養") {
      navigate("/main");
    } else if (page === "刊登送養") {
      if (isLoggedIn == false) navigate("/signin");
      else navigate("/sendadoption");
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "資訊管理") {
      navigate("/user");
    } else if (setting === "送養資訊") {
      navigate("/sentadoptioninfo");
    } else if (setting === "媒合系統") {
      navigate("/match");
    } else if (setting === "登出") {
      // Implement logout functionality
      setIsLoggedIn(false);
      logout();
      navigate("/signin");
    } else if (setting === "管理員系統") {
      navigate("/admin");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <PetsIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mt: 1.5,
                mr: 1,
                ml: 10,
              }}
            />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              畢業小隊
            </Typography>
            <Typography
              variant="h7"
              noWrap
              component="a"
              href="/"
              sx={{
                mt: 2.5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              寵物領養平台
            </Typography>
          </Box>
          <Box sx={{ ml: 28 }}></Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Box key={page} sx={{ position: "relative" }}>
                <Button
                  onClick={(event) => {
                    if (page === "會員中心") {
                      handleOpenUserMenu(event);
                    } else {
                      handleCloseNavMenu(page);
                    }
                  }}
                  sx={{ mt: 1, mr: 3, ml: 3, color: "white", display: "block" }}
                >
                  {page}
                </Button>
                {page === "會員中心" && (
                  <Menu
                    sx={{ mt: "45px" }}
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
                    onClose={() => setAnchorElUser(null)}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleCloseUserMenu(setting)}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                    {isAdmin && (
                      <MenuItem
                        key="管理員系統"
                        onClick={() => handleCloseUserMenu("管理員系統")}
                      >
                        <Typography textAlign="center">管理員系統</Typography>
                      </MenuItem>
                    )}
                  </Menu>
                )}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
