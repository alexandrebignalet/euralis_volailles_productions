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
            this.dataService = ProductionDataService.repositories.production.dbService;
            this.logs = [];
            this.isSyncing = false;
            this.scope = $scope;
            this.timeout = $timeout;
            this.loader = loader;
            this.syncAttemps = 1;
        }

        sync() {
            this.isSyncing = true;

            this.dataService.remoteDb.info()
                .then(() => new Promise((resolve, reject) => {

                    this.dataService.db.sync(this.dataService.remoteDb)
                        .on('complete', () => {
                            this.logs.push('Synchronisation terminée.');
                            this.isSyncing = false;
                            this.scope.$apply();
                            this.close();
                            resolve();
                        })
                        .on('change', (change) => {
                            this.logs.push("Changements effectués avec succès !");
                            console.log('change ', change);
                        })
                        .on('paused', (info) => {
                            this.logs.push('Synchronisation mise en pause, reprise dans un instant...');
                            this.scope.$apply();
                            console.log('info ', info);
                        })
                        .on('active', (info) => {
                            if(info.direction) {
                                if(info.direction.pull) this.logs.push('<< Reception des changements');
                                if(info.direction.push) this.logs.push('>> Envoi des changements')
                            }
                            this.scope.$apply();
                        })
                        .on('error', (err) => {
                            console.log('error ', err);
                            if(attempts === 5) {
                                this.syncAttemps = 1;
                                reject();
                            }
                            if(!err.ok) {
                                attempts++;
                                this.logs.push(`Erreur de synchronisation. Nouvel essai ${attempts}...`);
                                this.scope.$apply();
                                return this.sync();
                            }
                        })
                }))
                .catch(() => {
                    this.logs.push('Vous devez être connecté à internet pour synchroniser votre application.');
                    this.isSyncing = false;
                    this.scope.$apply();
                })
        }

        destroy() {
            this.isSyncing = true;

            return this.dataService.destroy().then(() => dbDestroyedThen).catch(() => dbDestroyedThen);

            function dbDestroyedThen() {
                this.isSyncing = false;
                this.scope.$apply();
            }
        }

        close() {
            this.timeout(() => {
                this.modalInstance.close();
            }, 1000);
        }
    },
    controllerAs: 'vm'
};