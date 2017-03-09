api = "AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
base_url = "http://127.0.0.1:4000/search";
query = "";
result = [''];
sR = "";
function search() {
    url = window.location.href;
    isLink = url.indexOf(base_url);
    if (isLink != -1) {
        if (url.indexOf('=') > -1) {
          query = url.slice(url.indexOf("=") + 1, url.indexOf("&"));
          searchQ = query.replace(/\+/g, ' ');
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
function song(i, id){
  url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + id + "&key=" + api;
  $.getJSON(url, function(json) {
      songTitle = json.items[0].snippet.title;
      link = "https://ytqck.github.io/?id="+id;
      result[i] = '<div class="sc"><div class="sci"><div class="sciup"><div class="songT"><h3><a href="'+link+'">'+songTitle+'</a></h3></div><div class="songL"><span class="link">'+link+'</span></div></div><div class="scidwn"><span class=""><button data-id="'+id+'" type="button" class="actions" id="play">Play</button><button data-id="'+id+'" type="button" class="actions" id="download">Download</button></span></div></div></div>';
      $(".result").append(result[i]);
  });
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
})
