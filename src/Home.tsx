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
    <main className="p-5">
      <Toaster />

      <div className="w-full flex flex-col justify-center items-center">
        {wallet.connected &&
          <>
            <p className="text-center text-white">Balance : {balance.toFixed(2)} SOL</p>
            <p className="text-center text-white">Address : {shortenAddress(wallet.publicKey?.toBase58() || '')}</p>
          </>
        }
        <p className="text-center text-white">Minted / Total : {nftsData.itemsRedeemed} / {nftsData.itemsAvailable}</p>
        {wallet.connected ? 
            (
              <button
                disabled={isSoldOut || isMinting || !isActive || isLoading}
                className="mt-5 w-full py-2 px-2 text-black text-xs text-center font-bold !bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-600 border-2 border-yellow-400 rounded flex justify-center items-center transition-all ease-in-out duration-500 transform lg:hover:-translate-y-1" 
                style={{color: 'black', fontWeight: 'bold', border: 'rgba(251, 191, 36, 200) 2px solid', fontSize: '16px', width: "100%", marginTop: "20px"}}
                onClick={()=> onMintNFT(quantity)}
              >
                {isSoldOut ? 
                  (
                    "SOLD OUT"
                  ) 
                : 
                  isActive ? 
                    (
                      (isMinting || isLoading) ? 
                        (
                          <CircularProgress style={{width: '15px', height: '15px'}} />
                        ) 
                      : 
                        (
                          "MINT"
                        )
                    ) 
                  : 
                    (
                      <Countdown
                        date={mintStartDate}
                        onMount={({ completed }) => completed && setIsActive(true)}
                        onComplete={() => setIsActive(true)}
                        renderer={renderCounter}
                      />
                    )
                }
              </button>
            )
          : 
            (
              <WalletMultiButton 
                className="mt-5 py-1 px-2 text-black text-xs text-center font-bold !bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-600 border-2 border-yellow-400 rounded flex justify-center items-center transition-all ease-in-out duration-500 transform lg:hover:-translate-y-1" 
                style={{color: 'black', fontWeight: 'bold', border: 'rgba(251, 191, 36, 200) 2px solid', fontSize: '16px', width: "100%", marginTop: "20px"}}
              >
                Connect Wallet
              </WalletMultiButton>
            ) 
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



