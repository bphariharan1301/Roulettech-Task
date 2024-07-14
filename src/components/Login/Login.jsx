import * as React from "react";
import {
    CssVarsProvider,
    useColorScheme,
    GlobalStyles,
    CssBaseline,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    formLabelClasses,
    Link,
    Input,
    Typography,
    Stack,
    IconButton,
    FormLabel,
} from "@mui/joy";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { FormGroup } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

// API calls
import axios from "axios";

// Custom Icons
import { setRefreshToken, setToken } from "../../authConfig";
import { useNavigate } from "react-router-dom";

function ColorSchemeToggle(props) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (
            <IconButton size="sm" variant="outlined" color="neutral" disabled>
                abc
            </IconButton>
        );
    }
    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="outlined"
            color="neutral"
            aria-label="toggle light/dark mode"
            {...other}
            onClick={(event) => {
                if (mode === "light") {
                    setMode("dark");
                } else {
                    setMode("light");
                }
                onClick?.(event);
            }}
        >
            {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
        </IconButton>
    );
}

const baseURL = process.env.REACT_APP_DJANGO_API_URL;
console.log("Base URL is: ", baseURL);
const AxiosInstance = axios.create({
    headers: {
        "content-type": "application/json",
    },
});
export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        const user = {
            email: email,
            password: password,
        };

        console.log("User is: ", user);

        const { data } = await AxiosInstance.post(
            `${baseURL}/api/accounts/login`,
            user
        );

        console.log("Data is: ", data);

        // setToken
        setToken(data.access_token);

        // Refresh Token
        setRefreshToken(data.refresh_token);
        console.log("Refresh Token is: ", data.refresh_token);
        console.log("Access Token is: ", data.access_token);

        navigate("/dashboard", {
            state: {
                user: data.user,
                user_type: data.user_type,
            },
        });
    };

    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ":root": {
                        "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
                        "--Cover-width": "50vw", // must be `vw` only
                        "--Form-maxWidth": "800px",
                        "--Transition-duration": "0.4s", // set to `none` to disable transition
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    transition: "width var(--Transition-duration)",
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    display: "flex",
                    justifyContent: "center",
                    backdropFilter: "blur(12px)",
                    backgroundColor: "rgba(255 255 255 / 0.2)",
                    [theme.getColorSchemeSelector("dark")]: {
                        backgroundColor: "rgba(19 19 24 / 0.4)",
                    },
                    marginTop: "5rem",
                })}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100dvh",
                        maxWidth: "100%",
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: "flex",
                            alignItems: "left",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                gap: 2,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <IconButton
                                variant="soft"
                                color="primary"
                                size="sm"
                            >
                                <AdbIcon color="black" />
                            </IconButton>
                            <Typography level="title-lg">
                                Company logo
                            </Typography>
                        </Box>
                        <ColorSchemeToggle />
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: "auto",
                            py: 2,
                            pb: 5,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: 400,
                            maxWidth: "100%",
                            mx: "auto",
                            borderRadius: "sm",
                            "& form": {
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            },
                            [`& .${formLabelClasses.asterisk}`]: {
                                visibility: "hidden",
                            },
                        }}
                    >
                        <Stack gap={4} sx={{ mb: 2 }}>
                            <Stack gap={1}>
                                <Typography component="h1" level="h3">
                                    Sign in
                                </Typography>
                                <Typography level="body-sm">
                                    New to company?{" "}
                                    <Link href="/sign-up" level="title-sm">
                                        Sign up!
                                    </Link>
                                </Typography>
                            </Stack>
                            {/* <Button
                                variant="soft"
                                color="neutral"
                                fullwidth="true"
                                startDecorator={<GoogleIcon />}
                            >
                                Continue with Google
                            </Button> */}
                        </Stack>
                        <Divider
                            sx={(theme) => ({
                                [theme.getColorSchemeSelector("light")]: {
                                    color: { xs: "#FFF", md: "text.tertiary" },
                                    "--Divider-lineColor": {
                                        xs: "#FFF",
                                        md: "var(--joy-palette-divider)",
                                    },
                                },
                            })}
                        >
                            or
                        </Divider>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <FormGroup>
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Checkbox
                                            size="sm"
                                            label="Remember me"
                                            name="persistent"
                                        />
                                        <Link
                                            level="title-sm"
                                            href="#replace-with-a-link"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </Box>
                                    <Button
                                        type="submit"
                                        onClick={handleLoginClick}
                                        fullwidth="true"
                                    >
                                        Sign in
                                    </Button>
                                </Stack>
                            </FormGroup>
                        </Stack>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" textAlign="center">
                            © Your company {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {/* <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          },
        })}
      /> */}
        </CssVarsProvider>
    );
}
