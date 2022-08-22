function StationOptions({stationList}) {
  return (
    stationList.map((station) => {
      return (
        <option value={station} key={station}>
          {station}
        </option>
      )
    })
  )
}

export default StationOptions;