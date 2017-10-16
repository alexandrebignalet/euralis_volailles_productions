import './google_loader.scss';
import template from './sync-dialog.html';

export const SyncDialogComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class SyncDialogController {
        constructor($scope, $timeout, PouchDbService, SidebarService) {
            'ngInject';
            this.scope = $scope;
            this.timeout = $timeout;

            this.PouchDbService = PouchDbService;
            this.SidebarService = SidebarService;
            this.syncHandler = null;

            this.logs = [];
            this.isSyncing = false;
        }

        synchronise() {
            this.isSyncing = true;

            this.syncHandler = this.PouchDbService.sync()
            .on('complete', (res) => {
                this.SidebarService.closeNav();
                this.endSync(2000);
            })
            .on('denied', (res) => {
                this.log("Denied " + JSON.stringify(res));
            })
            .on('change', (res) => {
                if(res.direction === 'pull')
                    this.log("Récupération des modifications.");
                if(res.direction === 'push')
                    this.log("Envoi des modifications.");
            })
            .on('paused', (res) => {
                this.PouchDbService.db.info()
                    .then((data) => {
                        if(data.update_seq > 0) this.endSync(2000);
                        this.log("Synchronisation terminée.");
                    });
            })
            .on('active', () => {})
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