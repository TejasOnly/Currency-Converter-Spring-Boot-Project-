const express = require('express');
const soap = require('soap');
const fs = require('fs');

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.text({ type: 'text/xml' }));

const myService = {
  SquareService: {
    SquarePort: {
      calculateSquare: function(args) {
        let num = 0;
        if (args && args.number) {
            num = parseInt(args.number, 10);
        } else if (args && args.number_$value) {
            num = parseInt(args.number_$value, 10);
        }
        return {
          result: num * num
        };
      }
    }
  }
};

const xml = fs.readFileSync('myservice.wsdl', 'utf8');

app.listen(port, function(){
  soap.listen(app, '/wsdl', myService, xml, function(){
    console.log('SOAP server initialized at http://localhost:8000/wsdl');
  });
});
