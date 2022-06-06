import getCrypto from './getCrypto'

export function encryptAES256 (data, key) {
  const crypto = getCrypto()
  console.log('passphrase:', key)

  const fileBufferToWordArray = crypto.lib.WordArray.create(data)

  // The ciphertext you get back after encryption isn't a string yet
  // It's a CipherParams object
  const encryptedFileBufferWordArray = crypto.AES.encrypt(fileBufferToWordArray, key).toString()
  console.log('encrypted', encryptedFileBufferWordArray)

  return encryptedFileBufferWordArray
}

export function decryptAES256 (data, key) {
  const crypto = getCrypto()
  console.log('passphrase:', key)
  console.log('data to binaryString', convertUint8ArrayToBinaryString(data))

  // The plaintext you get back after decryption is a WordArray object.
  const decrypted = crypto.AES.decrypt(convertUint8ArrayToBinaryString(data), key)
  console.log('decrypted:', decrypted)

  const decryptedUint8Array = convertWordArrayToUint8Array(decrypted)
  console.log('decryptedUint8Array:', decryptedUint8Array)

  return decryptedUint8Array
}

export function convertWordArrayToUint8Array (wordArray) {
  const len = wordArray.words.length
  const u8Array = new Uint8Array(len << 2)
  let offset = 0; let word; let i

  for (i = 0; i < len; i++) {
    word = wordArray.words[i]
    u8Array[offset++] = word >> 24
    u8Array[offset++] = (word >> 16) & 0xff
    u8Array[offset++] = (word >> 8) & 0xff
    u8Array[offset++] = word & 0xff
  }
  return u8Array
}

export function convertUint8ArrayToWordArray (u8Array) {
  const words = []
  let i = 0
  const len = u8Array.length

  while (i < len) {
    words.push((u8Array[i++] << 24) | (u8Array[i++] << 16) | (u8Array[i++] << 8) | (u8Array[i++]))
  }

  return {
    sigBytes: words.length * 4,
    words: words
  }
}

export function convertUint8ArrayToBinaryString (u8Array) {
  const len = u8Array.length
  let binaryString = ''
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(u8Array[i])
  }
  return binaryString
}

export function convertBinaryStringToUint8Array (binaryString) {
  const len = binaryString.length; const u8Array = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    u8Array[i] = binaryString.charCodeAt(i)
  }
  return u8Array
}
