import { Box, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
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

const drawerWidth = 280;

const SideNavbar = () => {
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
                <ListItem button sx={{ my: 2 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <Speed sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <hr />
                <ListItem button sx={{ mt: 2 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <PeopleAlt sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="User Management" />
                </ListItem>
                <ListItem button sx={{ mt: 1 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <ShoppingCart sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Product Management" />
                </ListItem>
                <ListItem button sx={{ mt: 1 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <Category sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Category Management" />
                </ListItem>
                <ListItem button sx={{ mt: 1 }}>
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
                <ListItem button sx={{ mt: 1 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <Logout sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </div>
            </List>
          </Drawer>
        </div>
      </Box>
    </div>
  );
};

export default SideNavbar;
