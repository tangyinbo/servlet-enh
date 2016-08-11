var mainQueryFormDirective = angular.module('main.queryForm.Directive',[]);
mainQueryFormDirective.controller('quryFormController',function($scope){
    //form布局所需的数据,
    $scope.formLayoutData= (function(){
        //每行显示多少个input项
        var _line_column_count = $scope.formDataProvier.config.linecInputCount;
        //每行的input集合
        var _rowInputArray = [];
        var _rowInput = [];
        //分行,如果每行显示4,一共有7个input,会显示为两行
        for(var i=0;i<$scope.formDataProvier.items.length;i++){
            _rowInput.push($scope.formDataProvier.items[i]);
            if( ((i+1) % _line_column_count == 0) || (i==$scope.formDataProvier.items.length-1)){
                _rowInputArray.push(_rowInput);
                _rowInput = [];
            }
        }
        return _rowInputArray;
    })();
});
/**
 *
 */
mainQueryFormDirective.directive('mainQueruForm',function(){
    return{
            restrict: 'ECA',
            transclude: true,
            controller:'quryFormController',
            scope: {
                formDataProvier:'='
            },
            templateUrl:'scripts/ng-app/form/queryForm.html',
            link: function (scope, element, attrs) {

            }
    }
});