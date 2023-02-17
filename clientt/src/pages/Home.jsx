import React,{useEffect} from 'react'
import DisplayCampaigns from '../components/DisplayCampaigns';
import { setIsLoading, setCampaigns} from '../features/campaignDetails/campaignDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';


import { useStateContext } from '../context';

const Home = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.campaignDetails.isLoading)
  const campaigns = useSelector((state) => state.campaignDetails.campaigns)

    const {address, contract, getCampaigns } = useStateContext();

    const fetchCampaigns = async () =>{
      dispatch(setIsLoading(true));
      const data = await getCampaigns();
      dispatch(setCampaigns(data));
      dispatch(setIsLoading(false));
    }

   useEffect(() =>{

  if(contract) fetchCampaigns();
  console.log(campaigns)

   }, [address,contract]);
    

  return (
   <DisplayCampaigns
   title='All Campaigns'
   isLoading = {isLoading}
   campaigns ={campaigns}/>
  )
}

export default Home;