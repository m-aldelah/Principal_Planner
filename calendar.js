var nav = 0;

var days = document.getElementById('days');

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
	for(var i = 1; i <= extraDays + numDays + endExtraDays; i++) {
		var daySquare = document.createElement('div');
		daySquare.classList.add('day');
		
		if(i <= extraDays) {
			daySquare.classList.add('extra');
			daySquare.innerText = new Date(year, month, i-extraDays).getDate();
		}
		else if(i > extraDays && i <= extraDays + numDays) {
			daySquare.innerText = i - extraDays;
			
			daySquare.addEventListener('click', () => console.log('click'));
		}
		else {
			daySquare.classList.add('extra');
			daySquare.innerText = new Date(year, month + 1, i - extraDays - numDays).getDate();
		}
		
		days.appendChild(daySquare);
	}
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
}
render();
setButtons();