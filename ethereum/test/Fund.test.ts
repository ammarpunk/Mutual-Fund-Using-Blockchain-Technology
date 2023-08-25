import assert from "assert"
import ganache from "ganache"
import Web3 from "web3"

import compiledFactory from "../build/FundFactory.json"
import compiledFund from "../build/Fund.json"


// const web3 = new Web3(ganache.provider());

// let accounts;
// let factory;
// let campaignAddress;
// let campaign;

// beforeEach(async () => {
//   // Get a list of all contracts
//   accounts = await web3.eth.getAccounts();

//   // The contract
//   factory = await new web3.eth.Contract(
//     JSON.parse(JSON.stringify(compiledFactory.abi, null, 2))
//   )
//     .deploy({ data: compiledFactory.evm.bytecode.object })
//     .send({ from: accounts[0], gas: "2000000" });

//   await factory.methods.createCampaign("100").send({
//     from: accounts[0],
//     gas: "1000000"
//   });

//   [campaignAddress] = await factory.methods.getDeployedCampaigns().call()
//   campaign = await new web3.eth.Contract(
//     JSON.parse(JSON.stringify(compiledCampaign.abi, null, 2)),
//     campaignAddress
//   )
// });

// describe("Factory", () => {
//   it("deploys a contract", () => {
//     assert.ok(factory.options.address);
//     assert.ok(campaign.options.address);
//   });

//   it("marks caller as the campaign manager", async () => {
//     const manager = await campaign.methods.manager().call()
//     assert.equal(accounts[0], manager);
//   })

//   it("allows people to contribute money and mark them as approvers", async () => {
//     await campaign.methods.contribute().send({
//       value: '200',
//       from: accounts[1]
//     })

//     const isContributor = await campaign.methods.approvers(accounts[1]).call()
//     assert(isContributor)
//   })

//   it("requires minimum contribution", async () => {
//     try {
//       await campaign.methods.contribute().send({
//         value: '5',
//         from: accounts[1]
//       })
//       assert(false)
//     } catch(err) {
//       assert(err)
//     }
//   })
// });
