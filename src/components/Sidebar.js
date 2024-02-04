"use client"
import { deleteCookie } from 'cookies-next';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Sidebar = () => {
  const router = useRouter()

   // Function to handle the logout process
   const handleLogout = () => {
    deleteCookie('token')
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    toast.success("user logout successfully!",{
      position:"top-left"
    })
    location.href="/"
    router.push('/login')
 };
  return (
    <div>
        <div className="account__left--sidebar">
                <h3 className="account__content--title mb-20">My Profile</h3>
                <ul className="account__menu">
                  <li  className="account__menu--list">
                    <Link className='new' href="/my-account">Dashboard</Link>
                  </li>
                  <li className="account__menu--list ">
                    <Link href="/address">Address</Link>
                  </li>
                  <li type='button' className="account__menu--list">
                    <Link href="/userprofile">About</Link>
                  </li>
                  <li type="button" className="account__menu--list ">
                    <Link href="/wishlist">Wishlist</Link>
                  </li>
                 
                  <li onClick={handleLogout} className="account__menu--list">
                   LogOut
                  </li>
                </ul>
              </div>
    </div>
  )
}

export default Sidebar
