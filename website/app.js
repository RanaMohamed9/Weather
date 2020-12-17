/* Global Variables */
const apiKey = 'e2cdfdfc897e6e6d5a2501a2a1ae4b61&units=imperial';
const apiURL = 'api.openweathermap.org/data/2.5/weather?'
const Datee = document.getElementById('date');
const Temp = document.getElementById('temp');
const Content = document.getElementById('content');
const PostCode = document.getElementById('zip');
const Feelings = document.getElementById('feelings');
const postURL = 'http://localhost:3000/adddata'
const getURL = 'http://localhost:3000/all'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
document.getElementById('generate').addEventListener('click', Action);
function Action(e)  {
  getTemperature(apiURL,PostCode.value,apiKey)
  .then( (data) => {
    postData(postURL,data = {temp: data.main.temp, date: newDate, content : feelings.value })
  }).then(function() {
    UpdateUI();
  })    
}

const getTemperature = async (apiURL , PostCode , api)=>{
    const response = await fetch(`http://${apiURL}zip=${PostCode}&appid=${api}`);
    try{
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log('This is an error message!' , error);
    }
}

const postData = async ( url , data = {})=>{
    console.log(data)
      const postresponse = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });
  
      try {
        const newData = await postresponse.json();
        return newData
      }catch(error) {
      console.log('This is an error message!', error);
      }
  }

const UpdateUI = async()=>{
    const request = await fetch(getURL);
    try {
        const alldata = await request.json();
        Datee.innerHTML = alldata.date;
        Temp.innerHTML = alldata.temp;
        Content.innerHTML = alldata.content;
    }
    catch(error){
        console.log('This is an error message!' , error);
    }}