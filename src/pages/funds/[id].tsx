import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import { Sparklines, SparklinesLine } from "react-sparklines";
import React from "react";
import { server } from "@src/config/config";
import { NextPageContext } from "next";
import { getUserInfo } from "@src/helpers";
import InvestmentModal from "@components/Funds/InvestmentModal";

const FundDetails = ({ data }: any) => {
  const [user, setUser] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <Box sx={containerStyle}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <div>
          <Stack direction="row" spacing={2} alignItems="center">
            <img
              alt="logo"
              src={data.image}
              style={imgStyle}
            />
            <Typography sx={titleStyle}>{data.name}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} mt={2}>
            <Box sx={tagStyle}>EQUALITY</Box>
            <Box sx={tagStyle}>{data.cap}</Box>
            <Box sx={tagStyle}>5.0</Box>
          </Stack>
        </div>
        {user && (
          <Button
            variant="text"
            sx={{ whiteSpace: "nowrap", fontSize: 18, textTransform: "none" }}
            onClick={() => setOpen(true)}
          >
            Invest
          </Button>
        )}
      </Box>

      <Grid container spacing={2} my={3}>
        <Grid item xs={6}>
          <Sparklines
            data={[
              5,
              10,
              5,
              20,
              8,
              15,
              5,
              10,
              5,
              20,
              8,
              15,
              5,
              10,
              5,
              20,
              8,
              15,
              5,
              10,
              5,
              20,
              8,
              15
            ]}
          >
            <SparklinesLine color="#26a69a" />
          </Sparklines>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={descriptionStyle}>{data.summary}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" sx={headlinesStyle}>
            Fund Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <DetailItem title="Risk" description={data.details.risk} />
                <DetailItem
                  title="Min SIP Amount"
                  description={`${data.details.sip} Wei`}
                />
                <DetailItem
                  title="Expense Ratio"
                  description={`${data.details.expense} Wei`}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <DetailItem
                  title="NAV"
                  description={`${data.details.nav} Wei`}
                />
                <DetailItem
                  title="Fund Started"
                  description={new Date(data.createdAt).toDateString()}
                />
                <DetailItem
                  title="Fund Size"
                  description={`${data.details.size} Wei`}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" sx={headlinesStyle} mb={2}>
            Pros
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {(data.pros as string[]).map((item, index) => (
                  <TableRow
                    key={item}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}.
                    </TableCell>
                    <TableCell>{item}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" sx={headlinesStyle} mb={2}>
            Cons
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {(data.cons as string[]).map((item, index) => (
                  <TableRow
                    key={item}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}.
                    </TableCell>
                    <TableCell>{item}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Stack spacing={3}>
        <Typography variant="h4" sx={headlinesStyle}>
          Axis Bluechip Fund Direct Plan Growth Details
        </Typography>
        <Typography sx={descriptionStyle}>{data.description}</Typography>
        <Typography variant="h4" sx={headlinesStyle}>
          Investment Objective
        </Typography>
        <Typography sx={descriptionStyle}>{data.objective}</Typography>
        <Typography variant="h4" sx={headlinesStyle}>
          Tax Implications
        </Typography>
        <Typography sx={descriptionStyle}>{data.tax}</Typography>
      </Stack>

      <InvestmentModal open={open} setOpen={setOpen} fund={data} investor={user?._id} />
    </Box>
  );
};

FundDetails.getInitialProps = async (ctx: NextPageContext) => {
  const funds = await fetch(`${server}/api/funds/${ctx.query.id}`);
  const data = await funds.json();

  return { data };
};

const DetailItem = ({ title, description }: any) => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell component="th" scope="row">
      {title}
    </TableCell>
    <TableCell>{description}</TableCell>
  </TableRow>
);

const fundDetails = [
  { title: "Risk", description: "Moderately High" },
  { title: "Min SIP Amount", description: "₹500" },
  { title: "Expense Ratio", description: "0.43%" },
  { title: "NAV", description: "₹33.36 (28 Jul 2020)" },
  { title: "Fund Started", description: "01 Jan 2013" },
  { title: "Fund Size", description: "₹14,522 Cr" }
];

const pros = [
  "Lower expense ratio - 0.44%",
  "1Y Returns are higher than the category average returns",
  "3Y Returns are higher than the category average returns",
  "5Y Returns are higher than the category average returns"
];

const cons = ["Risk-adjusted returns are lower compared to the category"];

const containerStyle = {
  padding: "4vh 8vw",
  mt: 3
};

const imgStyle = {
  height: "56px",
  width: "56px",
  padding: "5px",
  borderRadius: "50%",
  boxShadow: "0 0 6px #00000085"
};

const titleStyle = {
  fontSize: 28,
  lineHeight: "22.4px",
  fontWeight: "500"
};

const tagStyle = {
  border: "1px solid #ccc",
  padding: "4px 8px",
  fontSize: 14,
  fontWeight: "500",
  textTransform: "uppercase"
};

const headlinesStyle = {
  fontSize: 24,
  fontWeight: "500"
};

const descriptionStyle = {
  fontSize: 14,
  fontWeight: "400"
};

export default FundDetails;
