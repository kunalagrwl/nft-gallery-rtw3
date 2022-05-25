
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import NFTCard from '../components/nftCard'

const Home = () => {

  const [wallet, setWallet] = useState("")
  const [collection, setCollection] = useState("")
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const [NFTs, setNFTs] = useState([])

  const fetchNFTs = async () => {
    let nfts;
    console.log("Fetching NFTs")
    const apiKey = 'y5jGN3j4gyfR-5uyoxBjIbOgbYJwmkQT'
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`
     
    if(!collection.length) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      const fetchURL = `${baseURL}?owner=${wallet}`

      const response = await fetch(fetchURL, requestOptions)
      nfts = await response.json()
      
    }
    else {
      console.log("Fetching NFTs for collection")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`

      const response = await fetch(fetchURL, requestOptions)
      nfts = await response.json()
    }

    if(nfts) {
      console.log("nfts",nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if(collection.length) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      const apiKey = 'y5jGN3j4gyfR-5uyoxBjIbOgbYJwmkQT'
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true`

      const response = await fetch(fetchURL, requestOptions)
      const nfts = await response.json()
      if(nfts) {
        console.log("nfts in collection", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full items-center justify-center gap-y-2">
        <input 
          className = "w-2/5 bg-slate-100 py-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          disabled = {fetchForCollection}
          onChange={(e)=>{setWallet(e.target.value)}} 
          type='text' 
          placeholder='Add your wallet address'
          value={wallet}
        ></input>
        <input 
          className = "w-2/5 bg-slate-100 py-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e)=>{setCollection(e.target.value)}}
          type='text' 
          placeholder='Add the collection address'
          value={collection}
        ></input>
        <label className='text-gray-600'>
          <input
            className='mr-2'
            onChange={(e)=>{setFetchForCollection(e.target.checked)}}
            type='checkbox'
            value={fetchForCollection}
          ></input>
          Fetch For Collection
        </label>
        <button 
          className='disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5'
          onClick={()=>{fetchForCollection?fetchNFTsForCollection():fetchNFTs()}}
        >
          Let's go
        </button>
      </div>
      <div className='flex flex-wrap justify-content gap-y-12 mt-4 w-5/6 gap-x-2 '>
        {NFTs.length && NFTs.map(nft => {
          return <NFTCard nft={nft}/>
        })}
      </div>
    </div>
  )
}

export default Home
