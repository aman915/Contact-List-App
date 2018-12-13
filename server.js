//modules to require
var express = require("express");
var app = express();
var mongojs = require("mongojs");
var bp = require("body-parser");

var db = mongojs("contactlist", ["contactlist"]);

app.use(express.static(__dirname + "/public"));
app.use(bp.json());

//handle GET request by controller
app.get("/contactlist", function(req, res) {
  db.contactlist.find(function(err, data) {
    //sending the response back to controller for sending it to view ahead
    res.json(data);
  });
});

//handle POST request by controller
app.post("/contactlist", function(req, res) {
  //this part will take the newq contact data to db via server and get us the updated data of db to controller
  db.contactlist.insert(req.body, function(err, doc) {
    //sending the response back to controller for sending it to view ahead
    res.json(doc);
  });
});

//server will delete the entry based on id given by database
app.delete("/contactlist/:id", function(req, res) {
  var id = req.params.id;
  db.contactlist.remove({ _id: mongojs.ObjectID(id) }, function(err, doc) {
    //sending the response back to controller for sending it to view ahead
    res.json(doc);
  });
});

//finding the particular entry
app.get("/contactlist/:id", function(req, res) {
  var id = req.params.id;
  db.contactlist.findOne({ _id: mongojs.ObjectID(id) }, function(err, doc) {
    //sending the response back to controller for sending it to view ahead
    res.json(doc);
  });
});

//updating the entery
app.put("/contactlist/:id", function(req, res) {
  var id = req.params.id;
  db.contactlist.findAndModify(
    {
      query: { _id: mongojs.ObjectID(id) },
      update: {
        $set: {
          name: req.body.name,
          email: req.body.email,
          number: req.body.number
        }
      },
      new: true
    },
    function(err, doc) {
      //sending the response back to controller for sending it to view ahead
      res.json(doc);
    }
  );
});

app.listen(3400);
console.log("server running on port 3400");
