

var myApp = angular.module('modalTest', ['ui.bootstrap','ngAnimate' ]);



myApp.factory('Data', function () {

    cartData = [
        {'name': 'Apple', 'category': 'Fruit', 'quantity': 3, 'price': 1.10},
        {'name': 'Orange', 'category': 'Fruit', 'quantity': 2, 'price': 1.99},
        {'name': 'Melon', 'category': 'Fruit', 'quantity': 1, 'price': 3.22}
    ];

    return cartData;
});

    myApp.controller('dialogServiceTest', function ($scope, $uibModal, $log, Data) {

        $scope.cartData = Data;


        $scope.launch = function (which, index, item) {

            switch (which) {

                // Error Dialog
                case 'remove':
                    remove(index);
                    break;

                // Add Button Click
                case 'add':
                    var newItem = {
                        'name': $scope.item,
                        'category': $scope.category,
                        'quantity': $scope.quantity,
                        'price': $scope.price
                    };
                    $scope.cartData.push(newItem);

                    break;

                // Confirm Dialog
                case 'edit':
                    modalEdit(item);
                    break;

                default:
                    console.log("default switch value");


            }; // end switch
        }; // end launch


        //FUNCTIONS RELATED TO LAUNCH


        //function to open modal window.

        var modalEdit = function (item) {

            console.log("Item being passed: "+ " price: " + item.price + " category: "  + item.category);


            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'editItemTemplate.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };
        };

        //remove item function
        var remove = function (index) {
            $scope.cartData.splice(index, 1);
        }


    }); // end dialogsServiceTest


    //this controller will control the modal window template called editItemTemplate.html
    myApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, item, Data) {

        $scope.item = item;

        $scope.ok = function (item) {



                    console.log("modalUpdate new name: " + item.name);

                    $uibModalInstance.close($scope.item);




        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

