const { ethers, run, network } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  console.log(simpleStorage.address)
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(5)
    await verify(simpleStorage.address, [])
  }
  const tx1 = await simpleStorage.retrieve()
  console.log(tx1.toString())
  const tx2 = await simpleStorage.store("7")
  await tx2.wait(1)
  const newval = await simpleStorage.retrieve()
  console.log(newval.toString())
}

async function verify(contractAddress, args) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified")
    } else {
      console.log(e)
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
