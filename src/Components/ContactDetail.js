import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../Images/user.jpg";

const ContactDetail = (props) => {
  
  //we can get the location using props.location.state.contact....but we are using uselocation hook
  const location = useLocation();
  const {name, email} = location.state.contact;
  console.log(location.state.contact);

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;