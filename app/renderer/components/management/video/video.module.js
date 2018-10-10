import angular from 'angular';
import {VideoFormComponent} from './video_form.component';
import {VideoComponent} from './video.component';
import {VideoService} from './video.service';


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
                    videos: PouchDbService => PouchDbService.find(ENTITY_NAME)
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
                onEnter: (ModalService, $state) => ModalService.open('videoForm', {
                    video: {}
                })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            })
            .state('video.edit', {
                parent: 'video',
                url: '/:id/edit',
                onEnter: (ModalService, PouchDbService, $stateParams, $state) => ModalService
                    .open('videoForm', {
                        video: PouchDbService.find(ENTITY_NAME, $stateParams.id)
                    })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            })
            .state('video.remove', {
                parent: 'video',
                url: '/:id/remove',
                onEnter: (ModalService, PouchDbService, $stateParams, $state) => ModalService.open('videoForm', {
                        video: PouchDbService.find(ENTITY_NAME, $stateParams.id)
                    })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            });
    })
    .component('videoForm', VideoFormComponent)
    .component('videos', VideoComponent)
    .service('VideoService', VideoService)
    .name;