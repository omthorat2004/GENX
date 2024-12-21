import { CloudUpload, Lock, Security, VerifiedUser } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Grid, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const Root = styled(Box)(({ theme }) => ({
  padding: 0,
  backgroundColor: '#f4f6f9',
  minHeight: '100vh',
}));

const Navbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: '#1565c0',
  color: 'white',
}));

const NavbarLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '2rem',
}));

const CustomCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  '&:hover': {
    boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
  },
});

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  borderBottomLeftRadius: '12px',
  borderBottomRightRadius: '12px',
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#1565c0',
  color: '#fff',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#0d47a1',
  },
}));

const IconStyled = styled('div')(({ theme }) => ({
  fontSize: '48px',
  color: '#1565c0',
  marginBottom: theme.spacing(2),
}));

const HomePage = () => {
  return (
    <Root>
      <Navbar>
        <NavbarLink to="/login">User Login</NavbarLink>
        <NavbarLink to="/login">Shop Owner Login</NavbarLink>
      </Navbar>

      <SectionTitle>Why Choose Our Web App?</SectionTitle>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <CustomCard>
            <CardContentStyled>
              <IconStyled>
                <VerifiedUser />
              </IconStyled>
              <Typography variant="h6" gutterBottom>
                Take Control of Your Identity
              </Typography>
              <Typography>
                Our app empowers users to create secure, decentralized identities using blockchain technology. 
                It ensures data privacy and security by giving you complete control over your personal information, eliminating the need for central authorities.
              </Typography>
              <ButtonStyled variant="contained">
                Learn More
              </ButtonStyled>
            </CardContentStyled>
          </CustomCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <CustomCard>
            <CardContentStyled>
              <IconStyled>
                <Lock />
              </IconStyled>
              <Typography variant="h6" gutterBottom>
                Uncompromised Security for Your Data
              </Typography>
              <Typography>
                The web app ensures that all user data and transactions are encrypted using blockchain, providing unmatched security.
                You can trust our system to protect sensitive information while avoiding centralized server vulnerabilities.
              </Typography>
              <ButtonStyled variant="contained">
                Learn More
              </ButtonStyled>
            </CardContentStyled>
          </CustomCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <CustomCard>
            <CardContentStyled>
              <IconStyled>
                <CloudUpload />
              </IconStyled>
              <Typography variant="h6" gutterBottom>
                Secure File Storage & Sharing
              </Typography>
              <Typography>
                The app integrates with Pinata and IPFS to provide secure and decentralized file storage. 
                Your data is stored across multiple nodes, ensuring high availability, redundancy, and protection against unauthorized access.
              </Typography>
              <ButtonStyled variant="contained">
                Learn More
              </ButtonStyled>
            </CardContentStyled>
          </CustomCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <CustomCard>
            <CardContentStyled>
              <IconStyled>
                <Security />
              </IconStyled>
              <Typography variant="h6" gutterBottom>
                Proven Protection Against Fraud
              </Typography>
              <Typography>
                Leverage our app's blockchain-based ledger to track and verify all transactions. 
                This ensures transparency and provides tamper-proof records, safeguarding against fraudulent activities.
              </Typography>
              <ButtonStyled variant="contained">
                Learn More
              </ButtonStyled>
            </CardContentStyled>
          </CustomCard>
        </Grid>

        {/* Added Information About Website */}
        <Grid item xs={12} md={4}>
          <CustomCard>
            <CardContentStyled>
              <IconStyled>
                <Security />
              </IconStyled>
              <Typography variant="h6" gutterBottom>
                Welcome to BillEase!
              </Typography>
              <Typography>
                BillEase is your one-stop solution for managing bills efficiently. Whether you are creating bills, tracking pending payments, or accessing detailed records, our platform makes it easy for you to stay organized and on top of your financial tasks.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
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
              <ButtonStyled variant="contained">
                Learn More
              </ButtonStyled>
            </CardContentStyled>
          </CustomCard>
        </Grid>
      </Grid>
    </Root>
  );
};

export default HomePage;
