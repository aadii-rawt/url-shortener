import { createContext, useContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [QR,setQR] = useState('djlkjs');
    const [title, setTitle] = useState('');
    const [Data, setData] = useState({
        title: '',
        originalUrl: '',
        shortUrl: 'your short url',
        qrcode:'',
        timestamp: ""
    })

    return <DataContext.Provider
        value={
            { originalUrl, setOriginalUrl, shortUrl, setShortUrl, title, setTitle, QR, setQR,Data, setData
                
             }
        }
    >{children}</DataContext.Provider>
}

export const urlContext = () => {
    return useContext(DataContext)
}

export default DataProvider