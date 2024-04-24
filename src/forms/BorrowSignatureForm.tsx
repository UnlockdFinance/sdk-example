import {
  Collections,
  collections,
  UnderlyingsAsset,
  underlyingsAssets,
  UnlockdApi,
  UnlockdEnvironment
} from "../../../unlockd-ts";
import { borrow } from "../../../unlockd-ts/src";

export function BorrowSignatureForm({ token }) {
  const api = new UnlockdApi(UnlockdEnvironment.STAGING);

  const fetchBorrowSignature = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data: any = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    const params = {
      "nfts":
        [
          {
            "collection": data.collection,
            "tokenId": data.tokenId
          }
        ],
      "underlyingAsset": data.underlyingAsset
    };
    const response = await api.borrowSignature(token, params);
    console.log("Signature", response);
    await borrow(BigInt(data.amount), [
      {
        "collection": data.collection,
        "tokenId": data.tokenId
      }
    ], response, {network:'sepolia'});
  };

  return (
    <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-600">
      <form action="#" className="space-y-4 " onSubmit={fetchBorrowSignature}>
        <p className="text-center text-lg font-medium">Borrow signature</p>
        <div>
          <label htmlFor="collection" className="sr-only">amount</label>

          <div className="relative">
            <input
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Amount"
              name="amount"
            />
          </div>
        </div>
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
        <div>
          <label htmlFor="underlyingAsset" className="sr-only">UnderlyingAsset</label>


          <div className="relative">
            <select name="underlyingAsset" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm">
              {
                Object.values(UnderlyingsAsset).map((underlyingAsset, i) => {
                  return <option key={i} value={underlyingsAssets("sepolia")[underlyingAsset]}>{underlyingAsset}</option>;
                })
              }
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="loanId" className="sr-only">LoanId</label>

          <div className="relative">
            <input
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Loan Id"
              name="loanId"
            />

          </div>
        </div>

        <button
          type="submit"
          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Borrow
        </button>
        <p className="text-center text-sm text-gray-800">
          Result is on the console browser
        </p>
      </form>

    </div>);
}
