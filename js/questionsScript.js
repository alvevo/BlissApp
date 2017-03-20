
// Capture the 'question_filter' or 'question_id' query parameter from the URL
if (getQueryParameter('question_filter') !== false) {
    
    var queryValue = getQueryParameter('question_filter');
    
    document.getElementById("listScreen-view").style.display = "block";
    //$('#employee-view').show();

} else if (getQueryParameter('question_id') !== false) {
    
    var queryValue = getQueryParameter('question_filter');
    
    document.getElementById("detailScreen-view").style.display = "block";
    
} else {
    /* If the question_filter parameter is missing the user should
    simply be placed at the listing */
    document.getElementById("listScreen-view").style.display = "block";
}