// return true if convertable to number
export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

// format number output
export function formatNumber(n, type) {
  if (!isNumeric(n)) return 'N/A'
  if (type === "decimal") return null
}
