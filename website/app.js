
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const key = '&appid=cc3dadd6fc393c523e71462437ebb28b&units=imperial';

let d = new Date();
let newDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();

const tempDiv = document.getElementById('temp');
const dateDiv = document.getElementById('date');
const contentDiv = document.getElementById('content');

const zip = document.getElementById('zip');
const feel = document.getElementById('feel');

let next = false;
let prev = false;
let index = 0;


document.getElementById('prev').addEventListener('click', (e) => {
		prev = true;
		updateUI()
});

document.getElementById('next').addEventListener('click', (e) => {
		next = true;
		updateUI()
});

document.getElementById('generate').addEventListener('click', (e) => {
		getWeather(baseURL,zip.value,key).then((weather)=>{postWeather({ temp: weather.main.temp, date: newDate, feel: feel.value }).then(()=>{updateUI()})})
});


const getWeather = async (baseURL, zip, key) => {

const result = await fetch(baseURL + zip + key);
		try {
				return await result.json();
		}  catch(error) {
				console.log("error", error);
		}
}

const postHeaders = (weather) => { return {
		method: "POST",
		credentials: "same-origin",
		headers: {"Content-Type": "application/json;charset=UTF-8"},
		body: JSON.stringify(weather)
};}

const postWeather = async (weather = {}) => {
		const request = await fetch('/add', postHeaders(weather));
		try {
				console.log('postWeather');
				return await request.json();
		} catch (error) { console.log("error", error); }
};

const retrieveData = async () =>{
		const request = await fetch('/all');
		try {
				console.log('retrieveData');
				return await request.json();
		} catch (error) { console.log("error", error); }
}

const updateUI = async () => {
		try {
				const weather = await retrieveData();
				console.log(weather);
				let size = weather.length;
				if (prev && index > 0) { index = index - 1; }
				else if (prev) { index = size - 1; }
				else if (next && size > index + 1) { index = index + 1; }
				else if (next) { index = 0; }
				else { index = size - 1; }
				prev = false;
				next = false;
				tempDiv.innerHTML = weather[index].temp + ' Fahrenheit';
				dateDiv.innerHTML = weather[index].date;
				contentDiv.innerHTML = weather[index].feel;
		} catch (error) { console.log("error", error); }
};
