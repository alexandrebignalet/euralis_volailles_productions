import angular from 'angular';
import {ImageLoaderComponent} from './image_loader.component';

export const ImageLoaderModule = angular.module('ImageLoaderModule', [])
    .component('imageLoader', ImageLoaderComponent)
    .name;