import { Router } from "express";
// import CartManager from "../dao/fileSystem/managers/cartsManager.js";
import { __dirname } from "../utils.js";
// const cartManager = new CartManager(__dirname + "/files/carts.json");
import CartManager from "../dao/mongo/managers/cartManager.js";
import ProductManager from "../dao/mongo/managers/productManager.js";

const cartManager = new CartManager();
const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  if (carts.length === 0) {
    res.status(200).json({ message: "No carts created" });
  } else {
    res.status(200).json({ carts });
  }
});

router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);

  if (cart === "Not Found") {
    res.status(400).json({ message: "Cart not found" });
  } else if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(400).json({ message: "Cart not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { obj } = req.body;

    if (!Array.isArray(obj)) {
      return res.status(400).send("Invalid request: products must be an array");
    }

    const validProducts = [];

    for (const product of obj) {
      const checkId = await productManager.getProductById(product._id);
      if (checkId === null) {
        return res.status(404).send(`Product with id ${product._id} not found`);
      }
      validProducts.push(checkId);
    }

    const cart = await cartManager.addCart(validProducts);
    res.status(200).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const checkIdProduct = await productManager.getProductById(pid);
    if (!checkIdProduct) {
      return res
        .status(404)
        .send({ message: `Product with ID: ${pid} not found` });
    }

    const checkIdCart = await cartManager.getCartById(cid);
    if (!checkIdCart) {
      return res
        .status(404)
        .send({ message: `Cart with ID: ${cid} not found` });
    }

    const result = await cartManager.addProductInCart(cid, {
      _id: pid,
      quantity: quantity,
    });
    console.log(result);
    return res.status(200).send({
      message: `Product with ID: ${pid} added to cart with ID: ${cid}`,
      cart: result,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .send({ message: "An error occurred while processing the request" });
  }
});

export default router;
