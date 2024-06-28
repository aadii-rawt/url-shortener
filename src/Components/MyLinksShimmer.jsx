import React from 'react'

function MyLinksShimmer() {
    return (
        <div className='flex justify-between flex-col gap-2 p-2 my-2 rounded'>
            <div className='gap-4 h-20 bg-slate-600 animate-pulse rounded-md'></div>
            <div className='gap-4 h-20 bg-slate-600 animate-pulse rounded-md'></div>
            <div className='gap-4 h-20 bg-slate-600 animate-pulse rounded-md'></div>
            <div className='gap-4 h-20 bg-slate-600 animate-pulse rounded-md'></div>
        </div>
    )
}

export default MyLinksShimmer