import { configureStore, createSlice } from '@reduxjs/toolkit'

let stars = createSlice({
  name : 'stars',
  initialState : [],
  reducers : {
    addItem(state, action){
      state.push(action.payload)
    }
  }
})

export let { addItem, deleteItem } = stars.actions

export default configureStore({
  reducer: {
    stars : stars.reducer
  }
})