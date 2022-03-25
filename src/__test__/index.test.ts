import {server} from "../server"
import supertest from "supertest";
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const client = supertest(server)
