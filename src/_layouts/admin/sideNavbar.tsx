import { Box, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
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
            <Toolbar />
            <List>
              <ListItem button>
                <ListItemIcon>{/* sidebar icons here */}</ListItemIcon>
                <ListItemText primary="User Management" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>{/* sidebar icons here */}</ListItemIcon>
                <ListItemText primary="Product Management" />
              </ListItem>
            </List>
          </Drawer>
        </div>
      </Box>
    </div>
  );
};

export default SideNavbar;
