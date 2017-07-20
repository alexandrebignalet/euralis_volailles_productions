import template from './sync-dialog.html';
import loader from '../../images/index.curved-bar-spinner.gif';

export const SyncDialogComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class SyncDialogController {
        constructor(ProductionDataService, $scope, $timeout) {
            'ngInject';
            this.dataService = ProductionDataService.repositories.production;
            this.logs = [];
            this.isSyncing = false;
            this.scope = $scope;
            this.timeout = $timeout;
            this.loader = loader;
        }

        sync() {
            this.isSyncing = true;

            this.dataService.remoteDb.info()
                .then(() =>
                    this.dataService.db.sync(this.dataService.remoteDb)
                        .on('complete', () => {
                            this.logs.push('Synchronisation terminé avec succès');
                            this.isSyncing = false;
                            this.scope.$apply();
                            this.close();
                        })
                        .on('change', (change) => {
                            this.logs.push("Changements effectués: ");
                            this.logs.push(change);
                            this.scope.$apply();
                        })
                        .on('paused', (info) => {
                            this.logs.push('Traitement en cours...');
                            this.scope.$apply();
                        })
                        .on('active', (info) => {
                            this.logs.push('Traitement en cours...');
                            this.scope.$apply();
                        })
                        .on('error', (err) => {
                            this.logs.push(err.result);
                            this.isSyncing = false;
                            this.scope.$apply();
                        }))
                .catch(() => {
                    this.logs.push('Vous devez être connecté à internet pour synchroniser votre application.');
                    this.isSyncing = false;
                    this.scope.$apply();
                })
        }

        close() {
            this.timeout(() => {
                this.modalInstance.close();
            }, 2000);
        }
    },
    controllerAs: 'vm'
};