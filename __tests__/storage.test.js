/* eslint-env jest */
const { ethers } = require('hardhat')

it('should return 1 -- the count of the files', async function () {
  const Storage = await ethers.getContractFactory('Storage')

  const storage = await Storage.deploy()
  await storage.deployed()

  const storeFileTx = await storage.storeFile('amd.pdf', 134289, 'application/pdf', 'C81E24EB7A70438929DA795574EE7E7935B5FCFBEA33D54640B243A52DD34288')

  // wait until the transaction is mined
  await storeFileTx.wait()

  const filesCount = await storage.getFilesLength()

  expect(parseInt(filesCount)).toBe(1)
})

it('should return 0 -- the count of the files', async function () {
  const Storage = await ethers.getContractFactory('Storage')

  const storage = await Storage.deploy()
  await storage.deployed()

  const storeFileTx = await storage.storeFile('amd.pdf', '1073741824', 'application/pdf', 'QmbopufRN1kR1FENy3YnsjuZikbbBEmzvTMcxPpc9Ztfm1')

  // wait until the transaction is mined
  await storeFileTx.wait()

  const filesCount = await storage.getFilesLength()

  expect(parseInt(filesCount)).toBe(1)
})
