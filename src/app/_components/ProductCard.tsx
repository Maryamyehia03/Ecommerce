"use client"
import Image from 'next/image'
import React, { useContext, } from 'react'
import { FaStar } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { Iproducts } from '../types/products.types';
import { toast } from 'sonner';
import { addUserWishlist } from '../service/Wishlist';
import { addUserCart } from '../service/cart';
import { Cartcontext } from '../context/Cartcontext';
import { wishlistcontext } from '../context/WishlistContext';
import { useRouter } from 'next/navigation';
// import { tr } from 'zod/v4/locales';
import { Datum } from '../types/Wishlist';

export default function ProductCard({product}: {product: Iproducts}) {
  // console.log(product);

  const title = product?.title.split(" ").slice(0, 3).join(" ");
  // const [active, setActive] = useState(false);

  const {fetchCart} = useContext(Cartcontext);
  const {wishlist , fetchwishlist} = useContext(wishlistcontext);

    async function addtofav(){
      await addUserWishlist(product?._id);
      // setActive(!active);
      fetchwishlist();
      toast.success("Add successfully");
    }

    async function addtocart(){
      const res = await addUserCart(product?._id);
      console.log(res);
      fetchCart();
      toast.success("Add successfully");
    }

    function checkiffavorite(id:string){
      return wishlist?.data?.find((item:Datum) => item?._id === id);
    }

  const rout = useRouter();
    function getpro(){
      rout.push(`/productdetails/${product?._id}`);
    }


  return (
    <>
      <div className='hover:border-1 hover:border-green-500  hover:shadow-sm hover:shadow-green-400 w-max p-5 rounded-md' >
        <div onClick={()=>{getpro()}} className='cursor-pointer'>
          {product?.imageCover && <Image
          src={product?.imageCover}
          alt="Product Image"
          width={250}
          height={200}
        /> }
        <span className='text-green-500'>{product?.category?.name}</span>
        <p className='py-2 font-semibold'>{title}</p>
        <div className='flex justify-between items-center'>
            {/* price */}
            <span>{product?.price} EGP</span>
            <div className='flex items-center gap-1'>
                <FaStar color='yellow' />
                {/* ratingsAverage */}
                <span>{product?.ratingsAverage}</span>
            </div>
        </div>
        </div>
        <div className='flex justify-between items-center gap-2 mt-4'>
            <button className='bg-green-600 py-1.5 rounded-md grow text-white cursor-pointer' onClick={()=>{addtocart()}}>+ Add</button>
            <FaHeart size={30}  onClick={() => addtofav()} className={`${checkiffavorite(product?._id) ? " text-red-500 cursor-pointer" : " text-gray-400 cursor-pointer"}`} />
        </div>
      </div>
    </>
  )
}
