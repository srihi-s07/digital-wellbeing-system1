const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR_PASSWORD",
    database: "wellbeing_db"
});
 
db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Database Connected");
    }
});
 
 
// REGISTER
 
app.post("/register",(req,res)=>{
 
    const {name,email,password}=req.body;
 
    const sql =
    "INSERT INTO users(name,email,password) VALUES(?,?,?)";
 
    db.query(
        sql,
        [name,email,password],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send("Registration Successful");
            }
        }
    );
});
 
 
// LOGIN
 
app.post("/login",(req,res)=>{
 
    const {email,password}=req.body;
 
    const sql =
    "SELECT * FROM users WHERE email=? AND password=?";
 
    db.query(
        sql,
        [email,password],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                if(result.length>0){
                    res.send(result[0]);
                }
                else{
                    res.send("Invalid Credentials");
                }
            }
        }
    );
});
 
 
// ADD ACTIVITY
 
app.post("/activity",(req,res)=>{
 
    const {
        user_id,
        activity_name,
        category,
        hours_spent,
        activity_date
    } = req.body;
 
    const sql =
    `INSERT INTO activities
    (user_id,activity_name,category,hours_spent,activity_date)
    VALUES(?,?,?,?,?)`;
 
    db.query(
        sql,
        [
            user_id,
            activity_name,
            category,
            hours_spent,
            activity_date
        ],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send("Activity Added");
            }
        }
    );
});
 
 
// VIEW ACTIVITIES
 
app.get("/activities/:id",(req,res)=>{
 
    const sql =
    "SELECT * FROM activities WHERE user_id=?";
 
    db.query(
        sql,
        [req.params.id],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        }
    );
});
 
 
// DELETE ACTIVITY
 
app.delete("/activity/:id",(req,res)=>{
 
    const sql =
    "DELETE FROM activities WHERE id=?";
 
    db.query(
        sql,
        [req.params.id],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send("Activity Deleted");
            }
        }
    );
});
 
 
// ADD GOAL
 
app.post("/goal",(req,res)=>{
 
    const {
        user_id,
        goal_name,
        target_hours,
        status
    } = req.body;
 
    const sql =
    `INSERT INTO goals
    (user_id,goal_name,target_hours,status)
    VALUES(?,?,?,?)`;
 
    db.query(
        sql,
        [
            user_id,
            goal_name,
            target_hours,
            status
        ],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send("Goal Added");
            }
        }
    );
});
 
 
// VIEW GOALS
 
app.get("/goals/:id",(req,res)=>{
 
    const sql =
    "SELECT * FROM goals WHERE user_id=?";
 
    db.query(
        sql,
        [req.params.id],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        }
    );
});
 
 app.get("/dashboard/:id",(req,res)=>{
 
    const userId = req.params.id;
 
    const sql =
    "SELECT * FROM activities WHERE user_id=?";
 
    db.query(sql,[userId],(err,result)=>{
 
        if(err){
            return res.send(err);
        }
 
        let score = 0;
 
        result.forEach(activity=>{
 
            if(activity.category==="Productive")
                score += activity.hours_spent*2;
 
            else if(activity.category==="Neutral")
                score += activity.hours_spent;
 
            else
                score -= activity.hours_spent*1.5;
 
        });
 
        res.send({
            activityCount: result.length,
            productivityScore: score
        });
 
    });
 
});

// PRODUCTIVITY SCORE
 
app.get("/score/:id",(req,res)=>{
 
    const sql =
    "SELECT * FROM activities WHERE user_id=?";
 
    db.query(
        sql,
        [req.params.id],
        (err,result)=>{
 
            if(err){
                res.send(err);
                return;
            }
 
            let score = 0;
 
            result.forEach(activity=>{
 
                if(activity.category==="Productive"){
                    score += activity.hours_spent * 2;
                }
 
                else if(activity.category==="Neutral"){
                    score += activity.hours_spent;
                }
 
                else{
                    score -= activity.hours_spent * 1.5;
                }
 
            });
 
            res.send({
                productivityScore:score
            });
 
        }
    );
});
 
app.get("/report/:id",(req,res)=>{



const sql =

"SELECT category,hours_spent FROM activities WHERE user_id=?";



db.query(

sql,

[req.params.id],

(err,result)=>{



if(err){

return res.send(err);

}



let productive=0;

let neutral=0;

let distracting=0;



result.forEach(r=>{



if(r.category==="Productive")

productive += Number(r.hours_spent);



else if(r.category==="Neutral")

neutral += Number(r.hours_spent);



else

distracting += Number(r.hours_spent);



});



res.send({

productive,

neutral,

distracting

});



});

});

app.listen(5000,()=>{
    console.log("Server Running On Port 5000");
});
 
