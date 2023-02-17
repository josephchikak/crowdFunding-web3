import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    form : {
      name:'',
      title:'',
      description: '',
      target: '',
      deadline:'',
      image:'',
      category:''
    }
}


export const createCampaign = createSlice({
    name: 'createCampaign',
    initialState,
    reducers:{
        setIsLoading: (state, action ) => {
          state.isLoading = action.payload
        },
        setForm: (state, action) =>{
            state.form = action.payload
        },
       
    }
})

export const { setForm, setIsLoading } = createCampaign.actions;

export default createCampaign.reducer
