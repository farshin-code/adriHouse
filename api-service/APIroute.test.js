import { MongoMemoryServer } from "mongodb-memory-server";
import supertest from "supertest";
import mongoose from "mongoose";
import startSever from "./server";
const mongod = await MongoMemoryServer.create();
const uri = mongod.getUri();
//connect to in Memory DB instead of real mongo
mongoose.connect(uri);


describe("APIroute Posts", () => {
    beforeAll(async () => {
        await mongoose.connect(uri);
      });
      afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
      });
              
})