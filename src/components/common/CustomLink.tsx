import React from "react";
import { Link as MUILink, LinkProps } from "@mui/material";
import NextLink from "next/link";

type CustomLinkProps = {
  to: string;
  children: React.ReactNode;
};

const CustomLink = ({ children, to, ...props }: CustomLinkProps & LinkProps) => {
  return (
    <MUILink
      component={NextLink}
      href={to || "/"}
      color="inherit"
      underline="none"
      {...props}
    >
      {children}
    </MUILink>
  );
};

export default CustomLink;
