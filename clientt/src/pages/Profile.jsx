import React,{useState, useEffect} from 'react'
import DisplayCampaigns from '../components/DisplayCampaigns';

import { useStateContext } from '../context';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const {address, contract, getUserCampaigns } = useStateContext();

    const fetchCampaigns = async () =>{
      setIsLoading(true);
      const data = await getUserCampaigns();
      setCampaigns(data);
      setIsLoading(false);
    }

   useEffect(() =>{
   console.log('fire')
  console.log(campaigns)


  if(contract) fetchCampaigns();

   }, [address,contract]);
    

  return (
   <DisplayCampaigns
   title='All Campaigns'
   isLoading = {isLoading}
   campaigns ={campaigns}/>
  )
}

export default Profile;