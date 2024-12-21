import { Email, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Import RouterLink for navigation
import { GENXHackathon_backend } from "../../../declarations/GENXHackathon_backend";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    const response = await GENXHackathon_backend.registerUser(name, email, password); 
    localStorage.clear()
    localStorage.setItem('user',email)
    localStorage.setItem('role','User')

    console.log(response);



    if (response.ok) {
      setMessage("Registration successful!");
      navigate('/user')
    } else {
      setMessage(response.err); 
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        marginTop: 8,
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Register as User
      </Typography>

      <TextField
        label="Your Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={handleSubmit}
      >
        Register
      </Button>

      {message && (
        <Typography
          variant="body1"
          color="error"
          textAlign="center"
          sx={{ marginTop: 2 }}
        >
          {message}
        </Typography>
      )}

      <Box textAlign="center" sx={{ marginTop: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Already have an account?{" "}
          <Link component={RouterLink} to="/login" sx={{ textDecoration: "none" }}>
            Login here
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          Are you an owner?{" "}
          <Link
            component={RouterLink}
            to="/ownerRegister"
            sx={{ textDecoration: "none" }}
          >
            Register as Owner
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default UserRegister;
