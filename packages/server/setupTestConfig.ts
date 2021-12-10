import "jest-ts-auto-mock";
import builderRepo from "@12tree/infrastructure";
import app from "./src";
import { Repositories } from "@12tree/domain";
import { Express } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import { close } from "@12tree/infrastructure/src/connections/mongoose";

jest.mock("@12tree/infrastructure");

let mongod: MongoMemoryServer;
let mongoConnection: string;

globalThis.beforeEach(async () => {
  jest.clearAllMocks();
  mongod = await MongoMemoryServer.create();
  mongoConnection = mongod.getUri();
});

globalThis.afterEach(async () => {
  await close();
  await mongod.stop(true);
});

declare global {
  function buildApp(): [Repositories, Express];
}

globalThis.buildApp = () => {
  let repositories = (builderRepo as jest.Mock<Repositories>)(mongoConnection);
  return [repositories, app({ repositories })];
};
