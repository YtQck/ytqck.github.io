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
    getEl('YTPlayer', '<iframe id="ytplayer" type="text/html" width="560" height="315" src="https://www.youtube.com/embed/'+id+'?autoplay=1&color=white&showinfo=0&rel=0" allowfullscreen frameborder="0"></iframe>');
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
        details(videoId);
        stats(videoId);
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

  function details(videoId){
    var hell = new XMLHttpRequest;
    var url2 = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+videoId+"&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
    hell.open("GET", url2, true);
    hell.onreadystatechange = function(){
      if( hell.readyState === 4 ){
        var status = hell.status;
        if((status >= 200 && status < 300) || status === 304){
          var rss = JSON.parse(hell.responseText);
          var titleY = rss.items[0].snippet.title;
          document.title = (titleY);
          document.getElementById('titleY').innerHTML = titleY;
          var channel = rss.items[0].snippet.channelTitle;
          document.getElementById('desc').innerHTML = channel;
          var fbButton = document.getElementById('fb-share-button');
          var url = "https://ytqck.github.io/watch.html?"+videoId;
          document.getElementById('linkShare').innerHTML = url;
          url += '&quote='+titleY;
          fbButton.addEventListener('click', function() {
              window.open('https://www.facebook.com/sharer/sharer.php?u=' + url,
                  'facebook-share-dialog',
                  'width=800,height=600'
              );
              return false;
          });
          document.getElementById('twitter').href=url;
          document.getElementById('ogTitle').setAttribute("content", titleY);
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
          var views = rss.items[0].statistics.viewCount;
          document.getElementById('viewsCount').innerHTML = (views + ' views')
        } else {
          alert("Request unsuccessful");
        }
      }
    };
    hell.send(null);
  }
