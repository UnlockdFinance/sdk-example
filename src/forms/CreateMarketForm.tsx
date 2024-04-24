import {
  collections,
  Collections,
  create,
  OrderType,
  UnderlyingsAsset, underlyingsAssets,
  UnlockdApi,
  UnlockdEnvironment
} from "../../../../unlockd-ts";

export function CreateMarketForm({ token }) {
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
    await create(data.underlyingAsset, data.orderType, {
      startAmount: data.startAmount,
      endAmount: data.endAmount,
      startTime: data.startTime,
      endTime: data.endTime,
      debtToSell: data.debtToSell
    }, response);
  };

  return (
    <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-600">
      <form action="#" className="space-y-4 " onSubmit={fetchSignature}>
        <p className="text-center text-lg font-medium">Create Market item</p>
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
                  return <option key={i} value={collections("sepolia")[collection]}>{collection}</option>;
                })
              }
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="orderType" className="sr-only">order type</label>

          <div className="relative">
            <select name="orderType" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm">
              <option  value={OrderType.TYPE_AUCTION}>TYPE_AUCTION</option>
              <option  value={OrderType.TYPE_LIQUIDATION_AUCTION}>TYPE_LIQUIDATION_AUCTION</option>
              <option  value={OrderType.TYPE_FIXED_PRICE_AND_AUCTION}>TYPE_FIXED_PRICE_AND_AUCTION</option>
              <option  value={OrderType.TYPE_FIXED_PRICE}>TYPE_FIXED_PRICE</option>
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
          <label htmlFor="underlyingsAsset" className="sr-only">UnderlyingAsset</label>


          <div className="relative">
            <select name="underlyingsAsset" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm">
              {
                Object.values(UnderlyingsAsset).map((underlyingAsset, i) => {
                  return <option key={i}
                                 value={underlyingsAssets("sepolia")[underlyingAsset]}>{underlyingAsset}</option>;
                })
              }
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="startAmount" className="sr-only">Start Amount</label>

          <div className="relative">
            <input
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="StartAmount"
              name="startAmount"
            />

          </div>
        </div>   <div>
          <label htmlFor="endAmount" className="sr-only">End Amount</label>

          <div className="relative">
            <input
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="EndAmount"
              name="endAmount"
            />

          </div>
        </div> <div>
          <label htmlFor="startTime" className="sr-only">Start Time</label>

          <div className="relative">
            <input
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Start Time"
              name="startTime"
            />

          </div>
        </div><div>
          <label htmlFor="endTime" className="sr-only">End Time</label>

          <div className="relative">
            <input
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="End Time"
              name="endTime"
            />

          </div>
        </div><div>
          <label htmlFor="debtToSell" className="sr-only">Debt To Sell</label>

          <div className="relative">
            <input
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Debt To Sell"
              name="debtToSell"
            />

          </div>
        </div>

        <button
          type="submit"
          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Create
        </button>
        <p className="text-center text-sm text-gray-800">
          Result is on the console browser
        </p>
      </form>

    </div>);
}
