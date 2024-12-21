import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const UserPending = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      const fetchedBills = [
        {
          shopName: 'Shop One',
          email: 'shopowner@example.com',
          billImage: 'https://via.placeholder.com/150',
          approved: false,
        },
        {
          shopName: 'Shop Two',
          email: 'shopowner2@example.com',
          billImage: 'https://via.placeholder.com/150',
          approved: false,
        },
      ];
      setBills(fetchedBills.filter(bill => !bill.approved));
    };

    fetchBills();
  }, []);

  const handleDownload = (billImage) => {
    const link = document.createElement('a');
    link.href = billImage;
    link.download = 'bill_image.jpg';
    link.click();
  };

  const handleDelete = (index) => {
    setBills((prevBills) => prevBills.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Pending Bills
      </Typography>

      <Grid container spacing={2}>
        {bills.map((bill, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Shop Name: {bill.shopName}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Email: {bill.email}
                </Typography>
                <CardMedia
                  component="img"
                  alt="Bill Image"
                  height="140"
                  image={bill.billImage}
                />
                <Box sx={{ marginTop: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleDownload(bill.billImage)}
                    sx={{ marginTop: 1 }}
                  >
                    Download Bill
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(index)}
                    sx={{ marginTop: 1, marginLeft: 1 }}
                  >
                    Delete Bill
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserPending;
