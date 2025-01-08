import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get("http://localhost:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setUser(null); // Clear the user state
    router.replace("/")
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#455a64" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Heart Disease Predictions
        </Typography>
        <Box>
          <Link href="/" passHref>
            <Button
              color="inherit"
              sx={{
                border: "2px solid #90a4ae",
                borderRadius: "8px",
                margin: "0 5px",
                color: "#eceff1",
                "&:hover": {
                  borderColor: "#b0bec5",
                  backgroundColor: "#607d8b",
                },
              }}
            >
              Home
            </Button>
          </Link>
          {user ? (
            <>
              <Link href="/profile" passHref>
                <Button
                  color="inherit"
                  sx={{
                    border: "2px solid #90a4ae",
                    borderRadius: "8px",
                    margin: "0 5px",
                    color: "#eceff1",
                    "&:hover": {
                      borderColor: "#b0bec5",
                      backgroundColor: "#607d8b",
                    },
                  }}
                >
                  Profile
                </Button>
              </Link>
              <Link href="/predictions/upload" passHref>
                <Button
                  color="inherit"
                  sx={{
                    border: "2px solid #90a4ae",
                    borderRadius: "8px",
                    margin: "0 5px",
                    color: "#eceff1",
                    "&:hover": {
                      borderColor: "#b0bec5",
                      backgroundColor: "#607d8b",
                    },
                  }}
                >
                  Upload
                </Button>
              </Link>
              {user.role === "moderator" && (
                <Link href="/admin" passHref>
                  <Button
                    color="inherit"
                    sx={{
                      border: "2px solid #90a4ae",
                      borderRadius: "8px",
                      margin: "0 5px",
                      color: "#eceff1",
                      "&:hover": {
                        borderColor: "#b0bec5",
                        backgroundColor: "#607d8b",
                      },
                    }}
                  >
                    Admin
                  </Button>
                </Link>
              )}
              <Button
                onClick={handleLogout}
                color="inherit"
                sx={{
                  border: "2px solid #f44336",
                  borderRadius: "8px",
                  margin: "0 5px",
                  color: "#f44336",
                  "&:hover": {
                    borderColor: "#ef5350",
                    backgroundColor: "#ffcccb",
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button
                  color="inherit"
                  sx={{
                    border: "2px solid #90a4ae",
                    borderRadius: "8px",
                    margin: "0 5px",
                    color: "#eceff1",
                    "&:hover": {
                      borderColor: "#b0bec5",
                      backgroundColor: "#607d8b",
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button
                  color="inherit"
                  sx={{
                    border: "2px solid #90a4ae",
                    borderRadius: "8px",
                    margin: "0 5px",
                    color: "#eceff1",
                    "&:hover": {
                      borderColor: "#b0bec5",
                      backgroundColor: "#607d8b",
                    },
                  }}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
