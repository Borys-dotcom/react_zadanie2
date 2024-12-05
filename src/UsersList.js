import './UsersList.css'
import { useEffect, useState } from 'react';

const UsersList = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        userType: 'Admin',
    });

    const [users, setUsers] = useState([]);

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name
        setFormData(prevDataForm => {
            return { ...prevDataForm, [name]: target.value }
        });
    }

    const [usersToDisplay, setUsersToDisplay] = useState([])

    const filterUsers = (filter) => {
        if ((filter === 'User') || (filter === 'Admin')){
            setUsersToDisplay(users.filter(user=>user.userType === filter));
        } else {
            setUsersToDisplay(users);
        }
    }

    const setUser = (e) => {
        e.preventDefault();
        setUsers(users.concat({...formData, id: Date.now()}));
    }


    const removeUser = (id) => {
        const filteredUsers = users.filter(user=>user.id !== id);
        setUsers(filteredUsers);
    }

    // const [usersMapped, setUsersMapped] = useState([]);

    // const mapUsersList = (e) => {
    //     let filteredUsers = [];
    //         if ((e.target.id === 'User') || (e.target.id === 'Admin')) {
    //             filteredUsers = users.filter(user=>user.userType === e.target.id);
    //         } else {
    //             // filteredUsers = {...users};
    //             filteredUsers = users;
    //         }
    //         setUsersMapped(filteredUsers);
    // }

    const [displayMode, setDisplayMode] = useState('All');

    const displayModeSetter = (e) => {
        setDisplayMode(e.target.id);
    }

    useEffect(() => {
        filterUsers(displayMode);
        console.log(users);
    }, [displayMode, users])

    // console.log(displayMode);

    // console.log(users);

    return <div className="usersList">
        <form onSubmit={setUser}>
            <label htmlFor="username">User name</label>
            <input
                type="tekst"
                name="username"
                placeholder="User name"
                onChange={handleInputChange}
                value={formData.username} />
            <label htmlFor="email">User email</label>
            <input
                type="email"
                name="email"
                placeholder="User email"
                onChange={handleInputChange} 
                value={formData.email} />
            <label htmlFor="userType">User type</label>
            <select id="userType" name="userType" onChange={handleInputChange}>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
            </select>
            <button>Save</button>
        </form>

        <div className="selectionButtons">
            <button onClick={displayModeSetter} id='All'>Select All</button>
            <button onClick={displayModeSetter} id='Admin'>Select Admins</button>
            <button onClick={displayModeSetter} id='User'>Select Users</button>
        </div>

        <div className="list">
            
                {usersToDisplay.map(user=>{
                    return (<div className="userItem" key={user.id} onClick={()=>removeUser(user.id)}>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.userType}</p>
                    </div>
                );
                })}
        </div>

    </div>

}

export default UsersList