// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $http) {
  
  $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.dash-aboutus', {
    url: '/dash/aboutus',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-aboutus.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.chats', {
    cache: false,
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.artical', {
      url: '/artical',
      views: {
        'tab-artical': {
          templateUrl: 'templates/tab-artical.html',
          controller: 'articalCtrl'
        }
      }
    })
    .state('tab.artical-detail', {
      url: '/artical/:chatId',
      views: {
        'tab-artical': {
          templateUrl: 'templates/artical-detail.html',
          controller: 'articalCtrl'
        }
      }
    })
    .state('tab.youtube', {
      url: '/youtube',
      views: {
        'tab-youtube': {
          templateUrl: 'templates/tab-youtube.html',
          controller: 'youtubeCtrl'
        }
      }
    })
    .state('tab.youtube-detail', {
      url: '/youtube/:chatId',
      views: {
        'tab-youtube': {
          templateUrl: 'templates/youtube-detail.html',
          controller: 'youtubeCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-detail', {
    url: '/account/:chatId',
    views: {
      'tab-account': {
        templateUrl: 'templates/account-detail.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.homeartical', {
    url: '/dash/:chatId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-homeartical.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.homepodcast', {
    url: '/dash/:chatId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-homepodcast.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.homeyoutube', {
    url: '/dash/:chatId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-homeyoutube.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.homeevent', {
    url: '/dash/:chatId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-homeevent.html',
        controller: 'DashCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
  // $ionicConfigProvider.tabs.position('bottom');
  //$ionicConfigProvider.backButton.icon('ion-chevron-left');
  // $ionicConfigProvider.actionSheet.style("standard");
  //$ionicConfigProvider.views.transition('ios');
  //$ionicConfigProvider.tabs.style('standard').position('bottom');
  //$ionicConfigProvider.navBar.alignTitle('center');
  
});
