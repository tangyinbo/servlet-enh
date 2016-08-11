var userModule = angular.module('com.cb.User',['com.cb.UserService','main.queryForm.Directive','main.queryDataGrid.Directive']);
userModule.controller('userController',function($scope,userService){
     $scope.pageLayoutDataProvider = pageLayoutDataProvider();
     $scope.formDataProvier= $scope.pageLayoutDataProvider.queryForm;
     $scope.queryFormEntity={}



    $scope.gridData = [];
    $scope.gridColumnsMsgProvider = $scope.pageLayoutDataProvider.gridColumns;
    $scope.queryData=function(){
         userService.getUsers({name:'bobo'}).then(function(data){
             $scope.gridData = data;
         });
     }

});

function pageLayoutDataProvider(){
    return{
        queryForm:{
            config:{
                linecInputCount:4,//每行的列数
                bindingModelName:'user'//绑定的模型名称
            },
            items:[{
                field:'name',
                lablelTest:'名称',
                required:false,
                placeholder:'名称'
            },{
                field:'age',
                lablelTest:'年龄',
                required:false,
                placeholder:'年龄'
            },
            {
                field:'addr',
                lablelTest:'地址',
                required:false,
                placeholder:'地址'
            },
            {
                field:'email',
                lablelTest:'邮箱',
                required:false,
                placeholder:'邮箱'
            },
            {
                field:'birthday',
                lablelTest:'生日',
                required:false,
                placeholder:'生日'
            },

                {
                    field:'addr',
                    lablelTest:'地址',
                    required:false,
                    placeholder:'地址'
                },
                {
                    field:'email',
                    lablelTest:'邮箱',
                    required:false,
                    placeholder:'邮箱'
                },
                {
                    field:'birthday',
                    lablelTest:'生日',
                    required:false,
                    placeholder:'生日'
                }]},
        gridColumns:[
            {text:'ID',
             binderField:'id'
            },
            {text:'姓名',
                binderField:'name'
            },
            {text:'年龄',
                binderField:'age'
            },
            {text:'生日',
                binderField:'birthday'
            },
            {text:'地址',
                binderField:'address'
            },
            {text:'邮箱',
                binderField:'email'
            },
            {text:'移动电话',
                binderField:'telephone'
            }
        ]
    }
}