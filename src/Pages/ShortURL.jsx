import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaLink, FaRegCopy } from 'react-icons/fa'
import qurimage from '/qr.jpg'
import { MdOutlineFileDownload } from 'react-icons/md'
import { urlContext } from '../Context/DataContext'

function ShortURL() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { originalUrl, shortUrl, setShortUrl, title, QR, setQR, Data, setData } = urlContext()

  useEffect(() => {
    async function generateShortURL() {
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(id)}`)
      const value = await res.text();
      console.log(res);
      setShortUrl(value)
      const qrcode = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + id;
      setQR(qrcode)
      setData((prev) => ({...prev, shortUrl: shortUrl, qrcode: qrcode, timestamp: "22/2020.2424" }))
      console.log(Data);
      setIsLoading(false)
    }
    generateShortURL()
  }, [])

  return isLoading ? <h1>Loading...</h1> : (
    <div className="min-h-[calc(100vh-48px)] bg-slate-900 flex items-center justify-center text-white p-4">
      <div className="container flex justify-around my-4">
        <div>
          <h2 className='text-4xl font-bold'>{Data?.title}</h2>
          <a href="" target='_blank' className='text-2xl text-blue-500 block my-6' >{Data?.shortUrl}</a>
          <a href="" target='_blank' className='flex gap-2 items-center'><FaLink color='gray' size={14} /> {Data?.originalUrl}</a>
          <p className='my-4 text-sm'>22/06/2024 12:35</p>
        </div>
        <div>
          <div className='flex gap-10'>
            <span className='cursor-pointer'
              onClick={() => navigator.clipboard.writeText(url.shortUrl)}><FaRegCopy /></span>
            <span className='cursor-pointer'><MdOutlineFileDownload size={20} /></span>
          </div>
          <img src={Data.qrcode} alt="" className='w-60 my-4' />
        </div>
      </div>
    </div>
  )
}

export default ShortURL