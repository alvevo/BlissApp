/**
 * Get Health Status function
 */
function getHealthStatus() {
	// Display loading gif
    document.getElementById('loading').style.display = 'block';
	
	var request = new XMLHttpRequest();
	request.open('GET', 'https://private-anon-3095c40d82-blissrecruitmentapi.apiary-mock.com/health');

	request.onreadystatechange = function () {
	  if (this.readyState === 4 && this.status === 200) {
          
		  // Content is going to be loaded...
		  // Hide the gif and display the content
		  document.getElementById('loading').style.display = 'none';
          var elem_main = document.getElementById('main');
		  elem_main.style.display = 'block';
          
          console.log('Retry button is invisible');
          
          // Log response info
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
          
          // Provide feedback to user
          var content = document.createTextNode("Server health is OK.")
          var elem = document.createElement("img");
          elem.src = '/../images/OK.png';
          elem.setAttribute("height", "5%");
          elem.setAttribute("width", "5%");
          elem.setAttribute("alt", "OK");

          elem_main.appendChild(content);
          elem_main.appendChild( document.createTextNode( '\u00A0\u00A0' ) );
          elem_main.appendChild(elem);
		  
		  // Proceed to the List Screen
		  var delayLoad;
		  delayLoad = setTimeout(showListScreen, 1500);		  
	  }
        else if (this.readyState === 4 && this.status !== 200) {
            // Hide the gif and display the content...
            document.getElementById('loading').style.display = 'none';
          	var elem_main = document.getElementById('main');
		  	elem_main.style.display = 'block';
			
			// Make Retry buton visible
            console.log('Retry button is visible');
            document.getElementById('retryButton').style.display = 'block';
            
            // Provide feedback to user
            var content = document.createTextNode("Server health is NOT OK.")
            var elem = document.createElement("img");
            elem.src = '/../images/NOK.png';
            elem.setAttribute("height", "5%");
            elem.setAttribute("width", "5%");
            elem.setAttribute("alt", "NOK");

            elem_main.appendChild(content);
            elem_main.appendChild( document.createTextNode( '\u00A0\u00A0' ) );
            elem_main.appendChild(elem);
        }
	};

	request.send();
}

function showListScreen() {
	location="/questions.html";
}

function retryConnect(){
    location="/retry.html";
}
