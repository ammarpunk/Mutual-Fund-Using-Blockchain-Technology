const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const compiledFactory = require("./build/FundFactory.json");

provider = new HDWalletProvider({
  mnemonic:
    "round police beach ignore atom vintage heart month report execute feel apology",
  providerOrUrl: "https://goerli.infura.io/v3/30a5fd13b01d4fbf8c3e6a96589ff49c"
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi, null, 2)))
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "2000000" });

//   console.log("abi : ", JSON.stringify(compiledFactory.abi, null, 2))
  console.log("address: ", result.options.address)
};


deploy();
