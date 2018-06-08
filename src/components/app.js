import React, { Component } from 'react';
import UserInfo from '../containers/user_info';

class App extends Component{
    render(){
        return(
            <div className='container'>
                <UserInfo />
            </div>
        );
    }
}
export default App;