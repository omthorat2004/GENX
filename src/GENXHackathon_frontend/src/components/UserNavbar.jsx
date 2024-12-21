import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const email = localStorage.getItem('user');
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); 
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {email}
        </Typography>

        <Box>
          <Link
            component={RouterLink}
            to="/user/create"
            color="inherit"
            sx={{ marginLeft: 2, textDecoration: 'none' }}
          >
            Create Bill
          </Link>
          <Link
            component={RouterLink}
            to="/user/my-bills"
            color="inherit"
            sx={{ marginLeft: 2, textDecoration: 'none' }}
          >
            My Bills
          </Link>
          <Link
            component="button"
            onClick={handleLogout} 
            color="inherit"
            sx={{ marginLeft: 2, textDecoration: 'none', cursor: 'pointer' }}
          >
            Logout
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;
