import { Drawer, List, ListItem, Toolbar, Typography } from '@mui/material';
import { MdDashboard } from 'react-icons/md';

export default function Sidebar() {
  const drawerWidth = 240;
  return (
    <Drawer
      variant="permanent"
      sx={{ width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth } }}
    >
      <Toolbar />
      <List>
        <ListItem component="button" sx={{ cursor: 'pointer' }}>
          <MdDashboard style={{ marginRight: '8px' }} />
          <Typography>Dashboard</Typography>
        </ListItem>
        {['Settings', 'Profile'].map((text) => (
          <ListItem key={text} component="button">
            <Typography sx={{ pl: 3 }}>{text}</Typography>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}