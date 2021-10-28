import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import { PostModel } from "./schemas/post.schema.js";
import { UserModel } from "./schemas/user.schema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authHandler } from "./middleware/auth.middleware.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { User } from "../shared/models/user.model.js";
import { TweetModel } from "./schemas/tweet.schema.js";
import { CommentModel } from "./schemas/comment.schema.js";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import bodyParser from "body-parser";
import path from 'path'
const __dirname = path.resolve()
dotenv.config();
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;


const saltRounds = 10;
const app = express();
const PORT = 3000;
let gfs;


const mongoURI = "mongodb://localhost:27017/test";
mongoose
.connect(`${process.env.MONGO_URL}`)
  .then(async () => {
    console.log("Connected to DB Successfully");
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    const userOne = await getUserByName("Saba Abera");
    // console.log(userOne)

    const userTwo = await getUserByName("Ziva");
    // console.log(userTwo);
    // const updatedUserTwo = await followUser(userTwo?._id, userOne?._id);

    // const aggr = await aggregate()
    // console.log(aggr)

    const followers = await whoIsFollowingMe(userOne?._id);
    console.log(JSON.stringify(followers, null, 4));
  })

  .catch((err) => console.log("Failed to Connect to DB", err));
const storage = new GridFsStorage({
  url:`${process.env.MONGO_URI}`,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage: storage });
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:4200",
      "http://localhost:3502",
      "http://localhost:8080",
    ],
  })
);
app.use(express.json());

app.post("/api/file", upload.single("file"), (req, res, next) => {
  res.redirect("/");
  const file = req.file;
  console.log(file!.filename);
  if (!file) {
    throw new Error();
  }
  res.send(file);
});
// const db = '';
// app.get("/file", (req, res) => {
//   db.collection('uploads').find( {}).toArray((err: any, result:any) => {
//    if(err) throw err
//    res.send(result)
//  })
// })
function getUserByName(name: string) {
  return UserModel.findOne({ name }).populate("following");
}

function whoIsFollowingMe(_id: any) {
  return UserModel.find({ following: _id }).count();
}

app.get("/api/get-all-users", function (req, res) {
  UserModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

function followUser(userId: any, followId: any) {
  // console.log(userId, 'sabaId', followId)
  return UserModel.findOneAndUpdate(
    { _id: userId },
    {
      $addToSet: { following: followId },
    },
    { new: true }
  ).populate("following");
}
app.put("/api/update-following/:id", function (req, res) {
  console.log("Update following");
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { following: req.body.followig },
    },
    {
      new: true,
    },
    function (err, updateFollowing) {
      if (err) {
        res.send("Error user following");
      } else {
        res.json(updateFollowing);
      }
    }
  );
});
// function aggregate() {
//   return UserModel.aggregate(
//     [{
//       $project: {
//         _id: 1,
//         followers: '$following',
//       }
//     }, {
//       $project: {
//         _id: null,
//         totalFollowers: {$sum: '$following'}
//       }
//     }
//   ]
//   )
// }

app.get("/api/posts", function (req, res) {
  PostModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

///////
app.get("/api/tweets", function (req, res) {
  TweetModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.post("/api/create-tweet", authHandler, function (req: any, res) {
  const { text, img, _id, likes, disLikes } = req.body;
  const newTweet = new TweetModel({
    text,
    user: req.user._id,
  });
  console.log(newTweet, "*");
  newTweet
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(403);
      res.json({ errors: err });
    });
});

//////
///// comments
app.get("/api/comments", function (req, res) {
  CommentModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.post("/api/create-comment", authHandler, function (req: any, res) {
  const { text, img, tweet } = req.body;
  const newComment = new CommentModel({
    text,
    tweetID: tweet._id,
  });
  console.log(newComment, "*");
  newComment
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(501);
      res.json({ errors: err });
    });
});

/////
app.put("/api/increment-tweet-like/:id", function (req, res) {
  console.log("Update user like");
  TweetModel.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { likes: 1 },
    },
    {
      new: true,
    },
    function (err, updateLike) {
      if (err) {
        res.send("Error liking user");
      } else {
        res.json(updateLike);
      }
    }
  );
});

app.get("/api/users", authHandler, function (req: any, res) {
  UserModel.find({ email: req.user.email }, "-password")
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});
app.post("/api/create-user", function (req, res) {
  const { name, email, username, password, followers, following } = req.body;
  console.log(req.body);
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (error, hash) {
      const user = new UserModel({
        name,
        username,
        email,
        following: [],
        password: hash,
      });
      user
        .save()
        .then((data) => {
          res.json({ data });
        })
        .catch((err) => {
          console.log(err);
          res.status(501);
          res.json({ errors: err });
        });
    });
  });
});

app.post("/api/create-post", function (req, res) {
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

app.delete("/api/delete-user/:id", function (req, res) {
  const _id = req.params.id;
  UserModel.findByIdAndDelete(_id).then((data) => {
    console.log(data);
    res.json({ data });
  });
});

app.put("/api/update-user/:id", function (req, res) {
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

app.get("/api/logout", authHandler, function (req, res) {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 60 * 1000,
  });
  res.json({ message: "Successfully Logged out" });
});

app.post("/api/login", function (req, res) {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      console.log(user);

      bcrypt.compare(password, `${user?.password}`, function (err, result) {
        if (result) {
          console.log("It matches!");
          const accessToken = jwt.sign({ user }, access_secret);
          res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
          });
          res.json({ message: "Successfully Logged In" });
        } else {
          res.sendStatus(403);
        }
      });
    })
    .catch((err) => {
      return res.sendStatus(404);
    });
});
app.all("/api/*", function (req, res) {
  res.sendStatus(404);
});

const clientPath = path.join(__dirname, '/dist/client');
app.use(express.static(clientPath));
app.get("*", function (req, res) {
  const filePath = path.join(__dirname, '/dist/client/index.html');
  console.log(filePath);
  res.sendFile(filePath);
});


const server = createServer(app);
let io = new Server(server, {
  cors: { origin: ["http://localhost:4200"] },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("user tweet", "here is my tweet");
});

server.listen(PORT, function () {
  console.log(`starting at localhost http://localhost:${PORT}`);
});
