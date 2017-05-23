import angular from 'angular';
import template from './previsionnel_batiment.html';
// import img1 from '../../images/P1060933.jpg';
// import img2 from '../../images/P1060937.jpg';
// import img3 from '../../images/P1060971.jpg';
// import img4 from '../../images/P1060993.jpg';
// import img5 from '../../images/P1060999.jpg';

export const PrevisionnelBatimentComponent = {
    bindings: {
        facilityNb: '<',
        productions: '<'
    },
    template,
    controller: class PrevisionnelBatimentController {
        constructor($scope){
            'ngInject';
            this.scope = $scope;

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