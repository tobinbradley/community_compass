// return true if convertable to number
export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

// format number output
export function formatNumber(n, type = null) {
  if (!isNumeric(n)) return 'N/A'
  if (type === 'currency') return Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(n)
  if (type === 'percent') return Intl.NumberFormat('en-US', {style: 'percent', maximumFractionDigits: 0}).format(n / 100)
  if (type === 'decimal') return Intl.NumberFormat('en-US', {maximumFractionDigits: 1}).format(n)
  return Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(n)
}

export function download(payload, encoding = null, filename) {
  // Murder this when ie11 dies
  if (window.navigator.msSaveBlob) {
    const blob = new Blob([payload], { type: encoding })
    navigator.msSaveBlob(blob, filename)
  } else {
    const downloadLink = document.createElement('a')

    if (encoding) {
      downloadLink.href = `${encoding}base64,${btoa(payload)}`
    } else {
      downloadLink.href = payload
    }
    downloadLink.download = `${filename}`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}
