import { Box, Card, CardContent, Typography } from '@mui/material';
import UserNavbar from '../components/UserNavbar';

const UserHome = () => {
  return (
    <div>
      <UserNavbar />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 5,
        }}
      >
        <Card sx={{ maxWidth: 600, marginBottom: 2, width: '100%' }}>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              Welcome to BillEase!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
              BillEase is your one-stop solution for managing bills efficiently. Whether you are 
              creating bills, tracking pending payments, or accessing detailed records, our platform 
              makes it easy for you to stay organized and on top of your financial tasks.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
              Key Features:
            </Typography>
            <ul>
              <li>
                <Typography variant="body2" color="text.secondary">
                  Seamless bill management.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="text.secondary">
                  Real-time tracking of pending and approved bills.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="text.secondary">
                  Secure and user-friendly interface.
                </Typography>
              </li>
             
            </ul>
            <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
              Get started now and simplify your bill management experience with BillEase!
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Need Help?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            If you have any questions or need support, feel free to reach out to our customer support 
            team. We’re here to help you every step of the way.
          </Typography>
        </Box>
      </Box>

  
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#1976d2',
          padding: '10px 0',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="white">
          &copy; 2024 BillEase. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default UserHome;
