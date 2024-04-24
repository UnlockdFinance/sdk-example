import { collections, Collections } from "../../../unlockd-ts";
import { sendNftsToWallet } from "../../../unlockd-ts/src";

export function SendNftsForm() {

  const fetchBorrowSignature = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data: any = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    await sendNftsToWallet([{
      contractAddress: data.collection,
      tokenId: data.tokenId
    }],{ network: "sepolia" })
  };

  return (
      <form action="#" className="space-y-4 " onSubmit={fetchBorrowSignature}>
        <p className="text-center text-lg font-medium">Send nft</p>

        <div>
          <label htmlFor="collection" className="sr-only">collection</label>

          <div className="relative">
            <select name="collection" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm">
              {
                Object.values(Collections).map((collection, i) => {
                  return <option key={i} value={collections("sepolia")[collection]}>{collection}</option>
                })
              }
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="tokenId" className="sr-only">Token Id</label>

          <div className="relative">
            <input
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Token id"
              name="tokenId"
            />
          </div>
        </div>

        <button
          type="submit"
          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Send nfts
        </button>

      </form>);
}
