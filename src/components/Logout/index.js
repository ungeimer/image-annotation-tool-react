import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
// import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';


import { Content } from './Logout.style';

function Logout() {
    const [messageOne, setMessageOne] = useState('');
    const [messageTwo, setMessageTwo] = useState('');
    let navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        var retStatus = 0;
        setMessageOne('Logging out ...');

        async function logoutRequest() {
            const url = `${process.env.REACT_APP_API_URL}/users/logout`;
            const localStorageToken = localStorage['USER_TOKEN'];

            let res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorageToken,
                },
            });

            console.log(res);
            if (res.ok) {
                retStatus = `${res.status}`;

                return retStatus;
            } else {
                return `HTTP error: ${res.status}`;
            }
        }

        logoutRequest().then((data) => {
            console.log("LOGOUT RETURN STATUS", retStatus)
            if (retStatus === '200') {
                localStorage.removeItem('USER_TOKEN');
                alert('Successfully logged out!');
                setMessageOne('Success ... redirecting to Login');
                navigate('/login');
            }
            setMessageTwo('Logout Error. Please try again');
        });
    }

    return (
        <>
            <Content>
                <Sidebar />
                <form onSubmit={handleLogout}>
                    <h1>Logout</h1>
                    <br />
                    <Button type='submit' variant="contained" color="primary">Confirm Logout</Button>
                    <br />
                    <br />
                    <p>{messageOne}</p>
                    <p>{messageTwo}</p>
                </form>

            </Content>
        </>
    );
}

export default Logout;