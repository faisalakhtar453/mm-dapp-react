import "./App.css";
import EthereumTransaction from "./Send-Transactions/Transactions";
// import MetaMask from "./Single-Wallet/MetaMask";
import DetectMultiple from "./Multiple Wallet/DetectMultiple";

const App = () => {
   

    return (
        <>
        {/* Work when only one Wallet extension is installed */}
        {/* <MetaMask /> */}
        {/* Work when Multiple Wallet extension is installed */}
        <DetectMultiple />
        {/* Send Transactions from one Wallet to Other */}
        <EthereumTransaction />
        </>
    );
};

export default App;