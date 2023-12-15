import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { logout } from '../features/user';

const authenticatedPages = ['Home', 'Dashboard',"Create"];
const unauthenticatedPages = [ 'Register'];
const settings = ['Profile', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  const {isAuthenticated,user} = useSelector(state=>state.user)


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigation = async (page) => {
    const path = page.toLowerCase();
    if (path === 'logout') {
      await dispatch(logout());
      navigate('/login');
      handleCloseUserMenu();
    } else {
      const targetPath = path === 'home' ? '/' : `/${path}`;
      navigate(targetPath);
      handleCloseNavMenu();
    }
  };
  


  const renderPages = isAuthenticated ? authenticatedPages : unauthenticatedPages;
  const renderSettings = isAuthenticated ? settings : unauthenticatedPages;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {renderPages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigation(page)}>
                  <Typography textAlign="center" fontWeight={location.pathname === `/${page.toLowerCase()}` ? 'bold' : 'normal'}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {renderPages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: location.pathname === `/${page.toLowerCase()}` ? 'bold' : 'normal',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
  <Typography sx={{ mr: 1, color: 'white' }}> {isAuthenticated && user ? `Hello ${user.first_name}` : "Hello User"}</Typography>
  <Tooltip title="Open settings">
    {isAuthenticated ? (
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </IconButton>
    ) : (
      <Button color="inherit" onClick={() => handleNavigation('Login')}>
        Login
      </Button>
    )}
  </Tooltip>
  <Menu
    sx={{ mt: '45px' }}
    id="menu-appbar"
    anchorEl={anchorElUser}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={Boolean(anchorElUser)}
    onClose={handleCloseUserMenu}
  >
    {renderSettings.map((setting) => (
      <MenuItem key={setting} onClick={() => handleNavigation(setting)}>
        <Typography textAlign="center" fontWeight={location.pathname === `/${setting.toLowerCase()}` ? 'bold' : 'normal'}>
          {setting}
        </Typography>
      </MenuItem>
    ))}
  </Menu>
</Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

