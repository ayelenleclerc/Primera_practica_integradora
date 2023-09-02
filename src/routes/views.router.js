import { Router } from "express";
import ProductManager from "../dao/mongo/managers/productManager.js";
import { __dirname } from "../utils.js";

const pmanager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  const listaProductos = await pmanager.getProducts();
  res.render("home", { listaProductos });
});

router.get("/realTimeProducts", async (req, res) => {
  const listaProductos = await pmanager.getProducts();
  res.render("realTimeProducts", { listaProductos });
});
router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
