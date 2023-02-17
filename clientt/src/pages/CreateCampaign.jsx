import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import{ ethers } from 'ethers';
import { money } from '../assets';
import CustomButton from '../components/CustomButton';
import{ checkIfImage } from '../utils';
import FormField from '../components/FormField';
import { useStateContext } from '../context';
import { Loader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setForm, setIsLoading } from '../features/campaignDetails/createCampaignSlice';

const CreateCampaign = () => {
  const navigate =useNavigate();
  const {createCampaign} = useStateContext();

const dispatch = useDispatch();
const form = useSelector(state => state.createCampaign.form)
const isLoading = useSelector(state => state.createCampaign.isLoading)

  // updates every single field accordingly
  const handleFormFieldChange =(fieldName, e) =>{
    dispatch(setForm({...form, [fieldName]:e.target.value}))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    checkIfImage(form.image, async(exists) => {
      if (exists){
        dispatch(setIsLoading(true))
        console.log(isLoading)
        await createCampaign({...form, target: ethers.utils.parseUnits(form.target, 18)})
        dispatch(setIsLoading(false));
        navigate('/');
      } else {
        alert('Provide valid image URL')
        dispatch(setForm({...form, image: ''}))
      }
    })

   
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
    {isLoading  && <Loader/>}
    <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
      <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a Campaign</h1>
    </div>

    <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
      <div className='flex flex-wrap gap-[40px]'>
          <FormField
          labelName='Your Name *'
          placeholder='John Doe'
          inputType='text'
          value={form.name}
          handleChange={(e) => handleFormFieldChange('name', e)}
          />

        <FormField
          labelName='Campaign Title *'
          placeholder='Title'
          inputType='text'
          value={form.title}
          handleChange={(e) => handleFormFieldChange('title', e)}
          />
      </div>

        <FormField
          labelName='Story *'
          placeholder='Wrte your story'
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
          />

          <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd]'>
            <img src={money} alt="money" className='w-[40px] h-[40px] object-contain' />
            <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>You will get 100% of the amount raised</h4>
          </div>
          <div className='flex flex-wrap gap-[40px]'>
          <FormField
          labelName='Goal *'
          placeholder='ETH 0.50'
          inputType='text'
          value={form.target}
          handleChange={(e) => handleFormFieldChange('target', e)}
          />

        <FormField
          labelName='End Date *'
          placeholder='End Date'
          inputType='date'
          value={form.deadline}
          handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
      </div>
      <FormField
          labelName='Campaign image *'
          placeholder='Place image URL of your campaign'
          inputType='url'
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
          />

          <FormField
          labelName='Campaign Category *'
          placeholder='Write the category'
          inputType='text'
          value={form.category}
          handleChange={(e) => handleFormFieldChange('category', e)}
          />
          

      <div className="flex justify-center items-center mt-[40px]">
        <CustomButton
          btntype='submit'
          title='Submit new campaign'
          styles='bg-[#1dc071]'
        />
       </div>
    </form>

   
    </div>
  )
}

export default CreateCampaign