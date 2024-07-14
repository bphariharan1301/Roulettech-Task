import {
    FormControl,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Button,
} from "@mui/material";
import React from "react";
import FilesDragAndDrop from "../FileDragAndDrop/FilesDragAndDrop";
import axios from "axios";

// Custom imports
import { getToken } from "../../authConfig";

// Custom CSS
import "./AdminDashboard.css";

function AdminDashboard() {
    const [appName, setAppName] = React.useState("");
    const [appCategory, setAppCategory] = React.useState("");
    const [appLink, setAppLink] = React.useState("");
    const [points, setPoints] = React.useState("");
    const [appSubCategory, setAppSubCategory] = React.useState("");

    const token = getToken();

    const AxiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // for showing add points field
    const [showAddPoints, setShowAddPoints] = React.useState(false);

    const handleSubmit = async () => {
        const reqBody = {
            appName: appName,
            appCategory: appCategory,
            appLink: appLink,
            points: points,
            appSubCategory: appSubCategory,
        };
        console.log("ReqBody:", reqBody);
        const response = await AxiosInstance.post(
            `${process.env.REACT_APP_DJANGO_API_URL}/api/pages/add-app`,
            reqBody
        );
        console.log("Data:", response);
        setShowAddPoints(false);
    };

    return (
        <section className="admin-dashboard-section">
            {/* <FilesDragAndDrop>
                <div className="FilesDragAndDrop__area">
                    Hey, drop me some files
                    <span role="img" aria-label="emoji" className="area__icon">
                        &#128526;
                    </span>
                </div>
            </FilesDragAndDrop> */}
            <div className="form-fields">
                <div className="form-fields-div">
                    <FormControl
                        size="small"
                        sx={{
                            width: "60%",
                            // paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    >
                        <TextField
                            label="App Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onClick={(event) => setAppName(event.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            // minWidth: 120,
                            width: "60%",
                            // paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                        size="small"
                    >
                        <InputLabel id="demo-select-small-label">
                            App Category
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="App Category"
                            value={appCategory}
                            onChange={(event) =>
                                setAppCategory(event.target.value)
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="form-fields-div">
                    <FormControl
                        size="small"
                        sx={{
                            width: "60%",
                            // paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    >
                        <TextField
                            label="App Link"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onClick={(event) => setAppLink(event.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            // minWidth: 120,
                            width: "60%",
                            // paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                        size="small"
                    >
                        <InputLabel id="demo-select-small-label">
                            Select Sub-Category
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Select Sub-Category"
                            value={appSubCategory}
                            onChange={(event) =>
                                setAppSubCategory(event.target.value)
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <Stack
                spacing={2}
                display="flex"
                flexDirection={"column"}
                alignItems="center"
                justifyContent={"center"}
                width="100%"
            >
                {showAddPoints ? (
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Add Points"
                        sx={{
                            width: "20%",
                            backgroundColor: "#C2F0F0",
                        }}
                        onClick={(event) => {
                            setPoints(event.target.value);
                        }}
                    />
                ) : (
                    <Button
                        variant="contained"
                        className="btn-submit"
                        onClick={() => {
                            setShowAddPoints(!showAddPoints);
                        }}
                    >
                        Add Points
                    </Button>
                )}
                <Button
                    variant="contained"
                    className="btn-submit"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Stack>
        </section>
    );
}

export default AdminDashboard;
