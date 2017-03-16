api = "AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
base_url = "https://ytqck.github.io/search";
query = "";
result = [''];
function search() {
    url = window.location.href;
    isLink = url.indexOf(base_url);
    if (isLink != -1) {
        if (url.indexOf('=') > -1) {
          query = url.slice(url.indexOf("=") + 1, url.indexOf("&"));
          searchQ = query.replace(/\+/g, ' ');
          document.title = searchQ + " - YtQck - Music Search Engine";
          $("#query").val(searchQ);
          if (query === '') {
              //do nothing
              alert("Music not found!");
          }
        } else {
            //do nothing
        }
    }
}
function download(i, id) {
    link = "https://www.youtubeinmp3.com/fetch/?format=JSON&filesize=1&bitrate=1&video=http://www.youtube.com/watch?v=" + id;
    $.getJSON(link, function(response) {
        $("[data-id='"+id+"']").attr("href", response.link);
    });
}
function song(i, id){
  url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + id + "&key=" + api;
  $.getJSON(url, function(json) {
      songTitle = json.items[0].snippet.title;
      link = "https://ytqck.github.io/play?id="+id;
      result[i] = '<div class="sc"><div class="sci"><div class="sciup"><div class="songT"><h3><a href="'+link+'">'+songTitle+'</a></h3></div><div class="songL"><span class="link">'+link+'</span></div></div><div class="scidwn"><span class=""><a data-id="'+id+'" type="button" class="actions play">Play</a><a data-id="'+id+'" type="button" class="actions download">Download</a></span></div></div></div>';
      $(".result").append(result[i]);
  });
  download(i, id);
}
$(document).ready(function(){
  search();
  searchAPI = 'https://www.googleapis.com/youtube/v3/search?part=id&q=' + query + '&type=video&maxResults=20&key=' + api;
  $.getJSON(searchAPI, function(json) {
      //id = json.items[0].id.videoId;
      $.each(json.items, function(index, value) {
        song(index, value.id.videoId);
      })
  });
  $("#query").autocomplete({
      source: function(request, response) {
          query = request.term;
          $.ajax({
              url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=" + query + "&key=" + api + "&format=5&alt=json&callback=?",
              dataType: 'jsonp',
              appendTo: '.msr',
              success: function(data, textStatus, request) {
                  response($.map(data[1], function(item) {
                      return {
                          label: item[0],
                          value: item[0]
                      }
                  }));
              }
          });
      }
  });
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
   .register('/sw.js')
   .then(function() {
      console.log('Hurray! Service Worker Registered');
    });
}
