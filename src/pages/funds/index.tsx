import FundCardItem from "@components/Funds/FundCardItem";
import { Box, Stack } from "@mui/material";
import { server } from "@src/config/config";
import factory from "@ethereum/factory";

const Funds = ({ data }: any) => {
  return (
    <Box sx={containerStyle}>
      <Stack spacing={2} my={2}>
        {data.map((fund: any) => (
          <FundCardItem key={fund.id} {...fund} />
        ))}
      </Stack>
    </Box>
  );
};

Funds.getInitialProps = async () => {
  const funds = await fetch(`${server}/api/funds`);
  const data = await funds.json();

  return { data };
};

const containerStyle = {
  padding: "4vh 10vw"
};

export default Funds;
