import Header from "@components/Header/Header";
import { Box, Container, Toolbar } from "@mui/material";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Header />
      <Toolbar />
      {children}
    </Container>
  );
};

export default PublicLayout;
