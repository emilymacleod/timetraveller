angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ItemCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  }})

.controller('CameraCtrl', function($scope, $state, $http) {

  // PLEASE NOTE:  you must install the apache cordova camera plugin for this to function.
  // You can install it with the following command:  ionic plugin add org.apache.cordova.camera

  $scope.data = {};

  // set the default image URI (a color bar image)
  $scope.data.imageURI = 'http://www.dvinfo.net/forum/attachments/view-video-display-hardware-software/4853d1193613730-smpte-color-bars-bars_pal.jpg';

  // the takePhoto function attached to the button
  $scope.takePhoto = function() {

    // default camera options, please see https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md
    // for the complete list
    var cameraOptions = {
      targetWidth: 300,
      targetHeight: 300,
      destinationType: 0
    };

    // perform the api call to take the picture.  
    // The success function has a URI containing the file location on the phone of the image
    // The error function sends an alert that an issue has occured
    // The cameraOptions are defined above
    navigator.camera.getPicture(function(data) {
      
      // We need to encode the returned data in this way so that it can be displayed on the phone as raw data
      // instead of a URL
      $scope.data.imageURI = "data:image/jpeg;base64,"+data;
      $state.go('tab.camera');

    }, function(err) {

      alert("Oops!  Can't take your photo!  Either you backed out before saving a photo, or you are not on a device.  Camera will not work from the emulator...");
    }, cameraOptions);
  }

  // save the photo via API
  $scope.savePhoto = function() {

    // determine if an image has actually been taken
    if ($scope.data.imageURI.match(/^data:image\/jpeg;base64,/)) {

      // post the image to the api
      // NOTE: in order to access the image on the API side, execute the following to save in main folder:
      //
      //
      //  var base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
      //  require("fs").writeFile("test.jpg", base64Data, 'base64', function(err) {
      //    console.log(err);
      //  });
      $http.post("http://YOUR_API_URL/upload", { image: $scope.data.imageURI }).then(function(result) {

          // for the purposes of my example, I was just returning a message.  Alter however you want your
          // successful returned call to work
          alert(result.data.message);
      }, function(error) {
          alert("There was a problem saving your image.  Check the logs for details.");
          console.log(error);
      });
    }
    else {
      alert("You need to take a photo first!");
    }
  }
});

