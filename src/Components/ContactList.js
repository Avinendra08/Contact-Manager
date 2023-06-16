import React, { useEffect, useRef, useState } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {

  useEffect(() => {
    // Focus on the input element after each re-render
    inputEl.current.focus();
  });

  const inputEl = useRef("");
  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };
 
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    //console.log(inputEl.current.value);
    props.searchKeyword(inputEl.current.value);
  };

  return(
    <div className="main">
        <h2>Contact List
        <Link to="/add">
          <button className="ui right floated primary button">Add Contact</button>
        </Link>
        </h2>
        <div className="ui search">
        <div className="ui icon input">
        <input ref={inputEl} type="text" placeholder="Search Contact" className="prompt" value={props.term} onChange={getSearchTerm}></input>
        <i className="search icon" ></i>
        </div>
        </div>
        <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;