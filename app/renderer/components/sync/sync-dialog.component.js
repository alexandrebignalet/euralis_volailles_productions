import './google_loader.scss';
import template from './sync-dialog.html';

export const SyncDialogComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class SyncDialogController {
        constructor($scope, $timeout, PouchDbService) {
            'ngInject';
            this.scope = $scope;
            this.timeout = $timeout;

            this.PouchDbService = PouchDbService;
            this.syncHandler = null;

            this.logs = [];
            this.isSyncing = false;
        }

        synchronise() {
            this.isSyncing = true;

            this.syncHandler = this.PouchDbService.sync()
            .on('complete', (res) => {
                this.log("Synchronisation terminée.");
                this.endSync(2000);
            })
            .on('denied', (res) => {
                this.log("Denied ", JSON.stringify(res));
            })
            .on('change', (res) => {
                this.log("Change ", JSON.stringify(res));
            })
            .on('paused', (res) => {
                if(!res) {
                    this.log("Synchronisation terminée, en attente e nouveau changement.");
                    this.endSync(2000);
                }
            })
            .on('active', (res) => {

            })
            .on('error', (err) => {
                this.log("Erreur: ", err);
                this.endSync(2000);
            });
        }

        log(info) {
            this.logs.push(info);
            this.scope.$apply();
        }

        endSync(closeBeforeTime) {
            this.timeout(() => {
                this.isSyncing = false;
                this.scope.$apply();
                this.close();
            }, closeBeforeTime);
        }

        close() {
            this.timeout(() => {
                if(this.syncHandler) this.syncHandler.cancel();
                this.modalInstance.close();
            }, 1000);
        }
    },
    controllerAs: 'vm'
};