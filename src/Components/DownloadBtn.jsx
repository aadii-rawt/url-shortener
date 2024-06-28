import React from 'react'

function DownloadBtn({imgURL}) {
    function handleDownload(){
        const link = document.createElement('a');
        link.href = imgURL;
        link.download = 'image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  return (
    <button onClick={handleDownload}
    className='bg-black text-white px-2 py-1.5 rounded mt-2'>Download</button>
  )
}

export default DownloadBtn