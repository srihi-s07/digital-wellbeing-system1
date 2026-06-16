const API = "http://localhost:5000";
 
async function registerUser(){
 
const name =
document.getElementById("name").value;
 
const email =
document.getElementById("regEmail").value;
 
const password =
document.getElementById("regPassword").value;
 
await fetch(API+"/register",{
 
method:"POST",
 
headers:{
"Content-Type":"application/json"
},
 
body:JSON.stringify({
name,
email,
password
})
 
});
 
alert("Registered");
 
window.location="login.html";
 
}
 
async function login(){
 
const email =
document.getElementById("email").value;
 
const password =
document.getElementById("password").value;
 
const response =
await fetch(API+"/login",{
 
method:"POST",
 
headers:{
"Content-Type":"application/json"
},
 
body:JSON.stringify({
email,
password
})
 
});
 
const data =
await response.json();
 
localStorage.setItem(
"userId",
data.id
);
 
window.location=
"dashboard.html";
 
}
 
async function addActivity(){
 
const user_id =
localStorage.getItem("userId");
 
const activity_name =
document.getElementById(
"activityName"
).value;
 
const category =
document.getElementById(
"category"
).value;
 
const hours_spent =
document.getElementById(
"hours"
).value;
 
await fetch(API+"/activity",{
 
method:"POST",
 
headers:{
"Content-Type":"application/json"
},
 
body:JSON.stringify({
 
user_id,
activity_name,
category,
hours_spent,
activity_date:
new Date().toISOString().split("T")[0]
 
})
 
});
 
alert("Activity Added");
 
}
 
async function addGoal(){
 
const user_id =
localStorage.getItem("userId");
 
const goal_name =
document.getElementById(
"goalName"
).value;
 
const target_hours =
document.getElementById(
"targetHours"
).value;
 
const status =
document.getElementById(
"goalStatus"
).value;
 
await fetch(API+"/goal",{
 
method:"POST",
 
headers:{
"Content-Type":"application/json"
},
 
body:JSON.stringify({
 
user_id,
goal_name,
target_hours,
status
 
})
 
});
 
alert("Goal Added");

 
}

async function loadDashboard(){



const userId =

localStorage.getItem("userId");



const response =

await fetch(

API+"/dashboard/"+userId

);



const data =

await response.json();



document.getElementById("score")

.innerText =

data.productivityScore;



document.getElementById("activityCount")

.innerText =

data.activityCount;



}



if(

window.location.href.includes(

"dashboard.html"

)

){

loadDashboard();

}

async function generateReport(){
 
const userId =
localStorage.getItem("userId");
 
const response =
await fetch(
API+"/report/"+userId
);
 
const data =
await response.json();
 
const ctx =
document
.getElementById("reportChart");
 
new Chart(ctx,{
 
type:"bar",
 
data:{
 
labels:[
"Productive",
"Neutral",
"Distracting"
],
 
datasets:[{
 
label:"Hours",
 
data:[
data.productive,
data.neutral,
data.distracting
]
 
}]
 
}
 
});
 
}
