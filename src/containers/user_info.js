import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, fetchUsers, editUser, deleteUser } from '../actions/action';
import { Field, reduxForm, initialize } from 'redux-form';
import UserTable from './user_table';

class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            username: '',
            address: '',
            contact: '',
            email: '',
            buttonvalue: 'Add new User'
        }
        this.oneditUser = this.oneditUser.bind(this);
        this.handleInitialize = this.handleInitialize.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    componentDidMount(){
        this.props.fetchUsers();
    }
    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    renderField(field) {
        const { meta: { touched, error } } = field;
        return (
          <div>
            <label>{field.label}</label>
            <input className="form-control form-row col-12" type="text" {...field.input} />
            <div className="text-danger">
              {touched ? error : ""}
            </div>
          </div>
        );
      }

      oneditUser(item){
        console.log(item)
        this.setState({
            id: item._id,
            username: item.username,
            address: item.address,
            contact: item.contact,
            email: item.email,
            buttonvalue: 'Update'
        })
        this.handleInitialize();

    }

    onDelete(id){
        this.props.deleteUser({id}).then(() => this.componentDidMount())
    }
    onSubmit(values){
       if(this.state.buttonvalue !== 'Add new User'){
           if(this.state.username){
                this.props.editUser({id: this.state.id,
                    username: this.state.username,
                    address: this.state.address,
                    contact: this.state.contact,
                    email: this.state.email
                }).then(() => {
                    this.setState({id: '',
                    username: '',
                    address: '',
                    contact: '',
                    email: '',
                    buttonvalue: "Add new User"}) 
                    this.handleInitialize();
                    this.componentDidMount()})
            }
       }
       else
       {
            this.props.addUser(values).then(() => this.componentDidMount());
       }
    }
    handleInitialize() {
        const initData = {
          "username": this.state.username,
          "address": this.state.address,
          "contact": this.state.contact,
          "email": this.state.email
        };
    
        this.props.initialize(initData);

    }
render(){
        const { handleSubmit } = this.props;
        return(
            <div>
                <div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <div className='form-row'>
                            <Field onChange={this.onChange.bind(this)} label='Name' component={this.renderField} name='username'  />
                            <Field onChange={this.onChange.bind(this)} label='Address' component={this.renderField }name='address'  />
                            <Field onChange={this.onChange.bind(this)} label='Contact' component={this.renderField} name='contact'  />
                            <Field onChange={this.onChange.bind(this)} label='Email'component={this.renderField} name='email' />
                        </div>
                        <input type="submit" value={this.state.buttonvalue} className="btn btn-primary"/>
                    </form>
                </div>
                <UserTable onDelete={this.onDelete}oneditUser={this.oneditUser}/>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
  
    if (!values.username) {
      errors.username = 'Please enter a first name';
    }
  
    if (!values.address) {
      errors.address = 'Please enter an address';
    }

    if (!values.contact) {
        errors.contact = 'Please enter a phone number'
    }
    
    if (!values.email) {
      errors.email = 'Please enter an email';
    }
  
    return errors;
  }

function mapStateToProps(state){
    return{
        users: state.users,
    }
}

export default reduxForm({
    validate,
    form: 'UserForm',
    enableReinitialize: true
})(connect(mapStateToProps, { addUser,  fetchUsers, editUser, deleteUser })(UserInfo));