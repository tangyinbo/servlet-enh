var myAngularApp = angular.module('app',[]);
myAngularApp.controller("RootController",function($scope,$rootScope){
	$scope.name="bobobo";
	$scope.dataCenter = initMainPage();
	//主界面显示初始化
	//start左边栏***************************************
	fillSiderbar(siderBatData());
	siderBarbindEventHandler($scope);
  //tabs*************
	$scope.remove_tab=function(currentRemoveTabId,index,event){ 
    event.stopPropagation();
    var currentActiveTabId = $scope.dataCenter.navTabs.currentTab.tabId;
    console.log('index:'+index+'<==>currentRemoveTabId:'+currentRemoveTabId+"<==> currentActiveTabId:"+currentActiveTabId);
    //如果移除的是当前选中的,
   if(currentRemoveTabId == currentActiveTabId){
      //移除的是第一个,那么激活中下一个tab
       if(index == 0){
          /* if($scope.dataCenter.navTabs.tabs.length>1){
            var nextActiveTabId =generateTabId($scope.dataCenter.navTabs.tabs[index+1]);
            //默认激活上一个tab
            console.log('next#'+nextActiveTabId);
            $('#'+nextActiveTabId).tab('show');
            $scope.dataCenter.navTabs.currentTab={'tabId':generateTabId($scope.dataCenter.navTabs.tabs[index+1])};
           }*/
       }else{
        //默认激活上一个tab
           console.log('previou#'+generateTabId($scope.dataCenter.navTabs.tabs[index-1]));
           $('#'+generateTabId($scope.dataCenter.navTabs.tabs[index-1])).tab('show');
           $scope.dataCenter.navTabs.currentTab={'tabId':generateTabId($scope.dataCenter.navTabs.tabs[index-1])};
        }
    }
    //移除当前选中tab
   $scope.dataCenter.navTabs.tabs.splice(index,1);
	}
  //tab 选中********
  $scope.tab_active=function(currentRemoveTabId,index,event){
    $scope.dataCenter.navTabs.currentTab.tabId=currentRemoveTabId;
  }

  //tab选中
  $(document).on('shown.bs.tab','a[data-toggle="tab"]', function (e) {
    console.log(e.target );
       console.log(e.relatedTarget);
  })
	//end 左边栏*****************************************
	$scope.name = 'bobo';
});

//*start*****************定义指令************************用于在tab的时候激活tab()总是显示激活第一个tab
myAngularApp.directive('tabRenderListener',function(){
    return{
      restrict: 'AC',
      link:function(scope, iElement, iAttrs, controller){
            //标记当前tab**********
            var activeTab = scope.dataCenter.navTabs.tabs[0];  
            $(iElement).tab('show');
            scope.dataCenter.navTabs.currentTab={'tabId':generateTabId(activeTab)};
      }
    }
});
//*end*****************定义指令************************

//主界面显示的所有数据项整理************************************************************
function initMainPage(){
	return{
		//工具栏
		toolBar:{},
		//tab栏
		navTabs:{
			tabs:[],
			tabsContent:[],
      currentTab:{}
		},
		//左边栏
		sliderBar:[
		],
		//主界面数据
		mainPage:{}
	}
}
//侧边栏初始化******************************************
//侧边栏点击的时候增加tab项
function siderBarbindEventHandler($scope){
	$('#siderBar_tree').on('nodeSelected', function(event, data) {
		$scope.$apply(function(){
			//增加一个tab项(如果是叶子节点)
			if(data.leaf == true){
        var tabIsContain = false;
        angular.forEach($scope.dataCenter.navTabs.tabs,function(_data,_index,_array){
          if(!tabIsContain){
            console.log('selectId:'+generateTabId(data)+"<==>"+'_data loop:'+generateTabId(_data));
            if(generateTabId(data) ==generateTabId(_data)){
              tabIsContain = true;
              //当前选中的tab激活
              $('#'+generateTabId(data)).tab('show');
              //标记当前tab**********
              $scope.dataCenter.navTabs.currentTab={'tabId':generateTabId(data)};
            }
          }
        });
				//每个叶子节点只能添加一次
        if(!tabIsContain){
            $scope.dataCenter.navTabs.tabs.splice(0,0,data);
        }
			}
			//后台填充tabcontent的内容
		});
	});
}
//********************************公用方法区域
function generateTabId(tabData){
  //alert('tab_'+tabData.type+'_'+tabData.nodeid);
    return 'tab_'+tabData.type+'_'+tabData.nodeid;
}
function generateTabContentId(tabData){
    return 'tabContent_'+tabData.type+'_'+tabData.nodeid;
}
//初始化侧边栏样式
function fillSiderbar(siderBarMenuData){
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
    $('#siderBar_tree').treeview($.extend(initData,siderBarMenuData));
}
//临时数据
function siderBatData(){
	return {data: 
 [
          {
          	nodeid:0,
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
                nodeid:1,
                text: 'Child 1',
                href: '#child1',
                tags: ['2'],
                type:'menu',
                leaf:false,
                nodes: [
                  {
                    nodeid:2,
                    text: 'Grandchild 1',
                    href: '#grandchild1',
                    tags: ['0'],
                     type:'menu',
                    leaf:true
                  },
                  {
                    nodeid:3,
                    text: 'Grandchild 2',
                    href: '#grandchild2',
                    tags: ['0'],
                     type:'menu',
                    leaf:true
                  }
                ]
              },
              {
                nodeid:4,
                text: 'Child 2',
                href: '#child2',
                tags: ['0'],
                 type:'menu',
                leaf:true
              }
            ]
          },
          {
          nodeid:5,
            text: 'Parent 2',
            href: '#parent2',
            tags: ['0'],
             type:'menu',
            leaf:true
          },
          {
            nodeid:6,
            text: 'Parent 3',
            href: '#parent3',
             tags: ['0'],
              type:'menu',
             leaf:true
          },
          {
            nodeid:7,
            text: 'Parent 4',
            href: '#parent4',
            tags: ['0'],
             type:'menu',
            leaf:true
          },
          {
            nodeid:8,
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
                    nodeid:9,
                    text: 'Grandchild 1',
                    href: '#grandchild1',
                    tags: ['0'],
                     type:'menu',
                    leaf:true
                  },
                  {
                    nodeid:10,
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