//@ts-ignore
import web3 from "./web3";
import compiledFactory from "./build/FundFactory.json"

const address = "0x9BA9d292FaA53a369C2EC3227F33117dE055BfA3";
// const address = process.env.NEXT_PUBLIC_ADDRESS;

//@ts-ignore
const instance = new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi, null, 2)), address)

export default instance