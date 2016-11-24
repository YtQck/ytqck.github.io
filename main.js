var z = window.location.href;
var y = z.substring(35, z.length);
document.getElementById('YTPlayer').innerHTML = ('<iframe id="ytplayer" type="text/html" width="560" height="315" src="https://www.youtube.com/embed/'+y+'?autoplay=1&color=white&showinfo=0&rel=0" allowfullscreen frameborder="0"></iframe>');
details(y);
stats(y);
function details(videoId){
    var hell = new XMLHttpRequest;
    var url2 = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+videoId+"&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
    hell.open("GET", url2, true);
    hell.onreadystatechange = function(){
      if(hell.readyState === 4){
        var status = hell.status;
        if((status>=200&& status<300)||status ===304){
          var rss = JSON.parse(hell.responseText);
          var titleY = rss.items[0].snippet.title;
          document.title = (titleY);
          document.getElementById('titleY').innerHTML = titleY;
          var channel = rss.items[0].snippet.channelTitle;
          document.getElementById('desc').innerHTML = channel;
          var fbButton = document.getElementById('fb-share-button');
          var url = "https://ytqck.github.io/watch.html?"+videoId+'&quote='+titleY;

          fbButton.addEventListener('click', function() {
              window.open('https://www.facebook.com/sharer/sharer.php?u=' + url,
                  'facebook-share-dialog',
                  'width=800,height=600'
              );
              return false;
          });
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
        if((status>=200&& status<300)||status ===304){
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

  	var fbButton = document.getElementById('fb-share-button');
	var url = window.location.href;

	fbButton.addEventListener('click', function() {
	    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url,
	        'facebook-share-dialog',
	        'width=800,height=600'
	    );
	    return false;
	});