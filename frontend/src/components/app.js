import React from "react"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: ""
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
  }

  handleUserName = event => {
    this.setState({ username: event.target.value })
  }

  handleEmail = event => {
    this.setState({ email: event.target.value })
  }

  handlePassword = event => {
    this.setState({ password: event.target.value })
  }

  render() {
    return (

      <div>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.username} onChange={this.handleUserName} UserName="Name" />
            </label>
            <label>
              Email:
            </label>
            <input type="text" value={this.state.email} onChange={this.handleEmail} name="email" />
            <label>
              Password:
            </label>
            <input type="password" value={this.state.password} onChange={this.handlePassword} name="password" />
            <label>
              <input type="submit" value="Submit" className="button" />
            </label>
          </form>
        </div>
      </div>
    )
  }

}

export default App
