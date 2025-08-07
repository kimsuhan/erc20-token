import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LWHTokenModule = buildModule("LWHTokenModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", 10000);
  const token = m.contract("Token", ["LWHToken", "LWH", initialSupply]);
  return { token };
});

export default LWHTokenModule;
