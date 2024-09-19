const express = require("express");
const app = express();
const mongoose = require("mongoose");
const event = require("./models/event");
const user = require("./models/user");
const result = require("./models/result");

const port = 3000;
const path = require("path");
var methodOverride = require("method-override");
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError");
const { eventSchema } = require("./schema.js");
// const events = require("./Route/event.js");
// const result = require("./Route/result.js");

let is_login = false;
let password = "gec@2024";
let is_admin = false;

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

main()
  .then((res) => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/techfest");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// app.get("/testlisting", async (req, res) => {
//   let samplelisting = new event({
//     name: "webdesign",
//     rule: "gdjhgjhgwjh",
//     description: "jgscjgsdjhgj",
//     coordinator_name: "djkgwjdgj",
//     teacher_name: "jhghjgdjh",
//   });

//   await samplelisting.save();
//   console.log("sample was saved");
//   res.send("successfull");
// });

app.get("/", (req, res) => {
  res.render("./event/home.ejs");
});
//about
app.get("/fest/about", (req, res) => {
  res.render("./event/about.ejs");
});

//contact
app.get("/fest/contact", (req, res) => {
  res.render("./event/contact.ejs");
});
//regster section
app.get("/fest/reg", (req, res) => {
  res.render("./event/register.ejs");
});

app.post("/fest/reg", async (req, res) => {
  let { retype: conpassword } = req.body;

  if (conpassword === req.body.user.password) {
    let newUser = new user(req.body.user);
    await newUser.save();
    res.render("./event/login.ejs");
  } else {
    res.send("Rewrite Your Password Correctly");
  }
});
app.get("/fest/login", (req, res) => {
  res.render("./event/login.ejs");
});
app.post("/fest/login", async (req, res) => {
  let { email: newemail, password: newpass } = req.body;

  let data = await user.findOne({ email: newemail });
  if (data) {
    if (newpass == data.password) {
      is_login = true;

      res.redirect("/fest/event");
    } else {
      res.send("Password is incorrect");

    
    }
  } else {
    res,send("user does Not Exists");
  }
});

///Admin SEction

app.get("/fest/admin", (req, res) => {
  res.render("./event/admin.ejs");
});
app.post("/fest/admin", async (req, res) => {
  let { email: newemail, password: newpass } = req.body;

  let data = await user.findOne({ email: newemail });

  if (data) {
    if (newpass == password) {
      is_admin = true;
      res.redirect("/");
    } else {
      res.send("Password is Incorrect");
    }
  } else {
    res.send("1st LogIn As Student");
  }
});

////result section.........................................

app.get("/fest/result", async (req, res) => {
  let allresult = await result.find({});
  if (is_login && is_admin) {
    res.render("./result/result.ejs", { allresult });
  } else {
    res.render("./student/result.ejs", { allresult });
  }
  // res.render("./result/result.ejs");
});
//new form
app.get("/fest/result/new", (req, res) => {
  res.render("./result/new.ejs");
});

//new
app.post(
  "/fest/result/",

  async (req, res) => {
    let newresult = new result(req.body.result);
    await newresult.save();
    res.redirect("/fest/result");
  }
);
//update
app.get("/fest/result/:id/edit", async (req, res) => {
  let { id } = req.params;
  const data = await result.findById(id);
  res.render("./result/edit.ejs", { data });
});

app.put(
  "/fest/result/:id",

  async (req, res) => {
    let { id } = req.params;
    // let newData = req.body.listing;
    await result.findByIdAndUpdate(id, { ...req.body.result });
    res.redirect("/fest/result");
  }
);
//delete
app.delete("/fest/result/:id", async (req, res) => {
  let { id } = req.params;
  await result.findByIdAndDelete(id);
  res.redirect("/fest/result");
});

//Event section.....................................................................
//index route
app.get(
  "/fest/event",
  wrapAsync(async (req, res) => {
    let allEvent = await event.find({});
    if (is_admin && is_login) {
      res.render("./event/event.ejs", { allEvent });
    } else {
      res.render("./student/event.ejs", { allEvent });
    }
  })
);
//Add New
app.get("/fest/event/new", (req, res) => {
  res.render("./event/new.ejs");
});

//show Route
app.get(
  "/fest/event/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const events = await event.findById(id);

    if (is_login && is_admin) {
      res.render("./event/show.ejs", { events });
    } else if (is_login) {
      res.render("./student/show.ejs", { events });
    } else {
      res.render("./event/register.ejs");
    }
  })
);
//new
app.post(
  "/fest/event/",

  wrapAsync(async (req, res) => {
    let newEvent = new event(req.body.event);
    await newEvent.save();
    res.redirect("/fest/event");
  })
);
//update
app.get(
  "/fest/event/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const data = await event.findById(id);
    console.log(data);
    res.render("./event/edit.ejs", { data });
  })
);

app.put(
  "/fest/event/:id",

  wrapAsync(async (req, res) => {
    let { id } = req.params;
    // let newData = req.body.listing;
    await event.findByIdAndUpdate(id, { ...req.body.event });
    res.redirect("/fest/event");
  })
);
//delete
app.delete(
  "/fest/event/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await event.findByIdAndDelete(id);
    res.redirect("/fest/event");
  })
);
app.all("*", (req, res, next) => {
  throw new ExpressError(401, "page not found");
});

app.use((err, req, res, next) => {
  let { status = 500, message = "some Err" } = err;
  // res.render("./event/error.ejs", { err });
  res.status(status).send(message);
});
app.listen(port, () => {
  console.log("app is listening");
});
