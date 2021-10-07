import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import { PostModel } from "./schemas/post.schema.js";
import { UserModel } from "./schemas/user.schema.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authHandler } from "./middleware/auth.middleware.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { User } from "../shared/models/user.model.js";
import { TweetModel } from "./schemas/tweet.schema.js";
dotenv.config();
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
console.log(access_secret);


const saltRounds = 10;

const app = express();
const PORT = 3501;

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));
app.use(express.json());

app.get("/", function (req, res) {
  res.json({ message: "test" });
});

app.get("/posts", function (req, res) {
  PostModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

///////
app.get("/tweets",  authHandler, function (req, res) {
  UserModel.find({tweet: req.body.user.tweet}, '-password')
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.post("/create-tweet", authHandler, function (req: any, res) {
 
      const {text} = req.body;
  const newTweet = new TweetModel({
 text, 
 user: req.user._id
  });
 console.log(newTweet, '*')
 newTweet
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.log(err)
      res.status(501);
      res.json({ errors: err });
    });
  })
   
  

//////

app.get("/users", authHandler, function (req: any, res) {
  UserModel.find({email: req.user.email}, '-password')
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});
app.post("/create-user", function (req, res) {
   const { name, email, username, password } = req.body;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function(error, hash) {
      const {name, email, username, password} = req.body;
      const user = new UserModel({
        name,
        username,
        email,
        password: hash
      });
      user
        .save()
        .then((data) => {
          res.json({ data });
        })
        .catch((err) => {
          res.status(501);
          res.json({ errors: err });
        });
    })
   
  
  });
});

app.post("/create-post", function (req, res) {
  const { title, body } = req.body;
  const post = new PostModel({
    title,
    body,
  });
  post
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.delete("/delete-user/:id", function (req, res) {
  const _id = req.params.id;
  UserModel.findByIdAndDelete(_id).then((data) => {
    console.log(data);
    res.json({ data });
  });
});

app.put("/update-user/:id", function (req, res) {
  console.log("Update user");
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name, email: req.body.email },
    },
    {
      new: true,
    },
    function (err, updateUser) {
      if (err) {
        res.send("Error updating user");
      } else {
        res.json(updateUser);
      }
    }
  );
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
        console.log(user);
      
      bcrypt.compare(password, `${user?.password}`, function (err, result) {
        if (result) {
          console.log("It matches!");
          const accessToken = jwt.sign({user}, access_secret)
          res.cookie('jwt', accessToken, {
              httpOnly: true,
              maxAge: 60 * 60 * 1000,
          })
          res.json({message: 'Successfully Logged In'})
        } else {
          res.sendStatus(403);
        }
      });
    })
    .catch((err) => {
      return res.sendStatus(404);
    });
});

// const app = express();
// const server = http.createServer(app);
// let io = new Server(server,{
//   cors: {origin: ['http://localhost:4200']}
// });


const server = createServer(app);
let io = new Server(server,{
    cors: {origin: ['http://localhost:4200']}
  });

io.on('connection', (socket) => {
  console.log('a user connected');
socket.emit('user tweet', "here is my tweet") 
});

server.listen(PORT, function () {
  console.log(`starting at localhost http://localhost:${PORT}`);
});

