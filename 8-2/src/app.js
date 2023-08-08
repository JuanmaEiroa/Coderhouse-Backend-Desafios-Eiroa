import messageRouter from "./routers/messages.router.js";
import userRouter from "./routers/users.router.js";
import viewsRouter from "./routers/views.router.js";
import ticketRouter from "./routers/tickets.router.js";
import mockRouter from "./routers/mock.router.js";
import * as path from "path";
import { app, io } from "./utils/server.util.js";
import messageController from "./controllers/message.controller.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { appConfig } from "./config/env.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");
app.use(express.static(path.join(process.cwd() + "/public")));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: appConfig.mongoUrl,
      dbName: appConfig.mongoDbName,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 6000,
    }),
    secret: appConfig.sessionSecret,
    resave: true,
    saveUninitialized: true,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(appConfig.mongoUrl, { dbName: appConfig.mongoDbName });
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);
app.use("/mockingproducts", mockRouter);
app.use("/", viewsRouter);

app.use(errorMiddleware)

io.on("connection", async (socket) => {
  socket.on("message", async (data) => {
    await messageController.add(data);
    io.emit("messageLogs", await messageController.get());
  });
  socket.on("sayhello", async (data) => {
    io.emit("messageLogs", await messageController.get());
    socket.broadcast.emit("alert", data);
  });
});