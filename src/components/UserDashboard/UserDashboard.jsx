import React, { useEffect } from "react";
import { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRef } from "react";

// Custom CSS
import "./UserDashboard.css";
import { getToken } from "../../authConfig";
import { getUser } from "../../apiConfig";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
    const [appsList, setAppsList] = useState([]);
    const token = getToken();
    const navigate = useNavigate();
    const AxiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const currentUser = useRef();
    useEffect(() => {
        const getUserData = async () => {
            currentUser.current = await getUser();
        };
        getUserData();
        console.log("Current User: ", currentUser.current);
        if (currentUser.current === undefined) {
            console.log("User not found");
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const getAppList = async () => {
            const reqBody = {
                username: currentUser.current?.username,
                email: currentUser.current?.email,
            };
            console.log("ReqBody:", reqBody);
            const response = await AxiosInstance.post(
                `${process.env.REACT_APP_DJANGO_API_URL}/api/pages/get-apps`,
                reqBody
            );
            console.log("Data:", response);
        };
        getAppList();
    }, []);

    return (
        <section id="user-dashboard-section">
            <Card
                orientation="horizontal"
                variant="outlined"
                sx={{ width: "100%" }}
            >
                <CardOverflow>
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <img
                            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <Typography
                            fontWeight="md"
                            textColor="success.plainColor"
                        >
                            Yosemite Park
                        </Typography>
                        <Typography level="body-sm">California, USA</Typography>
                    </div>
                    <div>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                backgroundColor: "#C2F0F0",
                                color: "#000",
                            }}
                            // onClick={(event) => {
                            //     setPoints(event.target.value);
                            // }}
                        >
                            Add Points
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

export default UserDashboard;
