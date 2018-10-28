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
                    investments: PouchDbService => PouchDbService.find(ENTITY_NAME)
                },
                onEnter: (SidebarService) => SidebarService.closeNav()
            })
            .state('investment.create', {
                parent: 'investment',
                url: '/create',
                onEnter: (ModalService, $state) => ModalService.open('investmentForm', {
                    investment: { options: [] }
                })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            })
            .state('investment.edit', {
                parent: 'investment',
                url: '/:id/edit',
                onEnter: (ModalService, PouchDbService, $stateParams, $state) => ModalService.open('investmentForm', {
                        investment: PouchDbService.find(ENTITY_NAME, $stateParams.id)
                    })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            })
            .state('investment.remove', {
                parent: 'investment',
                url: '/:id/remove',
                onEnter: (ModalService, PouchDbService, $stateParams, $state) => ModalService.open('investmentForm', {
                        investment: PouchDbService.find(ENTITY_NAME, $stateParams.id)
                    })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            });
    })
    .component('investments', InvestmentComponent)
    .component('investmentForm', InvestmentFormComponent)
    .name;