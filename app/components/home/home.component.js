import template from './home.html';
import './home.scss';
import banner from '../../images/banner.svg';
import img1 from '../../images/P1060933.jpg';
import img2 from '../../images/P1060937.jpg';
import img3 from '../../images/P1060971.jpg';
import img4 from '../../images/P1060993.jpg';
import img5 from '../../images/P1060999.jpg';

export const HomeComponent = {
    restrict: 'E',
    bindings: {},
    template,
    controller: class HomeController {
        constructor($scope, $state){
            'ngInject';

            this.banner = banner;

            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            $scope.active = 0;
            this.images = [img1, img2, img3, img4, img5];
            this.carousel = [];
            const imgNb = 5;
            for(let i = 0; i < 5 ; i++) {
                this.carousel.push({id:i, image: this.images[i]})
            }

            this.selectedDepartment = '';

            $scope.$on('department', (event, data) => {
                $state.go('presentation', {department: data});
            });
        }
    },
    controllerAs: 'vm'
};