import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

function Header() {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    function handleLogout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login')
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div className=" bg-slate-800 text-white font-semibold bg-slat sticky w-full top-0">
            <div className='container flex justify-end items-center gap-8 py-2'>
                {user ? <>
                    <Link to='/mylinks'>My Links</Link>
                    <button className=' bg-red-900 font-semibold text-white px-2 py-1 rounded' onClick={handleLogout}>Log out</button>
                </> :
                    <button className=' bg-white font-semibold text-black px-2 py-1 rounded' onClick={() => navigate('/login')}>Log in</button>
                }
            </div>
        </div>
    )
}

export default Header