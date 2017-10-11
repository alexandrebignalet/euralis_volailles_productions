import angular from 'angular';
import {PouchDbService} from './pouchdb.service';

export const PouchDbModule = angular.module('PouchDbModule', [])
    .service('PouchDbService', PouchDbService)
    .constant('DB_INFO', { name: 'euralis_volailles_db-', remoteUrl: 'http://217.182.169.232:5984/' })
    .name;