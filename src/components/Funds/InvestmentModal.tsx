import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//@ts-ignore
import web3 from "@ethereum/web3";
import FundEth from "@ethereum/fund";
import { useRouter } from "next/router";
import { CircularProgress, InputAdornment } from "@mui/material";

type InvestmentModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fund: any;
  investor: string;
};

const InvestmentModal = ({
  open,
  setOpen,
  fund,
  investor
}: InvestmentModalProps) => {
  const router = useRouter();
  const [amount, setAmount] = React.useState(`${+fund.details.sip + 1}`);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const investHandler = async () => {
    const data = {
      investor,
      fund: fund.id,
      amount
    };
    setLoading(true);
    try {
      const fd = FundEth(fund.address);
      //@ts-ignore
      const accounts = await web3.eth.getAccounts();
      //@ts-ignore
      await fd.methods.addInvestment().send({
        from: accounts[0],
        value: data.amount
      });
      await fetch("/api/investments", {
        method: "post",
        body: JSON.stringify(data)
      });
      handleClose();
      router.push("/profile");
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{fund.name}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3 }}>
          To invest on this fund, please enter your amount here. We will send
          updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          label="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">Wei</InputAdornment>
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={investHandler} disabled={loading}>Invest {loading && <CircularProgress size={20} sx={{ml: 1}} />}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvestmentModal;
