/* eslint-env jest */
const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('Storage', () => {
  const deploy = async () => {
    const Storage = await ethers.getContractFactory('Storage')

    const storage = await Storage.deploy()
    await storage.deployed()
    return storage
  }

  it('should return the count of files equal to 1', async function () {
    const storage = await deploy()
    const storeFileTx = await storage.storeFile('amf.pdf', 134289, 'application/pdf', 'C81E24EB7A70438929DA795574EE7E7935B5FCFBEA33D54640B243A52DD34288')

    // wait until the transaction is mined
    await storeFileTx.wait()

    const filesCount = await storage.getFilesCount()

    expect(parseInt(filesCount, 10)).to.equal(1)
  })

  it('should revert the transaction and return 0 as files count', async function () {
    const storage = await deploy()
    const storeFileTx = await storage.storeFile('amd.pdf', '1073741824', 'application/pdf', 'QmbopufRN1kR1FENy3YnsjuZikbbBEmzvTMcxPpc9Ztfm1')

    // wait until the transaction is mined
    await storeFileTx.wait()

    const filesCount = await storage.getFilesCount()

    expect(parseInt(filesCount, 10)).to.equal(1)
  })

  it('should return null for file with index 0', async function () {
    const storage = await deploy()
    const storeFileTx = await storage.storeFile('hola.png', 14289, 'image/png', 'C81E24EB7A70438929DA795574EE7E7935B5FCFBEA33D54640B243A52DD34288')
    await storeFileTx.wait()

    const files = await storage.getAllFiles()
    console.log(parseInt(files[0].index, 10))

    const removeFileTx = await storage.removeFile(1)
    await removeFileTx.wait()

    const filesCount = await storage.getFilesCount()
    expect(filesCount).to.equal(0)
  })
})
