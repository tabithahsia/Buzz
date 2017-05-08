var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/buzz';
var db = pgp(connectionString);

getAllBars = function(req, res, next) {
  db.query('select * from bars')
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    });
};

getNeighborhoodBars = function(req, res, neighborhood) {
  db.query(`SELECT bars.name, bars.location, bars.category FROM bars INNER JOIN neighborhoods ON (neighborhoods.name = '${neighborhood}') and (neighborhoods.id = bars.neighborhood)`)
    .then(function(data) {
      res.status(200).send(data);
    });
};








// module.exports = connection;
module.exports.getAllBars = getAllBars;
module.exports.getNeighborhoodBars = getNeighborhoodBars;