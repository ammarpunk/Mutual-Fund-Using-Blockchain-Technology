import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import CustomLink from "@common/CustomLink";
import { IconButton } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useRouter } from "next/router";
import { getUserInfo, logout } from "@src/helpers";

const Header = () => {
  const [user, setUser] = React.useState(false);
  const router = useRouter();

  const logoutHandler = () => {
    if(window.confirm("Are you sure?")) {
      logout();
      window.location.href = "/login"
    }
  };

  React.useEffect(() => {
    setUser(Boolean(getUserInfo()));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <CustomLink to="/">Mutual Fund</CustomLink>
          <div style={{ flexGrow: 1 }} />
          <CustomLink to="/funds">
            <Button color="inherit">Funds</Button>
          </CustomLink>
          {!user && (
            <CustomLink to="/login">
              <Button color="inherit">Login</Button>
            </CustomLink>
          )}
          {user && (
            <>
              <CustomLink to="/profile">
                <Button color="inherit">Profile</Button>
              </CustomLink>
              <IconButton onClick={logoutHandler}>
                <PowerSettingsNewIcon sx={{ color: "#fff" }} />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
