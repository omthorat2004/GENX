import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GENXHackathon_backend } from '../../../declarations/GENXHackathon_backend';
import OwnerNavbar from '../components/OwnerNavbar';

const OwnerBill = () => {
    const [bills, setBills] = useState([]);
    const [filteredBills, setFilteredBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getBills = async () => {
            try {
                const email = localStorage.getItem('user');
                const response = await GENXHackathon_backend.getApprovedBillsByOwner(email);
                setBills(response);
                setFilteredBills(response);
            } catch (error) {
                console.error("Failed to fetch bills:", error);
            } finally {
                setLoading(false);
            }
        };

        getBills();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredBills(bills.filter((bill) => bill.userEmail.toLowerCase().includes(query)));
    };

    return (
        <div style={{ padding: "20px" }}>
            <OwnerNavbar /> {/* Add the navbar here */}
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <TextField
                            fullWidth
                            label="Search by User Email"
                            variant="outlined"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <Grid container spacing={3} style={{ marginTop: "20px" }}>
                        {filteredBills.length > 0 ? (
                            filteredBills.map((bill, index) => (
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
                                                onClick={() => window.open(bill.photoUrl, '_blank')}
                                            >
                                                Download Image
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="h6" style={{ textAlign: "center", width: "100%" }}>
                                No bills found.
                            </Typography>
                        )}
                    </Grid>
                </>
            )}
        </div>
    );
};

export default OwnerBill;
