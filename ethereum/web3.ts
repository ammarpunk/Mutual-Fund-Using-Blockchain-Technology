import Web3 from "web3";

let web3;

//@ts-ignore
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //@ts-ignore
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/30a5fd13b01d4fbf8c3e6a96589ff49c"
  );
  web3 = new Web3(provider);
}

export default web3;
