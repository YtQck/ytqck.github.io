function YTX(id){
  document.getElementById('YTPlayer').innerHTML = ('<iframe id="ytplayer" type="text/html" src="https://www.youtube.com/embed/'+id+'?autoplay=1&color=white&showinfo=0&rel=0" allowfullscreen frameborder="0" class="embed-responsive-item"></iframe>');
}
function video(q){
  var api = "AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
  var url = "https://www.googleapis.com/youtube/v3/search?part=id&q="+q+"&type=video&key="+api;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  function getEl(id, value){
    document.getElementById(id).innerHTML = (value);
  }
  function YT(id){
    getEl('YTPlayer', '<iframe id="ytplayer" type="text/html" src="https://www.youtube.com/embed/'+id+'?autoplay=1&color=white&showinfo=0&rel=0" allowfullscreen frameborder="0" class="embed-responsive-item"></iframe>');
  }
  function vdImage(no){
    return '<a href="watch.html?'+no+'"><img class="responsive-img" width="120px" src="https://i.ytimg.com/vi/'+no+'/default.jpg" /></a>';
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var status = xhr.status;
      if ((status >= 200 && status < 300) || status === 304) {
        var rss = JSON.parse(xhr.responseText);
        var videoId = rss.items[0].id.videoId;
        YT(videoId);
        details(videoId);
        stats(videoId);
        var secVid = rss.items[1].id.videoId;
        var thVid = rss.items[2].id.videoId;
        var frthVid = rss.items[3].id.videoId;
        var fifthVid = rss.items[4].id.videoId;
        getEl('secVid', vdImage(secVid));
        getEl('thVid', vdImage(thVid));
        getEl('frthVid', vdImage(frthVid));
        getEl('fifthVid', vdImage(fifthVid));
        similar(secVid, 'secVid');
        similar(thVid, 'thVid');
        similar(frthVid, 'frthVid');
        similar(fifthVid, 'fifthVid');
        related(videoId);
      } else {
          alert("Request unsuccessful");
      }
    }
  };
  xhr.send(null);
   }

  function details(videoId){
    var hell = new XMLHttpRequest;
    var url2 = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+videoId+"&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
    hell.open("GET", url2, true);
    hell.onreadystatechange = function(){
      if( hell.readyState === 4 ){
        var status = hell.status;
        if((status >= 200 && status < 300) || status === 304){
          var rss = JSON.parse(hell.responseText);
          var title = rss.items[0].snippet.title;
          var description = rss.items[0].snippet.description;
          document.getElementById('title').innerHTML = title;
          var channel = rss.items[0].snippet.channelTitle;
          document.getElementById('channel').innerHTML = channel;
          var url = "https://ytqck.github.io/watch.html?"+videoId;
          document.getElementById('facebook').href = ('https://www.facebook.com/dialog/feed?%20app_id=758134654325447&%20link='+url+'&%20picture=https://i.ytimg.com/vi/'+videoId+'/default.jpg&%20name='+title+'&%20caption=YtQck&%20description='+description);
          document.getElementById('twitter').href = ('https://twitter.com/intent/tweet?text=🎞%20Watch%20'+title+'%20on%20&hashtags=YtQck&url='+url+'&via=midhruvjaink');
          document.getElementById('plus').href = ('https://plus.google.com/share?url='+url);
          document.getElementById('linkedin').href = ('https://www.linkedin.com/shareArticle?mini=true&url='+url+'&title='+title+'&summary='+description+'&source=https://ytqck.github.io');
          document.getElementById('whatsapp').href = ('whatsapp://send?text=🎞%20Watch%20'+title+'%20on%20YtQck.%20Click%20'+url);
          url += '&quote='+title;
        } else {
          alert("Request unsuccessful");
        }
      }
    };
    hell.send(null);
  }

  function stats(videoId){
    var hell = new XMLHttpRequest;
    var url2 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+videoId+"&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
    hell.open("GET", url2, true);
    hell.onreadystatechange = function(){
      if(hell.readyState === 4){
        var status = hell.status;
        if((status >= 200 && status < 300) || status === 304){
          var rss = JSON.parse(hell.responseText);
          var count = rss.items[0].statistics.viewCount;
          document.getElementById('viewCount').innerHTML = (count + ' views');
          count = rss.items[0].statistics.likeCount;
          document.getElementById('likeCount').innerHTML = ('<i class="material-icons">thumb_up</i> '+count);
        } else {
          alert("Request unsuccessful");
        }
      }
    };
    hell.send(null);
  }
  function similar(videoId, id){
    var hell = new XMLHttpRequest;
    var url2 = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+videoId+"&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
    hell.open("GET", url2, true);
    hell.onreadystatechange = function(){
      if( hell.readyState === 4 ){
        var status = hell.status;
        if((status >= 200 && status < 300) || status === 304){
          var rss = JSON.parse(hell.responseText);
          var title = rss.items[0].snippet.title;
          id = id + 'De';
          document.getElementById(id).innerHTML = ('<a href="watch.html?'+videoId+'" class="linkTitleSim">'+title+'</a>');
        } else {
          alert("Request unsuccessful");
        }
      }
    };
    hell.send(null);
  }

  function related(videoId){
    var xhr = new XMLHttpRequest;
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId="+videoId+"&type=video&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        var status = xhr.status;
        if((status>=200 && status <300)||status ===304){
          var rss = JSON.parse(xhr.responseText);
          var id, i=0, title, tag;
          for (i; i<5; i++) {
            id = rss.items[i].id.videoId;
            title = rss.items[i].snippet.title;
            tag = "related"+i;
            document.getElementById(tag).innerHTML = ('<div onclick="YTX('+id+')"><img class="responsive-img thumb" width="180px" src="https://i.ytimg.com/vi/'+id+'/default.jpg" /><div class="titleR">'+title+'</div></a></div>');
          }
          } else {
            alert("Request");
          }
        }
      };
      xhr.send(null);
    }
