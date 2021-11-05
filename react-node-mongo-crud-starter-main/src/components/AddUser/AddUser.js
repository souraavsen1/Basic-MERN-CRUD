import React, { useRef } from 'react';

const AddUser = () => {

    const nameRef = useRef()
    const emailRef = useRef();

    const handleAddUser = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        console.log(name);
      console.log(email);
      
        const newUser = { name, email };
        console.log(newUser);

        fetch("http://localhost:5000/create", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              alert("Successfully added the user.");
              e.target.reset();
            }
          });
      e.preventDefault();
    }

    return (
      <div>
        <h2>This is Add User</h2>

        <div>
          <form onSubmit={handleAddUser}>
            <input type='text' name='username' id='' ref={nameRef} />
            <input type='email' name='email' id='' ref={emailRef} />
            <input type='submit' value='Submit'/>
          </form>
        </div>
      </div>
    );
};

export default AddUser;