'use client';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import { MdDarkMode, MdLightMode, MdLogout } from 'react-icons/md';

export default function Header({ onLogout }) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {theme.palette.mode === 'light' ? <MdDarkMode /> : <MdLightMode />}
        </IconButton>
        <Button color="inherit" onClick={onLogout} startIcon={<MdLogout />}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}