const r = require("rethinkdb");
const config = require("../config");

exports.setup = function() {
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
      } else {
        console.log("[INFO] RethinkDB database '%s' created", config.db);
      }

      for (let tbl in config.tables) {
        (function(tableName) {
          r.db(config.db)
            .tableCreate(tableName, { primaryKey: config.tables[tbl] })
            .run(connection, function(err, result) {
              if (err) {
                console.log(
                  "[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s",
                  tableName,
                  err.name,
                  err.msg,
                  err.message
                );
              } else {
                console.log("[INFO ] RethinkDB table '%s' created", tableName);
              }
            });
        })(tbl);
      }
    });
  });
};

exports.onConnect = function(callback) {
  r.connect({ host: config.host, port: config.port }, function(
    err,
    connection
  ) {
    connection["_id"] = Math.floor(Math.random() * 10001);
    callback(err, connection);
  });
};
