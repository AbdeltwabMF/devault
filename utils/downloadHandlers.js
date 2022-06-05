const download = (path, filename) => {
  // Create a new link
  const anchor = document.createElement('a')
  anchor.href = path
  anchor.download = filename

  // Append to the DOM
  document.body.appendChild(anchor)

  // Trigger `click` event
  anchor.click()

  // Remove element from DOM
  document.body.removeChild(anchor)
}

export function downloadFile (path, filename) {
  download(path, filename)
}

export function downloadBlob (_data, _name, _mimeType) {
  const blob = new Blob([_data], {
    type: _mimeType
  })

  const url = window.URL.createObjectURL(blob)
  download(url, _name)

  setTimeout(function () {
    return window.URL.revokeObjectURL(url)
  }, 1000)
}

// assumes wordArray is Big-Endian (because it comes from CryptoJS which is all BE)
// From: https://gist.github.com/creationix/07856504cf4d5cede5f9#file-encode-js
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
