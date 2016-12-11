function frame(y){
  return '<iframe id="ytplayer" type="text/html" width="560" height="315" src="https://www.youtube.com/embed/'+y+'?color=white&showinfo=0&rel=0" allowfullscreen frameborder="0" class="embed-responsive-item"></iframe>'
}
function getEl(id, value){
  document.getElementById(id).innerHTML = value;
}
function YT(id){
  getEl('YTPlayer', frame(id));
}
function vdImage(no){
  return '<a href="watch.html?'+no+'"><img class="responsive-img" width="120px" src="https://i.ytimg.com/vi/'+no+'/default.jpg" /></a>';
}

function video(q){
  var api = "AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
  var url = "https://www.googleapis.com/youtube/v3/search?part=id&q="+q+"&type=video&key="+api;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        var status = xhr.status;
        if ((status >= 200 && status < 300) || status === 304) {
          var rss = JSON.parse(xhr.responseText);
          var videoId = rss.items[0].id.videoId;
          YT(videoId);
          details(videoId);
          stats(videoId);
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
        getEl('title', title);
        var url = "https://ytqck.github.io/watch.html?"+videoId;
        //document.getElementById('title').innerHTML += ('<i class="material-icons">share</i>');
        /*var share = document.getElementById('share');
        share.style.visibility = 'visible';
        document.getElementById('facebook').href = ('https://www.facebook.com/dialog/feed?%20app_id=758134654325447&%20link='+url+'&%20picture=https://i.ytimg.com/vi/'+videoId+'/default.jpg&%20name='+title+'&%20caption=YtQck&%20description='+description);
        document.getElementById('twitter').href = ('https://twitter.com/intent/tweet?text=🎞%20Watch%20'+title+'%20on%20&hashtags=YtQck&url='+url+'&via=midhruvjaink');
        document.getElementById('plus').href = ('https://plus.google.com/share?url='+url);
        document.getElementById('linkedin').href = ('https://www.linkedin.com/shareArticle?mini=true&url='+url+'&title='+title+'&summary='+description+'&source=https://ytqck.github.io');
        document.getElementById('whatsapp').href = ('whatsapp://send?text=🎞%20Watch%20'+title+'%20on%20YtQck.%20Click%20'+url);
        url += '&quote='+title;*/
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
        count = count + ' views';
        getEl('viewCount', count);
        //count = rss.items[0].statistics.likeCount;
        //document.getElementById('likeCount').innerHTML = ('<i class="material-icons">thumb_up</i> '+count);
      } else {
        alert("Request unsuccessful");
      }
    }
  };
  hell.send(null);
}
