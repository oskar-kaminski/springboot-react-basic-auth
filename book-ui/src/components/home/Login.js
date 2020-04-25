import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import BookApi from '../misc/BookApi'

class Login extends Component {
  static contextType = AuthContext

  state = {
    username: '',
    password: '',
    isLoggedIn: false,
    isError: false
  }

  componentDidMount() {
    const { userIsAuthenticated } = this.context
    const isLoggedIn = userIsAuthenticated()
    this.setState({ isLoggedIn })
  }

  handleChange = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username, password } = this.state
    if (!(username && password)) {
      this.setState({ isError: true })
      return
    }

    const userCreds = { username, password }
    BookApi.post('/auth/authenticate', userCreds, {
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          const { id, name, role } = response.data
          const authdata = window.btoa(username + ':' + password)
          const user = { id, name, role, authdata }

          const { userLogin } = this.context
          userLogin(JSON.stringify(user))

          this.setState({
            username: '',
            password: '',
            isLoggedIn: true,
            isError: false
          })
        } else {
          this.setState({ isError: true })
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({ isError: true })
      })
  }

  getReferer = () => {
    const locationState = this.props.location.state
    return locationState && locationState.referer ? locationState.referer : '/'
  }

  render() {
    const { isLoggedIn, isError } = this.state
    const referer = this.getReferer()
    if (isLoggedIn) {
      return <Redirect to={referer} />
    } else {
      return (
        <div>
          <Grid textAlign='center'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment>
                  <Form.Input
                    fluid
                    autoFocus
                    id='username'
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    id='password'
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange}
                  />
                  <Button color='blue' fluid size='large'>Login</Button>
                </Segment>
              </Form>
              <Message>Don't have already an account?
              <a href='/signup' color='teal' as={NavLink} exact to="/signup">Sign Up</a>
              </Message>
              {isError && <Message negative>The username or password provided were incorrect!</Message>}
            </Grid.Column>
          </Grid>
        </div>
      )
    }
  }
}

export default Login