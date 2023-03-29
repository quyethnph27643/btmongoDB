var express = require('express');
var app = express();
const port = 3000;
const path = require('path');
var expressHbs =require('express-handlebars');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://quyethnph27643:quyethnph27643@cluster0.9ofgzxg.mongodb.net/cp17301?retryWrites=true&w=majority'; 
const labModel = require('./ladModel');
app.engine('.hbs', expressHbs.engine(
    {
        extname: "hbs",
        
    }
));
app.set('view engine', '.hbs');
app.set('views','./views')
app.set('views', path.join(__dirname, 'views'));
app.get('/', function(req,res){
    res.render('home', {
        layout: 'main',
        showContentTinhToan: false,
        showTitle: true
    })
});
app.get('/tinhtoan', function(req,res){
    res.render('home', {
        layout: 'main',
        soA: 10,
        soB: 2,
        phepTinh: 'cong',
        ketQua: 12,
        showContentTinhToan: true,
        showTitle: false
    })
});

app.get('/lab', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  try {
    const labs = await labModel.find({tailieu: 2});

     labModel.updateOne({ten: 'Lab 2'}, {ten: 'Lab 2 - 2023'})
    // labModel.deleteMany({ten: 'Lab 4'});
    // labModel.deleteOne({ten: 'Lab 4'});


    console.log(labs.toString());
    res.send(labs);
  } catch (err) {
    console.log(err);
  }
});

app.get('/add_lab', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  let lab = new labModel ({
    tieude : 'lab 7',
    url: 'linktailieu.com'
    
  });

  


  try {
    let kq = await lab.save();

    console.log(kq);

    let labs = await labModel.find();
    res.send(labs);

  } catch (err) {
    console.log(err);
  }
});
    
app.listen(port, () => {
    console.log('3000')
})