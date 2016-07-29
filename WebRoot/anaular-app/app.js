var myAngularApp = angular.module('app',[]);
myAngularApp.controller("RootController",function($scope,$rootScope,$compile){
  $scope.pageContextHandler = PageCtrlMain($scope,$rootScope,$compile);
  //初始化控制器
  $scope.pageContextHandler.init();
  //tabs*************
  $scope.remove_tab=function(currentRemoveTabId,index,event){ 
    event.stopPropagation();
    $scope.pageContextHandler.navTabs.removeTab(currentRemoveTabId,index,event);
  }
  //tab 选中********
  $scope.tab_active=function(currentRemoveTabId,index,event){
    $scope.pageContextHandler.navTabs.currentTab.tabId=currentRemoveTabId;
  }
  //end 左边栏*****************************************
});


//*start*****************定义指令************************用于在tab的时候激活tab()总是显示激活第一个tab
myAngularApp.directive('tabRenderListener',function(){
    return{
      restrict: 'AC',
      link:function(scope, iElement, iAttrs, controller){
            //标记当前tab**********
            var activeTab = scope.pageContextHandler.navTabs.tabs[0];  
            $(iElement).tab('show');
            scope.pageContextHandler.navTabs.currentTab={'tabId':scope.pageContextHandler.navTabs.generateTabId(activeTab)};
      }
    }
});
//*end*****************定义指令************************

//界面控制器*****************************************************************
function PageCtrlMain($scope,$rootScope,$compile){
	return{
		 //侧边栏
	    siderBar:{
	    	_top_parent:null,
	    	init:function(parent){
	    		this._top_parent = parent;
	    		//初始化侧边栏数据
	    		this.fillSiderbar(siderBatData());
	    		//侧边栏点击事件绑定
	    		this.siderBarbindEventBinder();
	    	},
	    	siderBarId:'siderBar_tree',
	    	_this:this,
	    	//侧边栏事件绑定
	    	siderBarbindEventBinder:function(){
	    		var _this = this;
	    		$('#'+this.siderBarId).on('nodeSelected', function(event, data) {
	    		  $scope.$apply(function(){
	    			  var currenntSelectTabId = _this._top_parent.navTabs.generateTabId(data);
	    		      //增加一个tab项(如果是叶子节点)
	    		      if(data.leaf == true){
	    		        var tabIsContain = false;
	    		        angular.forEach($scope.pageContextHandler.navTabs.tabs,function(_data,_index,_array){
	    		     
	    		          if(!tabIsContain){
	    		            if( currenntSelectTabId==_this._top_parent.navTabs.generateTabId(_data)){
	    		              tabIsContain = true;
	    		              //当前选中的tab激活
	    		              $('#'+currenntSelectTabId).tab('show');
	    		              //标记当前tab**********
	    		              $scope.pageContextHandler.navTabs.currentTab={'tabId':currenntSelectTabId};
	    		            }
	    		          }
	    		        });
	    		        //每个叶子节点只能添加一次
	    		        if(!tabIsContain){
	    		            //标记当前tab**********
	    		            $scope.pageContextHandler.navTabs.currentTab={'tabId':currenntSelectTabId};
	    		            //创建一个tabContent列表,并填充内容*****************************
	    		            _this._top_parent.navTabs.createAndAppendTabContent(data,$scope,$compile);
	    		            $scope.pageContextHandler.navTabs.tabs.splice(0,0,data);
	    		            $('#'+currenntSelectTabId).tab('show');
	    		            
	    		        }
	    		      }
	    		      //后台填充tabcontent的内容
	    		    });
	    		  });
	    	},
	    	/**
	    	 * 填充侧边栏数据
	    	 * @param siderBarMenuData
	    	 * @returns
	    	 */
	    	fillSiderbar:function(siderBarMenuData){
	    		  var initData={
	    		      expandIcon: "glyphicon glyphicon-stop",
	    		          collapseIcon: "glyphicon glyphicon-unchecked",
	    		          nodeIcon: "glyphicon glyphicon-file",
	    		          color: "white",
	    		          backColor: "darkgray",
	    		          onhoverColor: "#FFA500",
	    		          borderColor: "red",
	    		          showBorder: false,
	    		          showTags: true,
	    		          highlightSelected: true,
	    		          selectedColor: "yellow",
	    		          selectedBackColor: "darkorange"
	    		  }
	    		  $('#'+this.siderBarId).treeview($.extend(initData,siderBarMenuData));
	    	}	
	    },
	    //tab栏
	    navTabs:{
		  init:function(){
		  },
		  tabIdPrefix:'tab_',
		  tabContentIdPrefix:'tabContent_',
	      tabContentEleId:"tab-content",
	      //新增一个tabContent
	      /*
	       * @parameter data:选中的节点数据
	       * */
	      createAndAppendTabContent:function(data,scope,compile){
	    	   $("#"+this.tabContentEleId).find('div.tab-pane').removeClass("active");
	    	   var _appendTabContentHtml = compile('<div role="tabpanel" ng-include="\'include.html\'" class="tab-pane active" id='+this.generateTabContentId(data)+'></div>')(scope);
	    	   $("#"+this.tabContentEleId).prepend(_appendTabContentHtml);
	      },
	      /**
	       * 
	       * @param currentRemoveTabId 当前要移除的tabId
	       * @param index
	       * @param event
	       * @returns
	       */
	      removeTab:function(currentRemoveTabId,index,event){
	    	  var currentActiveTabId = this.currentTab.tabId;
	    	   //移除当前选中tab
	    	   this.tabs.splice(index,1);
	    	   //移除tabContent
	    	  this.removeTabContent(this.tabIdMappingTabContentId(currentRemoveTabId));
	    	   if($scope.pageContextHandler.navTabs.tabs.length==0){
	    		    $("#"+$scope.pageContextHandler.navTabs.tabContentEleId).find("*").remove();
	    		    this.currentTab={};
	    		    return;
	    	   }
	    	    //如果移除的是当前选中的,
	    	   if(currentRemoveTabId == currentActiveTabId){
	    	      //移除的是第一个,那么激活中下一个tab
	    	       if(index == 0){
	    	    	   var _nextActiveTabId = this.generateTabId($scope.pageContextHandler.navTabs.tabs[0]);
	    	           $('#'+_nextActiveTabId).tab('show');   
	    	           this.currentTab={'tabId':_nextActiveTabId}; 
	    	       }else{
	    	        //默认激活上一个tab
	    	    	   var _nextActiveTabId = this.generateTabId($scope.pageContextHandler.navTabs.tabs[index-1]);
	    	           $('#'+_nextActiveTabId).tab('show');
	    	           this.currentTab={'tabId':_nextActiveTabId};
	    	        }
	    	    }
	      },
	      /**
	       * 
	       * @param tabContentId 要删除的tabContentId
	       * @returns
	       */
	      removeTabContent:function(tabContentId){
	    	   $("#"+tabContentId).remove();
	      },
	      /**
	       * 
	       * @param tabData 要生成Tab页的数据
	       * @returns
	       */
	      generateTabId:function(tabData){
	    	    return this.tabIdPrefix+tabData.type+'_'+tabData.nodeId;
	      },
	      /**
	       * 
	       * @param tabData 要生成Tab页的数据
	       * @returns
	       */
	      generateTabContentId:function(tabData){
	    	    return this.tabContentIdPrefix+tabData.type+'_'+tabData.nodeId;
	      },
	      /**
	       * TabId 转换为TabContentId
	       * @param tabId
	       * @returns
	       */
	      tabIdMappingTabContentId:function(tabId){
	    	    return this.tabContentIdPrefix+tabId.substr(tabId.indexOf('_')+1);
	      },
	      tabs:[],
	      tabsContent:[],
	      currentTab:{}
	    },
	    //左边栏
	    sliderBar:[
	    ],
	    //主界面数据
	    mainPage:{},
	    init:function(){
	    	var _this = this;
	    	//侧边栏初始化
	    	this.siderBar.init(_this);
	    	//tab初始化
	    	this.navTabs.init(_this);
	    }
	}
}
//临时数据
function siderBatData(){
  return {data: 
 [
          {
            nodeId:0,
            text: 'Parent 1',
            href: '#parent1',   
            tags: ['4'],
            type:'menu',
            state:{
              expanded:false
            },
            leaf:false,
            nodes: [
              {
                nodeId:1,
                text: 'Child 1',
                href: '#child1',
                tags: ['2'],
                type:'menu',
                leaf:false,
                nodes: [
                  {
                    nodeId:2,
                    text: 'Grandchild 1',
                    href: '#grandchild1',
                    tags: ['0'],
                     type:'menu',
                    leaf:true
                  },
                  {
                    nodeId:3,
                    text: 'Grandchild 2',
                    href: '#grandchild2',
                    tags: ['0'],
                     type:'menu',
                    leaf:true
                  }
                ]
              },
              {
                nodeId:4,
                text: 'Child 2',
                href: '#child2',
                tags: ['0'],
                 type:'menu',
                leaf:true
              }
            ]
          },
          {
          nodeId:5,
            text: 'Parent 2',
            href: '#parent2',
            tags: ['0'],
             type:'menu',
            leaf:true
          },
          {
            nodeId:6,
            text: 'Parent 3',
            href: '#parent3',
             tags: ['0'],
              type:'menu',
             leaf:true
          },
          {
            nodeId:7,
            text: 'Parent 4',
            href: '#parent4',
            tags: ['0'],
             type:'menu',
            leaf:true
          },
          {
            nodeId:8,
            text: 'Parent 5',
            href: '#parent5'  ,
            tags: ['0'],
             type:'menu',
            leaf:false,
            state:{
              expanded:false
            },
            nodes: [
                  {
                    nodeId:9,
                    text: 'Grandchild 1',
                    href: '#grandchild1',
                    tags: ['0'],
                     type:'menu',
                    leaf:true
                  },
                  {
                    nodeId:10,
                    text: 'Grandchild 2',
                    href: '#grandchild2',
                    tags: ['0'],
                     type:'menu',
                    leaf:true
                  }
                ]
          }
        ]
  }
}