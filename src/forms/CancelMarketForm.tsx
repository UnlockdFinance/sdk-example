import {
  cancel
} from "../../../unlockd-ts";
import {FetchOrdersButton} from "../components/FetchOrdersButton.tsx";

export function CancelMarketForm() {

  const fetchSignature = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data: any = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    await cancel(data.orderId,{network:'sepolia'} );
  };

  return (
    <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-600">
      <form action="#" className="space-y-4 " onSubmit={fetchSignature}>
        <p className="text-center text-lg font-medium">Cancel Market item</p>
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


        <button
          type="submit"
          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Cancel
        </button>

        <p className="text-center text-sm text-gray-800">
          Result is on the console browser
        </p>
      </form>
        <FetchOrdersButton/>

    </div>);
}
