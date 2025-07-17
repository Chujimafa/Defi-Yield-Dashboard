"use client"

import { useState } from "react";
import { useReadContract,useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {dashboardContract } from "../library/getContract";
import type { PreparedTransaction, PrepareTransactionOptions } from "thirdweb";

function toContractAPY(apy: number | string) {
  // 5% => 5e16
  const apyNum =
    typeof apy === "string" ? Number(apy) : apy;
  return BigInt(Math.round(apyNum * 1e16));
}
function fromContractAPY(apy: bigint | number | string) {
  // 5e16 => 5 
  const apyNum =
    typeof apy === "bigint" ? Number(apy) : Number(apy);
  return (apyNum / 1e16).toFixed(2);
}
function toContractTVL(tvl: number | string) {

  const tvlNum =
    typeof tvl === "string" ? Number(tvl) : tvl;
  return BigInt(Math.round(tvlNum * 1e18));
}
function fromContractTVL(tvl: bigint | number | string) {
  // 1e21 => 1000
  const tvlNum =
    typeof tvl === "bigint" ? Number(tvl) : Number(tvl);
  return (tvlNum / 1e18).toLocaleString();
}
export default function DeFiProtocolManagerUI() {

  // get showAllProtocols;
  const {
    data: protocols,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    contract: dashboardContract,
    method:"showAllProtocols",
  });

  const { mutate: sendTx, isPending } = useSendTransaction();

  const [addInput, setAddInput] = useState({ name: "", apy: "", tvl: "" });
  const [updateInput, setUpdateInput] = useState({
    name: "",
    apy: "",
    tvl: "",
  });


  const handleAdd = async () => {
    const transaction = prepareContractCall({
      contract: dashboardContract,
      method: "addProtocol",
      params: [
        addInput.name,
        toContractAPY(addInput.apy),
        toContractTVL(addInput.tvl),
      ],
    });
    sendTx(transaction as PreparedTransaction<any, any, PrepareTransactionOptions>);
    setAddInput({ name: "", apy: "", tvl: "" });
    refetch();
  };

  const handleUpdate = async () => {
    const transaction = prepareContractCall({
      contract: dashboardContract,
      method: "updateProtocol",
      params: [
        updateInput.name,
        toContractAPY(updateInput.apy),
        toContractTVL(updateInput.tvl),
      ],
    });
    sendTx(transaction as PreparedTransaction<any, any, PrepareTransactionOptions>);
    setUpdateInput({ name: "", apy: "", tvl: "" });
    refetch();
  };

return (
    <div className="defi-dashboard">
      <h2>📊 Active DeFi Protocols</h2>
      
      <table className="protocols-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>APY</th>
            <th>TVL</th>
          </tr>
        </thead>
        <tbody>
          {protocols?.length ? (
            (protocols as any[]).map((p, idx) => (
              <tr key={idx}>
                <td>{p.name}</td>
                <td>{fromContractAPY(p.apy)}%</td>
                <td>${fromContractTVL(p.tvl)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="loading-text">
                No protocols found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="defi-form">
        <h3>Add New Protocol</h3>
        <input
          className="defi-input"
          placeholder="Protocol Name"
          value={addInput.name}
          onChange={(e) => setAddInput({ ...addInput, name: e.target.value })}
        />
        <input
          className="defi-input"
          placeholder="APY (%)"
          type="number"
          value={addInput.apy}
          onChange={(e) => setAddInput({ ...addInput, apy: e.target.value })}
        />
        <input
          className="defi-input"
          placeholder="TVL"
          type="number"
          value={addInput.tvl}
          onChange={(e) => setAddInput({ ...addInput, tvl: e.target.value })}
        />
        <button 
          className="defi-button" 
          onClick={handleAdd} 
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Add Protocol"}
        </button>
      </div>

      <div className="defi-form">
      <h3>Update Protocol</h3>
      <input
    className="defi-input"
    placeholder="Protocol Name"
    value={updateInput.name}
    onChange={(e) => setUpdateInput({ ...updateInput, name: e.target.value })}
  />
  <input
    className="defi-input"
    placeholder="New APY (%)"
    type="number"
    value={updateInput.apy}
    onChange={(e) => setUpdateInput({ ...updateInput, apy: e.target.value })}
  />
  <input
    className="defi-input"
    placeholder="New TVL"
    type="number"
    value={updateInput.tvl}
    onChange={(e) => setUpdateInput({ ...updateInput, tvl: e.target.value })}
  />
  <button 
    className="defi-button" 
    onClick={handleUpdate} 
    disabled={isPending}
  >
    {isPending ? "Updating..." : "Update Protocol"}
  </button>
</div>
    </div>
  );
}