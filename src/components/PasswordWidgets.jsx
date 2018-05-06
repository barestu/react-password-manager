import React, { Component } from 'react';

class PasswordWidgets extends Component {
  render() {
    return (
      <div className="alert alert-warning" role="alert">
        <h3>Password strength: </h3>
        <p><span>{this.props.containLowercase ? 'Valid' : 'Invalid'}</span> | Password must contain one lowercase character</p>
        <p><span>{this.props.containUppercase ? 'Valid' : 'Invalid'}</span> | Password must contain one uppercase character</p>
        <p><span>{this.props.containNumber ? 'Valid' : 'Invalid'}</span> | Password must contain one number</p>
        <p><span>{this.props.containSpecialChar ? 'Valid' : 'Invalid'}</span> | Password must contain one special character</p>
        <p><span>{this.props.containMinLength ? 'Valid' : 'Invalid'}</span> | Password must be atleast 6 characters long</p>
      </div>
    );
  }
}

export default PasswordWidgets;