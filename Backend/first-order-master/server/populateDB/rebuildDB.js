import r from "rethinkdb";
import config from "../config";
import populate from "./populate.js";

exports.createTestData = function() {
  return new Promise((resolve, reject) => {
    r.connect({ host: config.host, port: config.port }, function(
      err,
      connection
    ) {
      r.dbCreate(config.db).run(connection, function(err, result) {
        if (err) {
          console.log(
            "[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s",
            config.db,
            err.name,
            err.msg,
            err.message
          );

          r.dbDrop(config.db)
            .run(connection, function(err, result) {})
            .then(
              r.dbCreate(config.db).run(connection, function(err, result) {
                let currenttime = Date.now();
                console.log(
                  "[INFO] RethinkDB database '%s' at %s dropped and recreated",
                  config.db,
                  currenttime
                );
                resolve();
              })
            );
        } else {
          console.log("[INFO] RethinkDB database '%s' created", config.db);
        }
      });
    }).catch(err => {
      console.log(err);
      reject();
    });
  });
};
