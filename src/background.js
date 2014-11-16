// The saved price the auction is at
var currentPrice = "$0.00";
// Are we at GOING ONCE
var goingOnce = false;
// Are we at GOING TWICE
var goingTwice = false;
// Are we at SOLD
var sold = false;
// How many seconds should be between checks to the API serber
var checkRate = 2000;
// The current notification
var notification;

// Check status as soon as the extension starts
checkStatus();

// Set interval to check status
setInterval(function(){
      checkStatus();
},checkRate);

// Function to check the auction status    
function checkStatus() {
	// Make jQuery Ajax call
    $.ajax({
		type: 'GET',
		url: "http://dbauction.herokuapp.com/status",
		dataType: 'json',
		// On successful data return
		success: function(output) {
				// If a "Going Once" is returned and Going Once is not already triggered
				if (output.goingOnce && !goingOnce) {
					// Set state variables
					goingOnce = true;
					goingTwice = false;
					sold = false;
					// Create notification
					var opt = {
					   type: "basic",									
					   title: 'GOING ONCE!!!',
					   message: 'Going Once on ' + output.prize + 'to ' + output.highBidder + " for " + output.price + "!",
					   iconUrl: "db-128.png",
					   buttons: [{										
				            title: "Go To Desert Bus"
				       }]
					};
					// Remove old notifications
					notification.cancel();
					// Create new notification
					notification = chrome.notifications.create("", opt, function(id) {
							// Add a listener for the buttons
					         chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
					           // If Chrome detects a button clicked on this specific instance
					          if (notifId === id) {
					            	// If the first button is clicked, open new tab to Desert Bus
					              if (btnIdx === 0) {
					                  chrome.tabs.create({url: 'http://twitch.tv/desertbus'});
					              }
					          }
					      });
					});
				// If a "Going Twice" is returned and Going Twice is not already triggered
	            } else if (output.goingTwice && !goingTwice) {
	            	// Set state variables
	            	goingOnce = false;
					goingTwice = true;
					sold = false;
					// Create notification
	            	var opt = {
					   type: "basic",									
					   title: 'GOING TWICE!!!',
					   message: 'Going Twice on ' + output.prize + 'to ' + output.highBidder + " for " + output.price + "!",
					   iconUrl: "db-128.png",
					   buttons: [{										
				            title: "Go To Desert Bus"
				       }]
					};
					// Remove old notifications
					notification.cancel();
					// Create new notification
					notification = chrome.notifications.create("", opt, function(id) {
							// Add a listener for the buttons
					         chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
					           // If Chrome detects a button clicked on this specific instance
					          if (notifId === id) {
					            	// If the first button is clicked, open new tab to Desert Bus
					              if (btnIdx === 0) {
					                  chrome.tabs.create({url: 'http://twitch.tv/desertbus'});
					              }
					          }
					      });
					});
				// If a "SOLD" is returned and Sold is not already triggered
	            } else if (output.sold && !sold) {
	            	// Set state variables
	            	goingOnce = false;
					goingTwice = false;
					sold = true;
					// Create notification
	            	var opt = {
					   type: "basic",									
					   title: 'SOLD!!!!!!!!!!',
					   message: 'SOLD on ' + output.prize + 'to ' + output.highBidder + " for " + output.price + "!",
					   iconUrl: "db-128.png",
					   buttons: [{										
				            title: "Go To Desert Bus"
				       }]
					};
					// Remove old notifications
					notification.cancel();
					// Create new notification
					notification = chrome.notifications.create("", opt, function(id) {
							// Add a listener for the buttons
					         chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
					           // If Chrome detects a button clicked on this specific instance
					          if (notifId === id) {
					            	// If the first button is clicked, open new tab to Desert Bus
					              if (btnIdx === 0) {
					                  chrome.tabs.create({url: 'http://twitch.tv/desertbus'});
					              }
					          }
					      });
					});
					// Reset price for the next auction
					currentPrice = "$0.00";
				// Else if it's a new bid
	            } else {
	            	// Set state variables
	            	goingOnce = false;
					goingTwice = false;
					sold = false;
					// If the price has changed
					if(currentPrice !== output.price) {
						// Create new notification
		            	var opt = {
						   type: "basic",									
						   title: 'NEW HIGH BID!!!',
						   message: 'New high bid on ' + output.prize + ' to ' + output.highBidder + " for " + output.price + "!",
						   iconUrl: "db-128.png",
						   buttons: [{										
					            title: "Go To Desert Bus"
					       }]
						};
						// Remove old notifications
						notification.cancel();
						// Create new notification
						notification = chrome.notifications.create("", opt, function(id) {
								// Add a listener for the buttons
						         chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
						           // If Chrome detects a button clicked on this specific instance
						          if (notifId === id) {
						            	// If the first button is clicked, open new tab to Desert Bus
						              if (btnIdx === 0) {
						                  chrome.tabs.create({url: 'http://twitch.tv/desertbus'});
						              }
						          }
						      });
						});
					}
	            }
	            // Record current price
	            currentPrice = output.price;
   		}
	});
}
