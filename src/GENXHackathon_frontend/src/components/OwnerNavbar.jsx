import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OwnerNavbar = () => {
    const navigate = useNavigate(); 
    const ownerEmail = localStorage.getItem("user") || "Owner Email";

    const handleLogout = () => {
        localStorage.clear();
        navigate("/"); 
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    {ownerEmail}
                </Typography>

                <Box>
                    <Button
                        color="inherit"
                        onClick={() => {
                            navigate("/owner/pending-bills");
                        }}
                    >
                        Pending Bills
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            navigate("/owner");
                        }}
                    >
                        Approved Bills
                    </Button>
                    <Button
                        color="inherit"
                        onClick={handleLogout} 
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default OwnerNavbar;
