import "jest-ts-auto-mock";
import builderRepo from "@12tree/infrastructure";
import app from "./src";
import { Repositories } from "@12tree/domain";
import { Express } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";

jest.mock("@12tree/infrastructure");

let mongod: MongoMemoryServer;
let mongoConnection: string;

globalThis.beforeEach((done) => {
  jest.clearAllMocks();
  MongoMemoryServer.create()
    .then((deamon) => {
      mongod = deamon;
      mongoConnection = mongod.getUri();
      done();
    })
    .catch((err) => done(err));
});

globalThis.afterEach(async () => {
  await mongod.stop(true);
});

declare global {
  function buildApp(): [Repositories, Express];
}

globalThis.buildApp = () => {
  let repositories = (builderRepo as jest.Mock<Repositories>)(mongoConnection);
  return [repositories, app({ repositories })];
};
