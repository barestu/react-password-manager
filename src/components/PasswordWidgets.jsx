import React, { Component } from 'react';

class PasswordWidgets extends Component {
  render() {
    return (
      <div>
        {
          (!this.props.validPassword) ?
          <div className="alert alert-warning" role="alert">
            Weak Password!
          </div> :
          <div className="alert alert-info" role="alert">
            Strong Password!
          </div>
        }
        <div className="mx-3">
          <p><span>{this.props.containLowercase ?
            <span class="badge badge-success px-3">Valid</span> :
            <span class="badge badge-danger px-3">Invalid</span>}
          </span>  Password must contain one lowercase character</p>
          <p><span>{this.props.containUppercase ?
            <span class="badge badge-success px-3">Valid</span> :
            <span class="badge badge-danger px-3">Invalid</span>}
          </span>  Password must contain one uppercase character</p>
          <p><span>{this.props.containNumber ? 
            <span class="badge badge-success px-3">Valid</span> :
            <span class="badge badge-danger px-3">Invalid</span>}
          </span>  Password must contain one number</p>
          <p><span>{this.props.containSpecialChar ?
            <span class="badge badge-success px-3">Valid</span> :
            <span class="badge badge-danger px-3">Invalid</span>}
          </span>  Password must contain one special character</p>
          <p><span>{this.props.containMinLength ?
            <span class="badge badge-success px-3">Valid</span> :
            <span class="badge badge-danger px-3">Invalid</span>}
          </span>  Password must be atleast 6 characters long</p>
        </div>
      </div>
    );
  }
}

export default PasswordWidgets;