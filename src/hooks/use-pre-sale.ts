import React, { useEffect, useState } from 'react';
import * as anchor from "@project-serum/anchor";
import { PublicKey } from '@solana/web3.js';
import useWalletNfts from './use-wallet-nfts';
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import toast from 'react-hot-toast';

const treasuryPubkey = process.env.REACT_APP_TREASURY_ADDRESS!;
const maxHoldCount = Number(process.env.REACT_APP_MAX_HOLD_COUNT);
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);
const presaleContractId = new PublicKey(process.env.REACT_APP_PRE_SALE_ID!);
const presaleContractAccount = new PublicKey(process.env.REACT_APP_PRE_SALE_CONFIG!);

export const MINTER_STATUS = {
  NotAvailable            : 0,
  Available               : 1,
  NotExistInWhiteList     : 2,
};

interface PresaleContract {
    id: anchor.web3.PublicKey,
    account: anchor.web3.PublicKey,
    program: anchor.Program,
}

export interface Presale {
    checkMintPossible: any, 
    updatePresaleContractAccount: any,
    presaleStartDate: Date,
    presaleEndDate: Date,
}

const usePresale = () => {
  const [presaleContract, setPresaleContractor] = useState<PresaleContract>();
  const wallet = useAnchorWallet();
  const [nftLoading, nfts]: any = useWalletNfts();
  const [currentHoldedCount, setCurrentHoldedCount] = useState(0);
  const [presaleLoading, setPresaleLoading] = useState(false);

  const loadPresaleContract = async () => {
    const provider = new anchor.Provider(connection, wallet as anchor.Wallet, {
        preflightCommitment: 'recent',
    });

    const idl = await anchor.Program.fetchIdl(presaleContractId, provider);

    if (idl) {
        return new anchor.Program(idl, presaleContractId, provider);
    } else {
        return null;
    }
  }

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

        // Prepare pre-sale smart contract
        const program = await loadPresaleContract();
        if (program) {
            setPresaleContractor({
                id: presaleContractId,
                account: presaleContractAccount,
                program
            });
        }
    })();
  }, [wallet]);

  const checkMintPossible = async () => {
    if (wallet && wallet.publicKey) {

      let holdedNFTCount = nfts.length;
      setCurrentHoldedCount(holdedNFTCount);
      if (holdedNFTCount >= maxHoldCount) {                               // Check max hold count
        toast.success(`You can't mint more than ${maxHoldCount}`);  
        return false;
      }

      if (wallet.publicKey.toBase58() == treasuryPubkey) {                // Owner of store can mint at anytime
        toast.success("You are store owner.");
        return true;
      }

      setPresaleLoading(true);
      
      await presaleContract?.program.rpc.checkMintPossible(
        wallet.publicKey?.toBase58(),
        {
          accounts: {
            data: presaleContract.account,
            minter: wallet?.publicKey,
          }
        },
      );
      const data: any = await presaleContract?.program.account.data.fetch(presaleContract.account);
      const checkStatus = data.checkStatus;

      setPresaleLoading(false);

      switch (checkStatus) {
        case MINTER_STATUS.Available:
          toast.success("You can mint NFT now.");
          return true;
        case MINTER_STATUS.NotAvailable:
          toast.success("NFT sale is pending. Please wait.");
          break;
        case MINTER_STATUS.NotExistInWhiteList:
          toast.error("Mint failed! You are not in whitelist.");
          break;
      }
    } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
        toast.error("Please select Wallet."); 
    }

    return false;
  };

  return { isLoading: presaleLoading || nftLoading, checkMintPossible };
}

export default usePresale;