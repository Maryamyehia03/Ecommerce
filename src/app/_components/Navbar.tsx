"use client";

import React , {useContext} from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Cartcontext } from "../context/Cartcontext";
import { FaShoppingCart } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const {status} = useSession();
  const data = useContext(Cartcontext);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex gap-2">
          <FaShoppingCart color='green' size={33}/>fresh cart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition">
            cart
          </Link>
          <Link href="/wishlist" className="text-gray-700 hover:text-blue-600 transition">
            wishlist
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
            products
          </Link>
          <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition">
            categories
          </Link>
          <Link href="/brands" className="text-gray-700 hover:text-blue-600 transition">
            brand
          </Link>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex gap-3">
         
          {/* <Button variant="outline" asChild> */}
             {status === "loading" ? <Skeleton width={50} height={20}/> :
          (status === "authenticated"?
          <div className="flex gap-4">
             <div className='relative cursor-pointer'>
             <Link href="/cart" ><FaShoppingCart size={30}/>
             <span className='absolute -top-1 -right-2 text-xs font-bold bg-green-700 px-2 py-0.5 rounded-sm'>{data?.carts?.numOfCartItems || 0}</span>
             </Link>
           </div>
            <button className='cursor-pointer' onClick={() => signOut({callbackUrl:"/auth/login"})}>Log out</button>
          </div>
          :<Link href="/auth/login">Log in</Link>)
          }
          {/* </Button> */}
        </div>

        {/* Icon (Mobile) */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/cart"
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              cart
            </Link>
            <Link
              href="/wishlist"
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              wishlist
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              products
            </Link>

            <Link
              href="/categories"
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              categories
            </Link>

            <Link
              href="/brands"
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              brand
            </Link>

            {/* Auth Buttons (Mobile) */}
            <div className="flex gap-3">
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}


// "use client"
// import { signOut, useSession } from 'next-auth/react';
// import Link from 'next/link';
// import React, { useContext } from 'react'
// import { FaShoppingCart } from 'react-icons/fa';
// import Skeleton from 'react-loading-skeleton'
// import { Cartcontext } from '../context/Cartcontext';
// // import { data } from '../cart/page';

// export default function Navbar() {
//   const {status} = useSession();
//   const data = useContext(Cartcontext);
//   // console.log(status);
//   // console.log(data);

//   // const count = data;
  
//   return (
//     <>

// <nav className="navbar navbar-expand-lg bg-white border-gray-200 dark:bg-gray-900">
//   <div className=" flex flex-wrap items-center justify-between container mx-auto p-5">
//   <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//       <FaShoppingCart color='green' size={33}/>
//       <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fresh Cart</span>
//   </Link>

//   <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//       {/* <button type="button" className="flex bg-transparent text-sm md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"> */}
//         <span className="sr-only">Open user menu</span>
//          <div className='flex items-center gap-4'>
//              <div className='relative'>
//             <Link href="/cart" ><FaShoppingCart size={30} className='cursor-pointer'/></Link>
//             <span className='absolute -top-1 -right-2 text-xs font-bold bg-green-700 px-2 py-0.5 rounded-sm'>{data?.carts?.numOfCartItems}</span>
//           </div>
//           {status === "loading" ? <Skeleton width={50} height={20}/> :
//           (status === "authenticated"? <button className='cursor-pointer' onClick={() => signOut({callbackUrl:"/auth/login"})}>Log out</button>:<Link href="/auth/login">Log in</Link>)
//           }
//          </div>
//       <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
//         <span className="sr-only">Open main menu</span>
//         <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
//         </svg>
//     </button>
//   </div>
//   <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
//     <ul className="flex flex-col font-semibold p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//       <li>
//         <Link href="/" className="block py-2 px-4 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
//       </li>
//       <li>
//         <Link href="/cart" className="block py-2 px-4 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart</Link>
//       </li>
//       <li>
//         <Link href="/wishlist" className="block py-2 px-4 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Wishlist</Link>
//       </li>
//       <li>
//         <Link href="/products" className="block py-2 px-4 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</Link>
//       </li>
//       <li>
//         <Link href="/categories" className="block py-2 px-4 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categories</Link>
//       </li>
//       <li>
//         <Link href="/brands" className="block py-2 px-4 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</Link>
//       </li>
//     </ul>
//   </div>
//   </div>
// </nav>

      
//     </>
//   )
// }
