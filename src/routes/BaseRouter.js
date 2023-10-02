import { Router } from "express";
import passportCall from "../middlewares/passportCall.js";
import executePolicies from "../middlewares/executePolicies.js";

export default class BaseRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.generateCustomResponses,
      passportCall("jwt", { strategyType: "JWT" }),
      executePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }
  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.generateCustomResponses,
      passportCall("jwt", { strategyType: "JWT" }),
      executePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }
  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.generateCustomResponses,
      passportCall("jwt", { strategyType: "JWT" }),
      executePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }
  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.generateCustomResponses,
      passportCall("jwt", { strategyType: "JWT" }),
      executePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  generateCustomResponses(req, res, next) {
    res.sendSuccess = (message) => res.send({ status: "success", message });
    res.sendSuccessWithPayload = (payload) =>
      res.send({ status: "success", payload });
    res.sendInternalError = (error) =>
      res.status(500).send({ status: "error", error });
    res.sendUnauthorized = (error) =>
      res.status(401).send({ status: "error", error });
    res.sendForbidden = (error) =>
      res.status(403).send({ status: "error", error });
    next();
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].sendInternalError(error);
      }
    });
  }
}
