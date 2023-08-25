import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Grid, MenuItem } from "@mui/material";
import CustomInput from "@common/CustomInput";
import CustomSelect from "@common/CustomSelect";
import ProsCons from "@components/Funds/ProsCons";
import { useRouter } from "next/router";
import { server } from "@src/config/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@src/lib/firebase";
import UploadAvatar from "@common/UploadAvatar/UploadAvatar";
import factory from "@ethereum/factory";
//@ts-ignore
import web3 from "@ethereum/web3";

type detailsType = {
  risk: string;
  sip: string;
  expense: string;
  nav: string;
  size: string;
};

type IFormInputs = {
  name: string;
  image: string;
  summary: string;
  cap: string;
  details: detailsType;
  pros: string[];
  cons: string[];
  description: string;
  objective: string;
  tax: string;
};

const Fund = () => {
  const router = useRouter()
  const isNewFund = router.query.id?.includes("new-mutual-fund")
  const [loading, setLoading] = React.useState(false);
  
  const schema = yup.object({
    name: yup.string().required("Name required"),
    image: yup.string(),
    summary: yup.string().required("Summary required"),
    cap: yup.string().required("CAP required"),
    details: yup.object({
      risk: yup.string().required("Risk required"),
      sip: yup.string().required("SIP required"),
      expense: yup.string(),
      nav: yup.string().required("NAV required"),
      size: yup.string().required("Size required")
    }),
    pros: yup.array().of(yup.string()),
    cons: yup.array().of(yup.string()),
    description: yup.string(),
    objective: yup.string().required("Size required"),
    tax: yup.string().required("Size required")
  });

  const defaultValues = {
    name: "",
    image: "",
    summary:"",
    cap: "Mid Cap",
    details: {
      risk: "Low Risk",
      sip: "",
      expense: "0.43",
      nav: "",
      size: "0"
    },
    pros: [
      "Lower expense ratio - 0.44%",
      "1Y Returns are higher than the category average returns",
      "3Y Returns are higher than the category average returns",
      "5Y Returns are higher than the category average returns"
    ],
    cons: ["Risk-adjusted returns are lower compared to the category"],
    description: "",
    objective: "",
    tax: "",
  };

  const methods = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues
  });

  const { handleSubmit, setValue, watch } = methods;

  const handleUpload = () => {
    return new Promise(function (resolve, reject) {
      if (!watch("image")) {
        reject("no image")
        return
      };

      const storageRef = ref(storage, `files/${(watch("image") as any).name}`);
      const uploadTask = uploadBytesResumable(storageRef, (watch("image") as any));

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // setProgresspercent(progress);
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          });
        }
      );
    });
  }

  const onSubmit: SubmitHandler<IFormInputs> = async data => {
    setLoading(true)
    try {
      const image = await handleUpload()        
      if(isNewFund) {
        //@ts-ignore
        const accounts = await web3.eth.getAccounts();
        await factory.methods
          .createFund(data.details.sip)
          .send({ from: accounts[0] });

        
        const addresses = await factory.methods.getDeployedFunds().call()

        await fetch("/api/funds", {
          method: "POST",
          body: JSON.stringify({...data, image, address: addresses[addresses.length -1]}),
        });
      } else {
        await fetch(`/api/funds/${router.query.id}`, {
          method: "PATCH",
          body: JSON.stringify({...data, image}),
        });
      }
      setLoading(false)
      router.push("/manager/funds")
    } catch(err) {
      console.log(err)
      setLoading(false)
    }
  };

  React.useEffect(() => {
    (async () => {
      const id = window.location.href.split('/').pop()
      if(id === "new-mutual-fund") return
      const fund = await fetch(`${server}/api/funds/${id}`)
      const data = await fund.json()
      setValue("name", data.name)
      setValue("summary", data.summary)
      setValue("cap", data.cap)
      setValue("details", data.details)
      setValue("pros", data.pros)
      setValue("cons", data.cons)
      setValue("description", data.description)
      setValue("objective", data.objective)
      setValue("tax", data.tax)
      setValue("image", data.image)
    })()
  }, [setValue])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <UploadAvatar name="image" />
          </Grid>
          <Grid item xs={9}>
            <CustomInput label="Name" name="name" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Summary"
              name="summary"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <CustomSelect name="cap" fullWidth>
              {capList.map(cap => (
                <MenuItem value={cap} key={cap}>
                  {cap}
                </MenuItem>
              ))}
            </CustomSelect>
          </Grid>
          <Grid item xs={3}>
            <CustomSelect name="details.risk" fullWidth>
              {riskList.map(risk => (
                <MenuItem value={risk} key={risk}>
                  {risk}
                </MenuItem>
              ))}
            </CustomSelect>
          </Grid>
          <Grid item xs={3}>
            <CustomInput
              label="SIP (Wei)"
              name="details.sip"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <CustomInput label="NAV" name="details.nav" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <ProsCons label="Pro" name="pros" title="Pros" />
          </Grid>
          <Grid item xs={6}>
            <ProsCons label="Con" name="cons" title="Cons" />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Axis Bluechip Fund Direct Plan Growth Details"
              name="description"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Investment Objective"
              name="objective"
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Tax Implications"
              name="tax"
              multiline
              rows={2}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" sx={{mt: 2}} disabled={loading}>{isNewFund ? "Add" : "Update"} Fund {loading && <CircularProgress size={20} sx={{ml: 1}} />}</Button>
      </form>
    </FormProvider>
  );
};

const capList = ["Large Cap", "Mid Cap", "Small Cap"];
const riskList = ["Low Risk", "Medium Risk", "High Risk"];

export default Fund;
