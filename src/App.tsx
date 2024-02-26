import "./App.css";
import DetectMultiple from "./Multiple Wallet/DetectMultiple";
// import MetaMask from "./MetaMask";

const App = () => {
   

    return (
        <>
        {/* Work when only one Wallet extension is installed */}
        {/* <MetaMask /> */}
        {/* Work when Multiple Wallet extension is installed */}
        <DetectMultiple />
        </>
    );
};

export default App;