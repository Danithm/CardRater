const db = require("../models");  
const Comment = db.comments;

  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };

  exports.viewComments = (req, res) => {
    const username = req.params.username;
    console.info(req.params)
    
    Comment.findAll({ where: { username: username}})
      .then(data => {
        console.info(data);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comments."
        });
      });
}  