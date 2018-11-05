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
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "bob",
        password: "password1"
      })
    })
      .then(response => response.json())
      .then(json => {
        // Login was successful.
        localstorage.setItem("token", json.token)
        localstorage.setItem("userId", json.userId)
      })
      .catch(err => {
        console.log("Login failed", err)
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
