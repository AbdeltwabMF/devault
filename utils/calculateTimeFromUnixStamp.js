/** @description Formats the unix timestamp in terms of days, hours, minutes, etc.
    * @param {number} timestamp - The unix timestamp to format
    * @returns {string} - The formatted timestamp
    */

const convertTo12HourTime = (hour, min) => {
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hh = hour % 12 || 12
  return hh + ':' + (min < 10 ? '0' : '') + min + ' ' + ampm
}

const calculateTimeFromUnixStamp = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const time = day + '/' + month + '/' + year + ' ' + convertTo12HourTime(hour, min)
  return time
}

export default calculateTimeFromUnixStamp
