angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $stateParams, $cordovaCamera, $ionicPlatform, $http) {

  $ionicPlatform.ready(function() {

    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
  });

  $scope.callAPI = function() {
    var url = 'http://rawb.bakirci.nl/api/WalkingDead/getEpisodes?callback=JSON_CALLBACK';
    console.log(url);

    $http.jsonp(url)
    .success(function(data){
        console.log(data);
    });
  }

})

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
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $cordovaCamera, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

});
