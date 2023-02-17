import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import CustomButton from '../components/CustomButton';
import { calculateBarPercentage, daysLeft } from '../utils';
import {thirdweb} from '../assets' 
import CountBox from '../components/CountBox';
import { Loader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setDonators, setAmount } from '../features/campaignDetails/campaignDetailsSlice';


const CampaignDetails = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const {getDonations, contract, address, donate, deleteCampaign } = useStateContext();
  const dispatch = useDispatch();
 const isLoading = useSelector((state) => state.campaignDetails.isLoading)
 const donators = useSelector((state) => state.campaignDetails.donators)
 const amount = useSelector((state) => state.campaignDetails.amount)


  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () =>{
    const data = await getDonations(state.pID)
    dispatch(setDonators(data));
  }

  useEffect(()=>{
    if(contract) fetchDonators();
  },[contract, address])

  const handleDonate = async () =>{
      dispatch(setIsLoading(true));
      await donate(state.pID, amount)
      navigate('/')
      dispatch(setIsLoading(false));

    }

    const handleDelete = async () =>{
      dispatch(setIsLoading(true));
      await deleteCampaign(state.pID)
      navigate('/')
      dispatch(setIsLoading(false));
    }

  return (
    <div>
      {isLoading && <Loader/>}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className='w-full h-[410px] object-cover rounded-xl' />
          <div className="relative w-full h-[5px] bg-[#39396b] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{width:`${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title='Days Left' value={remainingDays}/>
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected}/>
          <CountBox title='Total Donators' value={donators.length}/>
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className='w-[60%] h-[60%] object-contain' />
              </div>
              <div>
                <h4 className='font-epilogue font-semibold text-[14px] text-white break-all'>{state.owner}</h4>
                <p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'>10 campaigns</p>
              </div>
            </div>
          </div>

          <div>
              <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Story</h4>
              <div className="mt-[20px]">
                 <p className='font-epilogue font-noraml text-[12px] text-[#808191] leading-[26px] text-justify'>{state.description}</p>
              </div>
           </div>

           <div>
              <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Donators</h4>
              <div className="mt-[20px]">
                {donators.length > 0 ? donators.map((item,index) =>(
                  <div key={`${item.donator}-${index}`} className='flex justify-between items-center gap-4'>
                    <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-11'>{index +1}.{item.donator}</p>
                    <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-11'>{item.donation}</p>

            
                  </div>
                )):(
                 <p className='font-epilogue font-noraml text-[12px] text-[#808191] leading-[26px] text-justify'>No donators yet, be the first one!</p>
                )}
              </div>
           </div>  
        </div>

        <div className="flex-1">
           <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Fund</h4>
           <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rouned-[10px]">
              <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">Fund the campaign</p>
              <div className="mt-[30px]">
                  <input
                  type='number'
                  placeholder='ETH 0.1'
                  step='0.01'
                  className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeolder:text-[#4b5264] rounded-[10px]'
                  value={amount}
                  onChange={(e) => dispatch(setAmount(e.target.value))}
                  />
                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                  <h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-white'>Donate because you believe in it </h4>
                  <p className="mt-[20px] font-epilogue font-normal leading -[22px] text-[#808191]">Support the project for no reward, support because it speaks to you.</p>
                  
                </div>
                <CustomButton
                  btnType='button'
                  title='Fund campaign'
                  styles='w-full bg-[#8c6dfd]'
                  handleClick={handleDonate}/>

                   <CustomButton
                  btnType='button'
                  title='Delete Campaign'
                  styles='w-full bg-[#8c6dfd] mt-[10px]'
                  handleClick={handleDelete}/>
                
           </div>
           
           </div>        
                
        </div>

        

      </div>

    </div>
  )
}

export default CampaignDetails