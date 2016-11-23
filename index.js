var link = window.location.href;
function video(q){  
  var api = "AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
  var url = "https://www.googleapis.com/youtube/v3/search?part=id&q="+q+"&type=video&key="+api;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);  
  function getEl(id, value){
    document.getElementById(id).innerHTML = (value);
  }
  function YT(id){
    getEl('YTPlayer', '<iframe id="ytplayer" type="text/html" width="100%" height="480px" src="https://www.youtube.com/embed/'+id+'?autoplay=1&color=white&showinfo=0&rel=0" allowfullscreen frameborder="0"></iframe>');
  }
  function vdImage(no){
    return '<a href="watch.html?'+no+'"><img class="responsive-img" src="https://i.ytimg.com/vi/'+no+'/mqdefault.jpg" /></a>';
  }
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var status = xhr.status;
      if ((status >= 200 && status < 300) || status === 304) {
        var rss = JSON.parse(xhr.responseText);
        var videoId = rss.items[0].id.videoId;
        YT(videoId);
        link += '~';
        link += videoId;     
        var secVid = rss.items[1].id.videoId;
        var thVid = rss.items[2].id.videoId;
        var frthVid = rss.items[3].id.videoId;
        getEl('simHead', 'Similar Video Results');
        getEl('secVid', vdImage(secVid));
        getEl('thVid', vdImage(thVid));
        getEl('frthVid', vdImage(frthVid));
      } else {
          alert("Request unsuccessful");
      }
    }
  };
  xhr.send(null);
   }