var timerText; // Text displaying the time passed.
var timeTotal; // Total time passed.
var lapCounter; // Counter managing the iterations.
var lapCount; // Total amount of laps.
var lapList; // ListView containing the lap data.
var lapLatest; // Temporary variable used to determine time between laps.
var fontSize; // Variable storing the to be calculated font size unit.

// Set initial values and register listeners.
function initialize() {
	lapLatest = 0;
	lapCount = 0;
	timeTotal = 1; // Initial value of 1 because of the 1000ms delay until counter update.
	
	// Calculate a font unit size based on screen width eg. 480px * 0.0333 = 16px.
	fontSize = mosync.nativeui.screenWidth * 0.0333; 
	
	// Register a listener to the device's backbutton closing the application on click.
	document.addEventListener("backbutton", close, true); 
	
	mosync.nativeui.initUI(); // Initialize the user interface.
}

// When initUI has completed, UIReady will be called. Here we load the main screen and set additional widget properties.
mosync.nativeui.UIReady = function() {
	
	var mainScreen = document.getNativeElementById("mainScreen");
	
	// Load the initial screen element.
	//var mainScreen = document.getNativeElementById("mainScreen");

	// Display the screen.
	mainScreen.show();
	
	// Assign elements to the variables for future reference.
	lapList = document.getNativeElementById("lapList");
	timerText = document.getNativeElementById("timerText");
	
	// Custom function to ease setting of the font color property.
	setFontColor("timerText", "0x333333");
	
	// Custom function to ease setting the font size property.
	setFontSize("header", 3);
	setFontSize("timerText", 5);
	setFontSize("lapLabel", 2);
	setFontSize("timeLabel", 2);
	setFontSize("lapTimeLabel", 2);
	
	// Fixes iOS height issues for horizontal layout.
	document.getNativeElementById("labelLayout").setProperty("height", fontSize*5);
	
	// Request loading of the icons for the buttons.
	// loadIcons()
}

// Add padding to buttons to improve layout.
function buttonPadding() {
	var buttonLayout = document.getNativeElementById("buttonLayout");
	for (var i=0; i < buttonLayout.childNodes.length; i++) {
		if (i==0||i%2==0) {
		mosync.nativeui.create("Image", "", {
				"width": "-1",
			}).addTo("buttonLayout");
		}
	}
}

// Function to set the font size by passing the ID and multiplier of the font unit eg. 16px * 1.5 = 24px.
function setFontSize(id, multiplier) {
	document.getNativeElementById(id).setProperty("fontSize", fontSize*multiplier);
}

// Function to set the font color by passing the ID and color code eg. 0x00FF00.
function setFontColor(id, colorCode) {
	document.getNativeElementById(id).setProperty("fontColor", colorCode);
}

// Function to set the text by passing the ID and the text string eg. "Hello World!".
function setText(id, text) {
	document.getNativeElementById(id).setProperty("text", text);
}

// Function to close the application.
function close() {
	mosync.bridge.send(["close"]);
}

// Function to make the phone vibrate the specified amount of time(milliseconds).
function vibrate(value) {
	navigator.notification.vibrate(value);
}