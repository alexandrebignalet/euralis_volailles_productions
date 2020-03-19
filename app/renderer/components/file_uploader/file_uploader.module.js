import 'angular-file-upload';
import {ThumbImagesDirective} from './thumb_images.directive';
import {FileUploaderComponent} from './file_uploader.component';

export const FileUploaderModule = angular.module('FileUploaderModule', ['angularFileUpload'])
    .directive('thumbImages', ThumbImagesDirective)
    .component('fileUploader', FileUploaderComponent)
    .name;