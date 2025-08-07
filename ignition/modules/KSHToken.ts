import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KSHTokenModule = buildModule("KSHTokenModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", 10000);
  const token = m.contract("Token", ["KSHToken", "KSH", initialSupply]);
  return { token };
});

export default KSHTokenModule;
