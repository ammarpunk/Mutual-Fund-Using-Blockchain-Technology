import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import CustomLink from "@common/CustomLink";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

export const mainListItems = (
  <React.Fragment>
    <CustomLink to="/manager/funds">
      <ListItemButton>
        <ListItemIcon>
          <RequestQuoteIcon />
        </ListItemIcon>
        <ListItemText primary="Mutual Funds" />
      </ListItemButton>
    </CustomLink>
    <CustomLink to="/manager/investors">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Investors" />
      </ListItemButton>
    </CustomLink>
    <CustomLink to="/manager/investments">
      <ListItemButton>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Investments" />
      </ListItemButton>
    </CustomLink>
  </React.Fragment>
);
