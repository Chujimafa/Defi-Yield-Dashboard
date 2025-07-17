"use client"
import ConnectWalletButton from "./connectWalletButton";
import "./style.css"; 


export default function HeaderTitle() {
    return (
        <div className="header-container">
            <h1 className="header-title" >Defi Yield Dashboard</h1>
            <ConnectWalletButton />
        </div>
    );
}