import template from './file_uploader.html';
import './file_uploader.scss';

export const FileUploaderComponent = {
    bindings: { model: '=' },
    template,
    controller: class FileUploaderController {
        constructor(FileUploader) {
            'ngInject';

            this.uploader = new FileUploader();
            // FILTERS

            this.uploader.filters.push({
                name: 'imageFilter',
                fn: (item /*{File|FileLikeObject}*/, options) => {
                    let type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });
            
        }

        $onInit() {
            if (!this.model) this.model = [];
            let that = this;
            this.uploader.uploadItem = myUpload;
            // custom upload function in order to use it our way (we don't need webrequest)
            function myUpload(value) {
                let index = this.getIndexOfItem(value);
                let item = this.queue[index];

                item._prepareToUploading();
                if(this.isUploading) return;

                this._onBeforeUploadItem(item);
                if (item.isCancel) return;

                item.isUploading = true;
                this.isUploading = true;

                this._onProgressItem(item, 100);

                this._render();

                this._onSuccessItem(item, {ok: true}, 200, {ok: true});
                this._onCompleteItem(item, {ok: true},200, {ok: true});
            }

            // CALLBACKS

            this.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                // console.info('onWhenAddingFileFailed', item, filter, options);
            };
            this.uploader.onAfterAddingFile = function(fileItem) {
                // console.info('onAfterAddingFile', fileItem);

            };
            this.uploader.onAfterAddingAll = function(addedFileItems) {
                // console.info('onAfterAddingAll', addedFileItems);
            };
            this.uploader.onBeforeUploadItem = function(item) {
                // console.info('onBeforeUploadItem', item);
            };
            this.uploader.onProgressItem = function(fileItem, progress) {
                // console.info('onProgressItem', fileItem, progress);
            };
            this.uploader.onProgressAll = function(progress) {
                // console.info('onProgressAll', progress);
            };
            this.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                // console.info('onSuccessItem', fileItem, response, status, headers);
            };
            this.uploader.onErrorItem = function(fileItem, response, status, headers) {
                // console.info('onErrorItem', fileItem, response, status, headers);
            };
            this.uploader.onCancelItem = function(fileItem, response, status, headers) {
                // console.info('onCancelItem', fileItem, response, status, headers);
            };
            this.uploader.onCompleteItem = function(fileItem, response, status, headers) {
                that.addToModel(fileItem);
            };
            this.uploader.onCompleteAll = function() {};
        }

        addToModel(item) {
            let exists = false;
            for (let i = 0 ; i < this.model.length ; i++) {
                if ( this.model[i].name === item._file.name ) exists = true;
            }
            if (!exists) this.model.push(item._file);
        }
    },
    controllerAs: 'vm'
};