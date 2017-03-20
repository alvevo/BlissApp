var URL, pair;
var query = window.location.search.substring(1);
var vars = query.split("&");

/*for (var i = 0; i < vars.length; i++) {
    pair = vars[i].split("=");
    if (pair[0] == 'url') {
        URL = pair[1] + "=" + pair[2];
        console.log(URL);
    }
}*/

//document.getElementById("messageID").value = URL;

document.getElementById("submit").onclick = function () {
 //document.getElementById("form").submit;
  
      var request = new XMLHttpRequest();

      var inputEmail = document.getElementById("messageID").email;
      console.log(inputEmail)
      
      console.log(inputEmail)
      console.log(URL)
      
      setTimeout(3000)

        request.open('POST', 'https://private-anon-622a97eceb-blissrecruitmentapi.apiary-mock.com/share?'+inputEmail+'&'+URL+'amp;');

        request.onreadystatechange = function () {
          if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
          }
        };

        request.send();
};

document.getElementById("backButtonForm").onclick = function () {
 location = "/questions.html";
};