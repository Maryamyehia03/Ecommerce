"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { AiFillDelete } from 'react-icons/ai'
import { Datum } from '../types/Wishlist';
import { deleteUserWishlist } from '../service/Wishlist'
import { toast } from 'sonner'
import { addUserCart } from '../service/cart'
import { Cartcontext } from '../context/Cartcontext'
import { wishlistcontext } from '../context/WishlistContext'

export default function Onecart({pro  }:{pro:Datum }) {
  // const [wishlist, setwishlist] = useState();
        const {fetchCart} = useContext(Cartcontext);
        const {fetchwishlist} = useContext(wishlistcontext);

        
  
  // console.log(pro?.id);
  async function removeitem(){
    // console.log("hello");
    await deleteUserWishlist(pro?._id);
    await fetchwishlist();
    toast.success("Delete successfully");
  }
      async function addtocart(){
        const res = await addUserCart(pro?._id);
        console.log(res);
        fetchCart();
        removeitem();
        toast.success("Add successfully");
      }


  
  return (
    <>
    <div className='flex justify-between items-center border-b border-gray-300 pb-5 mt-10 flex-col gap-5 md:flex-row'>
        <div className='md:w-[150px]'><Image src={pro?.imageCover} alt={pro?.title} width={900} height={300} className='w-[100%]' /> </div>
      <div className='flex justify-between items-center w-full flex-row'>
        <div className='flex items-center flex-col gap-2'>
        <div className='space-y-2'>
          <h2 className='text-lg'>{pro?.title.split(" ").slice(0, 3).join(" ")}</h2>
          <p>{pro?.price} EGP</p>
          <span className='flex items-center text-red-600 text-sm cursor-pointer' onClick={()=>removeitem()}><AiFillDelete size="20" color="red"/>Remove</span>
        </div>
      </div>
      <div className='space-x-4'>
        <button className='bg-transparent border border-green-400 px-5 py-3.5 rounded-lg cursor-pointer' onClick={()=>{addtocart()}}>Add to cart</button>
      </div>
      </div>
    </div>
      
    </>
  )
}
