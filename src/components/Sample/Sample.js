import React, { Component } from 'react'
import Modal from '../Modal/Modal'

class Sample extends Component {

  state = {
    isVisible: false,
    mode: 'create',
    user: {
      id: null,
      type: null,
      account: null,
      status: null,
      reviewer: null,
      reviewer_platforms: null,
    },
    users: [],
  }

  addUser = () => {
    if (this.state.mode === 'create') {
      this.setState({
        users: [...this.state.users, this.state.user],
        user: {},
      })
    } else {
      const users = this.state.users

      const index = users.findIndex(user => user.id === this.state.user.id)
      console.log(users)
      console.log(this.state.user.id)
      console.log(index)

      if (index > -1) {
        users.splice(index, 1)
        users.push(this.state.user)
        console.log(users)
        this.setState({
          users,
          user: {},
          mode: 'create',
        })
      }
    }

  }

  showModal = () => {
    this.setState({ isVisible: true })
  }

  handleKeyUp = (event) => {
    if (this.state.mode === 'create') {
      let id = 1

      if (this.state.users.length) {
        id = this.state.users[this.state.users.length - 1].id + 1
      }

      this.setState({ user: { ...this.state.user, [event.target.name]: event.target.value, id: id } })
    } else {
      this.setState({ user: { ...this.state.user, [event.target.name]: event.target.value } })
    }

  }

  deleteRow = (id) => {
    const users = this.state.users

    const index = users.findIndex(user => user.id === id)

    if (index > -1) {
      users.splice(index, 1)
      this.setState({ users })
    }

  }

  editRow = (id) => {
    const users = this.state.users

    const index = users.findIndex(user => user.id === id)

    if (index > -1) {
      this.setState({
        user: users[index],
        mode: 'edit',
      })
      this.showModal()
    }
  }

  render () {
    return (
      <div>

        <Modal
          title='اضافه کردن'
          isVisible={this.state.isVisible}
          visibleHandler={(isVisible) => this.setState({ isVisible: isVisible })}
          submitHandler={this.addUser}
        >
          <div className="row">

            <div className="col-sm-4">
              <div className="form-group">
                <input onKeyUp={this.handleKeyUp} value={this.state.user.type || ''} onChange={this.handleKeyUp} name='type' className='form-control' type="text" placeholder='نوع'/>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <input onKeyUp={this.handleKeyUp} value={this.state.user.account || ''} onChange={this.handleKeyUp} name='account' className='form-control' type="text" placeholder='حساب'/>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <input onKeyUp={this.handleKeyUp} value={this.state.user.status || ''} onChange={this.handleKeyUp} name='status' className='form-control' type="text" placeholder='وضعیت'/>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                <input onKeyUp={this.handleKeyUp} value={this.state.user.reviewer || ''} onChange={this.handleKeyUp} name='reviewer' className='form-control' type="text" placeholder='بررسی کننده'/>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                <input onKeyUp={this.handleKeyUp} value={this.state.user.reviewer_platforms || ''} onChange={this.handleKeyUp} name='reviewer_platforms' className='form-control' type="text" placeholder='بستر بررسی کننده'/>
              </div>
            </div>

          </div>
        </Modal>

        <div className="my-3">
          <button className='btn btn-secondary ml-3' onClick={this.showModal}>اضافه کردن</button>
          <button className='btn btn-secondary'>بسترها</button>
        </div>

        <table className="table table-hover">
          <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">نوع</th>
            <th scope="col">حساب</th>
            <th scope="col">وضعیت</th>
            <th scope="col">بررسی کننده</th>
            <th scope="col">بستر بررسی کننده</th>
            <th scope="col">قابلیت</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.users.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.type}</td>
                  <td>{user.account}</td>
                  <td>{user.status}</td>
                  <td>{user.reviewer}</td>
                  <td>{user.reviewer_platforms}</td>
                  <td>
                    <button onClick={() => this.editRow(user.id)}>ویرایش</button>
                    <button onClick={() => this.deleteRow(user.id)}>حذف</button>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Sample