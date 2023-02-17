import React,{useContext, createContext} from "react";

import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const {contract} = useContract('0x52495d9a86904C2B481c942e016219E31ed6D5f6');
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign')

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) =>{
        try {
            const data = await createCampaign([
                address, //owner
                form.title, //title
                form.description, //description
                form.target,
                new Date(form.deadline).getTime(), //deadline
                form.image
            ])
            console.log('contract call success', data)
            
        } catch (error) {
            console.log('contract call failure', error)
        }  
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns')
        const parseCampaigns = campaigns.map((campaign, i) =>({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pID: i
        }));
            
        return parseCampaigns;
    }

    const donate = async (pID, amount) => {
        const data = await contract.call('donateToCampaign', pID, { value: ethers.utils.parseEther(amount)});
        return data;
      }
    
      const deleteCampaign = async (pID) =>{
        const data = await contract.call('deleteCampaign', pID);
        return data;
      }

      const getDonations = async (pID) => {
        const donations = await contract.call('getDonators', pID);
        const numberOfDonations = donations[0].length;
    
        const parsedDonations = [];
    
        for(let i = 0; i < numberOfDonations; i++) {
          parsedDonations.push({
            donator: donations[0][i],
            donation: ethers.utils.formatEther(donations[1][i].toString())
          })
        }
    
        return parsedDonations;
      }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address)
        
        return filteredCampaigns;
    }

   
    return(
        <StateContext.Provider
        value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            getCampaigns,
            getUserCampaigns,
            donate,
            getDonations,
            deleteCampaign
        }}>
            {children}
        </StateContext.Provider>
    )

    
}


export const useStateContext = () => useContext(StateContext)