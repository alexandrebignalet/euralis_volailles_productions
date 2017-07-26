import angular from 'angular';
import {ImageLoaderService} from './image_loader.service';
import {ImageLoaderComponent} from './image_loader.component';

export const ImageLoaderModule = angular.module('ImageLoaderModule', [])
    .component('imageLoader', ImageLoaderComponent)
    .service('ImageLoaderService', ImageLoaderService)
    .name;