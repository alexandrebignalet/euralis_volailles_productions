import angular from 'angular';
import {VideoFormComponent} from './video_form.component';
import {VideoComponent} from './video.component';


export const VideoModule = angular
    .module('Video', [])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';
        const ENTITY_NAME = 'video';

        $stateProvider
            .state('video', {
                parent: 'management',
                url: '/videos',
                resolve: {
                    videos: PouchDataService => PouchDataService.get(ENTITY_NAME)
                },
                views: {
                    'content@': {
                        template: '<videos videos="$resolve.videos"></videos>',
                    }
                },
                onEnter: (SidebarService) => SidebarService.closeNav()
            })
            .state('video.create', {
                parent: 'video',
                url: '/create',
                onEnter: (ModalService, FacilityDataService) => ModalService.open('videoForm', {
                    video: {}
                })
            })
            .state('video.edit', {
                parent: 'video',
                url: '/:id/edit',
                onEnter: (ModalService, PouchDataService, FacilityDataService, $stateParams) => ModalService
                    .open('videoForm', {
                        video: PouchDataService.get(ENTITY_NAME, $stateParams.id)
                    })
            })
            .state('video.remove', {
                parent: 'video',
                url: '/:id/remove',
                onEnter: (ModalService, PouchDataService, $stateParams) => ModalService.open('videoForm', {
                        video: PouchDataService.get(ENTITY_NAME, $stateParams.id)
                    })
            });
    })
    .component('videoForm', VideoFormComponent)
    .component('videos', VideoComponent)
    .name;