var app = angular.module("framezapp",[]);

app.controller('mainController', ['$http', '$scope' , function($http , $scope){
	var self = this;
	self.remain_person_counts = [];

	$scope.activeTitle = function(index){
		jQuery(".boxportfolio4").eq(index + 1).find(".boxcontainer").find("#title_bar").addClass("activate");
		jQuery(".boxportfolio4").eq(index + 1).find(".boxcontainer").find(".information").show();
	}

	$scope.deactiveTitle = function(index){
		jQuery(".boxportfolio4").find(".boxcontainer").find("#title_bar").removeClass("activate");
		jQuery(".boxportfolio4").find(".boxcontainer").find(".information").hide();
	}

	$http.get("project.json").success(function(data){
		
		self.projects = data;
		
		for(var index = 0 ; index < data.length ; index ++){

			if(data[index].collaborators.length > 4){
				self.remain_person_counts.push(data[index].collaborators.length - 3);
			} else {
				self.remain_person_counts.push(0)
			}
		}

		setTimeout(function(){
			for(var index = 0 ; index < data.length ; index++){
				if(self.remain_person_counts[index] > 0) {
					jQuery(".boxportfolio4").eq(index + 1).find(".boxcontainer").find(".collaborators").find(".content").find(".avatar").last().remove();
				}
			}
		},100);
	});
}])