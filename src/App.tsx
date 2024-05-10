import { useEffect, useState } from "react";
import "./App.css";
import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";
import {
  UnlockdApi,
  Chains
} from "@unlockdfinance/unlockd-ts";
import { BorrowSignatureForm } from "./forms/BorrowSignatureForm.tsx";
import { FetchPricesForm } from "./forms/FetchPricesForm.tsx";
import { RepaySignatureForm } from "./forms/RepaySignatureForm.tsx";
import { CreateMarketForm } from "./forms/CreateMarketForm.tsx";
import { createWallet, getWallet } from "../../unlockd-ts/src/contractCalls/wallet.ts";
import { SendNftsForm } from "./forms/SendNftsForm.tsx";
import {BuyNowForm} from "./forms/BuyNowForm.tsx";
import {CancelMarketForm} from "./forms/CancelMarketForm.tsx";
import {BidMarketForm} from "./forms/BidMarketForm.tsx";


function App() {
  const walletClient = createWalletClient({ chain: sepolia, transport: custom(window.ethereum!) });
  const api = new UnlockdApi(Chains.Sepolia);
  const [account, setAccount] = useState<any>();
  const [unlockdAccount, setUnlockdAccount] = useState<any>(undefined);
  const [token, setToken] = useState<any>();

  const connect = async () => {
    const [address] = await walletClient.requestAddresses();
    setAccount(address);
  };
  const createUnlockdWallet = async () => {
    await createWallet({ network: "sepolia" });
    await refreshUnlockdWallet();
  };
  const refreshUnlockdWallet = async () => {
    const wallets = await getWallet({ network: "sepolia" });
    setUnlockdAccount(wallets);
  };
  const logIn = async () => {
    await connect();
    const message = await api.signatureMessage(account!);
    const signedMessage = await walletClient.signMessage({
      account,
      message: message.message
    });
    const authToken = await api.validateMessage(account!, signedMessage);
    setToken(authToken.token);
    console.log(authToken.token);
  };
  useEffect(() => {
    if (token) {
      refreshUnlockdWallet()
    }
  }, [token]);
  return (
    <>
      <div className="grid grid-cols-4 gap-4">

        <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-600">
          <button onClick={logIn}>
            LogIn
          </button>
          <p>Token {token ? "fetched" : "not fetched"}</p>
          Unlockd Wallet
          {!unlockdAccount  &&
            <>
              <button onClick={refreshUnlockdWallet}>Refresh</button>
              <button onClick={createUnlockdWallet}>Create UnlockdWallet</button>
            </>
          }
          {unlockdAccount && <>
            {unlockdAccount}
           <SendNftsForm/>
          </>}

        </div>
        <FetchPricesForm />
        <BorrowSignatureForm token={token} />
        <RepaySignatureForm token={token} />
        <CreateMarketForm token={token} />
        <BuyNowForm token={token} />
        <CancelMarketForm />
        <BidMarketForm  token={token}/>

      </div>
      <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
    </>
  );
}

export default App;
