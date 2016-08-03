/*
mainService
*/
var mainDirective = angular.module('cb.main.directive',['cb.main.service']);

/*
| 侧边栏指令:监听侧边栏点击事件,动态添加tab选项
| @author:cowboy
| 
|
|
*/
mainDirective.directive('siderBarTree',function(){
  return{
    restrict: 'EC',
    replace: true,
    controller:function($scope,mainService,CW_CONSTANT){
      $scope.siderBarTreeNodesData = mainService.getSiderBarData();
      $scope.CW_CONSTANT = CW_CONSTANT;

    },
    scope: {
      navTabs:"=navtabs",
      geneRateTabIdByNode:"&genetabid",
    },
    template:'<div id="siderBar_tree"></div>',
    link: function (scope, element, attr) {
      var treeId = 'siderBar_tree';
      var tabType='menu';
      //初始化树
      function initTreeData(){
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
          $('#'+treeId).treeview($.extend(initData,scope.siderBarTreeNodesData));
      }
      //侧边栏绑定事件
      function binderEvent(){
        $('#'+treeId).on('nodeSelected', function(event, data) {
            //判断是否叶子节点,只有叶子节点点击的时候才会添加Tab 项目
            if(data.leaf === true){
              //每个业务数据Id只能打开一个tab页面
                if(tabAddValidate(data)){
                    scope.$apply(addTab(data));
                }
              
            }else{}
        });
      }
      //tab创建事件传播
      function emmitTabCreateEvent(nodeData){
        scope.$emit(scope.CW_CONSTANT.sider_bar_tab_created_event,nodeData);
      }
      //tab再次被选中事件
      function emmitTabSelecteEvent(nodeData){
        scope.$emit(scope.CW_CONSTANT.sider_bar_tab_select_event,nodeData);
      }
      //当前选中的tab 菜单是否已经包含
      function tabAddValidate(nodeData){
          for(var i=0;i<scope.navTabs.tabs.length;i++){
            var _curr_tab = scope.navTabs.tabs[i];
            //菜单类型的tab项
            if(_curr_tab.type == scope.CW_CONSTANT.sider_bar_tab_type){
                //如果已经包就不添加了,但是激活当前选中菜单
                if(angular.equals(_curr_tab,nodeData)){
                    //激活当前选中菜单
                   scope.$apply(function(){
                      scope.navTabs.currentTabId = scope.geneRateTabIdByNode()(nodeData);

                   });
                   //TAB选中事件传播,=> tabContent 激活选中TABcontent
                   emmitTabSelecteEvent(nodeData);
                   return false;
                };
            }
          }
          return true;
      }
      //添加Tab项
      function addTab(data){
        //记录当前选中的TabId
        scope.navTabs.currentTabId = scope.geneRateTabIdByNode()(data);
        //通知有新的tab创建了=>main-directive.js  tabContent 使用
        emmitTabCreateEvent(data);
        //添加到tab列表
        scope.navTabs.tabs.splice(0,0,data);
        $('#'+scope.geneRateTabIdByNode()(data)).tab('show');

      }
      //初始化
      initTreeData();
      //绑定事件
      binderEvent();
    }
  }
});
/*
| tabContent指令:用于主页面的显示
| @author:cowboy
| 
|
|
*/
mainDirective.directive('tabContent',function(){
  return{
    restrict: 'EC',
    replace: true,
    controller:function($scope,$element,$attrs,$transclude,$compile,mainService,CW_CONSTANT){
        //TAB创建
         $scope.$on(CW_CONSTANT.tab_create_event,function(d,data){
            $transclude(function(){
              //
               activeTabContent();
               $compile('<div></div>')
               var _tab_content_ele = $compile('<div role="tabpanel"  class="tab-pane active" id="'+$scope.genetabcontentid()(data)+'">'
              		                          +'<div  ng-include="\''+data.url+'\'"></div>'+
              		                         '</div>')($scope);
               $element.append(_tab_content_ele);
            });      
         });

       //TAB选中
       $scope.$on(CW_CONSTANT.tab_select_event,function(d,data){
          $transclude(function(){
             //
             activeTabContent(data);
          });      
       });

      //TAB删除,需要删除TAB_content
      $scope.$on(CW_CONSTANT.tab_remove_event,function(d,data){
         $transclude(function(){
           $("#"+$scope.genetabcontentid()(data)).remove();
           if(data.is_remove_active_tab){
             //start 重新激活tab,***********************************************************
             var _remove_tab_index = data.index;
             var _tab_size = $scope.navTabs.tabs.length;
             if(_tab_size == 0){
               return;
             }else{
               //是否是移除最后一个TAB
               if(_tab_size == _remove_tab_index){
                  _remove_tab_index--;
               }
             }
             $scope.navTabs.currentTabId = $scope.geneRateTabIdByNode()($scope.navTabs.tabs[_remove_tab_index]);
             $('#'+$scope.geneRateTabIdByNode()($scope.navTabs.tabs[_remove_tab_index])).tab('show');  
             //激活tabContent
             activeTabContent($scope.navTabs.tabs[_remove_tab_index]);
             //end 重新激活tab,***********************************************************
           }
         
         });
      });
      function activeTabContent(data){
        $("#tab-content").find('div.tab-pane').removeClass("active");
        if(data){
           $("#tab-content").find('#'+$scope.genetabcontentid()(data)).addClass('active');
        }
      }
    },
    scope: {
      navTabs:"=navtabs",
      genetabcontentid:'&',
      geneRateTabIdByNode:"&genetabid"
    },
    transclude:true,
    template:'<div id="tab-content" ng-transclude id="a"></div>',
    link:function(scope, element, attr){

    }
  } 
});