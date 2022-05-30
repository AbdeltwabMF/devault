import { ethers } from 'ethers'

export const getLibrary = () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return provider
  } else if (typeof window.web3 !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
    return provider
  } else {
    // If neither are available, we'll just use the default
    // provider, which just points to the local node
    return new ethers.providers.JsonRpcProvider()
  }
}
