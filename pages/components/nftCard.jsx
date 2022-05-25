export default function NFTCard(props) {
    return(
        <div className="w-1/4 flex flex-col">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={props.nft.media[0].gateway}></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
                <div>
                    <h2 className="text-xl text-gray-800">{props.nft.title}</h2>
                    <p className="text-gray-600">ID: {props.nft.id.tokenId.substr(props.nft.id.tokenId.length-4)}</p>
                    <p className="text-gray-600">{`${props.nft.contract.address.substr(0,6)}...${props.nft.contract.address.substr(props.nft.contract.address.length-4)}`}</p>
                </div>
                <div className="flex-grow mt-2">
                    <p className="text-gray-600">{props.nft.description?.substr(0,150)}</p>
                </div>
                <div className="flex justify-center mb-1">
                    <a 
                        className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-m text-white cursor-pointer"
                        href={`https://etherscan.io/token/${props.nft.contract.address}`} 
                        target="_blank"
                    >View on Etherscan</a>
                </div>
            </div>
        </div>
    )
}