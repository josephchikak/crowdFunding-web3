import React,{ useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActive, setToggleDrawer } from '../features/sidebar/sidebarSlice';
import CustomButton from './CustomButton';
import {logo, menu, search, thirdweb} from '../assets';
import {navlinks} from '../constants';
import { useStateContext } from '../context';


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isActive = useSelector((state) => state.active.isActive)
    const toggleDrawer = useSelector((state) =>state.active.toggleDrawer);
    
    const {connect, address} = useStateContext();
 


  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52] bg-[#1c1c24] rounded-[100px]'>
        <input type='text' placeholder="Search for campaigns" className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none'/>


        <div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer'>
          <img src={search} alt='search' className='w-[15px] h-[15px] object-contain'/>
        </div>
        </div>

        <div className='sm:flex hidden flex-row justify-end gap-4'>
            <CustomButton
            btnType='button'
            title ={address ? "Create a campaign" : "Connect wallet"}
            styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
            handleClick = {() =>{
              if (address) navigate('create-campaign')
              else connect()
            }}
            />

            <Link to='/profile'>
              <div className='w-[52px] h-[40px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer' >
                <img src={thirdweb} alt='user' className='w-[60%] h-[60%] object-contain'/>

              </div>
            </Link>
        </div>
        {/* small screen navigation */}
        <div className='sm:hidden flex justify-between items-center relative'>
        <div className='w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer' >
                <img src={thirdweb} alt='user' className='w-[60%] h-[60%] object-contain'/>
         </div>
         <img
         src={menu}
         alt='menu'
         className='w-[34px] h-[34px] object-contain cursor-pointer'
         onClick={()=>dispatch(setToggleDrawer(!toggleDrawer))} 
         />
         <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-[0]'} transition-all duration-700 `}>
          <ul className='mb-4'>
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex cursor-pointer p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={()=>{
                  dispatch(setActive(link.name));
                  dispatch(setToggleDrawer(false));
                  navigate(link.link);
                }}
                >
                  <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />
                  <p className={`ml-[10px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                    {link.name}
                  </p>
                </li>
            ))}

          </ul>
          <div className='flex mx-4'>
          <CustomButton
            btnType='button'
            title ={address ? "Create a campaign" : "Connect wallet"}
            styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
            handleClick = {() =>{
              if (address) navigate('create-campaign')
              else connect()
            }}
            />

          </div>
         </div>
        </div>
  
  
      </div>
  )
}

export default Navbar