
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: "Binary to Decimal Converter" });
};