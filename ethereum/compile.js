const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

const campaignPath = path.resolve(__dirname, "contracts", "Fund.sol")
const source = fs.readFileSync(campaignPath, "utf8") 

const input = { 
    language: "Solidity",
    sources: {
        "Fund.sol": {
            content: source
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": [ "abi", "evm.bytecode" ]
            }
        }
    }
}
const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath)

for(let contract in output.contracts['Fund.sol']) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output.contracts['Fund.sol'][contract]
    )
}

// let bytecode, abi

// if(output.errors) {
//     output.errors.forEach(err => {
//         console.log(err.formattedMessage);
//     });
// } else {
//     bytecode = output.contracts['Campaign.sol'].Campaign.evm.bytecode.object;
//     abi = output.contracts['Campaign.sol'].Campaign.abi;
//     // console.log(`bytecode: ${bytecode}`);
//     // console.log(`abi: ${JSON.stringify(abi, null, 2)}`);
// }

// exports.bytecode = bytecode
// exports.abi = abi