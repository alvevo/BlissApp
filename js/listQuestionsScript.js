

/**
 * List All Questions function
 */

var OFFSETRECORDSINDEX = 0; // 0 based starting index of the first retrieved record
var NUMRECORDSTOFETCH = 10; // The number of records to retrieve
var flagNoMoreRecords = 0;

function listQuestions(limit, offset, filter) {
	var request = new XMLHttpRequest();
	var recordsArray, jsonResponse, recordsLen, text, choicesArray, choicesLen;
	    
	request.open('GET', 'https://private-anon-3095c40d82-blissrecruitmentapi.apiary-mock.com/questions?'+limit+'&'+offset+'&'+filter);
    //request.open('GET', '/questions?&&%20');
	
	request.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			console.log('Status:', this.status);
			console.log('Headers:', this.getAllResponseHeaders());
			//console.log('Body:', this.responseText);
			
			recordsArray = this.responseText;

            // Get records array parsed, and its length
			jsonResponse = JSON.parse(recordsArray);
			recordsLen = jsonResponse.length;
			//console.log(recordsLen);
            
            if (recordsLen < NUMRECORDSTOFETCH) {
                // Means there are no more records to show (e.g., if we asked for 5 but only got 4)
                flagNoMoreRecords = 1;
            }
            
            // Go through the records array
			text = "<ul>";
			for (i = 0; i < recordsLen; i++) {
				text += "<li class='parent-list'>" + jsonResponse[i].id + " - "+ jsonResponse[i].question;
				
//				console.log(jsonResponse[i].question);
//				console.log(jsonResponse[i]["choices"]);

				choicesArray = jsonResponse[i].choices;
				choicesLen = choicesArray.length;
				text += "<ul>";
                // Go through the Choices array
				for(j = 0; j < choicesLen; j++) {
					text += "<li>" + choicesArray[j].choice + ", Votes: " + choicesArray[j].votes + "</li>";
				}
				text += "</ul>";

				text += "</li>";
			}
			text += "</ul>";    
            text += '<hr style="color:#000000" />'; // Add black line to separate each set of records
            
            // Add new HTML element with the relevant parts (Questions and Choices)
			//document.getElementById("questionsArea").innerHTML = text;
            var questionsArea = document.getElementById("questionsArea");
            var newText = document.createElement('div');
            newText.className = "listBlock";
            newText.innerHTML = text;
            questionsArea.appendChild(newText);
            
            
            // Locate elements and add the Click Event Listener
            var liElements = document.getElementsByClassName("parent-list");
            var j;
            for (j = 0; j < liElements.length; j++) {
                liElements[j].addEventListener("click", function(e) {
                    // e.target is our targetted element.
                    //console.log(e.target.nodeName)
                    if(e.target && e.target.nodeName == "LI" && e.target === this) {
                        //console.log(e.target.innerHTML)
                        var innerHTML = e.target.innerHTML;
                        var questionID = innerHTML.substring(0,innerHTML.indexOf(" "));
                        //console.log(questionID);
                        showDetailScreen(questionID);
                        
                    }
                });
            }   
            
		}
	};
	
	request.send();
}

function showDetailScreen(questionID) {
	location = "/questions.html?question_id=" + questionID;
}

/* Event listener of 'loadMoreRecords' button */
document.getElementById("loadMoreRecords").addEventListener("click", function() {
    if (flagNoMoreRecords === 0) { // There are still records to be browsed
        
        // filterKeyword can be null or populated
        var filterKeyword = document.getElementById('textSearchBox').value;
        console.log("Filter keyword: " + filterKeyword);
        
        console.log("Going to list questions with global offset = " + OFFSETRECORDSINDEX);
        listQuestions(NUMRECORDSTOFETCH, OFFSETRECORDSINDEX, filterKeyword);
        
        // Increase offset so that if we want to obtain the next records
        OFFSETRECORDSINDEX += NUMRECORDSTOFETCH;
    }
    else {
        alert("There are no more records to browse.")
    }
});

/* Event listener of 'buttonSearch' button */
document.getElementById("buttonSearch").addEventListener("click", function() {
    /*
    // If it is the 1st time the search is performed
    if (flagSearchInProgress === 0) {
        // Clear the area to hold the filtered records
        document.getElementById("questionsArea").innerHTML = "";
    }
    */
    
    // Clear the area to hold the filtered records
    document.getElementById("questionsArea").innerHTML = "";
    
    var filterKeyword = document.getElementById('textSearchBox').value;
    console.log("Filter keyword: " + filterKeyword);
    
    if (!filterKeyword) {
        // Focus the input search box
        document.getElementById('textSearchBox').focus();
        // Hide "Browse additional records" button
        document.getElementById('loadMoreRecords').style.visibility = 'hidden';
    }
    else {
        flagSearchInProgress = 1; // A search has been performed
        
        //Make "Browse additional records" button visible again
        document.getElementById('loadMoreRecords').style.visibility = 'visible';
        
        OFFSETRECORDSINDEX = 0;
        console.log("Going to list questions with global offset = " + OFFSETRECORDSINDEX);
        listQuestions(NUMRECORDSTOFETCH, OFFSETRECORDSINDEX, filterKeyword);
        OFFSETRECORDSINDEX = 10;
    }
    console.log("Finished running event listener");
});

/* Event listener of 'buttonClear' button */
document.getElementById("buttonClear").addEventListener("click", function() {
    // Clear the area that was holding the filtered records
    document.getElementById("questionsArea").innerHTML = "";
    
    // Reset search flag
    flagSearchInProgress = 0;
    
    // Clear input search box value
    document.getElementById('textSearchBox').value = "";
    
    // Reset offset index
    OFFSETRECORDSINDEX = 0;
    
    listQuestions(NUMRECORDSTOFETCH, OFFSETRECORDSINDEX, null);
    OFFSETRECORDSINDEX = 10;
    
    //Make "Browse additional records" button visible again
    document.getElementById('loadMoreRecords').style.visibility = 'visible';
});


/* If the question_filter parameter is present but has an empty value, the user is placed at the filter variant with no input inserted but with the input box focused. */
var queryValue = getQueryParameter('question_filter');
console.log("queryValue: " + queryValue);
if (queryValue || queryValue === false) {
    console.log("Going to list questions with global offset = " + OFFSETRECORDSINDEX);
    if (queryValue === false) {
        listQuestions(NUMRECORDSTOFETCH, OFFSETRECORDSINDEX, null);
        OFFSETRECORDSINDEX = 10;
    } else {
        document.getElementById('textSearchBox').value = queryValue;
        document.getElementById('buttonSearch').click();
    }
} else {
    console.log("Not going to list questions");

    document.getElementById('buttonSearch').click();
}
