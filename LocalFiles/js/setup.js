function mSetup() {
	document.getNativeElementById("settingsScreen").pushTo("setupActivity");
}
function mSkip() {
	window.localStorage.setItem("skipSetup", true);
	// Load the initial screen element.
	var mainActivity = document.getNativeElementById("mainActivity");
	// Display the screen.
	mainActivity.show();
}
function mSave() {
	document.getNativeElementById("name").getProperty("text", function(prop, value){
		window.localStorage.setItem("name", value);
		if(value != ""){
		document.getNativeElementById("weight").getProperty("text", function(prop, value){
			if(!isNaN(value) && value != ""){
				window.localStorage.setItem("weight", value);	
				window.localStorage.setItem("skipSetup", true);
				// Load the initial screen element.
				var mainActivity = document.getNativeElementById("mainActivity");
				// Display the screen.
				mainActivity.show();
			} else {
				alert("Please enter weight as an integer!");
			}
		});
		} else {
			alert("Please enter a name!");
		}
	});
}