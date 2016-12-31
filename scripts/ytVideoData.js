// Initialize Firebase
var config = {
  apiKey: "AIzaSyCHyHbaHDQgla6rwXivpNmkjFMSvyKwfQw",
  authDomain: "yttest-1eb9b.firebaseapp.com",
  databaseURL: "https://yttest-1eb9b.firebaseio.com",
  storageBucket: "yttest-1eb9b.appspot.com",
  messagingSenderId: "655470313973"
};
firebase.initializeApp(config);

var dbref;
dbref = firebase.database().ref();

function videoData(id){
  var url = 'https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id='+id+'&key='+api;
  $.getJSON(url, function(json){
    var videoTitle = json.items[0].snippet.title;
    var channelTitle = json.items[0].snippet.channelTitle;
    dbref.child("videos").child(id).child("title").set(videoTitle);
    dbref.child("videos").child(id).child("channel").set(channelTitle);
  });
}

function userInfo(uid, displayName, email, photoURL, first_name){
  dbref.child("man").child(uid);
  dbref.child("man").child(uid).child("displayName").set(displayName);
  dbref.child("man").child(uid).child("email").set(email);
  dbref.child("man").child(uid).child("photoURL").set(photoURL);
  dbref.child("man").child(uid).child("first_name").set(first_name);
}

function userVideo(videoId){
  dbref.child("man").child(uid).child("videoView").push().set(videoId);
}

//Facebook
var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('user_friends');
var fb_login = $('#fblogin');
fb_login.click(function(){

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var friend = JSON.stringify(user.friends);
      console.log(friend);
      userInfo(user.uid, user.displayName, user.email, user.photoURL)
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  })
