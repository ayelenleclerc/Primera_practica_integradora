import { Router } from "express";
import ProductManager from "../dao/mongo/managers/productManager.js";
import { getValidFilters } from "../utils.js";

const productService = new ProductManager();
const router = Router();
router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/profile", async (req, res) => {
  res.render("profile");
});
router.get("/", async (req, res) => {
  res.render("home");
});

router.get("/products", async (req, res) => {
  let { page = 1, limit = 5, sort, order = 1, ...filters } = req.query;
  const cleanFilters = getValidFilters(filters, "product");
  console.log(cleanFilters);
  let sortResult = {};
  if (sort) {
    sortResult[sort] = order;
  }
  const pagination = await productService.paginateProducts(cleanFilters, {
    page,
    lean: true,
    limit,
    sort: sortResult,
  });
  console.log(pagination);
  res.render("productos", {
    products: pagination.docs,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage,
    nextPage: pagination.nextPage,
    prevPage: pagination.prevPage,
    page: pagination.page,
  });
});

router.get("/realTimeProducts", async (req, res) => {
  const listaProductos = await productService.getProducts();
  res.render("realTimeProducts", { listaProductos });
});
router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
