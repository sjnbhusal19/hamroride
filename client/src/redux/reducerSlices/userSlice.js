
import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    isLoggedIn: false,
    token:'',
    role:'',
    userDetails:{}
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
   setLogInDetails (state,actions){
const {user,token} = actions.payload
return {
    ...state,
    isLoggedIn: true,
    token:token,
    userDetails:user
       }
   },

   logoutUser(state, actions) {
    return initialState
}
  },
})

export const { setLogInDetails,logoutUser } = userSlice.actions
export default userSlice.reducer