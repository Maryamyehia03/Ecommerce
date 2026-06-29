"use client"
import React, { useContext } from 'react'
import { wishlistcontext } from '../context/WishlistContext';
import { Datum } from '../types/Wishlist';
import Onecart from './Onecart';

export default function Page() {

  const {wishlist ,} = useContext(wishlistcontext);
  
  
  return (
    <>
        <div className='bg-gray-100 rounded-lg p-8 w-[85%] mt-20 mx-auto font-semibold'>
        <div className='flex justify-between w-full'>
          <div className='space-y-8.5'>
            <h1 className='text-2xl'>My Wish List</h1>
          </div>
          <div className='space-y-5 flex flex-col items-end'>
          </div>
          </div>
          {wishlist?.data?.map((pro:Datum)=><Onecart key={pro._id} pro={pro} />)}
          </div>
    </>
  )
}
