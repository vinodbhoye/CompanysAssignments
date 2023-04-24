import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const initialState={
    users:[],
};

function reducer(state=initialState,action){
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users:action.payload.map(user=>({...user,liked:false}))
            };
        case 'DELETE_USER':
            return {
                ...state,
                users:state.users.filter(user=>user.id!==action.payload)
            };
        case 'LIKE_USER':
            return{
                ...state,
                users:state.users.map((user)=>user.id===action.payload?{...user,liked:!user.liked}:user)
            }
        case 'EDIT_USER':
            const updatedUsers=state.users.map((user)=>{
                if (user.id===action.payload.id) {
                    return {
                        ...user,
                        name:action.payload.name,
                        email:action.payload.email,
                        phone:action.payload.phone,
                        website:action.payload.website,
                    };
                }
                return user;
            });

            return {
                ...state,
                users:updatedUsers
            }
                
    
        default:
            return state;
    }
}

const store=createStore(reducer,applyMiddleware(thunk));

export default store;