
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
   setLogInDetails (state,action){
const {user,token} = action.payload
return {
    ...state,
    isLoggedIn: true,
    token:token,
    userDetails:user
}
   }
  },
})

export const { setLogInDetails } = userSlice.actions
export default userSlice.reducer