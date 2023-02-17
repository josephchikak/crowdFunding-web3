import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    amount: '',
    donators: [],
    campaigns: [],
}


export const campaignDetailsSlice = createSlice({
    name: 'campaignDetails',
    initialState,
    reducers:{
        setIsLoading: (state, action ) => {
          state.isLoading = action.payload
        },
        setAmount: (state, action) =>{
            state.toggleDrawer = action.payload
        },
        setDonators: (state, action) =>{
            state.donators = action.payload
        },
        setCampaigns: (state, action ) => {
            state.campaigns = action.payload
        }
    }
})

export const { setIsLoading, setAmount, setDonators, setCampaigns } = campaignDetailsSlice.actions;

export default campaignDetailsSlice.reducer