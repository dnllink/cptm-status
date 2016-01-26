var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var port = 3000;

var url = "http://www.cptm.sp.gov.br/Pages/Home.aspx";

function getDataFromCptm(callback){

  request(url, function(err, resp, body) {

    if(err){
      throw err;
    }

    var $ = cheerio.load(body);

    var rubi = $('.rubi span').get(1);
    var diamante = $('.diamante span').get(1);
    var esmeralda = $('.esmeralda span').get(1);
    var turquesa = $('.turquesa span').get(1);
    var coral = $('.coral span').get(1);
    var safira = $('.safira span').get(1);

    var rubiTxt = $(rubi).text();
    var diamanteTxt = $(diamante).text();
    var esmeraldaTxt = $(esmeralda).text();
    var turquesaTxt = $(turquesa).text();
    var coralTxt = $(coral).text();
    var safiraTxt = $(safira).text();

    var obj = {
      rubi: rubiTxt,
      diamante: diamanteTxt,
      esmeralda: esmeraldaTxt,
      turquesa: turquesaTxt,
      coral: coralTxt,
      safira: safiraTxt
    };

    callback(obj);

  });
}

app.get('/', function(req, res){
  getDataFromCptm(function(data){
    res.send(data);
  });
});

app.listen(port, function(req, res){
  console.log('server is listening on ' + port);
});