var timerText; // Text displaying the time passed.
var timeTotal; // Total time passed.
var lapCounter; // Counter managing the iterations.
var lapCount; // Total amount of laps.
var lapList; // ListView containing the lap data.
var lapLatest; // Temporary variable used to determine time between laps.
var fontSize; // Variable storing the to be calculated font size unit.
var webView;

// Set initial values and register listeners.
function initialize() {
	lapLatest = 0;
	lapCount = 0;
	timeTotal = 1; // Initial value of 1 because of the 1000ms delay until counter update.
	
	// Register a listener to the device's backbutton closing the application on click.
	document.addEventListener("backbutton", close, true);
		
	mosync.nativeui.initUI(); // Initialize the user interface.
}

// When initUI has completed, UIReady will be called. Here we load the main screen and set additional widget properties.
mosync.nativeui.UIReady = function() {

	var width = document.body.clientWidth;
	var height = document.body.clientHeight;
	
	// Calculate a font unit size based on screen width eg. 480px * 0.0333 = 16px.
	fake = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) * 0.08;
	
	fontSize = device.platform == "Android" ? fake : fake/2;
	
	var skipSetup = window.localStorage.getItem("skipSetup");

	//window.localStorage.setItem("key", "value");
	if(!skipSetup){
		var setupActivity = document.getNativeElementById("setupActivity");
		var setupScreen = document.getNativeElementById("setupScreen");
		
		// Display the screen.
		setupActivity.show();
		
		setupScreen.pushTo("setupActivity")
		
		// Custom function to ease setting the font size property.
		setFontSize("welcome", 2);
		setFontSize("intro", 1.5);
		setFontSize("setup", 2);
		setFontSize("skip", 2);
		setFontSize("nameLabel", 2);
		setFontSize("name", 2);
		setFontSize("weightLabel", 2);
		setFontSize("weight", 2);
		setFontSize("save", 2);
	} else {
		// Load the initial screen element.
		var mainActivity = document.getNativeElementById("mainActivity");
		
		// Display the screen.
		mainActivity.show();
		
		var name = window.localStorage.getItem("name");
		if (name)
			alert("Welcome back "+name);
		
		// Assign elements to the variables for future reference.
		lapList = document.getNativeElementById("lapList");
		timerText = document.getNativeElementById("timerText");
		
		// Custom function to ease setting the font size property.
		setFontSize("timerText", 3);
		setFontSize("distanceText", 2);
		setFontSize("caloriesText", 2);
		setFontSize("timerText2", 3);
		setFontSize("distanceText2", 2);
		setFontSize("caloriesText2", 2);
		setFontSize("lapLabel", 1.6);
		setFontSize("timeLabel", 1.6);
		setFontSize("lapTimeLabel", 1.6);

		webView = document.getNativeElementById("mapView");
		// request the persistent file system
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(filesystem){
			webView.setProperty("baseUrl", "file://" + filesystem.root.fullPath + "/");
			webView.setProperty("url", "map.html");
		});

		// Fixes iOS height issues for horizontal layout.
		document.getNativeElementById("labelLayout").setProperty("height", fontSize*5);
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
 	document.getNativeElementById("setupActivity").pop();
	//mosync.bridge.send(["close"]);
}

// Function to make the phone vibrate the specified amount of time(milliseconds).
function vibrate(value) {
	navigator.notification.vibrate(value);
}