//app.js파일 생성

//필요한 패키지들의 기능을 불러와서 객체를 생성함(node_module에 있는 패키지만)
const express = require("express"); //express라는객체안에 require라는 명령어로 express 패키지를 가져옴
const path = require("path"); //path는 내장객체(=코어모듈,설치하지 않은 것)
const cors = require("cors");
const passport = require("passport"); //const는 한번 지정 가능 덮어쓰기 불가
const mongoose = require("mongoose");

const users = require("./routes/users");
const config = require("./config/database");
const exp = require("constants");

mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
  console.log("Conneted to Database " + config.database);
});
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

const app = express();

const port = process.env.PORT || 3000;

// app.use(function (req, res, next) {
//   console.log("Time:", Date.now());
//   next();
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

//라우팅 설정 (맨 뒤에 넣을 것)
app.use("/users", users);

// app.use(express.static(path.join(__dirname, 'public')));

//start server
app.listen(port, () => {
  console.log("Server started on port " + port);
}); //function() 과 () => 은 같음 콜백함수
