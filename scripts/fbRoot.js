var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('user_friends');
var fb_login = $('#fblogin');
function login(){

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var displayName = user.displayName;
      var email = user.email;
      var photoURL = user.photoURL;
      var uid = user.uid;
      window.uid = uid;
      userInfo(uid, displayName, email, photoURL);
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
}



  function checkLoginState(event) {
    if (event.authResponse) {
      // User is signed-in Facebook.
      var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(event.authResponse, firebaseUser)) {
          // Build Firebase credential with the Facebook auth token.
          // [START facebookcredential]
          var credential = firebase.auth.FacebookAuthProvider.credential(
              event.authResponse.accessToken);
          // [END facebookcredential]
          // Sign in with the credential from the Facebook user.
          // [START authwithcred]
          firebase.auth().signInWithCredential(credential).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // [START_EXCLUDE]
            if (errorCode === 'auth/account-exists-with-different-credential') {
              alert('You have already signed up with a different auth provider for that email.');
              // If you are using multiple auth providers on your app you should handle linking
              // the user's accounts here.
            } else {
              console.error(error);
            }
            // [END_EXCLUDE]
          });
          // [END authwithcred]
        } else {
          // User is already signed-in Firebase with the correct user.
        }
      });
    } else {
      // User is signed-out of Facebook.
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    }
  }
  // [END facebookcallback]
  /**
   * Check that the given Facebook user is equals to the  given Firebase user
   */
  // [START checksameuser]
  function isUserEqual(facebookAuthResponse, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
            providerData[i].uid === facebookAuthResponse.userID) {
          // We don't need to re-auth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  // [END checksameuser]
  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
  function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // [START_EXCLUDE]
        var uid = window.uid;
        //userVideo(uid);
        $("#quickstart-sign-in-status").html("Working on the feeds!<br />Thanks for signing in!");
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        // [START_EXCLUDE]
        var signedOut = '<button class="loginBtn loginBtn--facebook" onclick="login()">Login with Facebook</button>';
        $("#quickstart-sign-in-status").html(signedOut);
        // [END_EXCLUDE]
      }
    });
    // [END authstatelistener]
  }
  initApp();
