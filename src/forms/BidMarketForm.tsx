import {
   collections, Collections, marketBid, UnlockdApi, UnlockdEnvironment
} from "../../../unlockd-ts";
import {FetchOrdersButton} from "../components/FetchOrdersButton.tsx";

export function BidMarketForm({ token }) {
  const api = new UnlockdApi(UnlockdEnvironment.STAGING);

  const fetchSignature = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data: any = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    const params = {
      "collection": data.collection,
      "tokenId": data.tokenId
    };
    const response = await api.marketSignature(token, params);
    console.log("Signature", response);

    await marketBid(data.orderId,data.amountToPay,data.amountOfDebt, response,{network:'sepolia'} );
  };

  return (
    <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-600">
      <form action="#" className="space-y-4 " onSubmit={fetchSignature}>
        <p className="text-center text-lg font-medium">Bid Market item</p>
        <div>
          <label htmlFor="collection" className="sr-only">orderId</label>

          <div className="relative">
            <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="OrderId"
                name="orderId"
            />
          </div>
        </div>
        <div>
          <label htmlFor="collection" className="sr-only">collection</label>

          <div className="relative">
            <select name="collection" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm">
              {
                Object.values(Collections).map((collection, i) => {
                  return <option key={i} value={collections("sepolia")[collection]}>{collection}</option>;
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
          <label htmlFor="amountToPay" className="sr-only">amountToPay</label>

          <div className="relative">
            <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="amountToPay"
                name="amountToPay"
            />
          </div>
        </div>
        <div>
          <label htmlFor="amountOfDebt" className="sr-only">amountOfDebt</label>

          <div className="relative">
            <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="amountOfDebt"
                name="amountOfDebt"
            />
          </div>
        </div>
        <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Bid
        </button>
        <p className="text-center text-sm text-gray-800">
          Result is on the console browser
        </p>
      </form>
        <FetchOrdersButton/>

    </div>);
}
