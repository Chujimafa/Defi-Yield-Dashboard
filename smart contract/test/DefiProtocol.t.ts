import { expect } from "chai";
import hre, { ethers } from "hardhat";
import "@nomicfoundation/hardhat-toolbox";
import { DeFiProtocolManager } from "../typechain-types";

describe("DeFiProtocolManager", function () {
  let defiProtocolManager: DeFiProtocolManager;

    beforeEach(async function () {

        const factory = await hre.ethers.getContractFactory("DeFiProtocolManager");
        defiProtocolManager= await factory.deploy();   
 
    });

    it("should deploy successfully", async function () {
            expect(defiProtocolManager.target).to.be.properAddress;
        })

    it("should add a protocol and show the protocols", async function () {
            await defiProtocolManager.addProtocol("Uniswap", ethers.parseEther("0.05"), ethers.parseEther("100000"));

            const addedProtocol = await defiProtocolManager.protocols(0);
            expect(addedProtocol.name).to.equal("Uniswap");
            const protocols=await defiProtocolManager.showAllProtocols();
            expect(protocols).to.deep.equal([[
                   "Uniswap", ethers.parseEther("0.05"),ethers.parseEther("100000"),]
                ]);
        }) 
    
    it("should update a protocol and revert a error if the protocol does not exist", async function () {
            await defiProtocolManager.addProtocol("Uniswap", ethers.parseEther("0.05"), ethers.parseEther("100000"));
            await defiProtocolManager.updateProtocol("Uniswap", ethers.parseEther("0.04"), ethers.parseEther("300000"));
            const protocols=await defiProtocolManager.showAllProtocols();
            expect(protocols).to.deep.equal([[
                   "Uniswap", ethers.parseEther("0.04"),ethers.parseEther("300000"),]
                ]);
            
            const updateANonExistingProtocol = defiProtocolManager.updateProtocol("Aave", ethers.parseEther("0.04"), ethers.parseEther("300000"));
            expect(updateANonExistingProtocol).to.be.revertedWithCustomError(defiProtocolManager,"ProtocolNotExists");  
             
          })

    it("if a protocol exist when use add function it will also update", async function () {
            await defiProtocolManager.addProtocol("Uniswap", ethers.parseEther("0.05"), ethers.parseEther("100000"));
            await defiProtocolManager.addProtocol("Uniswap", ethers.parseEther("0.04"), ethers.parseEther("300000"));
            const protocols=await defiProtocolManager.showAllProtocols();
            expect(protocols).to.deep.equal([[
                   "Uniswap", ethers.parseEther("0.04"),ethers.parseEther("300000"),]
                ]);
            expect(await defiProtocolManager.getProtocolsLength()).to.equal(1);
          })
  
    


  });


