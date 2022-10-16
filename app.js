let au = localStorage.getItem("audio");
var audio = new Audio(au);
const msgs = document.getElementsByClassName("messages");
const battery = document.querySelector("#battery");
let sir = localStorage.getItem("Name")
let city = localStorage.getItem("City")
let use = 0;
let townd =""
let br = 0;
let tomem = 0;
let lamp = "";
let api = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&APPID=143454aa39bbe3442a890cdbf3f9db36';

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  function formatPMPM(date) {
    var hours = date.charAt(0)+date.charAt(1);
    var minutes = date.charAt(3)+date.charAt(4);
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
setInterval(() => {
  
document.getElementById("time").innerHTML = formatAMPM(new Date);
if(navigator.onLine){
    document.getElementById("internet").innerHTML = "online"
    connectivity = "online"
  } else {
   document.getElementById("internet").innerHTML = "offline"
    connectivity = "offline"
  }

},1000 );


setInterval(() =>{

        api = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&APPID=143454aa39bbe3442a890cdbf3f9db36';
    
    fetch(api)
.then(Response => Response.json())
.then(data => {
    let name = data['name'];
    let temp = data['main']['temp'];
    let desc = data['weather'][0]['description'];
    let icon = data['weather'][0]['icon'];
    let wse = data['wind']['speed'];
    document.getElementById("wins").innerHTML = wse;
    document.getElementById("name").innerHTML = '<b>'+name+'</b>';
    document.getElementById("temp").innerHTML = Math.floor((temp - 32) * 5/9) +"°C";
    document.getElementById("weather").innerHTML = desc;
    document.getElementById("icon").src = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
    })  
},1000)


// new speech recognition object
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
            
// This runs when the speech recognition service starts
recognition.onstart = function() {
    recognition.continious=true;

};

recognition.onspeechend = function() {
    // when user is done speaking
    recognition.stop();
    let audio = new Audio(recognition);
    audio.play()
}
              
// This runs when the speech recognition service returns result
recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    transcript = transcript.toLowerCase();
if(transcript.includes("alarm")){
    popo()
    readOut("Opening Alarm Window Sir")
}

if(transcript.includes("timer")){
    popo2()
    readOut("Opening Timer Window Sir")
}
if (transcript.includes("hi") ||transcript.includes("hello")|| transcript.includes("Hi") || transcript.includes("hello")) {
    readOut("Hello "+sir);
}
if(transcript.includes("my name")){
    readOut(sir)
}
if(transcript.includes("ringtone")){
    let nam = localStorage.getItem("audio");
    let bn = "";
    if(nam == "middle.mp3"){
        bn = "Middle Of the Nights"
    }
    if(nam == "dance.mp3"){
        bn = "Dance Monkey"
    }
    if(nam == "unkn.mp3"){
        bn = "Tone"
    }

    if(nam == "heat.mp3"){
        bn = "Heat Waves"
    }
    readOut("The name of your ringtone used in alarm and timer is "+bn);
   setTimeout(()=>{
    audio.play()
   },4000)
}
if (transcript.includes("open youtube")) {
    readOut("Opening youtube sir");
    window.open("https://www.youtube.com/");
}
if (transcript.includes("open google")) {
    readOut("Opening google sir");
    window.open("https://www.google.com/");
}
if (transcript.includes("open firebase")) {
    readOut("Opening firebase sir");
    window.open("https://console.firebase.google.com/?pli=1");
}
if (transcript.includes("open github")) {
    readOut("Opening github sir");
    window.open("https://github.com/");
}
if (transcript.includes("open github profile")) {
    readOut("Opening github prfolie sir");
    window.open("");
}
if (transcript.includes("create a repository")) {
    readOut("Creating repository in github sir");
    window.open("https://github.com/new");
}
if(transcript.includes("search for")){

    let input = transcript.split("");
    input.splice(0,11);
    input.pop();
    let  sinput = input.join("").split(" ").join(" ");
    readOut("here's the result for " + sinput + " "+sir);
    input = input.join("").split(" ").join("+");
    console.log(input);
    window.open("https://www.google.com/search?q="+input)
}
if(transcript.includes("play")){
    let input = transcript.split("");
    input.splice(0,4);
    input.pop();    
   let  sinput = input.join("").split(" ").join(" ");
   readOut("here's the result for " + sinput + " "+sir);
   input = input.join("").split(" ").join("+");

    console.log(input);
    window.open("https://youtube.com/results?search_query="+input)
}
if(transcript.includes("internet")){
    readOut("Your Internet status is online "+sir)
}
if(transcript.includes("change my info")){
 location.replace("infoc.html");
}
if(transcript.includes("show my info")){
    location.replace("infoc1.html");
   }
   if(transcript.includes("reset")){
readOut("reset in progress");
localStorage.clear()
location.replace("index.html")

   }
if(transcript.includes("time")){

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
readOut(formatAMPM(new Date));  
}
if(transcript.includes("battery")){

        navigator.getBattery().then(function(battery) {
    
            var level = battery.level;
    var kl = level * 100;
      
          readOut(kl + "%"+ " "+sir )
        
        });
    
}
if(transcript.includes("your name")){
readOut("My name is "+localStorage.getItem("PA")+sir);
}
if(transcript.includes("my name")){
readOut("Your name is "+sir)
}

if(transcript.includes("date")){
    let monthl = ["January", "February","March","April","May","June","July","August","September","October","November","December"];
    let day = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    b = new Date();
    let month= monthl[b.getMonth()]
    let dayl = day[b.getDay()];
    let date = b.getDate();
    let year = b.getFullYear();
readOut("The date is "+date+" "+month+" "+year+" "+sir); 
console.log("The date is "+date+" "+month+" "+year+" "+sir)
}
if(transcript.includes("commands")){
    readOut("Command's window is opening");
    window.open("commands.html","","width=20px,heigt=20px")
}
if(transcript.includes("how are you")){
    readOut("I am fine "+sir+" what about you")
}
if(transcript.includes("i am fine")){
    readOut("Excellent! " +sir)
}

if(transcript.includes("bye")){
readOut("bye "+sir);
}
if(transcript.includes("percentage")){
    popp()
}
if(transcript.includes("my age")){
    readOut("You are "+localStorage.getItem("Age")+" year old")
}
if(transcript.includes("i live")){
readOut("You live in "+city)
}
if(transcript.includes("when is my birthday")){
    readOut("Your Birthday is on "+localStorage.getItem("BirthDate").charAt(5)+localStorage.getItem("BirthDate").charAt(6)+localStorage.getItem("BirthDate").charAt(7)+localStorage.getItem("BirthDate").charAt(8)+localStorage.getItem("BirthDate").charAt(9))
}
if(transcript.includes("mirror")){
    window.open("mirror.html","","width=400px,height=300px")
}
if(transcript.includes("song")){
    let input = transcript.split("");
    input.splice(0,5);
    input.pop();    
   let  sinput = input.join("").split(" ").join(" ");
   readOut("here's the result for the song " + sinput + " "+sir);
   input = input.join("").split(" ").join("%20");

   window.open("https://open.spotify.com/search/"+input)
   console.log("https://open.spotify.com/search/"+input)
   
}
console.log("User Command2s35hdg1k2gx = "+transcript);

};
  function readOut(message){
     const speech = new SpeechSynthesisUtterance();
     const allVoices = speechSynthesis.getVoices();
     speech.text = message;
     speech.voice = allVoices[0];
     speech.volume = 1;
     window.speechSynthesis.speak(speech);
     console.log("Machine code2s35hdg1k2gx message : : "+message)
 }     

function small(){
    window.open ("small.html",
    "mywindow","menubar=1,resizable=1,width=250,height=250");
}



setInterval(() => {
    navigator.getBattery().then(function(battery) {

        var level = battery.level;
var rl = level * 100;
        document.getElementById("battery-level").innerHTML = Math.floor(rl) + "%";
        if(battery.charging === true) {
            
            document.getElementById("battery-level").innerHTML = Math.floor(rl)+"% Charging"
             chargeStatus = "plugged in"
           }
    });
 
 }, 1000);

window.onload = function(){
    let monthl = ["January", "February","March","April","May","June","July","August","September","October","November","December"];
    let day = [" " ,"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    b = new Date();
    let month= monthl[b.getMonth()]
    let dayl = day[b.getDay()];
    let date = b.getDate();
    let year = b.getFullYear();
    document.getElementById("month").innerHTML = month;
    document.getElementById("day").innerHTML = dayl;
    document.getElementById("date").innerHTML = date;
    document.getElementById("year").innerHTML = year;
    document.getElementById("user_n").innerHTML = sir;
    document.getElementById("profile-img").src= localStorage.getItem("Image")


}
function popc45(){
    document.getElementById("popup4").style.display = "none"
}
function popp(){
    document.getElementById('popup4').style.display = "inline-block"
}
function popc(){
    document.getElementById("popup").style.display = "none"
}
function popl(){
    document.getElementById("popup3").style.display = "none"
}
function popi(){
    document.getElementById('popup3').style.display = "inline-block"
}


function popo(){
    document.getElementById('popup').style.display = "inline-block"
}
function popc2(){
    document.getElementById("popup2").style.display = "none"
}
function popo2(){
    document.getElementById('popup2').style.display = "inline-block"
}
function setalarm(alr){
    let alarm = alr;
let text = document.getElementById("AlaText").value

setInterval(()=>{
if(alarm == 0){
    
}else{
    let a = new  Date();
let hour = a.getHours();
let min = a.getMinutes()
let time = hour+":"+min;
time = time.replace(0,"");
alarm = alarm.replace(0,"");
let yo = "";

if(time == alarm){
   audio.play()
   
   alarm = 0;
   if(text == ""){
    yo = "No Alarm text"
   }else{
    popi()
   document.getElementById("textalarm").innerHTML= text;
   yo = text+" as alarm text";
   }

 
}

popc() 
}
 
},1000)
readOut("Alarm Succesfully Saved with timing "+alr+" and with"+yo)
}
function settimer(tmr){
let timer = tmr*60000;
setTimeout(()=>{
audio.play()
popi()
   document.getElementById("textalarm").innerHTML= "Hey Time's Up";
},timer)
popc2()
}



function findp(){
let part = document.getElementById("partp").value;
let total = document.getElementById("totalp").value;
let percantage = Math.floor(part/total*100);
document.getElementById("textalarm").innerHTML = percantage+"% of 100%" 
popi()
popc45()
}