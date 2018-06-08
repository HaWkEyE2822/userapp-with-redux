import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserTable extends Component {
    oneditUser(item){
        console.log(item);
        this.props.oneditUser(item);

    }
    oneDelete(id){
        this.props.onDelete(id);
    }
    render(){
        return(
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>UserName</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Contact</th>
                        <th scope='col'>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.users.items.map((item) => {
                        return(
                            <tr key={item._id}>
                                <td>{item.username}</td>
                                <td>{item.address}</td>
                                <td>{item.contact}</td>
                                <td>{item.email}</td>
                                <td><button type='button' onClick={this.oneditUser.bind(this, item)}className='btn btn-success'>Edit</button></td>
                                <td><button type='button' onClick={this.oneDelete.bind(this, item._id)}className='btn btn-danger'>Delete</button></td>
                            </tr>    
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state){
    return{
        users: state.users
    }
}


export default connect(mapStateToProps, null)(UserTable);