angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$state,$rootScope,$sce,$ionicHistory,$timeout,$filter,$interval) {
  stop_browser_behavior: false;  
  self.touchStart = function(e) {
    self.startCoordinates = getPointerCoordinates(e);
    if ( ionic.tap.ignoreScrollStart(e) ) {
        return;
    }
    if( ionic.tap.containsOrIsTextInput(e.target) ) {
      // do not start if the target is a text input
      // if there is a touchmove on this input, then we can start the scroll
      self.__hasStarted = false;
      return;
    }
    self.__isSelectable = true;
    self.__enableScrollY = true;
    self.__hasStarted = true;
    self.doTouchStart(e.touches, e.timeStamp);
    // e.preventDefault();
  };
  // ------------------------Start loder----------------------------------
    var elem = angular.element(document.querySelector("#myBar"));   
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        console.log('hello');
      } else {
        width++; 
        // elem.style.width = width + '%'; 
        elem.css('width',width+'%');
      }
    }
    setTimeout(function(){
      document.getElementById("custom-overlay").style.display = "none";      
    }, 2000);

  // ------------------------end loder--------------------------------------
  
  $scope.formatDate_home = function(date){
    var dateOut = new Date(date.replace(' ', 'T'));
    return dateOut;
  };
  
  // ------------------------Get all data------------------------------------
    $scope.getalldata = function(){
     
      // ------------------------------artical-----------------------------
          $http.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.safinasociety.org%2F4%2Ffeed&api_key=kyhexgm1dp2ylm422kcfwams7ket36y9m0wg1omi&&order_dir=desc&count=500')
          .success(function(res){
              $rootScope.homeartical = res.items[0];
              $rootScope.home_artical_pubdate=res.items[0].pubDate; 
              $rootScope.podcast = "podcast";
          });
          $rootScope.myDefaultImage = 'img/No_Image_Available.jpg';
      // ------------------------------end artical---------------------------
      // ------------------------------podcast-------------------------------
          $http.get('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.soundcloud.com%2Fusers%2Fsoundcloud%3Ausers%3A61234965%2Fsounds.rss&api_key=kyhexgm1dp2ylm422kcfwams7ket36y9m0wg1omi&order_dir=desc&count=500')
          .success(function(res){
              // console.log(res.items[0]);
              $rootScope.homepodcast = res.items[0];
          });
      // ------------------------------end podcast---------------------------
      // -------------------------------youtube------------------------------
          $http.post('http://sspodcast.co/safinaadmin/api/youtube').success(function(response){
              // console.log(response.details.results[0]);
              $rootScope.homevideos = response.details.results[0];
          });
      // -------------------------------end youtube--------------------------
      // -------------------------------get event----------------------------
        $http.post('http://sspodcast.co/safinaadmin/api/neweventimages').success(function(data){ 
          // console.log(data[0]);
          $scope.enents_datas_home = data[0];
        });
      // -------------------------------end event----------------------------
      
    }
  // ------------------------end get all data-------------------------------
  // ------------------------for home to single artical----------------------
    $scope.goartical = function(data){
  
      $rootScope.singleartica = data;
      $rootScope.content = data.content;
      // $state.go('tab.homeartical');
      
    }
  // -------------------------end single artical----------------------------
  // -------------------------for home to single podcast--------------------
    $scope.gopodcast = function(data){
      $rootScope.audio=data;
      $state.go('tab.homepodcast');
    }  
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
  // --------------------------end home to single podcast----------------
  // -------------------------for home to single youtube---------------------
    $scope.goyoutube = function(data){
      // $scope.getalldata();
      //console.log(data);
      $rootScope.home_video=data;
      $state.go('tab.homeyoutube');
    }
    $scope.getIframeSrc = function(src) {
      // console.log(src);
      $rootScope.youtube_check=1;
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + src+'?enablejsapi=1');
    };

    $scope.pauseVideo_home = function() {
      $rootScope.youtube_ifream_home=document.getElementsByTagName("iframe")[0].contentWindow;
      $rootScope.youtube_ifream_home.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
      //console.log($rootScope.youtube_ifream_home.postMessage);
    }
  // --------------------------end home to singleyoutube---------------------
  // --------------------------for about us---------------------------------
    $scope.aboutus = function(){
      $state.go('tab.dash-aboutus');
    }
  // ---------------------------end about us--------------------------------
  $scope.doRefresh = function() {
    $scope.getalldata();
    $timeout( function() {
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    }, 500);
  }
  $scope.openexternal_url_home = function(data){
    console.log(data);
    window.open(data,"_system","location=yes,enableViewportScale=yes,hidden=no");
  }
  $scope.home_event=function(data){
    //console.log(data);
    $rootScope.home_event_data=data;
    $state.go('tab.homeevent');
  }
  $scope.sharehome = function(t, msg, img, link){ 
    console.log(t+', '+msg+', '+img+', '+link);
    if(t == 'w')
        window.plugins.socialsharing
        .share(msg, '', link);
    else if(t == 'f')
        window.plugins.socialsharing
        .share(msg, img, link);    
    else if(t == 't')
        window.plugins.socialsharing
        .share(msg, img, link);    
    else if(t == 'sms')
        window.plugins.socialsharing
        .share(msg+' '+img+' '+link);   
    else
    {
      var sub=msg;
      window.plugins.socialsharing
      .share(link, sub, ''); 
    }    
  }
  $scope.shareyoutubehome = function (t, msg, img, link) {
    console.log(t + ', ' + msg + ', ' + img + ', ' + link);
    if (t == 'w') {
      var src = 'https://www.youtube.com/embed/' + link + '?enablejsapi=1';
      window.plugins.socialsharing
        .share(msg, '', src);
    }
    else if (t == 'f') {
      var src = 'https://www.youtube.com/embed/' + link + '?enablejsapi=1';
      window.plugins.socialsharing
        .share(msg, img, src);
    }
    else if (t == 't') {
      var src = 'https://www.youtube.com/embed/' + link + '?enablejsapi=1';
      window.plugins.socialsharing
        .share(msg, img, src);
    }
    else if (t == 'sms') {
      var src = 'https://www.youtube.com/embed/' + link + '?enablejsapi=1';
      window.plugins.socialsharing
        .share(msg + ' ' + img + ' ' + src);
    }
    else {
      var sub = msg;
      var src = 'https://www.youtube.com/embed/' + link + '?enablejsapi=1';
      window.plugins.socialsharing.share(src, sub, '');
    }
  }

  $scope.$on('$ionicView.beforeLeave', function(){
    //console.log($rootScope.podcast_check);
    var audio_data=document.getElementById('home_audio');
    if(audio_data){
      audio_data.pause();
    }
    if($rootScope.youtube_check==1){
      $scope.pauseVideo_home();
    }
  });
})

.controller('ChatsCtrl', function($scope,$http,$state,$rootScope,$sce,$ionicHistory,$timeout,$filter,$interval) {
    //copy to long press start
      stop_browser_behavior: false;  
      self.touchStart = function(e) {
        self.startCoordinates = getPointerCoordinates(e);
        if ( ionic.tap.ignoreScrollStart(e) ) {
            return;
        }
        if( ionic.tap.containsOrIsTextInput(e.target) ) {
          // do not start if the target is a text input
          // if there is a touchmove on this input, then we can start the scroll
          self.__hasStarted = false;
          return;
        }
        self.__isSelectable = true;
        self.__enableScrollY = true;
        self.__hasStarted = true;
        self.doTouchStart(e.touches, e.timeStamp);
        // e.preventDefault();
      };
    //copy to long press end
    $scope.season_1 = true;
    $scope.season_2 = false;
    $scope.solo_1 = false;
    $scope.sota_1 = false;
    angular.element(document.querySelector("#season1")).addClass("active_pod_menu");
    angular.element(document.querySelector("#season2")).removeClass("active_pod_menu");
    angular.element(document.querySelector("#solo")).removeClass("active_pod_menu");
    angular.element(document.querySelector("#sota")).removeClass("active_pod_menu");
    // ---------------------------start  get all data------------------------------------
      $scope.getAllpodcast= function(){
        $rootScope.seasion1s = [];
        $rootScope.seasion2s = [];
        $rootScope.solos=[];
        $rootScope.sotas=[];
        $http.get('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.soundcloud.com%2Fusers%2Fsoundcloud%3Ausers%3A61234965%2Fsounds.rss&api_key=kyhexgm1dp2ylm422kcfwams7ket36y9m0wg1omi&order_dir=desc&count=500')
        .success(function(res){
          // console.log(res);
          angular.forEach(res.items, function(value, key) {
            var val= $filter('split')(value.title,':',0);
            if(val == 'S2'){
              $rootScope.seasion2s.push(value);
            }
            else if(val == 'Solo'){
              $rootScope.solos.push(value);
            }
            else if(val == 'Stories Of The Awliya'){
              $rootScope.sotas.push(value);
            }
            else{
              // console.log(value);
              $rootScope.seasion1s.push(value); 
            }
          });
          // console.log($rootScope.sotas);
          // console.log($rootScope.seasion2s);
        });
      }
      $scope.formatDate_podcast = function(date){
        var dateOut = new Date(date.replace(' ', 'T'));
        return dateOut;
      };
    // ---------------------------end get all data---------------------------------------
    // ---------------------------start tab sason active---------------------------------
      $scope.season1 = function(){
        $scope.season_1 = true;
        $scope.season_2 = false;
        $scope.solo_1 = false;
        $scope.sota_1 = false;
        angular.element(document.querySelector("#season1")).addClass("active_pod_menu");
        angular.element(document.querySelector("#seasion2")).removeClass("active_pod_menu");
        angular.element(document.querySelector("#solo")).removeClass("active_pod_menu");
        angular.element(document.querySelector("#sota")).removeClass("active_pod_menu");
      }
      $scope.season2 = function(){
        $scope.season_1 = false;
        $scope.season_2 = true;
        $scope.solo_1 = false;
        $scope.sota_1 = false;
        angular.element(document.querySelector("#seasion2")).addClass("active_pod_menu");
        angular.element(document.querySelector("#season1")).removeClass("active_pod_menu");
        angular.element(document.querySelector("#solo")).removeClass("active_pod_menu");
        angular.element(document.querySelector("#sota")).removeClass("active_pod_menu");
      }
      $scope.solo = function(){
        $scope.season_1 = false;
        $scope.season_2 = false;
        $scope.solo_1 = true;
        $scope.sota_1 = false;
        angular.element(document.querySelector("#seasion2")).removeClass("active_pod_menu");
        angular.element(document.querySelector("#season1")).removeClass("active_pod_menu");
        angular.element(document.querySelector("#solo")).addClass("active_pod_menu");
        angular.element(document.querySelector("#sota")).removeClass("active_pod_menu");
      }
      $scope.sota = function(){
        $scope.season_1 = false;
        $scope.season_2 = false;
        $scope.solo_1 = false;
        $scope.sota_1 = true;
        angular.element(document.querySelector("#seasion2")).removeClass("active_pod_menu");
        angular.element(document.querySelector("#season1")).removeClass("active_pod_menu");
        angular.element(document.querySelector("#solo")).removeClass("active_pod_menu");
        angular.element(document.querySelector("#sota")).addClass("active_pod_menu");
      }
    // ---------------------------end tab sason active---------------------------------
    $scope.singleaudio = function(data){
      // console.log(data);
      $rootScope.audio=data;
    }
    $scope.podtrustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
    $scope.doRefresh = function() {
      $scope.getAllpodcast();
      $timeout( function() {
          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
      }, 500);
    }
    $scope.sharepodcast = function(t, msg, img, link){ 
      console.log(t+', '+msg+', '+img+', '+link);
      if(t == 'w')
          window.plugins.socialsharing
          .share(msg, '', link);
      else if(t == 'f')
          window.plugins.socialsharing
          .share(msg, img, link);    
      else if(t == 't')
          window.plugins.socialsharing
          .share(msg, img, link);    
      else if(t == 'sms')
          window.plugins.socialsharing
          .share(msg+' '+img+' '+link);    
      else
      {
        var sub=msg;
        window.plugins.socialsharing
        .share(link, sub, ''); 
      }    
    }
    $scope.$on('$ionicView.beforeLeave', function(){
      var audio_data_pod=document.getElementById('audio_podca');
      audio_data_pod.pause();
    });
    
})

.controller('AccountCtrl', function($scope,$http,$state,$rootScope,$sce,$ionicHistory,$timeout) {
    //copy to long press start
    stop_browser_behavior: false;  
    self.touchStart = function(e) {
      self.startCoordinates = getPointerCoordinates(e);
      if ( ionic.tap.ignoreScrollStart(e) ) {
          return;
      }
      if( ionic.tap.containsOrIsTextInput(e.target) ) {
        // do not start if the target is a text input
        // if there is a touchmove on this input, then we can start the scroll
        self.__hasStarted = false;
        return;
      }
      self.__isSelectable = true;
      self.__enableScrollY = true;
      self.__hasStarted = true;
      self.doTouchStart(e.touches, e.timeStamp);
      // e.preventDefault();
    };
  //copy to long press end
  $scope.upcomeingevents = function(){
    $http.post('http://sspodcast.co/safinaadmin/api/neweventimages').success(function(data){ 
      console.log(data);
      $scope.enents_datas = data;
    });
  }
  $scope.singleEvent = function(data){
    console.log(data);
    $rootScope.singleArtical_data= data;
  }
  $scope.doRefresh = function() {
    $scope.upcomeingevents();
    $timeout( function() {
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    }, 500);
  }
  $scope.shareevent = function(t, msg, img, link){ 
    console.log(t+', '+msg+', '+img+', '+link);
    if(t == 'w')
        window.plugins.socialsharing
        .share(msg, '', link);
    else if(t == 'f')
        window.plugins.socialsharing
        .share(msg, img, link);    
    else if(t == 't')
        window.plugins.socialsharing
        .share(msg, img, link);    
    else if(t == 'sms')
        window.plugins.socialsharing
        .share(msg+' '+img+' '+link);    
    else
    {
      window.plugins.socialsharing
      .share(msg+' '+img+' '+link);       
    }    
  }
  $scope.openexternal_url = function(data){
    window.open(data,"_system","location=yes,enableViewportScale=yes,hidden=no");
  }
})
.controller('youtubeCtrl', function($scope,$http,$state,$rootScope,$sce,$ionicHistory,$timeout) {
    //copy to long press start
    stop_browser_behavior: false;  
    self.touchStart = function(e) {
      self.startCoordinates = getPointerCoordinates(e);
      if ( ionic.tap.ignoreScrollStart(e) ) {
          return;
      }
      if( ionic.tap.containsOrIsTextInput(e.target) ) {
        // do not start if the target is a text input
        // if there is a touchmove on this input, then we can start the scroll
        self.__hasStarted = false;
        return;
      }
      self.__isSelectable = true;
      self.__enableScrollY = true;
      self.__hasStarted = true;
      self.doTouchStart(e.touches, e.timeStamp);
      // e.preventDefault();
    };
  //copy to long press end
  // -----------------------------------for youtobe---------------------------------------  
    angular.element(document.querySelector("#lode_more_bu")).removeClass("lode_more_cl");
    $scope.getAllYoutube = function(){
      $rootScope.videos = [];
      $http.post('http://sspodcast.co/safinaadmin/api/youtube').success(function(response){
        // console.log(response.details.results);
        $rootScope.next_token=response.details.info.nextPageToken;
        angular.forEach(response.details.results, function(child){
            $rootScope.videos.push(child);
        });
        // console.log($scope.videos);
      });
    }
  // ---------------------------end youtube----------------------------------------
  // ---------------------------- start single youtube video-------------------------------------------
      $scope.singlevideo = function(data){
          $rootScope.video=data;
      }
      $scope.getIframeSrc = function(src) {
          // console.log(src);
          return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + src+'?enablejsapi=1');
      };
  // ------------------------------end single youtube video-------------------------------------------
  $scope.pauseVideo = function() {
    $rootScope.youtube_ifream=angular.element(document.querySelector("#youtube_ifream"))[0].contentWindow;
    $rootScope.youtube_ifream.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    //console.log($rootScope.youtube_ifream.postMessage);
  }
  $scope.doRefresh = function() {
    $scope.getAllYoutube();
    $timeout( function() {
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    }, 500);
  }
  $scope.next_videos = function(data){
  
    if(angular.isUndefined(data) || data==''){
        // console.log($rootScope.videos.length);
        angular.element(document.querySelector("#lode_more_bu")).addClass("lode_more_cl");
    }
    else{
        $http.post('http://sspodcast.co/safinaadmin/api/youtubenextpage', {next_page_token: data}).success( function (res) {
          console.log(res);
            $rootScope.next_token=res.info.nextPageToken;
            angular.forEach(res.results, function(child){
                $rootScope.videos.push(child);
            });
        });
    }
  }
  $scope.shareyoutube = function(t, msg, img, link){ 
    console.log(t+', '+msg+', '+img+', '+link);
    if(t == 'w'){
        var src = 'https://www.youtube.com/embed/' + link + '?enablejsapi=1';
        window.plugins.socialsharing
          .share(msg, '', src);
    }
    else if(t == 'f'){
      var src = 'https://www.youtube.com/embed/' + link + '?enablejsapi=1';
        window.plugins.socialsharing
          .share(msg, img, src); 
    }   
    else if(t == 't'){
      var src = 'https://www.youtube.com/embed/' + link + '?enablejsapi=1';
        window.plugins.socialsharing
          .share(msg, img, src);   
    } 
    else if(t == 'sms'){
      var src = 'https://www.youtube.com/embed/' + link + '?enablejsapi=1';
        window.plugins.socialsharing
          .share(msg + ' ' + img + ' ' + src);   
    } 
    else
    {
      var sub = msg;
      var src = 'https://www.youtube.com/embed/' + link + '?enablejsapi=1';
      window.plugins.socialsharing.share(src, sub, '');     
    }    
  }
  $scope.$on('$ionicView.beforeLeave', function(){
    $scope.pauseVideo();
  });
  
})
.controller('articalCtrl', function($scope,$http,$state,$rootScope,$sce,$ionicHistory,$timeout) {
  stop_browser_behavior: false;  
  self.touchStart = function(e) {
    self.startCoordinates = getPointerCoordinates(e);
    if ( ionic.tap.ignoreScrollStart(e) ) {
      console.log('hi');
      return;
    }
    if( ionic.tap.containsOrIsTextInput(e.target) ) {
      console.log('hfefi');
      // do not start if the target is a text input
      // if there is a touchmove on this input, then we can start the scroll
      self.__hasStarted = false;
      return;
    }
    self.__isSelectable = true;
    self.__enableScrollY = true;
    self.__hasStarted = true;
    self.doTouchStart(e.touches, e.timeStamp);
    // e.preventDefault();
  };
  $scope.getAllArtical = function(){
    $http.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.safinasociety.org%2F4%2Ffeed&api_key=kyhexgm1dp2ylm422kcfwams7ket36y9m0wg1omi&count=500')
    .success(function(res){
        $rootScope.apiarticals = res.items;
    });
    $rootScope.myDefaultImage = 'img/No_Image_Available.jpg';
  }
  $scope.formatDate = function(date){
    var dateOut = new Date(date.replace(' ', 'T'));
    return dateOut;
  };
  $scope.singleArtical = function(data){
    console.log(data);
    $rootScope.singleartica = data;
    $rootScope.content = data.content;
    $rootScope.url=data.link;
    (function() {
      var disqus_shortname = 'farntechs';
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = false;
      dsq.src = '//'+disqus_shortname+'.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  }
  $scope.shareartical = function(t, msg, img, link){ 
    console.log(t+', '+msg+', '+img+', '+link);
    if(t == 'w')
        window.plugins.socialsharing
        .share(msg, '', link);
    else if(t == 'f')
        window.plugins.socialsharing
        .share(msg, img, link);    
    else if(t == 't')
        window.plugins.socialsharing
        .share(msg, img, link);    
    else if(t == 'sms')
        window.plugins.socialsharing
        .share(msg+' '+img+' '+link);    
    else
    {
      var sub=msg;
      window.plugins.socialsharing
      .share(link, sub, '');    
    }    
  }
})


.filter('split', function() {
  return function(input, splitChar, splitIndex) {
      // do some bounds checking here to ensure it has that index
      return input.split(splitChar)[splitIndex];
  }
})
.filter('short', function() {
  return function(short, length) {
      return short.substr(0, length || 40)+'...';
 }
})
.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
      
      attrs.$observe('ngSrc', function(value) {
        if (!value && attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
})
.filter('ampersand', function(){
  return function(input){
      return input ? input.replace(/&amp;/, '&') : '';
  }
});;