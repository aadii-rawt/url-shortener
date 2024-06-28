import React, { useEffect, useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Urls from '../Components/Urls'
import { urlContext } from '../Context/DataContext'
import MyLinksShimmer from '../Components/MyLinksShimmer'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function MyLinks() {
    const [user] = useAuthState(auth)
    const { setData } = urlContext()
    const [mylinks, setMyLinks] = useState([])
    const navigate = useNavigate()
    const [isloading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState('')

    // create a new url redirect to home oage
    function createNewURL() {
        setData({
            title: '',
            originalUrl: '',
            shortUrl: 'your short url',
            qrcode: '',
            timestamp: ""
        })
        navigate('/')
    }
    useEffect(() => {
        const notesQuery = query(
            collection(db, `users/${user?.uid}/urls`),
            orderBy("timestamp", "desc")
        );
        const unsubscribe = onSnapshot(notesQuery, (snapshot) => {
            const urlsData = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp.toDate().toString() // Convert Firestore Timestamp to string
                };
            });
            setMyLinks(urlsData);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [user,db])

    return (
        <div className="min-h-[calc(100vh-48px)] bg-slate-900 text-white p-4">
            <div className="container my-4">
                <div className='flex justify-between items-center'>
                    <h3 className="font-bold text-xl">My Links</h3>
                    <button onClick={createNewURL} className='bg-red-900 font-semibold rounded px-2 py-1'>Create New Link</button>
                </div>
                {!isloading &&
                    <div className="filter my-3 border-2 border-gray-400 rounded-lg flex items-center px-3">
                        <input type="text" className='w-full bg-transparent  outline-none py-1.5' value={filter}
                            onChange={(e) => setFilter(e.target.value)} />
                        <FiFilter />
                    </div>
                }
                <div>
                    {isloading ? <MyLinksShimmer /> :
                        mylinks.length > 0 ?
                            mylinks.filter((item) => item.title.toLowerCase().includes(filter.toLowerCase())).map((url, index) => {
                                return <Urls key={index} url={url} />
                            }) :
                            <h1>No Links Created yet</h1>
                    }
                </div>
            </div>
        </div >
    )
}

export default MyLinks