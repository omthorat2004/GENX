import { Email, Lock } from "@mui/icons-material";
import { Box, Button, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { GENXHackathon_backend } from '../../../declarations/GENXHackathon_backend';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await GENXHackathon_backend.login(email, password);
      if (response?.ok) {
        const role = response.ok; 
        localStorage.setItem("user", email);
        localStorage.setItem("role", role);
        if (role === "Owner") {
          navigate("/owner");
        } else if (role === "User") {
          navigate("/user");
        }
      } else if (response?.err) {
        setError(response.err);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
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
        Login
      </Typography>

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
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />

      {error && (
        <Typography color="error" textAlign="center" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>

      <Box textAlign="center" sx={{ marginTop: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/userRegister" sx={{ textDecoration: "none" }}>
            Register as User
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          Are you a Shop Owner?{" "}
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

export default Login;
