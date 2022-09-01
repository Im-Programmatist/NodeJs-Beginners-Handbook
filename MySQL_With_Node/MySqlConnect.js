import express from "express";
import mysql from "mysql";

const app_mysql = express();

app_mysql.use(express.json());
app_mysql.use(express.urlencoded({extended: true}));

/*MySql Connection*/
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database:"mysql_node_test_db"
});

con.connect((err)=>{
    if(err) throw err;
    console.log("mysql connection has been established!");
});

app_mysql.get("/create_table", (req,res)=>{
    let mysqlQuery = 'create table users_tb (id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255), age int(10), city varchar(255))';
    con.query(mysqlQuery, (err, result)=>{
        if(err) throw err;
        console.log("Table created!");
        res.send(result);
    });
});

app_mysql.get('/users/:id?', (req, res)=>{
    let mysqlQuery = `select * from users_tb `;
    if(req.params.id)
        mysqlQuery += ` where id = ${req.params.id}`;
    con.query(mysqlQuery,req.params.id,(err, result)=>{
        if(err) throw err;
        res.json(result);
    })
});

app_mysql.get('/insert', (req, res)=>{
    const userList = [
        [
            "Chetan",
            29,
            "Amravati"
        ],
        [
            "Patil",
            30,
            "Nagpur"
        ],
        [
            "Korde",
            31,
            "Nagpur"
        ]
    ];
    let mysqlQuery = `INSERT INTO  users_tb(name,age,city) values ?`;
    con.query(mysqlQuery,[userList],(err, result)=>{
        if(err) throw err;
        res.json(result);
    })
});

app_mysql.get('/update/:id', (req, res)=>{
    console.log(req.query.name, req.query.age, req.query.city);
    let updatePost = [ req.query.name, req.query.age, req.query.city, req.params.id ];
    let mysqlQuery = `UPDATE users_tb SET name = ?, age = ?, city = ? WHERE id = ?`;
    con.query(mysqlQuery,updatePost,(err, result)=>{
        if(err) throw err;
        if(result.affectedRows)
            res.json({"message": "user details updated","result":result});
    })
});

app_mysql.listen('4999', '0.0.0.0', (err) => {
    if(err) throw err;
    console.log(`MySql Node app listening at- localhost:4999`);
})
