import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { urlContext } from '../Context/DataContext'
import { FaLink, FaRegCopy } from 'react-icons/fa'
import Shimmer from './Shimmer'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function URLModel({ seturlModel }) {
  const navigate = useNavigate()
  const [isloading, setIsLoading] = useState(false)
  const { Data, setData } = urlContext()
  const [user] = useAuthState(auth)

  // add url to database
  async function handleURL() {
    await addDoc(collection(db, `users/${user?.uid}/urls`), {
      ...Data,
      timestamp: serverTimestamp(),
    })
    navigate('/mylinks')
  }

  function handleData(e) {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  // cancel to save to url
  function handleCancle() {
    setData({
      title: '',
      originalUrl: '',
      shortUrl: 'your short url',
      qrcode: '',
      timestamp: ""
    })
    seturlModel(false)
  }

  return isloading ? <Shimmer /> : (
    createPortal(
      <div className='absolute top-0 w-full h-full backdrop-blur-sm flex justify-center items-center '>
        <div className="w-full mx-3 sm:mx-0 sm:w-[467px]  bg-slate-800 p-7 rounded-md text-white">
          <div>
            <img src='qr.jpg' alt="QR code" className='w-40 mb-3' />
            <form action="" className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>
                <a href={Data.shortUrl} target='_blank' className='text-blue-400 font-semibold text-2xl'>{Data.shortUrl}</a>
                <span onClick={() => navigator.clipboard.writeText(Data.shortUrl)}
                  className='cursor-pointer hover:bg-slate-700 p-2 rounded'><FaRegCopy /></span>
              </div>
              <a href={Data.originalUrl} target='_blank' className='flex gap-2 items-center'><FaLink /> {Data.originalUrl}</a>
              <label htmlFor="title">URL Title</label>
              <input type="text" name='title'
                onChange={handleData}
                value={Data.title}
                className='w-full border-2 rounded-md bg-transparent outline-none p-1.5 text-white' />
            </form>
            <div className='flex justify-end gap-2 mt-3'>
              <button className='bg-slate-600 text-white font-semibold py-1 px-3 text-end rounded mt-2'
                onClick={handleCancle}>Cancel</button>
              <button className='bg-green-700 text-white font-semibold py-1 px-3 text-end rounded mt-2'
                onClick={handleURL}>Save</button>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("portal")
    )
  )
}

export default URLModel