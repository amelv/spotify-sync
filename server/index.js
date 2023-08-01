const express = require('express');
const cors = require('cors');
const path = require("path");
const authRoutes = require('./authRoutes');

/**
 * Server class that handles all the routes and middlewares.
 */
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true}));
    this.app.use(cors());

    // Pick up React index.html file
    this.app.use(
      express.static(path.join(__dirname, "../client/build"))
    );
  }
  
  routes() {
    this.app.use('/api', cors(), authRoutes);
    // Catch all requests that don't match any route
    this.app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "../client/build/index.html")
      );
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}

module.exports = Server