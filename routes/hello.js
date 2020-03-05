var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//MySQLの設定情報
var mysql_setting = {
    host     : 'localhost', 
    user     : 'root',
    password : '',
    database : 'my-nodeapp-db'
};

//GETアクセスの処理
router.get('/',(req, res, next) => {
    
    //コネクションの用意
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('SELECT * from mydata', function(error, results, fields) {
        //データベースアクセス完了時の処理
        if (error == null) {
            var data = {title:'mysql', content:results};
            res.render('hello/index', data);
        }
    });

    //接続を解除
    connection.end();
});

//新規作成ページのアクセス
router.get('/add', (req, res, next) => {
    var data = {
        title: 'Hello/Add',
        content: '新しいコードを入力'
    }
    res.render('hello/add', data);
});

//新規作成フォーム送信の処理
router.post('/add', (req, res, next) => {
    var nm = req.body.name;
    var ml = req.body.mail;
    var ag = req.body.age;
    var data = {'name':nm, 'mail':ml, 'age':ag};

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('insert into mydata set ?', data, function(error, results, fields) {
        res.redirect('/hello');
    });

    //接続を解除
    connection.end();
});

//指定IDのレコード表示する
router.get('/show', (req, res, next) => {
    var id = req.query.id;

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('SELECT * from mydata where id=?', id, function(error, results, fields) {
        //データベースアクセス完了時の処理
        if (error == null) {
            var data = {
                title: 'Hello/show',
                conent: 'id = ' + id + 'のレコード',
                mydata: results[0]
            }
            res.render('hello/show', data);
        }
    });

    //接続を解除
    connection.end();
});


module.exports = router;