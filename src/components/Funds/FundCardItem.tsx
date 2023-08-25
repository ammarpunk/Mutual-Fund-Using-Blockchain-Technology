import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import CustomLink from "@common/CustomLink";
import { getUserInfo } from "@src/helpers";
import InvestmentModal from "./InvestmentModal";

const FundCardItem = (fund: any) => {
  const [user, setUser] = React.useState<any>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setUser(getUserInfo())
  }, [])

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <img src={fund.image} style={imgStyle} alt="" />
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Stack spacing={2}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={bigTitleStyle}>{fund.name}</Typography>
              { Boolean(user) && (
                <Button variant="text" sx={{ whiteSpace: "nowrap" }} onClick={() => setOpen(true)}>
                  Invest
                </Button>
              ) }
            </Box>
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Stack spacing={1}>
                    <Typography sx={titleStyle}>NAV</Typography>
                    <Typography sx={descriptionStyle}>{fund.details?.nav} Wei</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack spacing={1}>
                    <Typography sx={titleStyle}>SIP</Typography>
                    <Typography sx={descriptionStyle}>{fund.details?.sip} Wei</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack spacing={1}>
                    <Typography sx={titleStyle}>Risk</Typography>
                    <Typography sx={descriptionStyle}>
                      {fund.details?.risk}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <CustomLink to={`/funds/${fund.id}`}>
                <Button variant="text" sx={{ whiteSpace: "nowrap" }}>
                  Know more
                </Button>
              </CustomLink>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <InvestmentModal open={open} setOpen={setOpen} fund={fund} investor={user?._id} />
    </Paper>
  );
};

const bigTitleStyle = {
  fontSize: 20,
  fontWeight: "600"
};

const titleStyle = {
  fontSize: 16,
  fontWeight: "500"
};

const descriptionStyle = {
  fontSize: 14,
  fontWeight: "400"
};

const imgStyle = {
  height: "56px",
  width: "56px",
  borderRadius: "50%"
};

export default FundCardItem;
