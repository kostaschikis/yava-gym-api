function formatData(times) {
  /** 
   * NodeList[i].dataset: DOMStringMap
   * Converts DOMStringMap to Object 
   * {rate: "", hour: "7", min: "0", seats: "5"}
   */
  const seats = Array.from(times).map(element => Object.assign({}, element.dataset))

  const data = []

  // Makes a new array and converts the number of people to integer
  seats.forEach(({hour, seats}) => {
    if(parseInt(hour) < 10) hour = `0${hour}`
    return data.push({ hour: `${hour}:00`, people: parseInt(seats) })
  })

  return data
}

module.exports = formatData