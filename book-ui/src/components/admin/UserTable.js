import React from 'react'
import { Grid, Header, Form, Button, Icon, Input, Segment, Table } from 'semantic-ui-react'

function UserTable({ isUsersLoading, users, userUsernameSearch, handleChange, deleteUser, searchUser }) {
  let userList
  if (users.length === 0) {
    userList = (
      <Table.Row key='no-user'>
        <Table.Cell collapsing textAlign='center' colSpan='6'>No user</Table.Cell>
      </Table.Row>
    )
  } else {
    userList = users.map(user => {
      return (
        <Table.Row key={user.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => deleteUser(user.username)}
            />
          </Table.Cell>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.role}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <Segment loading={isUsersLoading} color='orange'>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='3'>
            <Header as='h2'>
              <Icon name='user' />
              <Header.Content>Users</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Form onSubmit={searchUser}>
              <Form.Group>
                <Form.Field>
                  <Input
                    id='userUsernameSearch'
                    placeholder='Search by username'
                    value={userUsernameSearch}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Button icon>
                  <Icon name='search' />
                </Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>id</Table.HeaderCell>
            <Table.HeaderCell>username</Table.HeaderCell>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>email</Table.HeaderCell>
            <Table.HeaderCell>role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userList}
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default UserTable