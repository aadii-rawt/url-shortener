import React, { useState } from 'react'
import qr from '/qr.jpg'
import { FaDownload, FaLink, FaRegCopy } from 'react-icons/fa'
import { MdDelete, MdDeleteOutline, MdOutlineDeck, MdOutlineDelete, MdOutlineFileDownload } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {saveAs} from 'file-saver'

function Urls({ url }) {
  const [user] = useAuthState(auth)
  // format date and time 
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // download qr code url
  function downloadQRCode() {
    const imgUrl = url?.qrcode;
    const fileName = url?.title;
    saveAs(imgUrl, fileName);
  }

  //   const cityRef = doc(db, 'cities', 'BJ');

  // // Remove the 'capital' field from the document
  // await updateDoc(cityRef, {
  //     capital: deleteField()
  // });

  async function handleDeleteURL() {
    await deleteDoc(doc(db,`users/${user?.uid}/urls/${url.id}`));
  }

  return (
    <div className='flex justify-between bg-slate-800 p-2 my-2 rounded'>
      <div className='flex gap-4'>
        <img src={url.qrcode} alt="" className='w-20 sm:w-24' />
        <div>
          <h2 className='font-bold text-base sm:text-lg'>{url?.title}</h2>
          <a href={url.shortUrl} target='_blank' className='font-semibold text-blue-500 text-sm sm:text-base flex items-center gap-1'> <FaLink color='gray' size={14} />{url?.shortUrl}</a>
          <a href={url.originalUrl} target='_blank' className='text-xs sm:text-sm'>{url?.originalUrl}</a>
          <p className='text-xs my-0.5'>{formatDate(url.timestamp)}</p>
        </div>
      </div>
      <div className='flex items-start sm:hidden'>
        <span><BsThreeDotsVertical /></span>
      </div>
      <div className='hidden sm:flex gap-2 mx-5 my-auto'>
        <span className='cursor-pointer hover:bg-slate-700 p-2 rounded'
          onClick={() => navigator.clipboard.writeText(url.shortUrl)}><FaRegCopy /></span>
        <span className='cursor-pointer hover:bg-slate-700 p-2 rounded'
          onClick={downloadQRCode}
        ><MdOutlineFileDownload size={20} /></span>
        <span className='cursor-pointer hover:bg-slate-700 p-2 rounded'
        onClick={handleDeleteURL}><MdDeleteOutline size={20} /></span>
      </div>
    </div>
  )
}

export default Urls