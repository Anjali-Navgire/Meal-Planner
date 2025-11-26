import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword,setShowPassword]=useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (form.email && form.password) {
      localStorage.setItem("token", "fake-jwt-token");
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required />
          <TextField label="Password" type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} fullWidth required />
          <FormControlLabel
            control={
            <Checkbox checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)}/>
            }
            label="Show Password"
            />
          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;