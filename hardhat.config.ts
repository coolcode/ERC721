import { task } from "hardhat/config"
import fs from "fs"
import { config as dotenvConfig } from "dotenv"
import { resolve } from "path"
import { utils } from "ethers"
dotenvConfig({ path: resolve(__dirname, "./.env") })

import { HardhatUserConfig, NetworkUserConfig, HttpNetworkUserConfig } from "hardhat/types"

import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"

import "hardhat-gas-reporter"
import "@nomiclabs/hardhat-etherscan"

const MNEMONIC = process.env.MNEMONIC || "garlic pupil february legend morning bright section stool action stadium course busy" 

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(await account.getAddress())
    }
}) 

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            accounts: {
                mnemonic: MNEMONIC
            },
            blockGasLimit:120_000_000 
            // 4x block limit (120 million). An reasonable amount for major node operators
            // eth_call limit:
            // Alchemy: 550 million
            // Infura: 10x (300 Million)
            // chainId: 31337
        }
    },
    solidity: {
        version: "0.8.13",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    mocha: {
        timeout: 120000
    }, 
    gasReporter: {
        currency: "USD",
        gasPrice: 20,
        // enabled: process.env.REPORT_GAS ? true : false,
    }
}

export default config
