const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", () => {
  let SimpleStorageFactory, simpleStorage
  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await SimpleStorageFactory.deploy()
  })
  it("Should start with fav num 0", async () => {
    const curr = await simpleStorage.retrieve()
    const expected = "0"
    assert.equal(curr.toString(), expected)
  })
  it("Should update", async () => {
    const expected = "7"
    const tx = await simpleStorage.store(expected)
    await tx.wait(1)

    const currentval = await simpleStorage.retrieve()
    assert.equal(currentval.toString(), expected)
  })
})
