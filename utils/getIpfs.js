import { create } from 'ipfs-http-client'

export default function getIpfs () {
  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  })
  return ipfs
}
