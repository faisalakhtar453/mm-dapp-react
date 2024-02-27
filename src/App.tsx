import "./App.css";
import MetaMask from "./Single Wallet/MetaMask";
// import DetectMultiple from "./Multiple Wallet/DetectMultiple";

const App = () => {
   

    return (
        <>
        {/* Work when only one Wallet extension is installed */}
        <MetaMask />
        {/* Work when Multiple Wallet extension is installed */}
        {/* <DetectMultiple /> */}
        </>
    );
};

export default App;