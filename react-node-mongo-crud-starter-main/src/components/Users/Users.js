import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [ifdelete, setIfdelete] = useState(true);
    useEffect(() => {
        fetch("http://localhost:5000/allusers")
          .then((res) => res.json())
          .then((data) => setUsers(data));
    }, [ifdelete])

  const handleDelete = id => {
    const permission = window.confirm("Are you sure ?")
    if (permission) {
     
      fetch(`http://localhost:5000/remove-user/${id}`, {
        method: "DELETE"
      })
      .then((res) => res.json())
      .then((data) => {setIfdelete(!ifdelete)});
    
    }
  }


    return (
      <div>
        <h2>Total Users: {users.length}</h2>

        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}--{" "}
            <button>
              <Link to={`/users/update/${user._id}`}>
                Update
              </Link>
            </button>{" "}
            -- <button onClick={() => handleDelete(user._id)}>x</button>
          </li>
        ))}
      </div>
    );
};

export default Users;