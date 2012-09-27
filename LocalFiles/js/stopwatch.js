// Function to start the counter.
function mStart() {
	
	// Check if counter is running.
	if(lapCounter == null){
		
		setFontColor("timerText", "0x45B327"); // Set the font color of the timerText to green.
		setFontColor("timerText2", "0x45B327"); // Set the font color of the timerText to green.
		
		// Start a repeating function with an interval of 1000 ms.
		lapCounter = setInterval(function(){
			setText("timerText", secondsToTime(timeTotal)); // Update the digit display with the time(seconds) incremented by 1.
			setText("timerText2", secondsToTime(timeTotal)); // Update the digit display with the time(seconds) incremented by 1.
			timeTotal++;
		},100);

		webView.setProperty("url", "javascript:startWatching();");
		
		vibrate(100); // Vibrate the device for 100ms.
	}
}

// Function to pause the counter.
function mPause() {
	
	// Check if counter is running.
	if(lapCounter != null){	
		setFontColor("timerText", "0x33B5E5"); // Set the font color of the timerText to red.
		setFontColor("timerText2", "0x33B5E5"); // Set the font color of the timerText to red.
		
		clearInterval(lapCounter); // Clear the counter's current iterations but not the counted time.
		lapCounter = null; // Clear the counter variable.

		webView.setProperty("url", "javascript:startWatching();");
		
		vibrate(100); // Vibrate the device for 100ms.
	}
}

// Function to add another lap.
function mRound() {
	
	// Check if the counter is running.
	if (lapCounter != null) {
		
		lapCount++; // Increment the lapCount by 1.
		
		// Create a new lap list item and add it to the list.
		mosync.nativeui.create("ListViewItem", "lap"+lapCount, {
			"fontColor": "0x666666",
			"fontSize" : fontSize*1.5,
			"width": "-1",
			"text": getOrdinal(lapCount)+" - "+secondsToTime(timeTotal)+" - "+secondsToTime(timeTotal-lapLatest) // Formated as lap count, time passed and time since last lap. 
		}).addTo("lapList");
		
		lapLatest = timeTotal; // Save the current time to calculated time passed between each lap.
		
		vibrate(100); // Vibrate the device for 100ms.
	}
}

// Function to reset the counter.
function mReset() {
	var restartCounter = lapCounter; // Temporarily store current current counter settings.
	mPause();

	// Iterate through the list deleting the first child until there are no more.
	for (var i=1; i <= lapCount; i++) {
		 lapList.removeChild("lap"+i);
	}
	
	// Reset variables to the origional values.
	lapLatest = 0;
	lapCount = 0;
	timeTotal = 1;
	
	// Reset properties to the origional values.
	setFontColor("timerText", "0x33B5E5");
	setFontColor("timerText2", "0x33B5E5");
	setText("timerText", secondsToTime(0));
	setText("timerText2", secondsToTime(0));
	
	// Check if the temporarily stored counter was still active when reset was pressed. If the counter was not null then restart.
	if (restartCounter != null)
		mStart();
		
	vibrate(100); // Vibrate the device for 100ms.
}

// Function to convert the seconds into a more readable string eg. 817 converts to 00:13:37.
function secondsToTime(tenth) {

	mosync.rlog('hey1');
	
	// Divide the seconds by 60 * 60 = 3600 and then round down. eg. 3699 seconds = 1 hour.
	var minutes = Math.floor(tenth / (10 * 60));
	// Check if the if the value is below 10, if true add a leading 0.
	minutes = ( minutes < 10 ? "0" : "" ) + minutes; 
	
	// Similar to minutes but instead of rounding down we save the remainder.
	var divisor_for_seconds = tenth % (10 * 60);
	// Divide by 60 and then round down to the nearest whole number.
	var seconds = Math.floor(divisor_for_seconds / 10);
	// Check if the if the value is below 10, if true add a leading 0.
	seconds = ( seconds < 10 ? "0" : "" ) + seconds;

	// Same concept as above but save the remainder of the seconds instead.
	var divisor_for_tenths = divisor_for_seconds % 10;
	// Round down to the nearest whole number.
	var tenths = Math.ceil(divisor_for_tenths);
	
	// Return the formated time in hh:mm:ss.
	return minutes+":"+seconds+":"+tenths;
}

// Function to add the ordinal to the lap count number.
function getOrdinal(number) {
	// Setup variable array with the 4 diffrent ordinals.
	var ordinal = ["th","st","nd","rd"];
	// Get the last 2 integers of the lap count.
	var remainder = number % 100;
	// Check the array if one of the two condition exists otherwise get the ordinal att position 0.
	return number+(ordinal[(remainder-20)%10]||ordinal[remainder]||ordinal[0]);
}