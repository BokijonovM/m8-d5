import { server } from "../server";
import supertest from "supertest";
import mongoose from "mongoose";
process.env.TS_NODE_DEV && require("dotenv").config();

interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
}
let token: string;
let wrongToken: string;

describe("Testing the chat endpoints", () => {
  const client = supertest(server);
  const MONGO_URL_TEST = process.env.MONGO_URL_TEST!;

  beforeAll((done) => {
    // console.log(process.env.MONGO_URL_TEST)
    mongoose.connect(MONGO_URL_TEST).then(() => {
      console.log("Connected to Mongo DB in test...");
      done();
    });
  });

  it("should work", () => {
    expect(true).toBe(true);
  });

  const newUser = {
    name: "Test Name",
    surname: "Test Surname",
    email: "test@email.com",
    password: "Testpassword",
    role: "user",
  };

  const incompleteUser = {
    name: "Test Name",
    surname: "Test Surname",
    role: "user",
  };

  /******************* Posting new user ******************/
  it("should create a new user using POST /register", async () => {
    const response = await client.post("/register").send(newUser);
    expect(response.status).toBe(201);
    token = response.body.token;
    // expect(response.body.token).toBeDefined()
  });

  /******************* Posting incomplete user ******************/
  it(" missing data should not create a new user using POST /register", async () => {
    const response = await client.post("/register").send(incompleteUser);

    expect(response.status).toBe(401);
  });

const client = supertest(server)
if(!process.env.MONGO_URL_TEST){
    throw Error
}

  const wrongloginUser = {
    email: "wrong@email.com",
    password: "wrongpassword",
  };

  /******************* login  ******************/
  it("should create a new user using POST /register", async () => {
    const response = await client.post("/register").send(loginUser);


    beforeAll(done => {
        // console.log(process.env.MONGO_URL_TEST)
        mongoose.connect(MONGO_URL_TEST)
            .then(() => {
                console.log("Connected to Mongo DB in test...")
                done()
            })
    })


    it("should work", () => {
        expect(true).toBe(true);
    })

   const newUser = {
    name : "Test Name",
    surname : "Test Surname",
    email : "test@email.com",
    password : "Testpassword",
    role : "user"
   }


   const incompleteUser = {
    name : "Test Name",
    surname : "Test Surname",
    role : "user"
   }


   /******************* Posting new user ******************/
   it("should create a new user using POST /register", async () => {
        const response = await client.post('/register').send(newUser)
        expect(response.status).toBe(201)
        token = response.body.token
        // expect(response.body.token).toBeDefined()
    })
    
    
    /******************* Posting incomplete user ******************/
    it(" missing data should not create a new user using POST /register", async () => {
        const response = await client.post('/register').send(incompleteUser)
        
        expect(response.status).toBe(401)
    })
    
    const loginUser = {
        email : "test@email.com",
        password : "Testpassword"
    }
    
    const wrongloginUser = {
        email : "wrong@email.com",
        password : "wrongpassword"
    }
    

      /******************* login  ******************/
   it("should create a new user using POST /register", async () => {
    const response = await client.post('/register').send(loginUser)
    
    expect(response.status).toBe(201)
    token = response.body.token
    wrongToken = "wrong" + token
    // expect(response.body.token).toBeDefined()
 })
 
 
 /******************* login   ******************/
 it(" missing data should not create a new user using POST /register", async () => {
     const response = await client.post('/login').send()
     
     expect(response.status).toBe(401)
 })


 /******************* get all by admin ******************/
 it("should create a new user using get /", async () => {
    const response = await client.get('/me').set("authorization", token)
    
    expect(response.status).toBe(201)
    })
    
    
    /******************* cannot get  by user ******************/
    it(" missing data should not create a new user using POST /register", async () => {
        const response = await client.get('/').set("authorization", wrongToken)
        expect(response.status).toBe(401)
    })

 /******************* get me ******************/
 it("should create a new user using POST /me", async () => {
 const response = await client.put('/me').set("authorization", token)
 
 expect(response.status).toBe(201)
 })
 
 
 /******************* cannot get  me ******************/
 it(" missing data should not create a new user using POST /register", async () => {
     const response = await client.put('/me').set("authorization", wrongToken)
     expect(response.status).toBe(401)
 })

 const editUser = {
    name : "Edited Name",
    surname : "Edited Surname",
    role : "user"
   }

    /******************* Edit users ******************/
    it("should create a new user using POST /me", async () => {
    const response = await client.put('/me').send(editUser).set("authorization", token)
    
    expect(response.status).toBe(201)
    })
    
    
    /******************* edit  users ******************/
    it(" missing data should not create a new user using POST /register", async () => {
        const response = await client.put('/me').send().set("authorization", wrongToken)
        
        expect(response.status).toBe(401)
    })



    afterAll(async() => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
        
            console.log("Dropped database and closed connection")
           
        })

})


