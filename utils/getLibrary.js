import { ethers } from 'ethers'

export const getLibrary = () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  if (typeof window.ethereum !== 'undefined') {
    // The "any" network will allow spontaneous network changes
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

    provider.on('network', (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload()
      }
    })
    return provider
  } else if (typeof window.web3 !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.web3.currentProvider, 'any')
    provider.on('network', (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload()
      }
    })
    return provider
  } else {
    return null
  }
}
