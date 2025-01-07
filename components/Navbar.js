import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Heart Disease ECG Predictions
      </Typography>
      <Box>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/profile" passHref>
          <Button color="inherit">Profile</Button>
        </Link>
        <Link href="/predictions/upload" passHref>
          <Button color="inherit">Upload</Button>
        </Link>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
