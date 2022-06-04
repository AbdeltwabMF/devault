// export default function WrongNetwork (chainId) {
//   return ({
//     title: 'Wrong Network',
//     text: 'Please switch to the Ropsten network.',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Switch Network'
//   }).then((result) => {
//     try {
//       if (result.isConfirmed) {
//         if (chainId !== 3) {
//           const switchNetwork = async () => {
//             await window.ethereum.request({
//               method: 'wallet_switchEthereumChain',
//               params: [{
//                 chainId: '0x3'
//               }]
//             })
//           }
//           switchNetwork()
//         }
//       }
//       return true
//     } catch (error) {
//       console.log(error)
//     }
//   })
//   return false
// }
