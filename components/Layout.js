import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Heart Disease Detection
          </Typography>
          <Button color="inherit" onClick={() => router.push("/profile")}>
            Profile
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
