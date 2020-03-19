import {SidebarComponent} from './sidebar.component';
import {SidebarService} from './sidebar.service';
import './sidebar.scss';

export const SidebarModule = angular.module('SidebarModule', [])
    .component('sidebar', SidebarComponent)
    .service('SidebarService', SidebarService)
    .name;