// JavaScript File
/*
This script finds the repositories of the github username entered. 

1. Attach a "click" event handler for the button.
2. Grab the username from the text input
3. With the username, create the github API url and store it in a variable named APIUrl
	- The completed url will look like this: https://api.github.com/users/myusername/repos
4. Use the AJAX function to call the API. 
	- Be sure to use the loader gif provided while loading the results from the API call. You can find the loader in the index.html 
	- Make sure your code handles the error when no data is returned by the API
5. Loop through the data and append the data to the div with the id of results.
6. Use the empty function to clear previous data from the results div. This should clear the results each time
the button's event is fired.
*/

/* global $ */

$(document).ready(function(){
    var usr;
    var APIUrl; 
	
	$("#search").on('click', function() {
		clear();
		usr = $("#username").val();
	    APIUrl = "https://api.github.com/users/"+ usr + "/repos";
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', APIUrl);
		ourRequest.onload = function() {
			if (ourRequest.status >= 200 && ourRequest.status < 400) {
				var ourData = JSON.parse(ourRequest.responseText);
			renderHTML(ourData, usr);
			}
			else {
				alert("User name does not exist!");
			}
			
		};
		ourRequest.onerror = function() {
			alert("connection error");
		}
		ourRequest.send();
	    $("#username").val("");
	    console.log(APIUrl);
	});
	
	function renderHTML(data, user) {
		var htmlString = "<h3>" + user + "'s repositories</h3>";
		for (var i = 0; i < data.length; i++) {
			htmlString += "<p>" + data[i].name + "</p>";
		}
		$("#results").append(htmlString);
	};
	
	function clear() {
		$("#results").empty();
	}
	
	$('#username').keypress(function (e) {
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
		    $('#search').click();
		    return false;  
		  }
	});
});