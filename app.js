/*global $*/

var SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<a class="js-result-name" href="" target="_blank"></a></h2>'+
    '<a class = "js-result-thumb" href = "" target="_blank"><img class=js-result-thumb src= ""></a>'+ 
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
      part: 'snippet',
      key: "AIzaSyCzXl1JxA1MSDhfE4ibgdqpjalTI7GYb1A",
    q: searchTerm + " in:name",
    per_page: 5
  };
  $.getJSON(SEARCH_URL, query, callback);
}
 

function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").text(result.snippet.title).attr("href", "https://www.youtube.com/watch?v="+result.id.videoId);
    template.find(".js-result-thumb").attr("src", result.snippet.thumbnails.default.url);
  template.find(".js-result-thumb").attr("href", "https://www.youtube.com/watch?v="+result.id.videoId);
  return template;
}

function displaySearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displaySearchData);
  });
}

$(watchSubmit);
