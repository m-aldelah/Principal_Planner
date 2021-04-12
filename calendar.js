let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
var rescheduleEventModal=document.getElementById('rescheduleEventModal');
var newEventModal=document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
var backDrop =  document.getElementById('modalBackDrop');
var days = document.getElementById('days');
const eventTitleInput = document.getElementById('eventTitleInput');
var RModal=document.getElementById('RModal');
const RText = document.getElementById('RText')
var Rbutton=document.getElementById('Rbutton');
Rbutton.addEventListener('click', setReminder);

let button = document.querySelector('button');
button.addEventListener('click', showNotification);
var str = JSON.stringify(events);
var str1 = JSON.stringify(str);
var obj = JSON.parse(str1);
var count= 0;



function render() {
	var currDate = new Date();
	//sets the month to be displayed offset from the current month
	if(nav != 0) {
		currDate.setDate(1);
		currDate.setMonth(new Date().getMonth() + nav);
	}
	
	//gets the current day, month, and year for easy use
	var day = currDate.getDate();
	var month = currDate.getMonth();
	var year = currDate.getFullYear();
	
	//obtains the last day of the current month
	var numDays = new Date(year, month+1, 0).getDate();
	//obtains the first day of the month
	var firstDay = new Date(year, month, 1);
	
	var firstWeekday = firstDay.toLocaleDateString('en-us', {
		weekday: 'long',
	});
	var lastWeekday = new Date(year, month+1, 0).toLocaleDateString('en-us', {
		weekday: 'long',
	});
	var dateString = firstDay.toLocaleDateString('en-us')
	var extraDays;
	var endExtraDays;
	
	//finds the number of extra days to render before the first day of the month
	if(firstWeekday == 'Sunday')
		extraDays = 0;
	else if(firstWeekday == 'Monday')
		extraDays = 1;
	else if(firstWeekday == 'Tuesday')
		extraDays = 2;
	else if(firstWeekday == 'Wednesday')
		extraDays = 3;
	else if(firstWeekday == 'Thursday')
		extraDays = 4;
	else if(firstWeekday == 'Friday')
		extraDays = 5;
	else if(firstWeekday == 'Saturday')
		extraDays = 6;
	
	//finds the number of extra days to render after the last day of the month
	if(lastWeekday == 'Sunday')
		endExtraDays = 6;
	else if(lastWeekday == 'Monday')
		endExtraDays = 5;
	else if(lastWeekday == 'Tuesday')
		endExtraDays = 4;
	else if(lastWeekday == 'Wednesday')
		endExtraDays = 3;
	else if(lastWeekday == 'Thursday')
		endExtraDays = 2;
	else if(lastWeekday == 'Friday')
		endExtraDays = 1;
	else if(lastWeekday == 'Saturday')
		endExtraDays = 0;
	
	//sets the current month
	document.getElementById('month').innerHTML = currDate.toLocaleDateString('en-us', { month: 'long' });
	//sets the current year
	document.getElementById('subdate').innerHTML = currDate.toLocaleDateString('en-us', {year: 'numeric'});
	
	//Resets the calendar
	days.innerHTML = '';
	//Renders all the days on the calendar
	for(let i = 1; i <= extraDays + numDays + endExtraDays; i++) {
		var daySquare = document.createElement('div');
		daySquare.classList.add('day');
		
		
		if(i <= extraDays) {
			daySquare.classList.add('extra');
			daySquare.innerText = new Date(year, month, i-extraDays).getDate();
			
		}
		else if(i > extraDays && i <= extraDays + numDays) {
			daySquare.innerText = i - extraDays;
			
			const eventForDay = events.find(e => e.date == `${month+1}/${i-extraDays }/${year}`);
			
			if(i - extraDays == day && nav == 0){
				daySquare.id = 'currentDay';
				
			}
			
			
			if(eventForDay){ //if there is an event for the given day 
				const eventDiv = document.createElement('div'); //create a div
				eventDiv.classList.add('event'); //add a class
				
				eventDiv.innerText= eventForDay.title; //edit the text
				
				daySquare.appendChild(eventDiv); //put inside the dyasquare
				
			}
			
			daySquare.addEventListener('click', () => openModal(`${month+1}/${i-extraDays }/${year}`));
			
		}
		else {
			daySquare.classList.add('extra');
			daySquare.innerText = new Date(year, month + 1, i - extraDays - numDays).getDate();
		}
		
		days.appendChild(daySquare);
	}
}

function openModal(date)
{
	clicked = date;
	const eventForDay = events.find(e => e.date == clicked);
	
	if (eventForDay){
		document.getElementById('rescheduleEventText').innerText = eventForDay.title;
		rescheduleEventModal.style.display = 'block';
		deleteEventModal.style.display = 'block';
		
	}else{
		newEventModal.style.display = 'block';
		
	}
	backDrop.style.display = 'block';
}

function closeModal() {
	eventTitleInput.classList.remove('error'); //clearing error if it exists when closing
	//closing modals when pressing cancel
	newEventModal.style.display = 'none';
	rescheduleEventModal.style.display = 'none';
	deleteEventModal.style.display = 'none';
	RModal.style.display = 'none';
	backDrop.style.display='none';
	
	//clear the input thats in the next box
	eventTitleInput.value = '';
	RText.value = '';
	clicked = null; //resetting the date clicked
	render();
	
}



function rescheduleEvent(){
	var eventNameRe = document.getElementById("rescheduleEventText").innerHTML;
	//var indexDate;
	var newRescheduleDate = document.getElementById("newDate").value;
	var dateParse = newRescheduleDate.split("-");
	//var eventName;
	
	var dateCombo = dateParse[1].replace(/^0+/, '')+ "/" +dateParse[2].replace(/^0+/, '') + "/" +dateParse[0];

	events.push({ //creating event
			date: dateCombo,
			title: eventNameRe,
			
		});
	localStorage.setItem('events', JSON.stringify(events));
	deleteEvent();
	closeModal();
	
	
}

function todaysTask()
{

	
	var currDate = new Date();
	//sets the month to be displayed offset from the current month
	if(nav != 0) {
		currDate.setDate(1);
		currDate.setMonth(new Date().getMonth() + nav);
	}
	
	//gets the current day, month, and year for easy use
	var day = currDate.getDate();
	var month = currDate.getMonth()+1;
	var year = currDate.getFullYear();

	
	var todayDate = month + "/" + day + "/" + year;
	//document.write(todayDate);
	

	var index = events.findIndex(x => x.date=== todayDate)
	//document.write(index);
	
	//document.wirte(index);
	var eventToday = events[index];
	document.getElementById("printhere").innerHTML = eventToday.title;
	//document.write(events);
	
}




function Done(){
	
	var newRescheduleDate = document.getElementById("newDatee").value;
	var dateParse = newRescheduleDate.split("-");
	var dateCombo = dateParse[1].replace(/^0+/, '')+ "/" +dateParse[2].replace(/^0+/, '') + "/" +dateParse[0];

	if(RText.value ){
		RText.classList.remove('error');
		
	events.push({ //creating reminder
			date: dateCombo,
			title: RText.value,
		});
	
		localStorage.setItem('events', JSON.stringify(events));
		closeModal();
	}
	else{
		//send an error
		RText.classList.add('error'); //creating a class called error
	}
}


function saveEvent()
{
	//newEvent = eventTitleInput.value();
	if(eventTitleInput.value ){ //if there is a value available 
		//save the event
		eventTitleInput.classList.remove('error'); //want to remove the error if the event exists
		events.push({ //creating event
			date: clicked,
			title: eventTitleInput.value,
		});
		
		//need to store it in local storage
		localStorage.setItem('events', JSON.stringify(events));
		closeModal();
	}
	else{
		//send an error
		eventTitleInput.classList.add('error'); //creating a class called error
	}
}


function showNotification(){
		var p=0;
		var all2='';
	
	
	for(p in obj){
		if(obj[p]==='{'||obj[p]==='['||obj[p]===']'||obj[p]==='}'||obj[p]==='\"')
			continue;
		all2 = all2 + obj[p];
		if (obj[p]===':'){
			all2=all2+'  ';
		}
		if(obj[p]===','){
			count ++;
			all2=all2+'  ';
			
			if (count===2){
			all2=all2+'\n';
			count=0;
			}
		}
				
	}
		window.alert(all2);
	

}
function setReminder(){
	
	const eventForDay = events.find(e => e.date );
	
	if (eventForDay){
		document.getElementById('RText');
		RModal.style.display = 'block';
	}
	else{
		RModal.style.display = 'block';
	}
	
	backDrop.style.display = 'block';
	
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function setButtons() {
	document.getElementById('nextbutton').addEventListener('click', () => {
		nav++;
		render();
	});
	
	document.getElementById('prevbutton').addEventListener('click', () => {
		nav--;
		render();
	});
	document.getElementById('saveButton').addEventListener('click', saveEvent);
	document.getElementById('cancelButton').addEventListener('click', closeModal);
	document.getElementById('deleteButton').addEventListener('click', deleteEvent);
	document.getElementById('rescheduleButton').addEventListener('click', rescheduleEvent);
	
	document.getElementById('closeButton').addEventListener('click', closeModal);
	document.getElementById('showevents').addEventListener('click', todaysTask);
	document.getElementById('Done').addEventListener('click', Done);

}


setButtons();
render();
