import getCrypto from './getCrypto'
import { convertWordArrayToUint8Array } from './downloadHandlers'

export function encryptAES256 (data, key) {
  const crypto = getCrypto()
  console.log('passphrase:', key)

  const fileBufferToWordArray = crypto.lib.WordArray.create(data)

  // The ciphertext you get back after encryption isn't a string yet
  const encryptedFileBufferWordArray = crypto.AES.encrypt(fileBufferToWordArray, key).toString()
  console.log('encrypted', encryptedFileBufferWordArray)

  return encryptedFileBufferWordArray
}

export function decryptAES256 (data, key) {
  const crypto = getCrypto()
  console.log('passphrase:', key)

  // The plaintext you get back after decryption is a WordArray object.
  const decrypted = crypto.AES.decrypt(data, key)
  console.log('decrypted:', decrypted)

  const decryptedUint8Array = convertWordArrayToUint8Array(decrypted)
  console.log('decryptedUint8Array:', decryptedUint8Array)

  return decryptedUint8Array
}
