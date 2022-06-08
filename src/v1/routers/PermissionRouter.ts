import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";
import Container from "typedi";
import { RoleController } from "../controllers/RoleController";
import { PermissionController } from "../controllers/PermissionController";

export class PermissionRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "permissions", `permissions/`);
  }

  configureRoutes() {
    const controller = Container.get(PermissionController);    
    
    this.router.post(``, controller.create.bind(controller));
    this.router.get(``, controller.get.bind(controller));    
    this.router.get(`/:id`, controller.getById.bind(controller));    
    this.router.put(`/:id`, controller.updateById.bind(controller));    
    this.router.delete(`/:id`, controller.deleteById.bind(controller));    
  }
}