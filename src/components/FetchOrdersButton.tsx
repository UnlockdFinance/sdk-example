import {Chains, Subgraph} from "../../../unlockd-ts/src";

export function FetchOrdersButton(){
    const subgraph = new Subgraph(Chains.Sepolia)
    const logOrders = ()=>{
        subgraph.allOrders().then((orders)=>{
            console.log(orders)
        })
    }
    return (
        <>
        <button onClick={logOrders}
                className="block w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >Fetch Orders</button>
            check the console
        </>
    )
}
