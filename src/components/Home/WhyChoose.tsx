import React from "react";
import { Box, Typography, Stack, SvgIcon } from "@mui/material";
// import { ReactComponent as BrandIcon } from "@assets/why-choose-1.svg";
import icon1 from "@assets/why-choose-1.svg";
import icon2 from "@assets/why-choose-2.svg";
import icon3 from "@assets/why-choose-3.svg";
import icon4 from "@assets/why-choose-4.svg";
import WhyChoose1 from "@assets/WhyChoose1";
import WhyChoose2 from "@assets/WhyChoose2";
import WhyChoose3 from "@assets/WhyChoose3";
import WhyChoose4 from "@assets/WhyChoose4";

const WHY_CHOOSE_DATA = {
  blockTitle: {
    title: "Why you choose TheCoin",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing"
  },
  posts: [
    {
      icon: WhyChoose1,
      title: "Great Market Value",
      text:
        "Lorem ipsum dolor sit amet with consectetur adipisicing elit the help eiusmod tempor."
    },
    {
      icon: WhyChoose1,
      title: "Verified Mining Process",
      text:
        "Lorem ipsum dolor sit amet with consectetur adipisicing elit the help eiusmod tempor."
    },
    {
      icon: WhyChoose1,
      title: "Fastest Miner",
      text:
        "Lorem ipsum dolor sit amet with consectetur adipisicing elit the help eiusmod tempor."
    },
    {
      icon: WhyChoose1,
      title: "Secure Transaction",
      text:
        "Lorem ipsum dolor sit amet with consectetur adipisicing elit the help eiusmod tempor."
    }
  ]
};

const WhyChoose = () => {
  const { blockTitle, posts } = WHY_CHOOSE_DATA;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Stack spacing={2}>
        <Typography
          sx={{ fontSize: 30, fontWeight: "600", textAlign: "center" }}
        >
          {blockTitle.title}
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="body2">
          {blockTitle.text}
        </Typography>
      </Stack>
      <Box display="flex" justifyContent="space-between" mt={2}>
        {posts.map(({ icon: Icon, text, title }, index) => (
          <Stack spacing={1} key={`why-choose-post-key-${index}`} alignItems="center">
            <Icon />
            <Typography sx={{ fontSize: 18, fontWeight: "500" }}>
              {title}
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: "400", textAlign: "center" }}>
              {text}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default WhyChoose;
