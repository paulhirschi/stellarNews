/**
 * CONTENTS OF THIS JAVASCRIPT FILE
 * 1. Set up the main document variables
 * 2. Set up the XMLHttpRequest Object & Callback
 * --- Create new XMLHttpRequest Object
 * --- Parse & assign successful response to variable
 * --- Sort response descending by date
 * --- Dynamically create HTML content
 * --- Inject response into HTML content & document
 * 3. Call the xhr function
 * 4. Set up the function to load additional content on window scroll
 * 5. Use the window.onscroll method to call the load more content function
 */

// 1. SET UP MAIN DOCUMENT VARIABLES
//================================================

// Variables for loading and end messages---------
var loading = document.getElementById('loading');
var end = document.getElementById('end');
// Variable for element content will load into----
var contain = document.getElementById('newsFeed');
// Variable to set the offset in the AJAX URL-----
var offset = 0;

// 2. XMLHTTPREQUEST OBJECT SETUP
//================================================
var ajaxThisShizzle = function() {
  // URL variable to be passed into AJAX request
  // limit is set to load only 10 objects---------
  var url = 'http://www.stellarbiotechnologies.com/media/press-releases/json?limit=10&offset=' + offset;
  // Declare main XMLHttpRequest Object
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (!xhr || xhr.readyState === 4 && xhr.status === 200) {
      // Parse the AJAX response into JSON and
      // load it into variable--------------------
      var response = JSON.parse(xhr.responseText);
      var newsFeed = response.news;

      // If the AJAX response is greater than zero
      // load contents into the document----------
      if (newsFeed.length > 0) {
        for (var i = 0; i < newsFeed.length; i++) {

          // Sort the array of objects by date----
          newsFeed.sort(function(a, b) {
            return parseFloat(b.published) - parseFloat(a.published)
          });

          // Dynamically create Anchor element to
          // wrap content in (even though it links to nowhere right now)
          var feedHTML = document.createElement('A');
          feedHTML.setAttribute('href', '#');
          // Assign AJAX response content to variables
          // and wrap in HTML tags----------------
          var newsTitle = '<div class="newsItem"><h2>' + newsFeed[i].title + '</h2>';
          var newsPublished = '<p>' + newsFeed[i].published + '</p></div>';
          feedHTML.innerHTML += newsTitle + newsPublished;
          // Inject content into the document-----
          contain.appendChild(feedHTML);
          // Show the loading more message--------
          loading.style.display = "block";
        }
      } else {
        // If no more content, display the no more
        // news to show message-------------------
        loading.style.display = "none";
        end.style.display = "block";
      }
      // When AJAX request is sent, increment the
      // URL offset by 10 so the next 10 items
      // are loaded when this function is run again.
      offset += 10;
    }
  };
  // Open the XMLHttpRequest and send that shizzle!
  xhr.open('GET', url);
  xhr.send();
};
// 3. CALL THE AJAX FUNCTION
//================================================
// This will load the first 10 items to the page--
ajaxThisShizzle();

// 4. SET UP THE LOAD MORE CONTENT FUNCTION
//================================================

function loadMoreShizzle() {
  // The following 3 variables contain the math
  // required to determine if the user has scrolled
  // past existing content to the bottom of the page
  var contentHeight = contain.offsetHeight; // Get page content height.
  var yOffset = window.pageYOffset; // Get vertical scroll position.
  var innerHeight = yOffset + window.innerHeight; // How much they've scrolled PLUS windows inner height to target bottom of page.
  if (innerHeight >= contentHeight) {
    // This will stop the window.onscroll funtion
    // from continually firing while the AJAX request
    // is being sent------------------------------
    window.onscroll = false;
    ajaxThisShizzle();
    // This sets a small delay to allow for content
    // loading before resetting the window.onscroll
    // function-----------------------------------
    setTimeout(function() {
      window.onscroll = loadMoreShizzle;
    }, 800);
  }
}

// 5. USE WINDOW.ONSCROLL TO EXECUTE THE FUNCTION
// WHENEVER THE USER SCROLLS
//================================================
window.onscroll = loadMoreShizzle;