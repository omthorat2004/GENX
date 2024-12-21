import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GENXHackathon_backend } from '../../../declarations/GENXHackathon_backend';
import OwnerNavbar from '../components/OwnerNavbar';

const OwnerPending = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getBills = async () => {
            try {
                const email = localStorage.getItem('user');
                const response = await GENXHackathon_backend.getUnapprovedBillsByOwner(email);
                setBills(response);
            } catch (error) {
                console.error("Failed to fetch pending bills:", error);
            } finally {
                setLoading(false);
            }
        };

        getBills();
    }, []);

    const handleApprove = async (billId) => {
        try {
            const response = await GENXHackathon_backend.approveBill(billId);
            if (response?.ok) {
                alert("Bill approved successfully!");
                // Refresh the list after approval
                setBills((prevBills) => prevBills.filter((bill) => bill.id !== billId));
            } else if (response?.err) {
                alert(`Error: ${response.err}`);
            }
        } catch (error) {
            console.error("Failed to approve bill:", error);
            alert("An error occurred while approving the bill.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <OwnerNavbar />
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <CircularProgress />
                </div>
            ) : bills.length > 0 ? (
                <Grid container spacing={3} style={{ marginTop: "20px" }}>
                    {bills.map((bill, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card variant="outlined">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={bill.photoUrl}
                                    alt="Bill Image"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => window.open(bill.photoUrl, '_blank')}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        User Email: {bill.userEmail}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleApprove(bill.id)}
                                        style={{ marginTop: "10px" }}
                                    >
                                        Approve
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography
                    variant="h6"
                    style={{
                        textAlign: "center",
                        marginTop: "40px",
                        color: "gray",
                    }}
                >
                    No pending bills to display.
                </Typography>
            )}
        </div>
    );
};

export default OwnerPending;
