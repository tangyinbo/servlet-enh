/*
mainService
*/
var mainService = angular.module('cb.main.service',[]);
mainService.factory('mainService',function($http){
	var httpUrl='';
	return{
		//页面初始化
		initMainPage:function(){
			return{
				siderBarNodes:siderBatData()
			}
		},
		//获取侧边栏数据
		getSiderBarData:function(){
			return siderBatData();
		}
	}
});
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
                    leaf:true,
                    url:'test2.html'
                  },
                  {
                    nodeId:3,
                    text: 'Grandchild 2',
                    href: '#grandchild2',
                    tags: ['0'],
                     type:'menu',
                    leaf:true,
                    url:'test2.html'
                  }
                ]
              },
              {
                nodeId:4,
                text: 'Child 2',
                href: '#child2',
                tags: ['0'],
                 type:'menu',
                leaf:true,
                url:'test2.html'
              }
            ]
          },
          {
          nodeId:5,
            text: 'Parent 2',
            href: '#parent2',
            tags: ['0'],
             type:'menu',
            leaf:true,
            url:'test2.html'
          },
          {
            nodeId:6,
            text: 'Parent 3',
            href: '#parent3',
            tags: ['0'],
            type:'menu',
            leaf:true,
            url:'test3.html'
          },
          {
            nodeId:7,
            text: 'Parent 4',
            href: '#parent4',
            tags: ['0'],
             type:'menu',
            leaf:true,
            url:'test4.html'
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
                    leaf:true,
                    url:'test2.html'
                  },
                  {
                    nodeId:10,
                    text: 'Grandchild 2',
                    href: '#grandchild2',
                    tags: ['0'],
                     type:'menu',
                    leaf:true,
                    url:'test2.html'
                  }
                ]
          }
        ]
  }
}
