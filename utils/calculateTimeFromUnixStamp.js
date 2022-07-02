/** @description Formats the unix timestamp in terms of days, hours, minutes, etc.
    * @param {number} timestamp - The unix timestamp to format
    * @returns {string} - The formatted timestamp
    */
const calculateTimeFromUnixStamp = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const day = date.getDate()
  let hour = date.getHours() - 2
  if (hour < 10) {
    hour = '0' + hour
  }
  let min = date.getMinutes()
  if (min < 10) {
    min = '0' + min
  }

  let sec = date.getSeconds()
  if (sec < 10) {
    sec = '0' + sec
  }
  const time = day + ' ' + month + ' ' + hour + ':' + min + ':' + sec + ' ' + year
  return time
}

export default calculateTimeFromUnixStamp
