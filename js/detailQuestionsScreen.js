document.getElementById("backButton").onclick = function () {
 location = "/questions.html";
};

document.getElementById("shareButton").onclick = function () {
 location = "/share.html?url=" + window.location.href;
};

/**
 * Retrieve Question function
 */
var image, thumb;

function retrieveQuestion(queryValue) {
 var request = new XMLHttpRequest();
 var questionBody, jsonResponse, text, choicesArray, choicesLen;

 request.open('GET', 'https://private-anon-622a97eceb-blissrecruitmentapi.apiary-mock.com/questions/' + queryValue);
 //request.open('GET', '/questions?&&%20');

 request.onreadystatechange = function () {

  if (this.readyState === 4 && this.status === 200) {
   console.log('Status:', this.status);
   console.log('Headers:', this.getAllResponseHeaders());
   console.log('Body:', this.responseText);

   questionBody = this.responseText;

   // Get records array parsed, and its length
   jsonResponse = JSON.parse(questionBody);

   // Create image, thumb elements
   image = document.createElement("img");
   thumb = document.createElement("img");

   image.setAttribute('src', jsonResponse.image_url);
   thumb.setAttribute('src', jsonResponse.thumb_url);
   image.setAttribute('id', "imageURL");
   thumb.setAttribute('id', "thumbURL");
   image.setAttribute('alt', 'Dummy image');
   thumb.setAttribute('alt', 'Dummy thumb');

   // Add onclick events to images
   thumb.setAttribute('onclick', 'showFullImage()');
   image.setAttribute('onclick', 'showMinimizedImage()');
   
   // Create question element
   var h = document.createElement("h3");
   var text = document.createTextNode(jsonResponse.id + " - " + jsonResponse.question);
   h.appendChild(text);

   // Add new HTML elements to "questionArea"
   var questionArea = document.getElementById("questionArea");
   var newText = document.createElement('div');
   newText.id = "home-images";
   newText.appendChild(h);
   //newText.appendChild(image);
   newText.appendChild(thumb);
   questionArea.appendChild(newText);

   // Add onmouseover and onmouseout events to image
   document.getElementById("thumbURL").onmouseover = function () {
    this.style.cursor = 'pointer';
    //this.style.border = "2px solid black";
   }
   document.getElementById("thumbURL").onmouseout = function () {
    this.style.cursor = 'default';
    //this.style.border = "2px solid white";
   }   
   
   
   text = "<ul id='ulChoices'>";

   choicesArray = jsonResponse.choices;
   choicesLen = choicesArray.length;

   // Go through the Choices array
   for (j = 0; j < choicesLen; j++) {
    text += "<li id="+ j + ">" + choicesArray[j].choice + ", Votes: " + choicesArray[j].votes + "        <button class='voteButton'>Vote</button></li>";
   }

   text += "</ul>";

   // Add new HTML element with the relevant parts (Questions and Choices)
   var questionArea = document.getElementById("questionArea");
   var newText = document.createElement('div');
   newText.className = "listChoices";
   newText.innerHTML = text;
   questionArea.appendChild(newText);
   
   for (i = 0; i < choicesLen; i++) {
    document.getElementsByClassName("voteButton")[i].addEventListener("click", function (e) {
     console.log(e.target.parentNode.id);
     var liIndex = e.target.parentNode.id
     
     jsonResponse.choices[liIndex].votes += 1;
    
     // Create request to update question
     var request = new XMLHttpRequest();

     request.open('PUT', 'https://private-anon-622a97eceb-blissrecruitmentapi.apiary-mock.com/questions/{question_id}');

     request.setRequestHeader('Content-Type', 'application/json');

     request.onreadystatechange = function () {
       if (this.readyState === 4) {
         console.log('Status:', this.status);
         console.log('Headers:', this.getAllResponseHeaders());
         console.log('Body:', this.responseText);
       }
     };
     
     //console.log(jsonResponse);
     request.send(JSON.stringify(jsonResponse));
     
    });
   }

   
  }
 };

 request.send();
}

/**
 * Show full image function
 */
function showFullImage() {
 var imagesSection = document.getElementById("thumbURL");
 imagesSection.parentNode.replaceChild(image, imagesSection);

 // Add onmouseover and onmouseout events to image
 document.getElementById("imageURL").onmouseover = function () {
  this.style.cursor = 'pointer';
 }
 document.getElementById("imageURL").onmouseout = function () {
  this.style.cursor = 'default';
 }
}

/**
 * Show minimized image function
 */
function showMinimizedImage() {
 var imagesSection = document.getElementById("imageURL");
 imagesSection.parentNode.replaceChild(thumb, imagesSection);
}

var questionID = getQueryParameter('question_id');
//console.log("question_id: " + questionID);

retrieveQuestion(questionID);