//var app = angular.module('shopping-list-app', []);
app.controller('ShoppingListsController', ['$scope','$http', function ($scope, $http){
		
		$scope.currentUserListID = "";
		$scope.selectedUserList = "";
		$scope.newItem = "";		
		$scope.orderProp = "ListItemName";
		
		$scope.selectListChanged = function (selectedItem) {
			if(selectedItem)
			{
				$scope.selectedUserList = selectedItem.UserListName;
				$http.get('http://ec2-52-24-183-31.us-west-2.compute.amazonaws.com/ShoppingListAPI/UserListsRESTService.svc/GetListByUserListsID/' + selectedItem.UserListID)
					.success(function (currentUserList, status, headers, config) {
						$scope.currentList = currentUserList;
						$scope.currentUserListID = selectedItem.UserListID;	
					})
					.error(function (data, status, headers, config) { 
						alert(status);
					});
			}
			else
			{
				$scope.selectedUserList = "";
				$scope.currentList = null;
			}
		};			
		
		$scope.addNewItemToCurrentList = function (newItem){
			$http.post('http://ec2-52-24-183-31.us-west-2.compute.amazonaws.com/ShoppingListAPI/UserListsRESTService.svc/InsertListItem/', {itemName:newItem, userListID : $scope.currentUserListID})
			.success(function(newItemID, status, headers, config){
				$scope.currentList.push({ListItemID: newItemID, ListItemName: newItem });
				$scope.newItem = "";
			})
			.error(function (data, status, headers, config) { 
				alert(status);
			});
		};

		$scope.deleteChecked = function(){
			for(var i = $scope.currentList.length - 1; i >= 0; i--){
				if($scope.currentList[i].Selected == true){					
					$http.post('http://ec2-52-24-183-31.us-west-2.compute.amazonaws.com/ShoppingListAPI/UserListsRESTService.svc/DeleteListItem/', {listItemID : $scope.currentList[i].ListItemID})
					.success(function(response, status, headers, config){
						if(response != "-1")
						{
							var item;
							for (var i = $scope.currentList.length - 1; i >= 0; i--){
								if ($scope.currentList[i].ListItemID == response) {
									item = $scope.currentList[i];
									break;
								}
							}
							$scope.currentList.splice($scope.currentList.indexOf(item),1);
						}							
					})
					.error(function (data, status, headers, config) { 
						alert(status);
					});
				}
			}		
		}		
		
		$http.get('http://ec2-52-24-183-31.us-west-2.compute.amazonaws.com/ShoppingListAPI/UserListsRESTService.svc/GetUserListsByUserID/1')
		.success(function (userLists, status, headers, config) {
			$scope.userLists = userLists;		
		})
		.error(function (data, status, headers, config) { 
			alert(status);
		});
	
	
	
}]);