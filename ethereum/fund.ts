//@ts-ignore
import web3 from "./web3";
import compiledFund from "./build/Fund.json"

export default (address: any) => {
  //@ts-ignore
  return new web3.eth.Contract(
    JSON.parse(JSON.stringify(compiledFund.abi, null, 2)),
    address
  );
};
