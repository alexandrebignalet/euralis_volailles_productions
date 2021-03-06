import './sync-dialog.scss';
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
      this.sidebarService = SidebarService;
      this.syncHandler = null;
      this.isSyncing = false;

      this.logs = [];
    }

    isSyncButtonDisabled() {
      return !this.password && !this.username;
    }

    synchronise() {
      this.PouchDbService.sync(this.username, this.password).then((syncHandler) => {
        this.isSyncing = true;

        this.syncHandler = syncHandler().on('complete', () => {
          this.sidebarService.closeNav();

          this.log("Aucune modification à récupérer.");
          this.log("Synchronisation terminée.");

          this.endSync(2000);
        })
          .on('change', (res) => {
            if (res.direction === 'pull')
              this.log("Récupération des modifications.");
            if (res.direction === 'push')
              this.log("Envoi des modifications.");
          })
          .on('error', (err) => {
            this.log("Erreur: ", err);
            this.endSync(2000);
          }).then((res) => {
            console.warn('then: ', res);
          }).catch((res) => {
            console.warn('catch: ', res)
          })
      })
        .catch((e) => {
          if (e.error && e.error === "unauthorized") {
            this.password = "";
            this.username = "";
            this.log('Mauvais identifiants.');
            this.isSyncing = false;
          }
        })
    }

    log(info) {
      this.logs.push(info);
      this.scope.$apply();
    }

    stopSync() {
      this.syncHandler.cancel().then(() => this.isSyncing = false)
    }

    endSync(closeBeforeTime = 0) {
      this.timeout(() => {
        this.isSyncing = false;
        this.scope.$apply();
        this.close();
      }, closeBeforeTime);
    }

    close() {
      this.modalInstance.close()
    }
  },
  controllerAs: 'vm'
};
