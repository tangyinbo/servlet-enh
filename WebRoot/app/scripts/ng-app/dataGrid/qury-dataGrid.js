var mainQueryDataGridDirective = angular.module('main.queryDataGrid.Directive',[]);
mainQueryDataGridDirective.controller('mainQueryDataGridController',function($scope){
    $scope.jsonToArrayItem =function(jsonObj){
        var _itemArr = [];
        for(jsonItem in jsonObj){
            _itemArr.push({'vlaue':jsonObj[jsonItem]});
        }
        return _itemArr;
        alert('kaka')
    }

    $scope.getItems = function(){
        return[1,2,3]
    }
});

function compileTableElements(gridColumnsMsgProvider){

}
/**
 *
 */
mainQueryFormDirective.directive('queryDataGrid',function($compile){

    return{
        restrict: 'ECA',
        controller:'mainQueryDataGridController',
        scope: {
            gridData:"=",
            gridColumnsMsgProvider:"="
        },
        compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {

                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        //初始化表头
                        var _tableHeader = renderHeader();
                        //初始化行元素
                        var _tableBody = renderRows();
                        var tableHeader = $compile(_tableHeader)(scope);
                        var tableBody = $compile(_tableBody)(scope);
                        iElement.append(tableHeader);
                        iElement.append(tableBody);


                        function renderHeader(){
                            var _tableHeaders ='<thead> <tr>';
                            _tableHeaders+=' <th ng-repeat="th in gridColumnsMsgProvider">{{th.text}}</th>';
                            _tableHeaders+=' </tr></thead>';
                            return _tableHeaders;
                        }

                        function renderRows(){
                            var _tableBody ='<tbody> ';
                            _tableBody+='<tr ng-repeat="row_item in gridData">';
                            for(var i=0;i<scope.gridColumnsMsgProvider.length;i++){
                                console.log(scope.gridColumnsMsgProvider[i].binderField);
                                _tableBody+='<td>';
                                _tableBody+='{{row_item.'+scope.gridColumnsMsgProvider[i].binderField+'}}';
                                _tableBody+=' </td>';
                            }
                            _tableBody+='</tr>';
                            _tableBody+='</tbody>';
                            console.log(_tableBody);
                            return _tableBody;
                        }
                    }
                }
         }
    }
});