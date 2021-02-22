const express = require('express');
const app = express();
const port = 4002;
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TodoList',
  password: 'postgres',
  port: 5432,
})
let cors = require('cors');
let bodyParser = require('body-parser')
app.use(express.json());

const corsOptions = {
    origin: '*',   
    methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
    credentials: true,               
    allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept",
  }
  app.options('*', cors(corsOptions))
  app.use(cors(corsOptions));
  


app.post('/addmission', (req, res) => {
  pool.query('INSERT INTO missions(id,date,title,content,username) VALUES($1,$2,$3,$4,$5)',[req.body.id,req.body.date,req.body.title,req.body.content,req.body.user],(error,results)=>{
      if(error){
          console.log(error);
      }
  });
  pool.query('SELECT * FROM missions',[],(error,results)=>{
    if(error){
        res.send({js:'failed to send'});
    } else{
        res.send({js:results.rows});
    }
  });
  
});
app.get('/addmission', (req, res) => {
  pool.query('SELECT * FROM missions',[],(error,results)=>{
    if(error){
        res.send({js:'failed to send'});
    } else{
        res.send({js:results.rows});
    }
  });
  app.post('/deletemission',(req,res)=>{
    pool.query('DELETE FROM missions WHERE id=$1',[req.body.id],(error,results)=>{
        if(error){
            res.send({msg:'didnt found'});
        }else{
            res.send({msg:'deleted'});
        }
    });
  });
  app.post('/getspecificmission',(req,res)=>{
    pool.query('SELECT * FROM missions WHERE id=$1',[req.body.id],(error,results)=>{
        if(error){
            res.send({msg:'didnt found'});
        } else{
            res.send({result:results.rows});
        }
    });
  });
  
});
app.post('/updatemission',(req,res) =>{
    pool.query('UPDATE missions SET title =$1,content =$2 WHERE id=$3',[req.body.title,req.body.content,req.body.id],(error,results)=>{
        if(error){
            res.send({response:'failed'});
        } else{
            res.send({response:'updated succefully'});
        }
    });
});
app.post('/addsubmission', (req, res) => {
  pool.query('INSERT INTO submissions(mission_id,item,submission_id) VALUES($1,$2,$3)',[req.body.id,req.body.submission,req.body.item],(error,results)=>{
      if(error){
          console.log(error);
          res.send({response:'failed'});
      } else{
          res.send({response:'added'});
      }
  });
});
app.post('/getsubmissions',(req,res)=>{
    pool.query('SELECT * FROM submissions WHERE mission_id=$1',[req.body.id],(error,results)=>{
        if(error){
            console.log(error);
            res.send({response:'failed to send'});
        } else{
            let ar =[];
            let ids = [];
            let i=0;
            while(i<results.rows.length){
                ar.push(results.rows[i].item);
                ids.push(results.rows[i].submission_id);
                i++;
            }
            res.send({response:ar,id:ids});
        }
      });
});
app.post('/deletesubmission',(req,res)=>{
    pool.query('DELETE FROM submissions WHERE submission_id=$1',[req.body.id],(error,results)=>{
        if(error){
            console.log(error);
            res.send({msg:'didnt found'});
        }else{
            res.send({msg:'deleted'});
        }
    });
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});