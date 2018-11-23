import React from "react"

class CheckInItems extends React.Component {

  createCheckIn = item => {

    return <li onClick={() => this.delete(item.key)}
      key={item.key}> {item.text} </li>}

  delete(key) {
    this.props.delete(key)
  }

  render() {
    const checkinEntries = this.props.entries
    const listItems = checkinEntries.map(this.createCheckIn)

    return (
      <ul className="theCheckInList">
        {listItems}
      </ul>
    )
  }
}

export default CheckInItems
