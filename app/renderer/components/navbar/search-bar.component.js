import './search-bar.scss';

export const SearchBarComponent = {
    bindings: {},
    restrict: 'E',
    template: `
        <div class="search-bar">
            <div class="input">
                <input type="text" ng-model="searchQuery.name" class="field" />
                <span class="glyphicon glyphicon-remove" ng-if="vm.searchQuery" ng-click="vm.close()" style="cursor: pointer;"></span>
                <span class="glyphicon glyphicon-search"></span>
            </div>
            <div class="search-result" ng-if="searchQuery.name && vm.isOpen">
                <ul class="list-box">
                    <li ng-repeat="result in vm.productions | filter: searchQuery" ng-click="vm.goToProduction(result)">
                        {{ result.name.toUpperCase() }} - {{ result.facility.size }}m
                    </li>
                </ul>
            </div>
        </div>
    `,
    controller: class SearchBarController {
        constructor(PouchDbService, $state, $scope) {
            'ngInject';
            this.productions = [];
            this.dbService = PouchDbService;
            this.state = $state;
            this.isOpen = false;
            this.searchProductions();

            $scope.$watch('searchQuery.name', () => {
                this.isOpen = true;
            })
        }

        searchProductions() {
            return this.dbService.find('production').then((productions) => { this.productions = productions });
        }

        goToProduction(result) {
            this.state.go('presentation', {
                department: result.department,
                production: {
                    name: result.name,
                    size: result.facility.size
                }
            }).then(() => this.close())
        }

        close() {
            this.searchQuery = null;
            this.isOpen = false;
        }
    },
    controllerAs: 'vm'
};
