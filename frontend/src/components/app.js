import React from "react"
import CheckInItems from "./checkInItems"


class App extends React.Component {

  state = {
    teamMood: []
  }

constructor(props) {
    super(props)

    const data = JSON.parse(localStorage.getItem("items"))
    if (data) {
      this.state = {
        items: data
      }
    } else {
      this.state = {
        items: []
      }
    }
  }

      addItem = e => {
        if (this._inputElement.value !== "") {
          const newItem = {
            text: this.state.icon + " " + this._inputElement.value,
            key: Date.now(),
            mood: this.state.mood
          }

          this.setState(prevState => {
            const checkins = prevState.items.concat(newItem)
            localStorage.setItem("items", JSON.stringify(checkins))

            return {
              items: checkins
            }
          })
        }
        this._inputElement.value = ""
        e.preventDefault()
      }

    deleteItem = key => {
      const filteredItems = this.state.items.filter(item => {
        return (item.key !== key)
      })

      this.setState({
        items: filteredItems
      })
    }

  handleMood = (event, mood) => {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({
      mood,
      icon: event.target.value

    })
  }

  render() {
    return (

      <div className="pageContainer">
        <div className="checkInContainer">
          <h1>Teamoji</h1>
          <p>How is your overall feeling right now? <br/>Write your name and check out!</p>
          <form onSubmit={this.addItem}>
            <label>
              <input ref={a => this._inputElement = a} type="text" name="name1" placeholder="Name" required />
            </label>
            <div className="happyEmojis">
              <span role="img" aria-label=":grinning:">
                <button id="myBtn" value="🤩" className="button10" onClick={event => this.handleMood(event, 10)}>🤩</button>
              </span>
              <span role="img" aria-label=":grin:">
                <button value="😁" className="button9" onClick={event => this.handleMood(event, 9)} >😁</button>
              </span>
              <span role="img" aria-label=":grinning:">
                <button value="😀" className="button8" onClick={event => this.handleMood(event, 8)} >😀</button>
              </span>
              <span role="img" aria-label=":neutral_face:">
                <button value="😊" className="button7" onClick={event => this.handleMood(event, 7)} >😊</button>
              </span>
              <span role="img" aria-label=":slight_smile:">
                <button value="🙂" className="button6" onClick={event => this.handleMood(event, 6)} >🙂</button>
              </span>
            </div>  
            <div className="sadEmojis">
              <span role="img"aria-label=":neutral_face:">
                <button value="😐" className="button5" onClick={event => this.handleMood(event, 5)} >😐</button>
              </span>
              <span role="img"aria-label=":slight_frown:">
                <button value="☹️" className="button4" onClick={event => this.handleMood(event, 4)} >☹️</button>
              </span>
              <span role="img"aria-label=":grimacing:">
                <button value="😬" className="button3" onClick={event => this.handleMood(event, 3)} >😬</button>
              </span>
              <span role="img"aria-label=":neutral_face:">
                <button value="😩" className="button2" onClick={event => this.handleMood(event, 2)} >😩</button>
              </span>
              <span role="img"aria-label=":flushed:">
                <button value="😳" className="button1" onClick={event => this.handleMood(event, 1)} >😳</button>
              </span>
            </div>
            <button type="submit" className="checkInButton" onSubmit={this.handleMood} required>
              Check out!
            </button>
          </form>
        </div>
        <CheckInItems entries={this.state.items}
          delete={this.deleteItem} />
        <div className="overallMoodContainer">
          <h2>Overall Mood: {this.state.teamMood}</h2>
        </div>
      </div>
    )
  }
}
export default App
