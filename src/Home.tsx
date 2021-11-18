import { useState, ChangeEvent } from "react";
import { Toaster } from 'react-hot-toast';
import { useWallet } from "@solana/wallet-adapter-react";
import useCandyMachine from './hooks/use-candy-machine';
import useWalletBalance from './hooks/use-wallet-balance';
import Countdown from 'react-countdown';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { CircularProgress } from "@material-ui/core";
import { shortenAddress } from "./utils/candy-machine";

const Home = () => {
  const [balance] = useWalletBalance();
  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const wallet = useWallet();

  const { isLoading, isSoldOut, mintStartDate, isMinting, onMintNFT, nftsData } = useCandyMachine();

  return (
    <main>
      <Toaster />

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-sm md:text-2xl text-white tracking-widest mb-6">PLEASE CONNECT YOUR WALLET FIRST</h2>
        <WalletMultiButton 
          className="text-black max-w-sm w-full py-2 px-4 mb-6 text-black text-center font-bold uppercase tracking-widest !bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-600 border-2 border-yellow-400 rounded flex justify-center items-center transition-all ease-in-out duration-500 transform lg:hover:-translate-y-1 button-connect"
        >
          {wallet.connected ? shortenAddress(wallet.publicKey?.toBase58() || '') : "Connect Wallet"}
        </WalletMultiButton>
        {
          isSoldOut ?
            <p className="text-center">SOLD OUT</p>
            :
              isActive ?
                (isMinting || isLoading) ?
                  wallet.connected &&
                  <CircularProgress style={{width: '30px', height: '30px'}} />
                :
                  wallet.connected && 
                    <div id="mint-area" className="flex flex-wrap gap-6 justify-center items-center text-sm uppercase tracking-wider font-bold">
                      <button 
                        onClick={() => onMintNFT(1)}
                        disabled={isSoldOut || isMinting || !isActive || isLoading} 
                        className="text-black font-bold py-2 px-4 !bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 border-2 border-white rounded transition-all ease-in-out duration-100 transform lg:hover:-translate-y-1 hover:text-yellow-500"
                      >
                        MINT 1 HIGH ROLLER
                      </button>
                      <button 
                        onClick={() => onMintNFT(2)}
                        disabled={isSoldOut || isMinting || !isActive || isLoading} 
                        className="text-black font-bold py-2 px-4 !bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 border-2 border-white rounded transition-all ease-in-out duration-100 transform lg:hover:-translate-y-1 hover:text-yellow-500"
                      >
                        MINT 2 HIGH ROLLER
                      </button>
                      <button 
                        onClick={() => onMintNFT(3)}
                        disabled={isSoldOut || isMinting || !isActive || isLoading} 
                        className="text-black font-bold py-2 px-4 !bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 border-2 border-white rounded transition-all ease-in-out duration-100 transform lg:hover:-translate-y-1 hover:text-yellow-500"
                      >
                        MINT 3 HIGH ROLLER
                      </button>
                      <button 
                        onClick={() => onMintNFT(6)}
                        disabled={isSoldOut || isMinting || !isActive || isLoading} 
                        className="text-black font-bold py-2 px-4 !bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 border-2 border-white rounded transition-all ease-in-out duration-100 transform lg:hover:-translate-y-1 hover:text-yellow-500"
                      >
                        MINT 6 HIGH ROLLER
                      </button>
                      <button 
                        onClick={() => onMintNFT(7)}
                        disabled={isSoldOut || isMinting || !isActive || isLoading} 
                        className="text-black font-bold py-2 px-4 !bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 border-2 border-white rounded transition-all ease-in-out duration-100 transform lg:hover:-translate-y-1 hover:text-yellow-500"
                      >
                        MINT 7 HIGH ROLLER
                      </button>
                    </div>
              :
                <Countdown
                  date={mintStartDate}
                  onMount={({ completed }) => completed && setIsActive(true)}
                  onComplete={() => setIsActive(true)}
                  renderer={renderCounter}
                /> 
        }
      </div>
    </main>
  );
};

const renderCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <span className="text-gray-800 font-bold text-2xl cursor-default">
      Live in {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
    </span>
  );
};

export default Home;



