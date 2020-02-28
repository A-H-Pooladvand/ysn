import React, { Component } from 'react'

class Modal extends Component {

  handleCancel = () => {
    this.props.visibleHandler(false)
  }

  handleSubmit = () => {
    this.props.visibleHandler(false)
    this.props.submitHandler()
  }

  render () {
    return (
      <div dir='ltr' className={`modal fade ${this.props.isVisible ? 'show' : ''}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: this.props.isVisible ? 'block' : '' }}>
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
              <button onClick={this.handleCancel} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" dir='rtl'>
              {this.props.children}
            </div>
            <div className="modal-footer">
              <button onClick={(event, callable) => this.handleSubmit(event, callable)} type="button" className="btn btn-success">ثبت</button>
              <button onClick={this.handleCancel} type="button" className="btn btn-secondary" data-dismiss="modal">انصراف</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal