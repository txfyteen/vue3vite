import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import userMock from "./mock/index";

export function setupProdMockServer() {
  createProdMockServer([...userMock]);
}
