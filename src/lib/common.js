// return true if convertable to number
export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

// format number output
export function formatNumber(m, n) {
  n = n.toFixed(m.decimals || 0)
  n = n.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return (m.prefix || '') + n + (m.suffix || '')
}
