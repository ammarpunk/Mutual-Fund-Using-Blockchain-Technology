import React, { useState } from "react";
import Image from "next/image";
import { Container, Box, Typography, Button, Link } from "@mui/material";
import BannerImage from "@assets/banner-1.png";
import CustomLink from "@common/CustomLink";
const BANNER_DATA = {
  title: "Welcome to next level Cryptocurrencies Token with faster transfer",
  text:
    "We helps brands & agencies manage top-performing influencer programs: talent discovery & qualification, relationship management, automated campaign reporting, performance measurement and competitive benchmarking.",
  button: {
    link: "/funds",
    label: "Invest now"
  },
  videoBtn: {
    link: "#",
    label: "White paper"
  },
  bannerImage: BannerImage
};

const Banner = () => {
  const { title, text, button, bannerImage } = BANNER_DATA;

  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column" justifyContent="space-evenly">
        <Typography sx={{fontSize: 40, fontWeight: "500", lineHeight: "55px"}}>{title}</Typography>
        <Typography variant="body1">{text}</Typography>
        <CustomLink to={button.link} underline="none">
          <Button variant="contained">{button.label}</Button>
        </CustomLink>
      </Box>

      <Image src={bannerImage} alt="Banner Mockup" width={590} height={392} />
    </Box>
  );
};

export default Banner;
