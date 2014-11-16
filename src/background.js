// The saved price the auction is at
var currentPrice;
// Are we at GOING ONCE
var goingOnce;
// Are we at GOING TWICE
var goingTwice;
// Are we at SOLD
var sold;
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
				// If this is the first check and values are null
				if (goingOnce === undefined) {
					// Update first stats
	            	goingOnce = output.goingOnce;
	            	goingTwice = output.goingTwice;
	            	sold = output.sold;
	            	currentPrice = output.price;
				}
				// If a "Going Once" is returned and Going Once is not already triggered
				if (output.goingOnce && !goingOnce) {
					// Create notification
					var opt = {
					   type: "basic",									
					   title: 'GOING ONCE!!!',
					   message: 'Going Once on ' + output.prize + ' by ' + output.highBidder + " for " + output.price + "!",
					   iconUrl: "db-128.png",
					   buttons: [{										
				            title: "Go To Desert Bus"
				       }]
					};
					// Remove old notifications
					try {
						notification.cancel();
					} catch(Exception) {
						
					}
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
					// Create notification
	            	var opt = {
					   type: "basic",									
					   title: 'GOING TWICE!!!',
					   message: 'Going Twice on ' + output.prize + ' by ' + output.highBidder + " for " + output.price + "!",
					   iconUrl: "db-128.png",
					   buttons: [{										
				            title: "Go To Desert Bus"
				       }]
					};
					// Remove old notifications
					try {
						notification.cancel();
					} catch(Exception) {
						
					}
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
					// Create notification
	            	var opt = {
					   type: "basic",									
					   title: 'SOLD!!!!!!!!!!',
					   message: 'SOLD on ' + output.prize + ' by ' + output.highBidder + " for " + output.price + "!",
					   iconUrl: "db-128.png",
					   buttons: [{										
				            title: "Go To Desert Bus"
				       }]
					};
					// Remove old notifications
					try {
						notification.cancel();
					} catch(Exception) {
						
					}
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
					// If the price has changed
					if(currentPrice !== output.price) {
						// Create new notification
		            	var opt = {
						   type: "basic",									
						   title: 'NEW HIGH BID!!!',
						   message: 'New high bid on ' + output.prize + ' by ' + output.highBidder + " for " + output.price + "!",
						   iconUrl: "db-128.png",
						   buttons: [{										
					            title: "Go To Desert Bus"
					       }]
						};
						// Remove old notifications
						try {
							notification.cancel();
						} catch(Exception) {
							
						}
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
	            // Update new states
	            goingOnce = output.goingOnce;
	            goingTwice = output.goingTwice;
	            sold = output.sold;
	            // Record current price
	            currentPrice = output.price;
   		}
	});
}
