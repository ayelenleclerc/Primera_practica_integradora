import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const cartData = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartData);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
    }
  };
  createCart = async () => {
    try {
      const carts = await this.getCarts();
      let id;
      if (carts.length === 0) {
        id = 1;
      } else {
        id = carts[carts.length - 1].id + 1;
      }
      const cart = {
        id: id,
        products: [],
      };
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      console.error(error);
    }
  };
  addProductToCart = async (cid, pid) => {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === cid);

      if (cart) {
        const productExists = cart.products.some(
          (product) => product.pid === pid
        );

        if (productExists) {
          cart.products.find((product) => product.pid === pid).quantity++;
        } else {
          cart.products.push({
            pid: pid,
            quantity: 1,
          });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      }
    } catch (error) {
      console.log(error);
    }
  };
  getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      const foundCart = carts.find((cart) => cart.id === id);

      if (foundCart) {
        return foundCart;
      } else {
        return "Not Found";
      }
    } catch (error) {
      console.error(error);
    }
  };
  updateCart = async (cid, updatedCart) => {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cid);
      if (cartIndex === -1) {
        return `Can't find cart with id: `;
      }
      carts[cartIndex] = {
        ...carts[cartIndex],
        ...updatedCart,
      };
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
      return carts[cartIndex];
    } catch (error) {
      console.error(error);
    }
  };

  deleteCart = async (id) => {
    try {
      const carts = await this.getCarts();
      const index = carts.findIndex((cart) => cart.id === id);
      if (index === -1) {
        return `Can't find cart with id: `;
      }
      carts.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
      return carts;
    } catch (error) {
      console.error(error);
    }
  };
}
