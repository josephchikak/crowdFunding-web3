import { configureStore } from '@reduxjs/toolkit'
import sidebarSlice  from '../features/sidebar/sidebarSlice'
import campaignDetailsSlice from '../features/campaignDetails/campaignDetailsSlice'
import createCampaignSlice from '../features/campaignDetails/createCampaignSlice'

export const store = configureStore({
  reducer: {
    active: sidebarSlice,
    campaignDetails: campaignDetailsSlice,
    createCampaign: createCampaignSlice
  },
})

