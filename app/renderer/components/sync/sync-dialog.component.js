import './google_loader.scss';
import template from './sync-dialog.html';

export const SyncDialogComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class SyncDialogController {
        constructor($scope, $timeout, PouchDbService, SidebarService, $state) {
            'ngInject';
            this.scope = $scope;
            this.timeout = $timeout;
            this.state = $state;

            this.PouchDbService = PouchDbService;
            this.SidebarService = SidebarService;
            this.syncHandler = null;

            this.logs = [];
            this.isSyncing = false;
        }

        synchronise(username, password) {
            this.isSyncing = true;
            this.PouchDbService.sync(username, password).then((syncHandler) => {

                this.syncHandler = syncHandler().on('complete', (res) => {
                    console.warn('sdh complete: ', res);

                    this.SidebarService.closeNav();
                    this.endSync(2000);
                })
                    .on('denied', (res) => {
                        console.warn('sdh denied: ', res);

                        return this.stopSync()
                            .then(() => {
                                this.scope.username = null;
                                this.scope.password = null;
                                this.log("Mauvais identifiants");
                            })
                    })
                    .on('change', (res) => {
                        console.warn('CHANGE DU BAS ', res);
                        if(res.direction === 'pull')
                            this.log("Récupération des modifications.");
                        if(res.direction === 'push')
                            this.log("Envoi des modifications.");
                    })
                    .on('error', (err) => {
                        this.log("Erreur: ", err);
                        this.endSync(2000);
                    }).then((res) => {
                    console.warn('then: ', res);
                }).catch((res) => { console.warn('catch: ', res)})
            })
        }

        log(info) {
            this.logs.push(info);
            this.scope.$apply();
        }

        stopSync() {
            this.syncHandler.cancel().then(() => this.isSyncing = false)
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
                this.modalInstance.close()
            }, 1000);
        }
    },
    controllerAs: 'vm'
};