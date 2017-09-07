import {InvestmentDataService} from './investment.service';
import {InvestmentComponent} from './investment.component';
import {InvestmentFormComponent} from './investment_form.component';

export const InvestmentModule = angular.module('InvestmentModule', [])
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('investment', {
                parent: 'components',
                url: '/investments',
                views: {
                    'content@': {
                        template: '<investments investments="$resolve.investments"></investments>'
                    }
                },
                resolve: {
                    investments: InvestmentDataService => InvestmentDataService.all()
                },
                onEnter: (SidebarService) => SidebarService.closeNav()
            })
            .state('investment.create', {
                parent: 'investment',
                url: '/create',
                onEnter: ModalService => ModalService.open('investmentForm', {
                    investment: {diverseOptions: 0}
                })
            })
            .state('investment.edit', {
                parent: 'investment',
                url: '/:id/edit',
                onEnter: (ModalService, InvestmentDataService, $stateParams) => ModalService.open('investmentForm', {
                        investment: InvestmentDataService.get($stateParams.id)
                    })
            })
            .state('investment.remove', {
                parent: 'investment',
                url: '/:id/remove',
                onEnter: (ModalService, InvestmentDataService, $stateParams) => ModalService.open('investmentForm', {
                        investment: InvestmentDataService.get($stateParams.id)
                    })
            });
    })
    .service('InvestmentDataService', InvestmentDataService)
    .component('investments', InvestmentComponent)
    .component('investmentForm', InvestmentFormComponent)
    .name;