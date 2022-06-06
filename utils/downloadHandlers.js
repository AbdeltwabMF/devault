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
