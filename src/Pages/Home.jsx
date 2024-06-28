// src/Hom.js
import React, { useEffect, useState } from 'react';
import DownloadBtn from '../Components/DownloadBtn';
import { useNavigate } from 'react-router-dom';
import { urlContext } from '../Context/DataContext';
import URLModel from '../Components/URLModel';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Home = () => {

  const { originalUrl, setOriginalUrl, shortUrl, setShortUrl, title, setTitle, QR, setQR, Data, setData } = urlContext()
  const [titleInput, setTitleInput] = useState(false)
  const navigate = useNavigate()
  const [urlModel,seturlModel] = useState(false)
  const [user] = useAuthState(auth)

  const [btndisable,setBtnDisable] = useState(false)

  function handleData(e) {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
   async function generateShortUrl(e){
     e.preventDefault()
    if(Data.originalUrl){
      setBtnDisable(true)
      if(!user) navigate('/login') 
      // short long url
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(Data.originalUrl)}`)
      const value = await res.text();
      // fetch QR code of original URL
      const qrcode = await fetch("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + Data.originalUrl);
      setData((prev) => ({...prev,shortUrl:value,qrcode:qrcode.url,timestamp:"22/2020.2424"}))
      seturlModel(true)
      setBtnDisable(false)
    }
  };

  function handleCopy() {
    navigator.clipboard.writeText(shortUrl)
  }
  return (
    <div className="min-h-[calc(100vh-48px)] relative flex items-center flex-col gap-y-10 justify-center p-4">
      <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-bold  '>The only URL Shortner <br />
        you'll ever need 👇</h1>
      <div className="px-3 sm:px-2 py-6 rounded-lg flex items-center flex-col sm:flex-row justify-center gap-2 w-full min-w-min">
        <input
          type="url"
          required
          name="originalUrl"
          value={Data.originalUrl}
          onChange={handleData}
          placeholder="Enter URL"
          className="p-2 w-full sm:w-2/4 border-2 border-gray-300 bg-transparent outline-none rounded-md"
          onClick={() => setTitleInput(true)}
        />
        <button
          onClick={generateShortUrl}
          className="bg-blue-900 w-full sm:w-fit font-semibold text-white rounded p-2">
           {btndisable ? "Loading..." : "Shorten URL"}
        </button>
      </div>
      { urlModel && <URLModel seturlModel={seturlModel} /> }
    </div>
  );
};

export default Home;
