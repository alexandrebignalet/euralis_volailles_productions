import angular from 'angular';
import {ProspectFormComponent} from './prospect_form.component';

export const ProspectModule = angular
    .module('Prospect', [])
    .component('prospectForm', ProspectFormComponent)
    .name;