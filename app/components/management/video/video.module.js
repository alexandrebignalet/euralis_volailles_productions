import angular from 'angular';
import {VideoFormComponent} from './video_form.component';
import {VideoComponent} from './video.component';
import {VideoDataService} from './video.service';


export const VideoModule = angular
    .module('Video', [])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        $stateProvider
            .state('video', {
                parent: 'management',
                url: '/videos',
                resolve: {
                    videos: VideoDataService => VideoDataService.all()
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
                onEnter: (ModalService, VideoDataService, FacilityDataService, $stateParams) => ModalService
                    .open('videoForm', {
                        video: VideoDataService.get($stateParams.id)
                    })
            })
            .state('video.remove', {
                parent: 'video',
                url: '/:id/remove',
                onEnter: (ModalService, VideoDataService, $stateParams) => ModalService.open('videoForm', {
                        video: VideoDataService.get($stateParams.id)
                    })
            });
    })
    .component('videoForm', VideoFormComponent)
    .component('videos', VideoComponent)
    .service('VideoDataService', VideoDataService)
    .name;