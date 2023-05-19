const express = require('express');
const {set, connect} = require('mongoose');
const cors = require("cors");
const { DB, REQUEST_TIMEOUT, PORT } = require('./config/db');
const { success, error } = require("consola");
const auth = require('./routes/auth-routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//App routes start here
app.get("/", (req, res) => {
    res.send({data:{appName:"NR Sales SAP Portal!",developedBy:"Unknown Club",maintainedBy:"Unknown Club",version:"0.0.1"},success:true});
  });

app.post("/", (req, res, next) => {
    res.send({ message: "POST request is not allowed in this endpoint!!",success:false });
})
  
app.use("/api/auth", auth);

//App routes ends here




//Connecting tp the DB
const startApp = async () => {
    try {
      // Connection With DB
      await connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: REQUEST_TIMEOUT,
      });
  
      success({
        message: `Successfully connected with the Database \n${DB}`,
        badge: true,
      });
  
      // Start Listenting for the server on PORT
      app.listen(PORT, () =>
        success({ message: `Server started on PORT ${PORT}`, badge: true })
      );
    } catch (err) {
      error({
        message: `Unable to connect with Database \n${err}`,
        badge: true,
      });
      startApp();
    }
};
  
startApp();