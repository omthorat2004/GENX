const PINATA_API_KEY = '289e898a4cc9019013b0';
const PINATA_API_SECRET = '6eac1f3bfce68ae123c4d034a733442b6ba818d880dab9d098aa3f79b6298cb3';
const PINATA_BASE_URL = 'https://api.pinata.cloud';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GENXHackathon_backend } from '../../../declarations/GENXHackathon_backend';
import UserNavbar from '../components/UserNavbar';

const BillUploadForm = () => {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!image || !email) {
      alert('Please fill all the fields and upload an image');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch(`${PINATA_BASE_URL}/pinning/pinFileToIPFS`, {
        method: 'POST',
        headers: {
         
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_API_SECRET
        },
        body: formData,
      });
      const responseData = await response.json()
      console.log(responseData)

  
      if (!response.ok) {
        throw new Error('Failed to upload file to Pinata');
      }

     
      const ipfsHash = responseData.IpfsHash; 
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

      const userEmail = localStorage.getItem('user');
      const saveResponse = await GENXHackathon_backend.uploadBill(ipfsUrl, email, userEmail);

      if (saveResponse.ok) {
        alert('Bill uploaded successfully!');
        navigate('/user');
      } else {
        alert('Failed to save bill info');
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload bill');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <UserNavbar />
      <Box
        sx={{
          padding: 4,
          maxWidth: 500,
          margin: 'auto',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
          marginTop: 2,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Upload Bill
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Owner Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
            sx={{ marginBottom: 2 }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ margin: '20px 0' }}
            />
            {previewImage && (
              <Box sx={{ maxWidth: '100%', textAlign: 'center' }}>
                <img src={previewImage} alt="preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
              </Box>
            )}
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            fullWidth
            sx={{
              padding: '12px 0',
              fontWeight: 'bold',
              textTransform: 'none',
              backgroundColor: isLoading ? '#9e9e9e' : 'primary',
              '&:hover': { backgroundColor: '#1565c0' }
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              'Upload Bill'
            )}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default BillUploadForm;
