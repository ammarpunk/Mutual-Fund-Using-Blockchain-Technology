import Image from "next/image";
import { Box, Container, Typography, Link, Button, Stack } from "@mui/material";
import graph from "@assets/graph.png";
const SALES_INVESTMENT_DATA = {
  image: graph,
  title: "Total Investment sale from last year transaction",
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore magna aliqua minim Lorem ipsum dolor sit amet consectetur.",
  button: {
    link: "#",
    label: "Learn More"
  }
};

const SalesInvestment = () => {
  const { image, title, text, button } = SALES_INVESTMENT_DATA;
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <img src="../../assets/graph.png" alt="Investment Chart" width={617} height={400} />
        <Box display="flex" flexDirection="column" justifyContent='space-evenly'>
          <Typography sx={{fontSize: 36, fontWeight: "500"}}>{title}</Typography>
          <Typography sx={{fontSize: 16, fontWeight: "400", lineHeight: "40px"}}>{text}</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SalesInvestment;
