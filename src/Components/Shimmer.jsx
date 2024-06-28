import React from 'react'

function Shimmer() {
  return (
    <div className='absolute top-0 w-full h-full backdrop-blur-sm flex justify-center items-center '>
        <div className="w-full mx-3 sm:mx-0 sm:w-[467px]  bg-slate-800 p-7 rounded-md text-white">
          <div>
            <div className='mb-3 w-40 h-40 bg-slate-600 rounded-md animate-pulse'></div>
            <form action="" className='flex flex-col gap-2'>
                <div className='w-28 h-3 bg-slate-600 my-2 rounded animate-pulse'></div>
                <div className='w-28 h-3 bg-slate-600 my-2 rounded animate-pulse'></div>
                <div className='w-28- md:w-60  h-3 bg-slate-600 my-2 rounded animate-pulse'></div>
            </form>
            <div className='flex justify-end gap-2 mt-3'>
                <div className='animate-pulse bg-slate-600 w-16 h-10 rounded'></div>
                <div className='animate-pulse bg-slate-600 w-16 h-10 rounded'></div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Shimmer