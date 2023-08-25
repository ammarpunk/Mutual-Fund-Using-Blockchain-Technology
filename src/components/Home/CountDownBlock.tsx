import Image from "next/image";
import { Box, Container, Typography, Link, Stack, Button } from "@mui/material";
import CountDown from "react-countdown";
import image from "@assets/countdown.png";
import CustomLink from "@common/CustomLink";

const COUNTDOWN_DATA = {
  title: "Take control of your credit and identity.",
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore magna aliqua minim Lorem ipsum dolor sit amet consectetur.",
  button: {
    link: "/funds",
    label: "Invest now"
  },
  image: image
};

const CountDownBlock = () => {
  const { title, text, button, image } = COUNTDOWN_DATA;
  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column" justifyContent='space-evenly'>
        <Typography
          sx={{fontSize: 36, fontWeight: "500"}}
        >
          {title}
        </Typography>
        <Typography sx={{fontSize: 16, fontWeight: "400", lineHeight: "40px"}}>
          {text}
        </Typography>
        <CustomLink to={button.link}>
          <Button variant="contained">{button.label}</Button>
        </CustomLink>
      </Box>
      <Image src={image} alt="image" width={617} height={400} />
    </Box>
  );
};

export default CountDownBlock;
