import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch } from 'react-redux';

const ProfilehubUsers = ({users}) => {
    console.log(users);
    const dispatch=useDispatch();
    const [query, setQuery] = useState('');
    const [popupContent, setPopupContent] = useState([]);
    const [popupToggle, setPopupToggle] = useState(false);
    const [editId, setEditId] = useState(null)
    const [editName, setEditName] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editPhone, setEditPhone] = useState('')
    const [editWebsite, setEditWebsite] = useState('');
    const handleDelete=(id)=>{
        console.log(id);
        dispatch({type:'DELETE_USER',payload:id})
    }

    const changeContent=(curElem)=>{
        setPopupContent([curElem])
        setPopupToggle(!popupToggle);
    }
    const toggleLiked=(id)=>{
        dispatch({type:'LIKE_USER',payload:id})
    }

    
    const handleEdit=async(e,id)=>{

        e.preventDefault();
        console.log("vinod bhoye here...",id);
        const editedUser={
            id,
            name:editName,
            email:editEmail,
            phone:editPhone,
            website:editWebsite
        };
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(editedUser),
        });
        dispatch({type:'EDIT_USER',payload:editedUser});
        setEditId(null);
        setEditName('');
        setEditEmail('');
        setEditPhone('');
        setEditWebsite('')
        changeContent();
    }
    return (
        <div>
            <h2>List of ProfileHub Users</h2>
            <div className='input-group h-100 d-flex align-items-center justify-content-center'>
                <div class="form-outline col-lg-3">
                    <form onSubmit={(e)=>e.preventDefault()}>
                        <input type="search" placeholder='Search....' id="form1" class="form-control" name='searchText' value={query} onChange={(e)=>setQuery(e.target.value)}  />
                    </form>
                </div>

            </div>
            <div className="container-fluid mt-5">
                <div className="row">
                {
                        users.filter(user=>user.name.toLowerCase().includes(query.toLowerCase())).map((curElem) => {
                        
                            const {name, email, id, website,username,company,address,phone} = curElem;                        
                            return (
                              <div className="col-10 col-md-6 mt-5" key={id}>
                                    <div className="card p-2">
                                        <div className="d-flex align-items-center">
                                            <div className="image"> <img src={`https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=sad`} alt={username} className="rounded" width="155" /> </div>
                                            <div className="ml-3 w-100">
                                                <div className=" d-flex flex-column mb-0 mt-0 textLeft">
                                                    <h4>{name}</h4>
                                                    <span><i className="bi bi-envelope" style={{"font-size":"1rem","color": "cornflowerblue"}}></i> {email}</span>
                                                    <span><i className="bi bi-phone" style={{"font-size":"1rem","color": "cornflowerblue"}}></i> {phone}</span>
                                                    <span><i class="bi bi-person-workspace" style={{"font-size":"1rem","color": "cornflowerblue"}}></i>  {website}</span>
                                                    <span><i className="bi bi-building" style={{"font-size":"1rem","color": "cornflowerblue"}}></i>  {company.name}</span>
                                                    <span>{`Address Line 1: ${address.street}, ${address.suite}`}</span>
                                                    <span>{`Address Line 2: ${address.city}, ${address.zipcode}`}</span>
                                                </div>
                                                <div className="bg-primary d-flex justify-content-between  text-white stats">
                                                <div className="d-flex flex-column" onClick={()=>toggleLiked(id)}>
                                                    {curElem.liked?(
                                                         <i className="bi bi-suit-heart-fill" style={{"font-size":"1rem","color": "red","cursor":"pointer"}}></i>
                                                        
                                                    ):(
                                                        <i className="bi bi-suit-heart" style={{"font-size":"1rem","color": "cornflowerblue","cursor":"pointer"}}></i>
                                                    )}
                                                </div>
                                                <div className="d-flex flex-column">
                                                <i class="bi bi-pencil" style={{"font-size":"1rem","color": "cornflowerblue","cursor":"pointer"}} onClick={()=>changeContent(curElem)} ></i>
                                                </div>
                                                <div className="d-flex flex-column">
                                                <i className="bi bi-trash3" style={{"font-size":"1rem","color": "cornflowerblue","cursor":"pointer"}} onClick={()=>handleDelete(id)}></i>
                                                </div>
                                        </div>
                                            </div>
                                        </div>
                                        
                                                    
                                    </div>
                                    
                                </div>
                        )
                })        
                }
                    
                </div>
            </div>
            {popupToggle && <div className='pop_up_container'>
                <div className="pop_up_body">
                    
                    <div className="pop_up_content">
                        {popupContent.map(pop=>{
                            return(
                                <div className='pop_up_card'>
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={changeContent}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form > 
                                        <div class="form-group">
                                            <label for="recipient-name" className="col-form-label">Name:</label>
                                            <input type="text" className="form-control" id="recipient-name" placeholder={pop.name} value={editName} onChange={(e)=>setEditName(e.target.value)}></input>
                                        </div>
                                        <div class="form-group">
                                            <label for="recipient-name" className="col-form-label">Email:</label>
                                            <input type="email" className="form-control" id="recipient-name" placeholder={pop.email} value={editEmail} onChange={(e)=>setEditEmail(e.target.value)}></input>
                                        </div>
                                        <div class="form-group">
                                            <label for="recipient-name" className="col-form-label">Phone:</label>
                                            <input type="tel" className="form-control" id="recipient-name" placeholder={pop.phone} value={editPhone} onChange={(e)=>setEditPhone(e.target.value)}></input>
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" className="col-form-label">Website:</label>
                                            <input type="url" className="form-control" id="recipient-name" placeholder={pop.website} value={editWebsite} onChange={(e)=>setEditWebsite(e.target.value)}></input>
                                        </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={changeContent}>Close</button>
                                        <button type="button" className="btn btn-primary" onClick={(e)=>handleEdit(e,pop.id)}>Save Changes</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
               

            </div>}
            
        </div>
    )
}

export default ProfilehubUsers