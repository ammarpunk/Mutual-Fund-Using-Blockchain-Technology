import Banner from "@components/Home/Banner";
import CountDownBlock from "@components/Home/CountDownBlock";
import SalesInvestment from "@components/Home/SalesInvestment";
import WhyChoose from "@components/Home/WhyChoose";
import Footer from "@components/layout/Footer";
import { Stack } from "@mui/material";

const Home = () => {
  return (
    <Stack spacing={7} mt={2} mb={4}>
      <Banner />
      <WhyChoose />
      <SalesInvestment />
      <CountDownBlock />
      <Footer />
    </Stack>
  );
};

export default Home;
