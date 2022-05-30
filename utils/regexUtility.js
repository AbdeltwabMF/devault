export const truncateAddress = (address) => {
  if (!address) return 'No Account'
  const match = address.match(
    /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  )
  if (!match) return address
  return `${match[1]}…${match[2]}`
}

export const toHex = (num) => {
  const val = Number(num)
  return '0x' + val.toString(16)
}

export const truncateBalance = (balance) => {
  if (!balance) return '0'
  const match = balance.match(/^(\d+).(\d{4})/)
  if (!match) return balance
  return `${match[1]}.${match[2]}`
}
