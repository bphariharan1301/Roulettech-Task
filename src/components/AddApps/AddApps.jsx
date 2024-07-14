import React from "react";
import { useState } from "react";
import {
    FormControl,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Button,
} from "@mui/material";

import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

// Custom imports
import { getToken } from "../../authConfig";
import "./AddApps.css";

const fileTypes = ["JPG", "PNG", "GIF"];

function AddApps() {
    const [appName, setAppName] = React.useState("");
    const [appCategory, setAppCategory] = React.useState("");
    const [appLink, setAppLink] = React.useState("");
    const [points, setPoints] = React.useState("");
    const [appSubCategory, setAppSubCategory] = React.useState("");
    const [showAddPoints, setShowAddPoints] = React.useState(false);
    const [file, setFile] = useState(null);

    const token = getToken();
    const AxiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const handleChange = (file) => {
        setFile(file);
    };
    const handleSubmit = async () => {
        // const formData = new FormData();
        // formData.append("appName", appName);
        // formData.append("appCategory", appCategory);
        // formData.append("appLink", appLink);
        // formData.append("points", points);
        // formData.append("appSubCategory", appSubCategory);
        // formData.append("file", file); // Make sure this matches the name used in Django
        const reqBody = {
            appName: appName,
            appCategory: appCategory,
            appLink: appLink,
            points: points,
            appSubCategory: appSubCategory,
            file: file,
        };
        console.log("ReqBody:", reqBody);
        const response = await AxiosInstance.post(
            `${process.env.REACT_APP_DJANGO_API_URL}/api/pages/add-app`,
            reqBody,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("Data:", response);
        setShowAddPoints(false);
    };

    return (
        <section id="add-apps-section">
            <div className="file-uploader-div">
                <FileUploader
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                    classes="file_uploader"
                />
            </div>
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
                            onChange={(event) => {
                                setAppName(event.target.value);
                            }}
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
                            onChange={(event) => setAppLink(event.target.value)}
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
                        onChange={(event) => {
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

export default AddApps;
