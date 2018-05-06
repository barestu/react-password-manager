import React, { Component } from 'react';

class PasswordItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.data.url}</td>
        <td>{this.props.data.username}</td>
        <td>{this.props.data.password}</td>
        <td>{this.props.data.createdAt}</td>
        <td>{this.props.data.updatedAt}</td>
        <td>
          <button>Show</button>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    );
  }
}

export default PasswordItem;