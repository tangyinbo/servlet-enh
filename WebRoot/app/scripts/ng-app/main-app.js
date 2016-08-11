/*
mainApp
*/
var mainApp = angular.module('main-app',['cb.main.service'
                                             ,'cb.main.directive'
                                             ,'ngAnimate'
                                             ,'com.cb.User']);

//主Controller
mainApp.controller('mainController',function($scope,$rootScope,$animateCss,mainService,CW_CONSTANT){
	$scope.myname = 'tangyinbo2';
    //NAV 栏***********************************8
 
 	//start 侧边栏和tab项的定义*************************************************************************************
	+function siderBarTabDefinition(){
		$scope.siderBarFilter = null;
		$scope.navTabs={
	    	tabs:[],
	    	tab_contents:[],
	    	currentTabId:null
	    };
	    //根据侧边栏 Node生成TabId
	    $scope.geneRateTabIdByNode=function(nodeData){
	          return CW_CONSTANT.tab_id_prefix+CW_CONSTANT.sider_bar_tab_type+'_'+nodeData.nodeId;
	    }
	    //是否当前选中tab
	    $scope.isCurrentActiveTab=function(NodeData){
	    	return $scope.geneRateTabIdByNode(NodeData) === $scope.navTabs.currentTabId;
	    }
	    //激活选中tab
	    $scope.active_tab=function(tabData,$index,$event){
	    	$scope.navTabs.currentTabId = $scope.geneRateTabIdByNode(tabData);
	    	activeTabContent(tabData);
	    };

	    //删除TAB
	    $scope.remove_tab=function(tab,$index,$event){
	    	$event.stopPropagation();
	    	var _remove_tab_id = $scope.geneRateTabIdByNode(tab);
	    	for(var i=0;i<$scope.navTabs.tabs.length;i++){
	    		var _cur_tab_id =  $scope.geneRateTabIdByNode($scope.navTabs.tabs[i]);
	    		if(_remove_tab_id == _cur_tab_id){
	    			//是否是移除当前激活的tab
	    			var _is_remove_active_tab = $scope.navTabs.currentTabId == _remove_tab_id;
	    			$scope.navTabs.tabs.splice(i,1);
	    			//事件传播给 main-directive => tabContent
	    			$scope.$broadcast(CW_CONSTANT.tab_remove_event, angular.extend({}, {'is_remove_active_tab':_is_remove_active_tab,'index':$index}, tab));
	    		}
	    	}
	    }
	     //根据侧边栏 Node生成tab_content_id
	    $scope.geneRateTabContentIdByNode=function(nodeData){
	          return CW_CONSTANT.tab_content_id_prefix+CW_CONSTANT.sider_bar_tab_type+'_'+nodeData.nodeId;
	    }
	    //监听tab创建
	    $scope.$on(CW_CONSTANT.sider_bar_tab_created_event,function(d,data){
	    	//传播tab创建事件,用于tabcontent 创建 main-directive=>tabContent 指令
	    	$scope.$broadcast(CW_CONSTANT.tab_create_event,data);
	    })
	     //监听tab再次选择
	    $scope.$on(CW_CONSTANT.sider_bar_tab_select_event,function(d,data){
	    	//传播tab创建事件,用于tabcontent 创建 main-directive=>tabContent 指令
	    	$scope.$broadcast(CW_CONSTANT.tab_select_event,data);
	    })

	    function activeTabContent(data){
	        $("#tab-content").find('div.tab-pane').removeClass("active");
	        if(data){
	           $("#tab-content").find('#'+$scope.geneRateTabContentIdByNode(data)).addClass('active');
	        }
     	}
     	$scope.hideSiderBar=function(event){
          var _targetElement = $(event.target);
          if(_targetElement.hasClass('glyphicon-chevron-left')){
          	$(event.target).removeClass('glyphicon-chevron-left').addClass('glyphicon-chevron-right');
          	 $("#container_left").animate({ 
			    left:'-220px',
			    opacity: 'toggle'
			  }, 1000 ,'swing');
			  $("#container_right").animate({ 
			    'padding':'0'
			  }, 1000,'swing' );
          }else{
          	$(event.target).removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-left');
          	 $("#container_left").animate({ 
			    left:0,
			    opacity: 'toggle'
			  }, 1000 ,'swing');
			  $("#container_right").animate({ 
			    'padding':'0 0 0 222px'
			  }, 1000,'swing' );
          }
     	}
     
	}();
	//end 侧边栏和tab项的定义*************************************************************************************
	
});





//定义常量
mainApp.constant('CW_CONSTANT',{
	tab_id_prefix:'tab_',//tab_id 前缀
	sider_bar_tab_type:'menu',//侧边栏点击生成tab 的类型
	tab_content_id_prefix:'content_',//tab_content_id 前缀
	sider_bar_tab_created_event:'sider_bar_tab_created',//侧边栏创建tab
	tab_create_event:'tab_create',//创建tab
    sider_bar_tab_select_event:'sider_bar_tab_select',//侧边栏再次被选中
    tab_select_event:'tab_select',//侧边栏再次被选中
	tab_remove_event:'tab_remove'
});

//repeat 动画
mainApp.animation('.repeat-animation', function () {
 return {
 enter : function(element, done) {
		  var width = element.width();
		  element.css({
		  position: 'relative',
		  left: -10,
		  opacity: 0
		  });
		  element.animate({
		  left: 0,
		  opacity: 1
		  }, done);
		 },
 leave : function(element, done) {
		  element.css({
		  position: 'relative',
		  left: 0,
		  opacity: 1
		  });
		  element.animate({
		  left: -10,
		  opacity: 0
		  }, done);
 },
 move : function(element, done) {
		  element.css({
		  left: "2px",
		  opacity: 0.5
		  });
		  element.animate({
			  left: "0px",
			  opacity: 1
			  }, done);
		 }};
});
