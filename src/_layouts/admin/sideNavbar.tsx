import React, { useState } from "react";
import {
  Box,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import Logo from "../../assests/logo/main_logo.png";
import {
  Speed,
  PeopleAlt,
  ShoppingCart,
  Category,
  LocalOffer,
  Receipt,
  EmojiEvents,
  AccountCircle,
  Logout,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Routes } from "../../routing/routes";
import { useCookies } from "react-cookie";

const drawerWidth = 280;

const SideNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [, setUserLogout] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [, , removeCookie] = useCookies(["token"]);

  const handleCategorySelection = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const requestUserLogout = () => {
    setUserLogout(true);
    setLogoutConfirm(true);
  };

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    window.location.href = "/";
  };

  return (
    <div className="flex">
      <Box>
        <div className="flex flex-1">
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                backgroundColor: "#19374b",
                color: "white",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar>
              <div className="mt-2">
                <img src={Logo} alt="Logo" className="" />
              </div>
            </Toolbar>
            <List>
              <div className="mt-8">
                <ListItem button component={Link} to={Routes.ADMIN_DASHBOARD} sx={{ my: 2 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <Speed sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <hr />
                <ListItem button component={Link} to={Routes.VIEW_USERS} sx={{ mt: 2 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <PeopleAlt sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="User Management" />
                </ListItem>
                <ListItem button component={Link} to={Routes.VIEW_PRODUCTS} sx={{ mt: 1 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <ShoppingCart sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Product Management" />
                </ListItem>
                <ListItem button onClick={handleCategorySelection} sx={{ mt: 1 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <Category sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Category Management" />
                </ListItem>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem component={Link} to={Routes.CATEGORY_CONTENT} onClick={handleClose}>
                    Main Category
                  </MenuItem>
                  <MenuItem component={Link} to={Routes.SUBCATEGORY_CONTENT} onClick={handleClose}>
                    Sub-Category
                  </MenuItem>
                </Menu>

                <ListItem button component={Link} to={Routes.BRAND_CONTENT} sx={{ mt: 1 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <LocalOffer sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Brand Management" />
                </ListItem>
                <ListItem button sx={{ mt: 1 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <Receipt sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Order Management" />
                </ListItem>
                <ListItem button sx={{ mt: 1, mb: 2 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <EmojiEvents sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Competitions" />
                </ListItem>
                <hr />
                <ListItem button sx={{ mt: 2 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <AccountCircle sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="My Account" />
                </ListItem>

                <ListItem button onClick={requestUserLogout} sx={{ mt: 1 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <Logout sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
                <Dialog
                  open={logoutConfirm}
                  onClose={() => setLogoutConfirm(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  BackdropProps={{
                    style: {
                      backdropFilter: "blur(5px)",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to Logout the Dashboard?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setLogoutConfirm(false)} color="error">
                      Cancel
                    </Button>
                    <Button onClick={handleLogout} color="primary" autoFocus>
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </List>
          </Drawer>
        </div>
      </Box>
    </div>
  );
};

export default SideNavbar;
