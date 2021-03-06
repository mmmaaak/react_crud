var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', './views/');
app.use('/src', express.static(__dirname + '/src'));
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//
//var data = {
//    fields: [
//        {
//            title: 'id',
//            valueType: 'pkey'
//    },
//    {
//            title: 'name',
//            valueType: 'string'
//    },
//    {
//            title: 'age',
//            valueType: 'number'
//    },
//    {
//            title: 'gender',
//            valueType: 'select',
//            options: ['male', 'female']
//    }
//  ],
//    rows: [
//    {
//        id: 1,
//        name: 'Pavel Shvedov',
//        age: 26,
//        gender: 'male'
//    },
//    {
//        id: 2,
//        name: 'Furion',
//        age: 1000,
//        gender: 'female'
//    },
//    {
//        id: 3,
//        name: 'John Fail',
//        age: 32,
//        gender: 'female'
//    },
//    {
//        id: 4,
//        name: 'Jack London',
//        age: 100,
//        gender: 'male'
//    },
//    {
//        id: 5,
//        name: 'Jack London',
//        age: 100,
//        gender: 'male'
//    },
//    {
//        id: 6,
//        name: 'Jack London',
//        age: 100,
//        gender: 'male'
//    },
//    {
//        id: 7,
//        name: 'Jack London',
//        age: 100,
//        gender: 'male'
//    },
//    {
//        id: 8,
//        name: 'Jack London',
//        age: 100,
//        gender: 'male'
//    },
//    {
//        id: 9,
//        name: 'Jack London',
//        age: 100,
//        gender: 'male'
//    },
//    {
//        id: 10,
//        name: 'Jack London',
//        age: 100,
//        gender: 'male'
//    },
//    {
//        id: 11,
//        name: 'Jack London',
//        age: 100,
//        gender: 'male'
//    },
//    {
//        id: 12,
//        name: 'Jack London',
//        age: 100,
//        gender: 'male'
//    },
//    {
//        id: 13,
//        name: 'Jack London',
//        age: 100,
//        gender: 'male'
//    }
//  ]
//};

var data = {
  fields: [
      {
          title: "city_id",
          valueType: "pkey"
      },
      {
          title: "name",
          valueType: "string"
      },
      {
          title: "country",
          valueType: "string"
      },
      {
          title: "population",
          valueType: "number"
      }
  ],
  rows: [
      {
          city_id: 1,
          name: "New York",
          country: "USA",
          population: 100500
      },
      {
          city_id: 2,
          name: "Moscow",
          country: "Russia",
          population: 200600
      },
      {
          city_id: 3,
          name: "Paris",
          country: "France",
          population: 300700
      },
      {
          city_id: 4,
          name: "Berlin",
          country: "Germany",
          population: 400800
      },
      {
          city_id: 5,
          name: "Rome",
          country: "Italy",
          population: 500900
      },
      {
          city_id: 6,
          name: "New York",
          country: "USA",
          population: 100500
      },
      {
          city_id: 7,
          name: "Moscow",
          country: "Russia",
          population: 200600
      },
      {
          city_id: 8,
          name: "Paris",
          country: "France",
          population: 300700
      },
      {
          city_id: 9,
          name: "Berlin",
          country: "Germany",
          population: 400800
      },
      {
          city_id: 10,
          name: "Rome",
          country: "Italy",
          population: 500900
      },
      {
          city_id: 11,
          name: "New York",
          country: "USA",
          population: 100500
      },
      {
          city_id: 12,
          name: "Moscow",
          country: "Russia",
          population: 200600
      },
      {
          city_id: 13,
          name: "Paris",
          country: "France",
          population: 300700
      },
      {
          city_id: 14,
          name: "Berlin",
          country: "Germany",
          population: 400800
      },
      {
          city_id: 15,
          name: "Rome",
          country: "Italy",
          population: 500900
      }
  ]
};

var prepareResponse = function(req) {
    return {
        config: {
            start: req.body.start,
            count: req.body.count,
            filters: req.body.filters
        }
    };
}

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/api/create/', function (req, res) {
    res.send({error: 'Test create message!'});
});

app.post('/api/read/', function (req, res) {
    var response = prepareResponse(req);
    var resultData = data.rows;
    if(typeof req.body['filters']!=="undefined") {
        if(typeof req.body.filters["searchString"]!=="undefined" && req.body.filters.searchString.trim().length > 0) {
            resultData = resultData.filter(function(e) {
                return e.name.toLowerCase().indexOf(req.body.filters.searchString.toLowerCase().trim()) > -1;
            });
        }
    }
    response.data = {
        fields: data.fields,
        rows: resultData.slice(parseInt(response.config.start), parseInt(response.config.start) + parseInt(response.config.count)),
        pages: Math.ceil(resultData.length/response.config.count)
    };
    res.send(response);
});

app.post('/api/update/', function (req, res) {
    res.send({error: 'Test update message!'});
});

app.post('/api/delete/', function (req, res) {
    res.send({error: 'Test delete message!'});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port)
});