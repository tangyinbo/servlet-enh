/**
 * Created by cowboy on 16-8-4.
 */
var userService = angular.module('com.cb.UserService',[]);
userService.service('userService',function($http,$q){
    return{
        //获取群组信息
        getUsers:function(data){
            var data= $.param(data);
            var deferred = $q.defer();
            $http({
                method : 'POST',
                cache:false,
                data:data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
                url : "/servlet-enh/myServlet"
            }).success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
    }
});
