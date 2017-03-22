api = "AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
query = "";
result = [''];

function timeEncode(time) {
    mm = time / 60;
    ss = time % 60;
    mm = Math.floor(mm);
    ss = Math.floor(ss);
    if (ss < 10) {ss = "0" + ss;}
    result = mm + ":" + ss;
    return result;
}

function download(i, id) {
    link = "https://www.youtubeinmp3.com/fetch/?format=JSON&filesize=1&bitrate=1&video=http://www.youtube.com/watch?v=" + id;
    $.getJSON(link, function(response) {
        $("a[data-id='"+id+"']").attr("href", response.link);
        $("span[data-time='"+id+"']").html(timeEncode(response.length));
        $("span[data-bit='"+id+"']").html(response.bitrate+" Kbps");
        $("span[data-size='"+id+"']").html((response.filesize/1048576).toFixed(2)+" MB");
    });
}
function song(i, id){
  url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + id + "&key=" + api;
  $.getJSON(url, function(json) {
      songTitle = json.items[0].snippet.title;
      link = "https://ytqck.github.io/play?id="+id;
      result[i] = '<div class="sc"><div class="sci"><div class="sciup"><div class="songT"><h3><a href="'+link+'">'+songTitle+'</a></h3></div><div class="songL"><span class="link">'+link+'</span></div></div><div class="scidwn"><div class="msde"><span class="length" data-time="'+id+'"></span> | <span class="bitrate" data-bit="'+id+'"></span> | <span class="filesize" data-size="'+id+'"></span></div><span class=""><a data-id="'+id+'" type="button" class="actions download">Download</a></span></div></div><div class="player"></div></div>';
      if(i==2){
        result[i] = '<div class="sc"><div class="sci"><div class="sciup"><div class="songT"><h3><a href="'+link+'">'+songTitle+'</a></h3></div><div class="songL"><span class="link">'+link+'</span></div></div><div class="scidwn"><div class="msde"><span class="length" data-time="'+id+'"></span> | <span class="bitrate" data-bit="'+id+'"></span> | <span class="filesize" data-size="'+id+'"></span></div><span class=""><a data-id="'+id+'" type="button" class="actions download">Download</a></span></div></div><div class="player"></div></div>        <iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=primemain&banner=1MDTME9E9G651CJTDA82&f=ifr&linkID=b2d00fa4f1d814399a295c14eb125550&t=midhruvjaink-20&tracking_id=midhruvjaink-20" width="300" height="250" scrolling="no" border="0" marginwidth="20" style="border:none;" frameborder="0"></iframe>';
      }
      $(".result").append(result[i]);
  });
  download(i, id);
}
$(document).ready(function(){
  url = window.location.href.split("?");
  param = new URLSearchParams(url[1]);
  query = param.getAll("q");
  document.title = query + " - YtQck - Music Search Engine";
  $("#query").val(query);
  query += " song";
  searchAPI = 'https://www.googleapis.com/youtube/v3/search?part=id&q=' + query + '&type=video&maxResults=10&key=' + api;
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
