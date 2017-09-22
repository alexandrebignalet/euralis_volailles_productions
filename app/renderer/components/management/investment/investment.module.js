import {PouchDataService} from './investment.service';
import {InvestmentComponent} from './investment.component';
import {InvestmentFormComponent} from './investment_form.component';

export const InvestmentModule = angular.module('InvestmentModule', [])
    .config(($stateProvider) => {
        'ngInject';
        const ENTITY_NAME = 'investment';

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
                    investments: PouchDataService => PouchDataService.get(ENTITY_NAME)
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
                onEnter: (ModalService, PouchDataService, $stateParams) => ModalService.open('investmentForm', {
                        investment: PouchDataService.get(ENTITY_NAME, $stateParams.id)
                    })
            })
            .state('investment.remove', {
                parent: 'investment',
                url: '/:id/remove',
                onEnter: (ModalService, PouchDataService, $stateParams) => ModalService.open('investmentForm', {
                        investment: PouchDataService.get(ENTITY_NAME, $stateParams.id)
                    })
            });
    })
    .component('investments', InvestmentComponent)
    .component('investmentForm', InvestmentFormComponent)
    .name;