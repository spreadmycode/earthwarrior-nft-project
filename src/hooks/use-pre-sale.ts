import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import { WHITELIST_FOR_FREE, WHITELIST_FOR_PRES, MAX_HOLD_COUNT } from '../utils/whitelist';
import useWalletNfts from './use-wallet-nfts';

const presalePeriod = (Number(process.env.REACT_APP_PRESALE_PERIOD) == 1);
const treasuryPubkey = process.env.REACT_APP_TREASURY_ADDRESS;

const usePresale = () => {
  const wallet = useWallet();
  const [isLoading, nfts]: any = useWalletNfts();
  const [currentHoldedCount, setCurrentHoldedCount] = useState(0);
  const [isMintPossible, setIsMintPossible] = useState(false);

  useEffect(() => {
    (async () => {
        if (
            !wallet ||
            !wallet.publicKey ||
            !wallet.signAllTransactions ||
            !wallet.signTransaction
        ) {
            return;
        }

        setIsMintPossible(false);

        if (presalePeriod) {                                               // Pre-sale period

            for (let i = 0; i < WHITELIST_FOR_FREE.length; i++) {
                let address = WHITELIST_FOR_FREE[i];
                if (wallet.publicKey.toBase58() == address) {
                    setIsMintPossible(true);
                    break;
                }
            }
    
            for (let i = 0; i < WHITELIST_FOR_PRES.length; i++) {
                let address = WHITELIST_FOR_PRES[i];
                if (wallet.publicKey.toBase58() == address) {
                    setIsMintPossible(true);
                    break;
                }
            }
        } else {                                                            // Normal-sale period
            setIsMintPossible(true);
        }

        let holdedNFTCount = nfts.length;
        setCurrentHoldedCount(holdedNFTCount);
        if (holdedNFTCount >= MAX_HOLD_COUNT) {                            // Check max hold count
            setIsMintPossible(false);
        }

        if (wallet.publicKey.toBase58() == treasuryPubkey) {                // Owner of store can mint at anytime
            setIsMintPossible(true);
        }
    })();
  }, [wallet]);

  return { isLoading, isMintPossible };
}

export default usePresale;