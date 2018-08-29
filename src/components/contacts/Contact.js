import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Consumer} from '../../context';
import axios from 'axios';
import {Link} from 'react-router-dom';

 class Contact extends Component {
  state ={
   showContactInfo: false 
  }
  onShowClick =() =>{
    this.setState ({
        showContactInfo: !this.state.showContactInfo
    })
  }

  onDelete =async(id,dispatch) =>{
    try{
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    dispatch({type:'DELETE_CONTACT', payload:id})
    }
    catch(e){
      dispatch({type:'DELETE_CONTACT', payload:id})
    }
    
  }
  render() {
      const {id,name,email,phone} = this.props.contact;
      const {showContactInfo} = this.state;
    return (
      <Consumer>
          {value =>{
              const {dispatch} = value;
              return (
                <div className="card card-body mb-3">
                <h4>{name} 
                <i 
                onClick ={this.onShowClick}
                className="fa fa-sort-down" 
                style={{cursor:'pointer'}}/>
                <i 
                className="fa fa-times"
                style={{cursor:'pointer', color:'red',float:'right'}}
                onClick={this.onDelete.bind(this,id,dispatch)}
                ></i>
                <Link to={`contact/edit/${id}`}>
                <i 
                className="fa fa-pencil" style={{float:'right', color:'black'}}></i>
                </Link>
                </h4>
                {showContactInfo ? (
                 <ul className="list-group">
                 <li className="list-group-item">Email:{email}</li>
                 <li className="list-group-item">Phone:{phone}</li>
             </ul>
                ): null}
                
        
              </div>
              )
          }}
      </Consumer>
    )
  }
}

Contact.propTypes ={
    contact: PropTypes.object.isRequired
}

export default Contact;
