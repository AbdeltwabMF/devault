export default function isMetamaskError (error) {
  const rpc = [
    -32000,
    -32001,
    -32002,
    -32003,
    -32004,
    -32005,
    -32700,
    -32600,
    -32601,
    -32602,
    -32603
  ]

  const provider = [
    4001,
    4100,
    4200,
    4900,
    4901
  ]

  if (rpc.includes(error.code)) {
    console.log('rpc error')
    return true
  } else if (provider.includes(error.code)) {
    console.log('provider error')
    return true
  } else {
    return false
  }
}
