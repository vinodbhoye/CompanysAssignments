import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import ProfilehubUsers from './ProfilehubUsers';
import {useDispatch, useSelector} from 'react-redux'
const Gallary = () => {
    // const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch();
    const users=useSelector(state=>state.users);

    useEffect(() => {
       async function fetchData() {
        try{
             const response = await fetch('https://jsonplaceholder.typicode.com/users');
             const data=await response.json();
             setLoading(false);
             dispatch({type:'SET_USERS',payload:data});
        }catch(error){
            setLoading(false);
            console.log("my error is "+ error);
        }
       
        }
        fetchData();
    }, [dispatch])
    
    if (loading) {
        return <Loading />
    }
  return (
    <>
        <ProfilehubUsers users={users}></ProfilehubUsers>
    </>

  )
}

export default Gallary;