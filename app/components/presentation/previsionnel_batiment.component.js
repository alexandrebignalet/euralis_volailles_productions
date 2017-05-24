import angular from 'angular';
import template from './previsionnel_batiment.html';

export const PrevisionnelBatimentComponent = {
    bindings: { productions: '<' },
    template,
    controller: class PrevisionnelBatimentController {
        constructor($scope){
            'ngInject';
            this.scope = $scope;
            this.facilityNb = 2;
            this.sliderOptions = {
                floor: 1,
                ceil: 20
            };

            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            $scope.active = 0;
            this.images = ['./images/P1060933.jpg', './images/P1060937.jpg', './images/P1060971.jpg', './images/P1060993.jpg', './images/P1060999.jpg'];
            this.carousel = [];
            const imgNb = 5;
            for(let i = 0; i < 5 ; i++) {
                this.carousel.push({id:i, image: this.images[i]})
            }
        }

        $onInit() {
            if (this.productions[0].facility.type === 'cabane') { this.facilityNb = 8; }
            this.scope.$watch('vm.facilityNb', () => {
                this.update();
            });
        }

        update() {
            angular.forEach(this.productions, (production) => {
                production.setFacilitiesNb(this.facilityNb);
            });
        }
    },
    controllerAs: 'vm'
};