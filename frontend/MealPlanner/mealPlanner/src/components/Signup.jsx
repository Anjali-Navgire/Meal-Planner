import { useState } from "react";
import axios from 'axios';
import { Link,useNavigate} from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";

const signup=()=>{
    let [form,setForm]=useState({name:"",email:"",password:""});
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("https://meal-planner-9cb0.onrender.com/api/auth/signup",form);
            alert("Signup Successfully");
            localStorage.setItem("token", res.data.token);
            navigate("/home");
        } catch(err){
            alert(err.response.data.message || "Signup failed");
        }
    }
    return(
    <>
     <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom style={{"fontSize":"25px","fontStyle":"initial"}}>
          Create Your Account
        </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField id="outlined-basic" label="name" value={form.name} variant="outlined" name="name"  onChange={handleChange} />
                <TextField id="outlined-basic" label="email" variant="outlined" value={form.email} name="email" onChange={handleChange} />
                <TextField id="outlined-basic" label="password" variant="outlined" value={form.password} name="password" onChange={handleChange} type={showPassword ? "text" : "password"} />
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                        />
                    }
                    label="Show Password"
                />

                <Button variant="contained" type="submit">Sign Up</Button>
            </Box>
            <Typography variant="body2" align="center" marginTop={"10px"}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
              Login
            </Link>
            </Typography>
      </Paper>
    </Container>
        </>
    )
};
export default signup;