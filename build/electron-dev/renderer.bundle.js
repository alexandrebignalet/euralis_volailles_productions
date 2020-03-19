/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"renderer": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./app/renderer/app.bootstrap.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/renderer/app.bootstrap.js":
/*!***************************************!*\
  !*** ./app/renderer/app.bootstrap.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.module */ "./app/renderer/app.module.js");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_dist_js_bootstrap_min__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/dist/js/bootstrap.min */ "./node_modules/bootstrap/dist/js/bootstrap.min.js");
/* harmony import */ var bootstrap_dist_js_bootstrap_min__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_js_bootstrap_min__WEBPACK_IMPORTED_MODULE_3__);




angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('eurvolpre', [_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"]]);

/***/ }),

/***/ "./app/renderer/app.component.js":
/*!***************************************!*\
  !*** ./app/renderer/app.component.js ***!
  \***************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _app_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.html */ "./app/renderer/app.html");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.scss */ "./app/renderer/app.scss");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_scss__WEBPACK_IMPORTED_MODULE_1__);


var AppComponent = {
  template: _app_html__WEBPACK_IMPORTED_MODULE_0__["default"]
};

/***/ }),

/***/ "./app/renderer/app.html":
/*!*******************************!*\
  !*** ./app/renderer/app.html ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Place all UI elements intended to be present across all routes in this file -->\n<ribbon></ribbon>\n<navbar></navbar>\n\n<div ui-view=\"sidebar\"></div>\n<main>\n    <div class=\"ui-view-container\">\n        <div ui-view=\"content\"></div>\n    </div>\n</main>\n");

/***/ }),

/***/ "./app/renderer/app.module.js":
/*!************************************!*\
  !*** ./app/renderer/app.module.js ***!
  \************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular_i18n_angular_locale_fr_fr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-i18n/angular-locale_fr-fr */ "./node_modules/angular-i18n/angular-locale_fr-fr.js");
/* harmony import */ var angular_i18n_angular_locale_fr_fr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular_i18n_angular_locale_fr_fr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular_ui_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-ui-router */ "./node_modules/angular-ui-router/release/angular-ui-router.js");
/* harmony import */ var angular_ui_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular_ui_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-ui-bootstrap */ "./node_modules/angular-ui-bootstrap/index.js");
/* harmony import */ var angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ngstorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngstorage */ "./node_modules/ngstorage/ngStorage.js");
/* harmony import */ var ngstorage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngstorage__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/components.module */ "./app/renderer/components/components.module.js");
/* harmony import */ var _service_state_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./service/state.handler */ "./app/renderer/service/state.handler.js");
/* harmony import */ var _service_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./service/user.service */ "./app/renderer/service/user.service.js");
/* harmony import */ var _database_pouchdb_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./database/pouchdb.module */ "./app/renderer/database/pouchdb.module.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./app/renderer/app.component.js");










var AppModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('AppModule', ['ngStorage', angular_ui_router__WEBPACK_IMPORTED_MODULE_2___default.a, angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_3___default.a, _components_components_module__WEBPACK_IMPORTED_MODULE_5__["ComponentsModule"], _database_pouchdb_module__WEBPACK_IMPORTED_MODULE_8__["PouchDbModule"]]).config(["$locationProvider", "$stateProvider", "$urlRouterProvider", "$sceProvider", "$localStorageProvider", "localStoragePrefix", function ($locationProvider, $stateProvider, $urlRouterProvider, $sceProvider, $localStorageProvider, localStoragePrefix) {
  'ngInject';

  $localStorageProvider.setKeyPrefix(localStoragePrefix);
  $locationProvider.html5Mode(true).hashPrefix('!');
  $stateProvider.state('app', {
    "abstract": true
  });
  $urlRouterProvider.otherwise('/home');
  $sceProvider.enabled(false);
}]).service('StateHandler', _service_state_handler__WEBPACK_IMPORTED_MODULE_6__["StateHandler"]).service('UserService', _service_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"]).component('app', _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]).constant('VERSION', 'V1').constant('localStoragePrefix', 'eurvolpre-').name;

/***/ }),

/***/ "./app/renderer/app.scss":
/*!*******************************!*\
  !*** ./app/renderer/app.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader??ref--7-1!../../node_modules/sass-loader/dist/cjs.js!./app.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/app.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/components.module.js":
/*!******************************************************!*\
  !*** ./app/renderer/components/components.module.js ***!
  \******************************************************/
/*! exports provided: ComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function() { return ComponentsModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var toastr_toastr_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastr/toastr.scss */ "./node_modules/toastr/toastr.scss");
/* harmony import */ var toastr_toastr_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastr_toastr_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _home_home_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.module */ "./app/renderer/components/home/home.module.js");
/* harmony import */ var _navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar/navbar.module */ "./app/renderer/components/navbar/navbar.module.js");
/* harmony import */ var _presentation_presentation_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./presentation/presentation.module */ "./app/renderer/components/presentation/presentation.module.js");
/* harmony import */ var _management_management_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./management/management.module */ "./app/renderer/components/management/management.module.js");
/* harmony import */ var _management_investment_investment_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./management/investment/investment.module */ "./app/renderer/components/management/investment/investment.module.js");
/* harmony import */ var _sidebar_sidebar_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sidebar/sidebar.module */ "./app/renderer/components/sidebar/sidebar.module.js");
/* harmony import */ var _file_uploader_file_uploader_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./file_uploader/file_uploader.module */ "./app/renderer/components/file_uploader/file_uploader.module.js");
/* harmony import */ var _rotation_rotation_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./rotation/rotation.module */ "./app/renderer/components/rotation/rotation.module.js");
/* harmony import */ var _service_modal_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../service/modal.service */ "./app/renderer/service/modal.service.js");
/* harmony import */ var _service_pdf_generator_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../service/pdf-generator.service */ "./app/renderer/service/pdf-generator.service.js");
/* harmony import */ var _sync_sync_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./sync/sync-dialog.component */ "./app/renderer/components/sync/sync-dialog.component.js");
/* harmony import */ var _ribbon_ribbon_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ribbon/ribbon.component */ "./app/renderer/components/ribbon/ribbon.component.js");















toastr__WEBPACK_IMPORTED_MODULE_1___default.a.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-left",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};
var ComponentsModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ComponentsModule', [_sidebar_sidebar_module__WEBPACK_IMPORTED_MODULE_8__["SidebarModule"], _home_home_module__WEBPACK_IMPORTED_MODULE_3__["HomeModule"], _presentation_presentation_module__WEBPACK_IMPORTED_MODULE_5__["PresentationModule"], _navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__["NavbarModule"], _management_management_module__WEBPACK_IMPORTED_MODULE_6__["ManagementModule"], _management_investment_investment_module__WEBPACK_IMPORTED_MODULE_7__["InvestmentModule"], _file_uploader_file_uploader_module__WEBPACK_IMPORTED_MODULE_9__["FileUploaderModule"], _rotation_rotation_module__WEBPACK_IMPORTED_MODULE_10__["RotationModule"]]).config(["$stateProvider", "$locationProvider", function ($stateProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $stateProvider.state('components', {
    parent: 'app',
    "abstract": true,
    views: {
      'sidebar@': {
        template: '<sidebar></sidebar>'
      }
    }
  });
}]).run(["$rootScope", function ($rootScope) {
  'ngInject'; // DEBUG RESOLVE $state
  // $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
  //   console.log('$stateChangeStart to '+toState.name+'- fired when the transition begins. toState,toParams :' +
  //       ' \n',toState, toParams);
  // });
  // $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
  //   console.log('$stateChangeError - fired when an error occurs during transition.');
  //   console.log(arguments);
  // });
  // $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
  //   console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
  // });
  // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
  //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
  // });
  //
  // $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
  //   console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
  //   console.log(unfoundState, fromState, fromParams);
  // });
}]).service('ModalService', _service_modal_service__WEBPACK_IMPORTED_MODULE_11__["ModalService"]).service('PDFGenerator', _service_pdf_generator_service__WEBPACK_IMPORTED_MODULE_12__["PDFGenerator"]).component('syncDialog', _sync_sync_dialog_component__WEBPACK_IMPORTED_MODULE_13__["SyncDialogComponent"]).component('ribbon', _ribbon_ribbon_component__WEBPACK_IMPORTED_MODULE_14__["RibbonComponent"]).constant('toastr', toastr__WEBPACK_IMPORTED_MODULE_1___default.a).name;

/***/ }),

/***/ "./app/renderer/components/file_uploader/file_uploader.component.js":
/*!**************************************************************************!*\
  !*** ./app/renderer/components/file_uploader/file_uploader.component.js ***!
  \**************************************************************************/
/*! exports provided: FileUploaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUploaderComponent", function() { return FileUploaderComponent; });
/* harmony import */ var _file_uploader_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file_uploader.html */ "./app/renderer/components/file_uploader/file_uploader.html");
/* harmony import */ var _file_uploader_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file_uploader.scss */ "./app/renderer/components/file_uploader/file_uploader.scss");
/* harmony import */ var _file_uploader_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_file_uploader_scss__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var FileUploaderComponent = {
  bindings: {
    model: '='
  },
  template: _file_uploader_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    FileUploaderController.$inject = ["FileUploader"];

    function FileUploaderController(FileUploader) {
      'ngInject';

      _classCallCheck(this, FileUploaderController);

      this.uploader = new FileUploader();
      this.uploader.filters.push({
        name: 'imageFilter',
        fn: function fn(file) {
          var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });
    }

    _createClass(FileUploaderController, [{
      key: "$onInit",
      value: function $onInit() {
        if (!this.model) this.model = [];
        var that = this;
        this.uploader.uploadItem = myUpload; // custom upload function in order to use it our way (we don't need webrequest)

        function myUpload(value) {
          var index = this.getIndexOfItem(value);
          var item = this.queue[index];

          item._prepareToUploading();

          if (this.isUploading) return;

          this._onBeforeUploadItem(item);

          if (item.isCancel) return;
          item.isUploading = true;
          this.isUploading = true;

          this._onProgressItem(item, 100);

          this._render();

          this._onSuccessItem(item, {
            ok: true
          }, 200, {
            ok: true
          });

          this._onCompleteItem(item, {
            ok: true
          }, 200, {
            ok: true
          });
        }

        this.uploader.onCompleteItem = function (fileItem) {
          that.addToModel(fileItem);
        };

        this.uploader.onCompleteAll = function () {};
      }
    }, {
      key: "addToModel",
      value: function addToModel(item) {
        var exists = false;

        for (var i = 0; i < this.model.length; i++) {
          if (this.model[i].name === item._file.name) exists = true;
        }

        if (!exists) this.model.push(item._file);
      }
    }]);

    return FileUploaderController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/file_uploader/file_uploader.html":
/*!******************************************************************!*\
  !*** ./app/renderer/components/file_uploader/file_uploader.html ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n\n    <div class=\"col-md-12\" style=\"margin-bottom: 40px\">\n        <h3>Sélection</h3>\n        <input type=\"file\" nv-file-select=\"\" uploader=\"vm.uploader\" multiple  /><br/>\n\n        <h2>Liste d'ajout d'images</h2>\n\n        <table class=\"table\">\n            <thead>\n            <tr>\n                <th width=\"50%\">Nom</th>\n                <th ng-show=\"vm.uploader.isHTML5\">Taille</th>\n                <th ng-show=\"vm.uploader.isHTML5\">Avancée</th>\n                <th>Status</th>\n                <th>Actions</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr ng-repeat=\"item in vm.uploader.queue\">\n                <td>\n                    <strong>{{ item.file.name }}</strong>\n                    <div ng-show=\"vm.uploader.isHTML5\" thumb-images=\"{ file: item._file, height: 100 }\"></div>\n                </td>\n                <td ng-show=\"vm.uploader.isHTML5\" nowrap>{{ item.file.size/1024/1024|number:2 }} MB</td>\n                <td ng-show=\"vm.uploader.isHTML5\">\n                    <div class=\"progress\" style=\"margin-bottom: 0;\">\n                        <div class=\"progress-bar\" role=\"progressbar\" ng-style=\"{ 'width': item.progress + '%' }\"></div>\n                    </div>\n                </td>\n                <td class=\"text-center\">\n                    <span ng-show=\"item.isSuccess\"><i class=\"glyphicon glyphicon-ok\"></i></span>\n                    <span ng-show=\"item.isCancel\"><i class=\"glyphicon glyphicon-ban-circle\"></i></span>\n                    <span ng-show=\"item.isError\"><i class=\"glyphicon glyphicon-remove\"></i></span>\n                </td>\n                <td nowrap>\n                    <button type=\"button\" class=\"btn btn-success btn-xs\" ng-click=\"item.upload()\" ng-disabled=\"item.isReady || item.isUploading || item.isSuccess\">\n                        <span class=\"glyphicon glyphicon-upload\"></span> Charger\n                    </button>\n                    <button type=\"button\" class=\"btn btn-warning btn-xs\" ng-click=\"item.cancel()\" ng-disabled=\"!item.isUploading\">\n                        <span class=\"glyphicon glyphicon-ban-circle\"></span> Annuler\n                    </button>\n                    <button type=\"button\" class=\"btn btn-danger btn-xs\" ng-click=\"item.remove()\">\n                        <span class=\"glyphicon glyphicon-trash\"></span> Supprimer\n                    </button>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n\n        <div>\n            <div>\n                Avancée totale:\n                <div class=\"progress\" style=\"\">\n                    <div class=\"progress-bar\" role=\"progressbar\" ng-style=\"{ 'width': vm.uploader.progress + '%' }\"></div>\n                </div>\n            </div>\n            <button type=\"button\" class=\"btn btn-success btn-s\" ng-click=\"vm.uploader.uploadAll()\" ng-disabled=\"!vm.uploader.getNotUploadedItems().length\">\n                <span class=\"glyphicon glyphicon-upload\"></span> Tout charger\n            </button>\n            <button type=\"button\" class=\"btn btn-warning btn-s\" ng-click=\"vm.uploader.cancelAll()\" ng-disabled=\"!vm.uploader.isUploading\">\n                <span class=\"glyphicon glyphicon-ban-circle\"></span> Tout annuler\n            </button>\n            <button type=\"button\" class=\"btn btn-danger btn-s\" ng-click=\"vm.uploader.clearQueue()\" ng-disabled=\"!vm.uploader.queue.length\">\n                <span class=\"glyphicon glyphicon-trash\"></span> Tout supprimer\n            </button>\n        </div>\n\n    </div>\n\n</div>");

/***/ }),

/***/ "./app/renderer/components/file_uploader/file_uploader.module.js":
/*!***********************************************************************!*\
  !*** ./app/renderer/components/file_uploader/file_uploader.module.js ***!
  \***********************************************************************/
/*! exports provided: FileUploaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUploaderModule", function() { return FileUploaderModule; });
/* harmony import */ var angular_file_upload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular-file-upload */ "./node_modules/angular-file-upload/dist/angular-file-upload.js");
/* harmony import */ var angular_file_upload__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular_file_upload__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _thumb_images_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./thumb_images.directive */ "./app/renderer/components/file_uploader/thumb_images.directive.js");
/* harmony import */ var _file_uploader_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./file_uploader.component */ "./app/renderer/components/file_uploader/file_uploader.component.js");



var FileUploaderModule = angular.module('FileUploaderModule', ['angularFileUpload']).directive('thumbImages', _thumb_images_directive__WEBPACK_IMPORTED_MODULE_1__["ThumbImagesDirective"]).component('fileUploader', _file_uploader_component__WEBPACK_IMPORTED_MODULE_2__["FileUploaderComponent"]).name;

/***/ }),

/***/ "./app/renderer/components/file_uploader/file_uploader.scss":
/*!******************************************************************!*\
  !*** ./app/renderer/components/file_uploader/file_uploader.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--7-1!../../../../node_modules/sass-loader/dist/cjs.js!./file_uploader.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/file_uploader/file_uploader.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/file_uploader/thumb_images.directive.js":
/*!*************************************************************************!*\
  !*** ./app/renderer/components/file_uploader/thumb_images.directive.js ***!
  \*************************************************************************/
/*! exports provided: ThumbImagesDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThumbImagesDirective", function() { return ThumbImagesDirective; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


var ThumbImagesDirective = function ThumbImagesDirective($window) {
  'ngInject';

  var helper = {
    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
    isFile: function isFile(item) {
      return angular__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(item) && _typeof(item.name) == _typeof('string');
    }
  };
  return {
    restrict: 'A',
    template: '<canvas/>',
    link: function link(scope, element, attributes) {
      if (!helper.support) return;
      var params = scope.$eval(attributes.thumbImages);
      if (!helper.isFile(params.file)) return;
      var canvas = element.find('canvas');
      var reader = new FileReader();
      reader.onload = onLoadFile;
      reader.readAsDataURL(params.file);

      function onLoadFile(event) {
        var img = new Image();
        img.onload = onLoadImage;
        img.src = event.target.result;
      }

      function onLoadImage() {
        var width = params.width || this.width / this.height * params.height;
        var height = params.height || this.height / this.width * params.width;
        canvas.attr({
          width: width,
          height: height
        });
        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
      }
    }
  };
};
ThumbImagesDirective.$inject = ["$window"];

/***/ }),

/***/ "./app/renderer/components/home/arrow.scss":
/*!*************************************************!*\
  !*** ./app/renderer/components/home/arrow.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--7-1!../../../../node_modules/sass-loader/dist/cjs.js!./arrow.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/home/arrow.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/home/home.component.js":
/*!********************************************************!*\
  !*** ./app/renderer/components/home/home.component.js ***!
  \********************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _home_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.html */ "./app/renderer/components/home/home.html");
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.scss */ "./app/renderer/components/home/home.scss");
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _arrow_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrow.scss */ "./app/renderer/components/home/arrow.scss");
/* harmony import */ var _arrow_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_arrow_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_fd_good_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/fd_good.jpg */ "./app/renderer/images/fd_good.jpg");
/* harmony import */ var _images_accompagne_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../images/accompagne.jpg */ "./app/renderer/images/accompagne.jpg");
/* harmony import */ var _images_sanders_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../images/sanders.jpg */ "./app/renderer/images/sanders.jpg");
/* harmony import */ var _images_logo_euralis_gif__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../images/logo_euralis.gif */ "./app/renderer/images/logo_euralis.gif");
/* harmony import */ var _images_eurvol_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../images/eurvol.jpg */ "./app/renderer/images/eurvol.jpg");
/* harmony import */ var _images_elev_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../images/elev.png */ "./app/renderer/images/elev.png");
/* harmony import */ var _images_avigers_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../images/avigers.png */ "./app/renderer/images/avigers.png");
/* harmony import */ var _images_agrocert_jpg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../images/agrocert.jpg */ "./app/renderer/images/agrocert.jpg");
/* harmony import */ var _images_qualisud_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../images/qualisud.png */ "./app/renderer/images/qualisud.png");
/* harmony import */ var _images_logo_bio_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../images/logo_bio.png */ "./app/renderer/images/logo_bio.png");
/* harmony import */ var _images_logo_sequoia_jpg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../images/logo_sequoia.jpg */ "./app/renderer/images/logo_sequoia.jpg");
/* harmony import */ var _images_gers_tag_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../images/gers_tag.png */ "./app/renderer/images/gers_tag.png");
/* harmony import */ var _images_landes_tag_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../images/landes_tag.png */ "./app/renderer/images/landes_tag.png");
/* harmony import */ var _images_sudouest_tag_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../images/sudouest_tag.png */ "./app/renderer/images/sudouest_tag.png");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


















var filiere = [];
filiere['sanders'] = _images_sanders_jpg__WEBPACK_IMPORTED_MODULE_5__["default"];
filiere['eurvol'] = _images_logo_euralis_gif__WEBPACK_IMPORTED_MODULE_6__["default"];
filiere['vol'] = _images_eurvol_jpg__WEBPACK_IMPORTED_MODULE_7__["default"];
filiere['elev'] = _images_elev_png__WEBPACK_IMPORTED_MODULE_8__["default"];
filiere['avigers'] = _images_avigers_png__WEBPACK_IMPORTED_MODULE_9__["default"];
filiere['agrocert'] = _images_agrocert_jpg__WEBPACK_IMPORTED_MODULE_10__["default"];
filiere['qualisud'] = _images_qualisud_png__WEBPACK_IMPORTED_MODULE_11__["default"];
filiere['sequoia'] = _images_logo_sequoia_jpg__WEBPACK_IMPORTED_MODULE_13__["default"];
filiere['bio'] = _images_logo_bio_png__WEBPACK_IMPORTED_MODULE_12__["default"];
filiere['tags'] = [];
filiere['tags']['gers'] = _images_gers_tag_png__WEBPACK_IMPORTED_MODULE_14__["default"];
filiere['tags']['sudouest'] = _images_sudouest_tag_png__WEBPACK_IMPORTED_MODULE_16__["default"];
filiere['tags']['landes'] = _images_landes_tag_png__WEBPACK_IMPORTED_MODULE_15__["default"];
var HomeComponent = {
  bindings: {
    videos: '<'
  },
  template: _home_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    HomeController.$inject = ["DEPARTMENTS", "VideoService"];

    function HomeController(DEPARTMENTS, VideoService) {
      'ngInject';

      _classCallCheck(this, HomeController);

      this.banner = _images_fd_good_jpg__WEBPACK_IMPORTED_MODULE_3__["default"];
      this.accompagne = _images_accompagne_jpg__WEBPACK_IMPORTED_MODULE_4__["default"];
      this.imagesFiliere = filiere;
      this.departments = DEPARTMENTS;
      this.videoPlayed = null;
      this.VideoService = VideoService;
    }

    _createClass(HomeController, [{
      key: "$onInit",
      value: function $onInit() {
        if (this.videos && this.videos.length > 0) this.VideoService.load(this.videos[0].getFile());
      }
    }, {
      key: "selectVideo",
      value: function selectVideo(video) {
        if (!video || video.id === this.videoPlayed) return;
        this.videoPlayed = video.id;
        this.VideoService.load(video.getFile());
      }
    }]);

    return HomeController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/home/home.html":
/*!************************************************!*\
  !*** ./app/renderer/components/home/home.html ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n\n<img src=\"{{vm.banner}}\" class=\"banner\" alt=\"jeanmic\">\n\n<div id=\"menu\" class=\"row\">\n    <div class=\"col-md-6 col-lg-6 col-xs-6 col-sm-6\" ng-repeat=\"item in vm.departments\">\n        <button class=\"btn btn-block btn-success btn-raised btn-main\" ui-sref=\"presentation({department:item.key, toto: 1000})\">\n            <b style=\"font-size: 12pt\">{{item.value | uppercase }}</b>\n        </button>\n        <br>\n    </div>\n</div>\n\n<div class=\"container\">\n    <div class=\"row\">\n        <h1>\n            <i class=\"glyphicon glyphicon-grain\" style=\"color:rgba(219, 226, 13, 0.88)\"></i>\n            <span style=\"color: #309f41;\">Euralis</span>\n            <span style=\"color: #a6ce39;\">vous accompagne</span>\n        </h1><hr>\n\n        <div class=\"col-md-4 col-xs-4 col-lg-4\">\n            <img class=\"slide-right\" src=\"{{vm.accompagne}}\" style=\"box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 1);\" />\n        </div>\n        <div class=\"col-md-8 col-xs-8 col-lg-8\">\n            <ul class=\"custom-bullet\">\n                <li class=\"eva1\">Auprès de votre banque</li>\n                <li class=\"eva2\">Permis de construire</li>\n                <li class=\"eva1\">Déclaration de l'élevage ICPE</li>\n                <li class=\"eva2\">Dossier de subventions</li>\n                <li class=\"eva1\">Mise en relation, devis fournisseurs (bâtiment, matériel)</li>\n                <li class=\"eva2\">Supervise et coordonne les travaux</li>\n                <li class=\"eva1\">Suivi technique renforcé la 1ère année</li>\n                <li class=\"eva2\">Possibilité de mise en place de volailles festives (marges supérieures)</li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"row\">\n        <h1>\n            <i class=\"glyphicon glyphicon-home\" style=\"color:rgba(219, 226, 13, 0.88)\"></i>\n            <span style=\"color: #309f41;\">Filière poulet</span>\n            <span style=\"color: #a6ce39;\">LABEL EURALIS</span>\n        </h1><hr>\n        <div class=\"row text-center\">\n            <h3 class=\"pull-right\" style=\"color: #309f41\"><strong>AMONT</strong></h3>\n            <div class=\"col-md-3 col-md-offset-3 col-xs-3 col-xs-offset-3 col-lg-3 col-lg-offset-3\" in-view=\"sandersVisible = $inview\" ng-class=\"{ 'slide-right': sandersVisible }\">\n                <figure>\n                    <img src=\"{{vm.imagesFiliere['sanders']}}\" style=\"width:50%;\"/>\n                    <figcaption><h4 style=\"color: #399528;\"><strong>Fournisseur d'aliment</strong></h4></figcaption>\n                </figure>\n            </div>\n\n            <div class=\"col-md-3 col-xs-3 col-lg-3 slide-left\" in-view=\"accouvVisible = $inview\" ng-class=\"{ 'slide-left': accouvVisible }\">\n                <h2 style=\"margin-top: 10%;color: #399528;\">ACCOUVEURS</h2>\n                <ul class=\"list-unstyled\">\n                    <li style=\"white-space: nowrap;\"><strong>CARINGA</strong> à LISLE JOURDAIN 32</li>\n                    <li style=\"white-space: nowrap;\"><strong>SOCAVIC</strong> à SAINT SEVER 40</li>\n                </ul>\n            </div>\n        </div>\n        <div class=\"row text-center\">\n            <span class=\"arrow arrow-down\" style=\"height: 10%;\"></span>\n        </div>\n        <div class=\"row text-center\">\n            <div class=\"col-md-3 col-xs-3 col-lg-3\" in-view=\"groupProdVisible = $inview\" ng-class=\"{ 'slide-right': groupProdVisible }\">\n                <h3>\n                    <strong>Groupement de producteurs</strong>\n                </h3>\n                <figure>\n                    <img src=\"{{vm.imagesFiliere['eurvol']}}\" style=\"width: 80%;\"/>\n                    <figcaption><h4><strong>EURALIS VOLAILLES</strong></h4></figcaption>\n                </figure>\n                <strong>Planifie les mises en places des ventes</strong>\n                <div class=\"row\"  style=\"margin-top: 2%;\">\n                    <div class=\"col-md-6 col-xs-6 col-lg-6\">\n                        <img src=\"{{vm.imagesFiliere['vol']}}\" style=\"width: 50%;\"/>\n                        <p style=\"font-size: 14pt;color: #399528;\">\n                            {{6500000 | number: 0}}\n                        </p>\n                        <span style=\"font-size: 1%;color: #a6ce39;\">VOLAILLES</span>\n                    </div>\n                    <div class=\"col-md-6 col-xs-6 col-lg-6\">\n                        <img src=\"{{vm.imagesFiliere['elev']}}\" style=\"width: 50%;\"/>\n                        <p  style=\"font-size: 14pt;color: #399528;\">\n                            {{200 | number: 0}}\n                        </p>\n                        <span style=\"font-size: 1%;color: #a6ce39;\">ELEVEURS</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-1 col-lg-1 col-xs-1\">\n                <span class=\"arrow arrow-right vmid\"></span>\n            </div>\n            <div class=\"col-md-4 col-xs-4 col-lg-4\" ng-class=\"{ 'fade-in': groupProdVisible }\">\n                <h3>\n                    <strong>Groupement qualité</strong>\n                </h3>\n                <table>\n                    <tr>\n                        <td>\n                            <figure>\n                                <img src=\"{{vm.imagesFiliere['avigers']}}\" style=\"width: 50%;\"/>\n                            </figure>\n                        </td>\n                        <td style=\"text-align: left;\">\n                            <figure>\n                                <img src=\"{{vm.imagesFiliere['tags']['gers']}}\"/>\n                            </figure>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <h3>AVFL</h3>\n                        </td>\n                        <td style=\"text-align: left;\">\n                            <figure>\n                                <img src=\"{{vm.imagesFiliere['tags']['landes']}}\" />\n                            </figure>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <h3>BIO</h3>\n                        </td>\n                        <td style=\"text-align: left;\">\n                            <figure>\n                                <img src=\"{{vm.imagesFiliere['bio']}}\" />\n                            </figure>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <h3>SUD-OUEST</h3>\n                        </td>\n                        <td style=\"text-align: left;\">\n                            <figure>\n                                <img src=\"{{vm.imagesFiliere['tags']['sudouest']}}\" />\n                            </figure>\n                        </td>\n                    </tr>\n                </table>\n            </div>\n            <div class=\"col-md-1 col-xs-1 col-lg-1\">\n                <span class=\"arrow arrow-left vmid\"></span>\n            </div>\n            <div class=\"col-md-3 col-xs-3 col-lg-3 qualisud-centered\" ng-class=\"{ 'slide-left': groupProdVisible }\">\n                <figure>\n                    <img src=\"{{vm.imagesFiliere['qualisud']}}\" style=\"width:50%;\"/>\n                </figure>\n                <strong>Contrôle des normes Label à tous les niveaux de la filière</strong>\n            </div>\n        </div>\n    </div>\n    <div class=\"row text-center\">\n        <span class=\"arrow arrow-down\" style=\"height: 10%\"></span>\n    </div>\n    <div class=\"row text-center\">\n        <h3 class=\"pull-right\" style=\"color: #309f41\"><strong>AVAL</strong></h3>\n        <div class=\"col-md-4 col-md-offset-4 col-xs-4 col-xs-offset-4 col-lg-4 col-lg-offset-4\" in-view=\"abattoirsVisible = $inview\" ng-class=\"{ 'fade-in': abattoirsVisible }\">\n            <h3 style=\"color: #399528;\"><strong>4 abattoirs</strong></h3>\n            <ul class=\"list-unstyled\">\n                <li><strong>FSO</strong>(Fermiers du Sud-Ouest) à CONDOM, SAINT SEVER, SARAMON.</li>\n                <li><strong>RONSARD</strong> à LOSSE 40.</li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"row\" ng-if=\"vm.videos.length > 0\">\n        <h1>\n            <i class=\"glyphicon glyphicon-facetime-video\" style=\"color:rgba(219, 226, 13, 0.88)\"></i>\n            <span style=\"color: #309f41;\">Présentation vidéos</span>\n            <span style=\"color: #a6ce39;\">des élevages</span>\n        </h1><hr>\n        <div class=\"col-md-3 col-xs-3 col-lg-3 text-center\">\n            <ul class=\"nav nav-pills nav-stacked\" style=\"height:50%; overflow: auto;\">\n                <li ng-repeat=\"video in vm.videos\" ng-class=\"{'active': vm.videoPlayed == video.id}\">\n                    <a href ng-click=\"vm.selectVideo(video)\">{{video.getName() | uppercase}}</a>\n                </li>\n            </ul>\n        </div>\n        <div class=\"col-md-9 col-xs-9 col-lg-9\">\n            <video width=\"100%\" controls>\n                <source src type=\"video/mp4\">\n                Your browser does not support HTML5 video.\n            </video>\n        </div>\n    </div>\n    <br>\n</div>\n");

/***/ }),

/***/ "./app/renderer/components/home/home.module.js":
/*!*****************************************************!*\
  !*** ./app/renderer/components/home/home.module.js ***!
  \*****************************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular_inview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-inview */ "./node_modules/angular-inview/angular-inview.js");
/* harmony import */ var angular_inview__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular_inview__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.component */ "./app/renderer/components/home/home.component.js");



var HomeModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('HomeModule', [angular_inview__WEBPACK_IMPORTED_MODULE_1___default.a]).config(["$locationProvider", "$stateProvider", "$urlRouterProvider", function ($locationProvider, $stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider.state('home', {
    parent: 'components',
    url: '/home',
    resolve: {
      videos: ["PouchDbService", function videos(PouchDbService) {
        return PouchDbService.find('video');
      }]
    },
    views: {
      'content@': {
        template: '<home videos="$resolve.videos"></home>'
      }
    }
  });
  $urlRouterProvider.otherwise('/home');
}]).component('home', _home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]).constant('VERSION', 'V1').name;

/***/ }),

/***/ "./app/renderer/components/home/home.scss":
/*!************************************************!*\
  !*** ./app/renderer/components/home/home.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--7-1!../../../../node_modules/sass-loader/dist/cjs.js!./home.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/home/home.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/image-loader/image_loader.component.js":
/*!************************************************************************!*\
  !*** ./app/renderer/components/image-loader/image_loader.component.js ***!
  \************************************************************************/
/*! exports provided: ImageLoaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageLoaderComponent", function() { return ImageLoaderComponent; });
/* harmony import */ var _image_loader_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image_loader.html */ "./app/renderer/components/image-loader/image_loader.html");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var ImageLoaderComponent = {
  bindings: {
    model: '<',
    height: '<'
  },
  template: _image_loader_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    function ImageLoaderController() {
      _classCallCheck(this, ImageLoaderController);

      this.slides = [];
      this.currentIndex = 0;
      this.active = 0;
      this.myInterval = 5000;
      this.noWrapSlides = false;
    }

    _createClass(ImageLoaderController, [{
      key: "$onInit",
      value: function $onInit() {
        var _this = this;

        this.model.attachments.forEach(function (attachment) {
          return _this.slides.push({
            id: ++_this.currentIndex,
            image: URL.createObjectURL(attachment),
            text: attachment.name
          });
        });
      }
    }]);

    return ImageLoaderController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/image-loader/image_loader.html":
/*!****************************************************************!*\
  !*** ./app/renderer/components/image-loader/image_loader.html ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n    <div uib-carousel active=\"vm.active\" interval=\"vm.myInterval\" no-wrap=\"vm.noWrapSlides\">\n        <div uib-slide ng-repeat=\"slide in vm.slides track by slide.id\" index=\"$index\" class=\"slider-size\">\n            <img ng-src=\"{{slide.image}}\" style=\"height:{{vm.height}}px;\" alt=\"pas de photos\">\n            <div class=\"carousel-caption\">\n                <p>{{slide.text}}</p>\n            </div>\n        </div>\n    </div>\n");

/***/ }),

/***/ "./app/renderer/components/image-loader/image_loader.module.js":
/*!*********************************************************************!*\
  !*** ./app/renderer/components/image-loader/image_loader.module.js ***!
  \*********************************************************************/
/*! exports provided: ImageLoaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageLoaderModule", function() { return ImageLoaderModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _image_loader_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image_loader.component */ "./app/renderer/components/image-loader/image_loader.component.js");


var ImageLoaderModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ImageLoaderModule', []).component('imageLoader', _image_loader_component__WEBPACK_IMPORTED_MODULE_1__["ImageLoaderComponent"]).name;

/***/ }),

/***/ "./app/renderer/components/management/facility/facilities.html":
/*!*********************************************************************!*\
  !*** ./app/renderer/components/management/facility/facilities.html ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\n    <div class=\"row\">\n        <h1>\n            <i class=\"glyphicon glyphicon-grain\" style=\"color:rgba(219, 226, 13, 0.88)\"></i>\n            <span style=\"color: #309f41;\">Gestion des données</span>\n            <span style=\"color: #a6ce39;\">des bâtiments</span>\n        </h1><hr>\n\n        <div class=\"pull-right\">\n            <button class=\"btn btn-block btn-primary\" ui-sref=\"facility.create\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                Créer un nouveau type de bâtiment\n            </button>\n        </div>\n    </div>\n\n    <div class=\"table-responsive\">\n        <table class=\"table table-hover\">\n            <thead>\n            <tr>\n                <th class=\"col-md-2 text-center\">Taille</th>\n                <th class=\"col-md-2 text-center\">Type</th>\n                <th class=\"col-md-2 text-center\">Travail horaire</th>\n                <th class=\"col-md-2 text-center\">Grille de critères</th>\n                <th class=\"col-md-2 text-center\">Investissements</th>\n                <th class=\"col-md-3 text-center\">Modifier/Supprimer</th>\n            </tr>\n            </thead>\n            <tbody>\n\n            <tr ng-repeat=\"facility in $ctrl.facilities\">\n                <td class=\"col-md-2 text-center\">{{ facility.size }}m²</td>\n                <td class=\"col-md-2 text-center\">{{ facility.type.value | uppercase }}</td>\n                <td class=\"col-md-2 text-center\">{{ facility.workHours }}</td>\n                <td class=\"col-md-2 text-center\">\n                    <a ui-sref=\"facility_charges\">\n                    {{ facility.facilityCharges.name | uppercase }}\n                    </a>\n                </td>\n                <td class=\"col-md-2 text-center\">\n                    <ul class=\"list-unstyled\">\n                        <li ng-repeat=\"investment in facility.investments\">\n                            <a ui-sref=\"investment\">\n                                {{ investment.designation | uppercase }}\n                            </a>\n                        </li>\n                    </ul>\n                </td>\n                <td class=\"col-md-3 text-center\">\n                    <button class=\"btn btn-success\" ui-sref=\"facility.edit({id: facility.id})\"><span class=\"glyphicon glyphicon-pencil\"></span></button>\n                    <button class=\"btn btn-danger\" ui-sref=\"facility.remove({id: facility.id})\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n\n</div>");

/***/ }),

/***/ "./app/renderer/components/management/facility/facility.component.js":
/*!***************************************************************************!*\
  !*** ./app/renderer/components/management/facility/facility.component.js ***!
  \***************************************************************************/
/*! exports provided: FacilityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilityComponent", function() { return FacilityComponent; });
/* harmony import */ var _facilities_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./facilities.html */ "./app/renderer/components/management/facility/facilities.html");

var FacilityComponent = {
  bindings: {
    facilities: '<'
  },
  template: _facilities_html__WEBPACK_IMPORTED_MODULE_0__["default"]
};

/***/ }),

/***/ "./app/renderer/components/management/facility/facility.module.js":
/*!************************************************************************!*\
  !*** ./app/renderer/components/management/facility/facility.module.js ***!
  \************************************************************************/
/*! exports provided: FacilityModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilityModule", function() { return FacilityModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _facility_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./facility_form.component */ "./app/renderer/components/management/facility/facility_form.component.js");
/* harmony import */ var _facility_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./facility.component */ "./app/renderer/components/management/facility/facility.component.js");



var FacilityModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('FacilityModule', []).config(["$locationProvider", "$stateProvider", function ($locationProvider, $stateProvider) {
  'ngInject';

  var ENTITY_NAME = 'facility';
  $stateProvider.state('facility', {
    parent: 'management',
    url: '/facilities',
    resolve: {
      facilities: ["PouchDbService", function facilities(PouchDbService) {
        return PouchDbService.find(ENTITY_NAME);
      }]
    },
    views: {
      'content@': {
        template: '<facilities facilities="$resolve.facilities"></facilities>'
      }
    },
    onEnter: ["SidebarService", function onEnter(SidebarService) {
      return SidebarService.closeNav();
    }]
  }).state('facility.create', {
    parent: 'facility',
    url: '/create',
    onEnter: ["PouchDbService", "ModalService", "$state", function onEnter(PouchDbService, ModalService, $state) {
      return ModalService.open('facilityForm', {
        facility: {},
        facilitiesCharges: PouchDbService.find('facilityCharges'),
        investments: PouchDbService.find('investment')
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  }).state('facility.edit', {
    parent: 'facility',
    url: '/:id/edit',
    onEnter: ["ModalService", "PouchDbService", "$stateParams", "$state", function onEnter(ModalService, PouchDbService, $stateParams, $state) {
      return ModalService.open('facilityForm', {
        facility: function facility(PouchDbService) {
          return PouchDbService.find(ENTITY_NAME, $stateParams.id);
        },
        facilitiesCharges: function facilitiesCharges(PouchDbService) {
          return PouchDbService.find('facilityCharges');
        },
        investments: function investments(PouchDbService) {
          return PouchDbService.find('investment');
        }
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  }).state('facility.remove', {
    parent: 'facility',
    url: '/:id/remove',
    onEnter: ["ModalService", "PouchDbService", "$stateParams", "$state", function onEnter(ModalService, PouchDbService, $stateParams, $state) {
      return ModalService.open('facilityForm', {
        facility: PouchDbService.find(ENTITY_NAME, $stateParams.id)
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  });
}]).component('facilityForm', _facility_form_component__WEBPACK_IMPORTED_MODULE_1__["FacilityFormComponent"]).component('facilities', _facility_component__WEBPACK_IMPORTED_MODULE_2__["FacilityComponent"]).constant('FACILITIES_TYPES', [{
  key: 'fixed',
  value: 'Fixes'
}, {
  key: 'movable',
  value: 'Déplaçables'
}]).name;

/***/ }),

/***/ "./app/renderer/components/management/facility/facility_form.component.js":
/*!********************************************************************************!*\
  !*** ./app/renderer/components/management/facility/facility_form.component.js ***!
  \********************************************************************************/
/*! exports provided: FacilityFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilityFormComponent", function() { return FacilityFormComponent; });
/* harmony import */ var _facility_form_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./facility_form.html */ "./app/renderer/components/management/facility/facility_form.html");
/* harmony import */ var _model_facility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../model/facility */ "./app/renderer/model/facility.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var FacilityFormComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<'
  },
  template: _facility_form_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    FacilityFormController.$inject = ["PouchDbService", "$state", "FACILITIES_TYPES", "ToastrService"];

    function FacilityFormController(PouchDbService, $state, FACILITIES_TYPES, ToastrService) {
      'ngInject';

      _classCallCheck(this, FacilityFormController);

      this.state = $state;
      this.PouchDbService = PouchDbService;
      this.isSaving = false;
      this.currentState = this.state.current.name;
      this.facilityTypes = FACILITIES_TYPES;
      this.ToastrService = ToastrService;
      this.entityName = 'facility';
    }

    _createClass(FacilityFormController, [{
      key: "$onInit",
      value: function $onInit() {
        this.facility = this.resolve.facility;
        this.facilitiesCharges = this.resolve.facilitiesCharges;
        this.investments = this.resolve.investments;
      }
    }, {
      key: "removeAttachment",
      value: function removeAttachment(attachment) {
        var index = this.facility.attachments.indexOf(attachment);
        this.facility.attachments.splice(index, 1);
      }
    }, {
      key: "onSubmit",
      value: function onSubmit() {
        var _this = this;

        this.isSaving = true;
        var formState = this.currentState.replace("facility.", "");

        switch (formState) {
          case 'edit':
          case 'create':
            var attachments = {};

            for (var i = 0; i < this.facility.attachments.length; i++) {
              attachments[this.facility.attachments[i].name] = this.facility.attachments[i];
            }

            this.facility.attachments = attachments;
            this.PouchDbService.save(this.entityName, this.facility).then(function () {
              _this.ToastrService[formState](new _model_facility__WEBPACK_IMPORTED_MODULE_1__["Facility"](_this.facility));

              _this.modalInstance.close();
            });
            break;

          case 'remove':
            this.PouchDbService.remove(this.entityName, this.facility).then(function () {
              _this.ToastrService.remove(_this.facility);

              _this.modalInstance.close();
            });
            break;

          default:
            break;
        }

        this.isSaving = false;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.modalInstance.close();
      }
    }]);

    return FacilityFormController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/management/facility/facility_form.html":
/*!************************************************************************!*\
  !*** ./app/renderer/components/management/facility/facility_form.html ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form name=\"facilityForm\" ng-submit=\"vm.onSubmit()\">\n    <div class=\"modal-header\">\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('create') != -1\">Création d'un nouveau bâtiment.</h3>\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('edit') != -1\">Modification d'un bâtiment existant.</h3>\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('remove') != -1\">Suppression d'un bâtiment.</h3>\n    </div>\n    <div class=\"modal-body\" ng-if=\"vm.currentState.indexOf('remove') == -1\">\n        <div class=\"row\">\n            <h2 class=\"text-center\">Bâtiment</h2><hr>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"facility_type\" class=\"control-label\">Type de bâtiment</label>\n                    <select class=\"form-control {{ facilityForm.facility_type.$invalid ? 'wrong' : 'valid'}}_input\"\n                            id=\"facility_type\" name=\"facility_type\" ng-model=\"vm.facility.type\" required\n                            ng-options=\"facilityType as facilityType.value for facilityType in vm.facilityTypes track by facilityType.key\">\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"facility_size\" class=\"control-label\">Taille des bâtiments</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ facilityForm.facility_size.$invalid ? 'wrong' : 'valid'}}_input\" id=\"facility_size\" name=\"facility_size\" ng-model=\"vm.facility.size\" min=\"0\" required>\n                        <span class=\"input-group-addon\">m²</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"facility_charges\" class=\"control-label\">Grille de critères</label>\n                    <select class=\"form-control {{ facilityForm.facility_charges.$invalid ? 'wrong' : 'valid'}}_input\" id=\"facility_charges\" name=\"facility_charges\" ng-model=\"vm.facility.facilityCharges\" required\n                            ng-options=\"charges as charges.name | uppercase for charges in vm.facilitiesCharges track by charges.id\">\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"facility_work_hours\" class=\"control-label\">Travail horaire</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" min=\"0\" step=\"any\" required ng-model=\"vm.facility.workHours\" class=\"form-control {{ facilityForm.facility_work_hours.$invalid ? 'wrong' : 'valid'}}_input\" id=\"facility_work_hours\" name=\"facility_work_hours\">\n                        <span class=\"input-group-addon\">h</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"facility_investments\" class=\"control-label\">Investissements</label>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                            <span class=\"glyphicon glyphicon-{{ facilityForm.facility_investments.$invalid ? 'remove' : 'ok'}}\"></span>\n                        </span>\n                        <select class=\"form-control {{ facilityForm.facility_investments.$invalid ? 'wrong' : 'valid'}}_input\"\n                                id=\"facility_investments\"\n                                name=\"facility_investments\"\n                                ng-model=\"vm.facility.investments\"\n                                required\n                                multiple\n                                ng-options=\"investment as investment.name | uppercase for investment in vm.investments track by investment.id\">\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-3\" ng-repeat=\"attachment in vm.facility.attachments track by attachment.name\">\n                <button type=\"button\" class=\"btn btn-default btn-block\" ng-click=\"vm.removeAttachment(attachment)\"><span class=\"glyphicon glyphicon-remove\"></span> </button>\n                <p thumb-images=\"{ file: attachment, height: 100 }\"></p>\n            </div>\n        </div>\n        <file-uploader model=\"vm.facility.attachments\"></file-uploader>\n    </div>\n    <div class=\"modal-body\" ng-if=\"vm.currentState.indexOf('remove') != -1\">\n        Confirmer la suppression du {{vm.facility.toString()}}\n    </div>\n\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-default\" type=\"button\" ng-click=\"vm.cancel()\">Annuler</button>\n        <button class=\"btn btn-primary\" type=\"submit\" ng-if=\"vm.currentState.indexOf('create') != -1\" ng-disabled=\"vm.isSaving || facilityForm.$invalid\">Créer</button>\n        <button class=\"btn btn-success\" type=\"submit\" ng-if=\"vm.currentState.indexOf('edit') != -1\" ng-disabled=\"vm.isSaving || facilityForm.$invalid\">Modifier</button>\n        <button class=\"btn btn-danger\" type=\"submit\" ng-if=\"vm.currentState.indexOf('remove') != -1\" ng-disabled=\"vm.isSaving || facilityForm.$invalid\">Supprimer</button>\n    </div>\n</form>\n");

/***/ }),

/***/ "./app/renderer/components/management/facility_charges/facilities_charges.html":
/*!*************************************************************************************!*\
  !*** ./app/renderer/components/management/facility_charges/facilities_charges.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\n    <div class=\"row\">\n        <h1>\n            <i class=\"glyphicon glyphicon-grain\" style=\"color:rgba(219, 226, 13, 0.88)\"></i>\n            <span style=\"color: #309f41;\">Gestion des données</span>\n            <span style=\"color: #a6ce39;\">des grille de critères</span>\n        </h1><hr>\n\n        <div class=\"pull-right\">\n            <button class=\"btn btn-block btn-primary\" ui-sref=\"facility_charges.create\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                Créer un nouvelle grille de critères\n            </button>\n        </div>\n    </div>\n\n    <div class=\"table-responsive\">\n        <table class=\"table table-hover\">\n            <thead>\n            <tr>\n                <th >Appellation</th>\n                <th><i>€/1000</i></th>\n                <th >Chauffage</th>\n                <th >Prix poussins vaccinés</th>\n                <th >Prix soins</th>\n                <th >Cotisations</th>\n                <th >Prix désinfection</th>\n                <th >Eau, électricité, divers</th>\n                <th >Litière</th>\n                <th >Attrapages</th>\n                <th >Assurances</th>\n\n                <th >Modifier/Supprimer</th>\n            </tr>\n            </thead>\n            <tbody>\n\n            <tr ng-repeat=\"facilityCharges in $ctrl.facilitiesCharges\">\n                <td >{{ facilityCharges.name }}</td>\n                <td></td>\n                <td >{{ facilityCharges.warming * 1000  }}</td>\n                <td >{{ facilityCharges.chickPrice * 1000 }}</td>\n                <td >{{ facilityCharges.vetPrice * 1000 }}</td>\n                <td >{{ facilityCharges.contributions * 1000 }}</td>\n                <td >{{ facilityCharges.disinfection * 1000 }}</td>\n                <td >{{ facilityCharges.commodities * 1000 }}</td>\n                <td >{{ facilityCharges.litter * 1000 }}</td>\n                <td >{{ facilityCharges.catching * 1000 }}</td>\n                <td >{{ facilityCharges.insurances * 1000 }}</td>\n                <td >\n                    <button class=\"btn btn-success\" ui-sref=\"facility_charges.edit({id: facilityCharges.id})\">\n                        <span class=\"glyphicon glyphicon-pencil\"></span>\n                    </button>\n                    <button class=\"btn btn-danger\" ui-sref=\"facility_charges.remove({id: facilityCharges.id})\">\n                        <span class=\"glyphicon glyphicon-remove\"></span>\n                    </button>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n\n</div>\n");

/***/ }),

/***/ "./app/renderer/components/management/facility_charges/facility_charges.component.js":
/*!*******************************************************************************************!*\
  !*** ./app/renderer/components/management/facility_charges/facility_charges.component.js ***!
  \*******************************************************************************************/
/*! exports provided: FacilityChargesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilityChargesComponent", function() { return FacilityChargesComponent; });
/* harmony import */ var _facilities_charges_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./facilities_charges.html */ "./app/renderer/components/management/facility_charges/facilities_charges.html");

var FacilityChargesComponent = {
  bindings: {
    facilitiesCharges: '<'
  },
  template: _facilities_charges_html__WEBPACK_IMPORTED_MODULE_0__["default"]
};

/***/ }),

/***/ "./app/renderer/components/management/facility_charges/facility_charges.module.js":
/*!****************************************************************************************!*\
  !*** ./app/renderer/components/management/facility_charges/facility_charges.module.js ***!
  \****************************************************************************************/
/*! exports provided: FacilityChargesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilityChargesModule", function() { return FacilityChargesModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _facility_charges_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./facility_charges_form.component */ "./app/renderer/components/management/facility_charges/facility_charges_form.component.js");
/* harmony import */ var _facility_charges_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./facility_charges.component */ "./app/renderer/components/management/facility_charges/facility_charges.component.js");



var FacilityChargesModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('FacilityChargesModule', []).config(["$locationProvider", "$stateProvider", function ($locationProvider, $stateProvider) {
  'ngInject';

  var ENTITY_NAME = 'facilityCharges';
  $stateProvider.state('facility_charges', {
    parent: 'management',
    url: '/facilities_charges',
    resolve: {
      facilitiesCharges: ["PouchDbService", function facilitiesCharges(PouchDbService) {
        return PouchDbService.find(ENTITY_NAME);
      }]
    },
    views: {
      'content@': {
        template: '<facilities-charges facilities-charges="$resolve.facilitiesCharges"></facilities-charges>'
      }
    },
    onEnter: ["SidebarService", function onEnter(SidebarService) {
      return SidebarService.closeNav();
    }]
  }).state('facility_charges.create', {
    parent: 'facility_charges',
    url: '/create',
    onEnter: ["ModalService", "$state", function onEnter(ModalService, $state) {
      return ModalService.open('facilityChargesForm', {
        facilityCharges: {}
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  }).state('facility_charges.edit', {
    parent: 'facility_charges',
    url: '/:id/edit',
    onEnter: ["ModalService", "PouchDbService", "$stateParams", "$state", function onEnter(ModalService, PouchDbService, $stateParams, $state) {
      return ModalService.open('facilityChargesForm', {
        facilityCharges: PouchDbService.find(ENTITY_NAME, $stateParams.id)
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  }).state('facility_charges.remove', {
    parent: 'facility_charges',
    url: '/:id/remove',
    onEnter: ["ModalService", "PouchDbService", "$stateParams", "$state", function onEnter(ModalService, PouchDbService, $stateParams, $state) {
      return ModalService.open('facilityChargesForm', {
        facilityCharges: PouchDbService.find(ENTITY_NAME, $stateParams.id)
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  });
}]).component('facilityChargesForm', _facility_charges_form_component__WEBPACK_IMPORTED_MODULE_1__["FacilityChargesFormComponent"]).component('facilitiesCharges', _facility_charges_component__WEBPACK_IMPORTED_MODULE_2__["FacilityChargesComponent"]).name;

/***/ }),

/***/ "./app/renderer/components/management/facility_charges/facility_charges_form.component.js":
/*!************************************************************************************************!*\
  !*** ./app/renderer/components/management/facility_charges/facility_charges_form.component.js ***!
  \************************************************************************************************/
/*! exports provided: FacilityChargesFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilityChargesFormComponent", function() { return FacilityChargesFormComponent; });
/* harmony import */ var _facility_charges_form_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./facility_charges_form.html */ "./app/renderer/components/management/facility_charges/facility_charges_form.html");
/* harmony import */ var _model_facility_charges__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../model/facility_charges */ "./app/renderer/model/facility_charges.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var FacilityChargesFormComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<'
  },
  template: _facility_charges_form_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    FacilityChargesFormController.$inject = ["PouchDbService", "$state", "ToastrService"];

    function FacilityChargesFormController(PouchDbService, $state, ToastrService) {
      'ngInject';

      _classCallCheck(this, FacilityChargesFormController);

      this.state = $state;
      this.PouchDbService = PouchDbService;
      this.isSaving = false;
      this.currentState = $state.current.name;
      this.ToastrService = ToastrService;
      this.entityName = 'facilityCharges';
    }

    _createClass(FacilityChargesFormController, [{
      key: "$onInit",
      value: function $onInit() {
        this.facilityCharges = this.convertToShow(this.resolve.facilityCharges);
      }
    }, {
      key: "convertToShow",
      value: function convertToShow(facilityCharges) {
        facilityCharges.chickPrice *= 1000;
        facilityCharges.warming *= 1000;
        facilityCharges.vetPrice *= 1000;
        facilityCharges.contributions *= 1000;
        facilityCharges.disinfection *= 1000;
        facilityCharges.litter *= 1000;
        facilityCharges.commodities *= 1000;
        facilityCharges.catching *= 1000;
        facilityCharges.insurances *= 1000;
        return facilityCharges;
      }
    }, {
      key: "convertToSave",
      value: function convertToSave(facilityCharges) {
        facilityCharges.chickPrice /= 1000;
        facilityCharges.warming /= 1000;
        facilityCharges.vetPrice /= 1000;
        facilityCharges.contributions /= 1000;
        facilityCharges.disinfection /= 1000;
        facilityCharges.litter /= 1000;
        facilityCharges.commodities /= 1000;
        facilityCharges.catching /= 1000;
        facilityCharges.insurances /= 1000;
        return facilityCharges;
      }
    }, {
      key: "onSubmit",
      value: function onSubmit() {
        var _this = this;

        this.isSaving = true;
        var facilityCharges = this.convertToSave(this.facilityCharges);
        var formState = this.currentState.replace("facility_charges.", "");

        switch (formState) {
          case 'edit':
          case 'create':
            this.PouchDbService.save(this.entityName, facilityCharges).then(function () {
              _this.ToastrService[formState](new _model_facility_charges__WEBPACK_IMPORTED_MODULE_1__["FacilityCharges"](facilityCharges));

              _this.modalInstance.close();
            });
            break;

          case 'remove':
            this.PouchDbService.remove(this.entityName, facilityCharges).then(function () {
              _this.ToastrService[formState](facilityCharges);

              _this.modalInstance.close();
            });
            break;

          default:
            break;
        }

        this.isSaving = false;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.modalInstance.close();
      }
    }]);

    return FacilityChargesFormController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/management/facility_charges/facility_charges_form.html":
/*!****************************************************************************************!*\
  !*** ./app/renderer/components/management/facility_charges/facility_charges_form.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form name=\"facilityChargesForm\" ng-submit=\"vm.onSubmit()\">\n    <div class=\"modal-header\">\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('create') != -1\">Création d'une nouvelle grille de critères.</h3>\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('edit') != -1\">Modification d'une grille de critères existante.</h3>\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('remove') != -1\">Suppression d'une grille de critères.</h3>\n    </div>\n    <div class=\"modal-body\" ng-if=\"vm.currentState.indexOf('remove') == -1\">\n        <div class=\"row\">\n            <h2 class=\"text-center\">Critères</h2><hr>\n\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"charges_name\" class=\"control-label\">Appelation de la grille de critères</label>\n                    <input type=\"text\" class=\"form-control {{ facilityChargesForm.charges_name.$invalid ? 'wrong' : 'valid'}}_input\" id=\"charges_name\" name=\"charges_name\" ng-model=\"vm.facilityCharges.name\" minlength=\"0\" required>\n                </div>\n            </div>\n\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"charges_chickPrice\" class=\"control-label\">Prix du poussin vacciné (€)</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ facilityChargesForm.charges_chickPrice.$invalid ? 'wrong' : 'valid'}}_input\" id=\"charges_chickPrice\" name=\"charges_chickPrice\" ng-model=\"vm.facilityCharges.chickPrice\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"charges_warming\" class=\"control-label\">Chauffage</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ facilityChargesForm.charges_warming.$invalid ? 'wrong' : 'valid'}}_input\" id=\"charges_warming\" name=\"charges_warming\" ng-model=\"vm.facilityCharges.warming\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€ / 1000</span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"col-md-3\">\n                <div class=\"form-group\">\n                    <label for=\"charges_vetPrice\" class=\"control-label\">Prix des soins</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ facilityChargesForm.charges_vetPrice.$invalid ? 'wrong' : 'valid'}}_input\" id=\"charges_vetPrice\" name=\"charges_vetPrice\" ng-model=\"vm.facilityCharges.vetPrice\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€ / 1000</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-3\">\n                <div class=\"form-group\">\n                    <label for=\"charges_contributions\" class=\"control-label\">Cotisations</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ facilityChargesForm.charges_contributions.$invalid ? 'wrong' : 'valid'}}_input\" id=\"charges_contributions\" name=\"charges_contributions\" ng-model=\"vm.facilityCharges.contributions\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€ / 1000</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-3\">\n                <div class=\"form-group\">\n                    <label for=\"charges_disinfection\" class=\"control-label\">Désinfection</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ facilityChargesForm.charges_disinfection.$invalid ? 'wrong' : 'valid'}}_input\" id=\"charges_disinfection\" name=\"charges_disinfection\" ng-model=\"vm.facilityCharges.disinfection\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€ / 1000</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-3\">\n                <div class=\"form-group\">\n                    <label for=\"charges_litter\" class=\"control-label\">Prix litière</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ facilityChargesForm.charges_litter.$invalid ? 'wrong' : 'valid'}}_input\" id=\"charges_litter\" name=\"charges_litter\" ng-model=\"vm.facilityCharges.litter\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€ / 1000</span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"charges_commodities\" class=\"control-label\">Prix eau, électricité et divers</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ facilityChargesForm.charges_commodities.$invalid ? 'wrong' : 'valid'}}_input\" id=\"charges_commodities\" name=\"charges_commodities\" ng-model=\"vm.facilityCharges.commodities\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€ / 1000</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"charges_catching\" class=\"control-label\">Prix de l'attrapage</label>\n\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ facilityChargesForm.charges_catching.$invalid ? 'wrong' : 'valid'}}_input\" id=\"charges_catching\" name=\"charges_catching\" ng-model=\"vm.facilityCharges.catching\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€ / 1000</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"charges_insurances\" class=\"control-label\">Prix de l'assurance</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ facilityChargesForm.charges_insurances.$invalid ? 'wrong' : 'valid'}}_input\" id=\"charges_insurances\" name=\"charges_insurances\" ng-model=\"vm.facilityCharges.insurances\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€ / 1000</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-body\" ng-if=\"vm.currentState.indexOf('remove') != -1\">\n        Confirmer la suppression de la  {{vm.facilityCharges.toString() }}\n    </div>\n\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-default\" type=\"button\" ng-click=\"vm.cancel()\">Annuler</button>\n        <button class=\"btn btn-primary\" type=\"submit\" ng-if=\"vm.currentState.indexOf('create') != -1\" ng-disabled=\"vm.isSaving || facilityChargesForm.$invalid\">Créer</button>\n        <button class=\"btn btn-success\" type=\"submit\" ng-if=\"vm.currentState.indexOf('edit') != -1\" ng-disabled=\"vm.isSaving || facilityChargesForm.$invalid\">Modifier</button>\n        <button class=\"btn btn-danger\" type=\"submit\" ng-if=\"vm.currentState.indexOf('remove') != -1\" ng-disabled=\"vm.isSaving || facilityChargesForm.$invalid\">Supprimer</button>\n    </div>\n</form>\n");

/***/ }),

/***/ "./app/renderer/components/management/investment/investment.component.js":
/*!*******************************************************************************!*\
  !*** ./app/renderer/components/management/investment/investment.component.js ***!
  \*******************************************************************************/
/*! exports provided: InvestmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvestmentComponent", function() { return InvestmentComponent; });
/* harmony import */ var _investments_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./investments.html */ "./app/renderer/components/management/investment/investments.html");

var InvestmentComponent = {
  bindings: {
    investments: '<'
  },
  template: _investments_html__WEBPACK_IMPORTED_MODULE_0__["default"]
};

/***/ }),

/***/ "./app/renderer/components/management/investment/investment.module.js":
/*!****************************************************************************!*\
  !*** ./app/renderer/components/management/investment/investment.module.js ***!
  \****************************************************************************/
/*! exports provided: InvestmentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvestmentModule", function() { return InvestmentModule; });
/* harmony import */ var _investment_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./investment.component */ "./app/renderer/components/management/investment/investment.component.js");
/* harmony import */ var _investment_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./investment_form.component */ "./app/renderer/components/management/investment/investment_form.component.js");


var InvestmentModule = angular.module('InvestmentModule', []).config(["$stateProvider", function ($stateProvider) {
  'ngInject';

  var ENTITY_NAME = 'investment';
  $stateProvider.state('investment', {
    parent: 'components',
    url: '/investments',
    views: {
      'content@': {
        template: '<investments investments="$resolve.investments"></investments>'
      }
    },
    resolve: {
      investments: ["PouchDbService", function investments(PouchDbService) {
        return PouchDbService.find(ENTITY_NAME);
      }]
    },
    onEnter: ["SidebarService", function onEnter(SidebarService) {
      return SidebarService.closeNav();
    }]
  }).state('investment.create', {
    parent: 'investment',
    url: '/create',
    onEnter: ["ModalService", "$state", function onEnter(ModalService, $state) {
      return ModalService.open('investmentForm', {
        investment: {
          options: []
        }
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  }).state('investment.edit', {
    parent: 'investment',
    url: '/:id/edit',
    onEnter: ["ModalService", "PouchDbService", "$stateParams", "$state", function onEnter(ModalService, PouchDbService, $stateParams, $state) {
      return ModalService.open('investmentForm', {
        investment: PouchDbService.find(ENTITY_NAME, $stateParams.id)
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  }).state('investment.remove', {
    parent: 'investment',
    url: '/:id/remove',
    onEnter: ["ModalService", "PouchDbService", "$stateParams", "$state", function onEnter(ModalService, PouchDbService, $stateParams, $state) {
      return ModalService.open('investmentForm', {
        investment: PouchDbService.find(ENTITY_NAME, $stateParams.id)
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  });
}]).component('investments', _investment_component__WEBPACK_IMPORTED_MODULE_0__["InvestmentComponent"]).component('investmentForm', _investment_form_component__WEBPACK_IMPORTED_MODULE_1__["InvestmentFormComponent"]).name;

/***/ }),

/***/ "./app/renderer/components/management/investment/investment_form.component.js":
/*!************************************************************************************!*\
  !*** ./app/renderer/components/management/investment/investment_form.component.js ***!
  \************************************************************************************/
/*! exports provided: InvestmentFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvestmentFormComponent", function() { return InvestmentFormComponent; });
/* harmony import */ var _investment_form_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./investment_form.html */ "./app/renderer/components/management/investment/investment_form.html");
/* harmony import */ var _model_investment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../model/investment */ "./app/renderer/model/investment.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var InvestmentFormComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<'
  },
  template: _investment_form_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    InvestmentFormController.$inject = ["PouchDbService", "$state", "ToastrService"];

    function InvestmentFormController(PouchDbService, $state, ToastrService) {
      'ngInject';

      _classCallCheck(this, InvestmentFormController);

      this.state = $state;
      this.PouchDbService = PouchDbService;
      this.isSaving = false;
      this.currentState = this.state.current.name;
      this.ToastrService = ToastrService;
      this.entityName = 'investment';
    }

    _createClass(InvestmentFormController, [{
      key: "$onInit",
      value: function $onInit() {
        this.investment = this.resolve.investment;
      }
    }, {
      key: "addNewOption",
      value: function addNewOption() {
        this.investment.options.push(new _model_investment__WEBPACK_IMPORTED_MODULE_1__["AdditionalInvestment"](null, null));
      }
    }, {
      key: "removeOption",
      value: function removeOption(index) {
        console.log(index);
        this.investment.options.splice(index, 1);
      }
    }, {
      key: "removeAttachment",
      value: function removeAttachment(file) {
        var index = this.investment.attachments.indexOf(file);
        this.investment.attachments.splice(index, 1);
      }
    }, {
      key: "onSubmit",
      value: function onSubmit() {
        var _this = this;

        this.isSaving = true;
        var formState = this.currentState.replace("investment.", "");

        switch (formState) {
          case 'edit':
          case 'create':
            var attachments = {};

            for (var i = 0; i < this.investment.attachments.length; i++) {
              attachments[this.investment.attachments[i].name] = this.investment.attachments[i];
            }

            this.investment.attachments = attachments;
            this.PouchDbService.save(this.entityName, this.investment).then(function () {
              _this.ToastrService[formState](new _model_investment__WEBPACK_IMPORTED_MODULE_1__["Investment"](_this.investment));

              _this.modalInstance.close();
            });
            break;

          case 'remove':
            this.PouchDbService.remove(this.entityName, this.investment).then(function () {
              _this.ToastrService.remove(_this.investment);

              _this.modalInstance.close();
            });
            break;

          default:
            break;
        }

        this.isSaving = false;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.modalInstance.close();
      }
    }]);

    return InvestmentFormController;
  }(),
  controllerAs: 'vm'
};

Array.prototype.objectIndexOf = function (prop, val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i][prop] === val) return true;
  }

  return false;
};

/***/ }),

/***/ "./app/renderer/components/management/investment/investment_form.html":
/*!****************************************************************************!*\
  !*** ./app/renderer/components/management/investment/investment_form.html ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form name=\"investmentForm\" ng-submit=\"vm.onSubmit()\">\n    <div class=\"modal-header\">\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('create') != -1\">Création d'un nouveau type d'investissement.</h3>\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('edit') != -1\">Modification d'un investissement existant.</h3>\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('remove') != -1\">Suppression d'un investissement.</h3>\n    </div>\n    <div class=\"modal-body\" ng-if=\"vm.currentState.indexOf('remove') == -1\">\n        <div class=\"row\">\n            <h2 class=\"text-center\">Investissement</h2><hr>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"investment_name\" class=\"control-label\">Nom</label>\n                    <input type=\"text\" class=\"form-control {{ investmentForm.investment_name.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_name\" name=\"investment_name\" ng-model=\"vm.investment.name\" required minlength=\"0\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"investment_description\" class=\"control-label\">Description</label>\n                    <textarea class=\"form-control {{ investmentForm.investment_description.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_description\" name=\"investment_description\" ng-model=\"vm.investment.description\" required minlength=\"0\"></textarea>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"investment_designation\" class=\"control-label\">Désignation</label>\n                    <input type=\"text\" class=\"form-control {{ investmentForm.investment_designation.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_designation\" name=\"investment_designation\" ng-model=\"vm.investment.designation\" required minlength=\"0\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"investment_detail_designation\" class=\"control-label\">Détails désignation</label>\n                    <textarea class=\"form-control {{ investmentForm.investment_detail_designation.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_detail_designation\" name=\"investment_detail_designation\" ng-model=\"vm.investment.details.designation\" required minlength=\"0\"></textarea>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"investment_papers\" class=\"control-label\">Coût du permis de construire</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ investmentForm.investment_papers.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_papers\" name=\"investment_papers\" ng-model=\"vm.investment.papers\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"investment_detail_papers\" class=\"control-label\">Détails permis de construire</label>\n                    <textarea class=\"form-control {{ investmentForm.investment_detail_papers.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_detail_papers\" name=\"investment_detail_papers\" ng-model=\"vm.investment.details.papers\" minlength=\"0\" required></textarea>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"investment_architect_cost\" class=\"control-label\">Coût architecte</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ investmentForm.investment_architect_cost.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_architect_cost\" name=\"investment_architect_cost\" ng-model=\"vm.investment.architectCost\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"investment_detail_architect_cost\" class=\"control-label\">Détails coût architecte</label>\n                    <textarea class=\"form-control {{ investmentForm.investment_detail_architect_cost.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_detail_architect_cost\" name=\"investment_detail_architect_cost\" ng-model=\"vm.investment.details.architectCost\" minlength=\"0\" required></textarea>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"investment_personal_contribution\" class=\"control-label\">Apport personnel</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" class=\"form-control {{ investmentForm.investment_personal_contribution.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_personal_contribution\" name=\"investment_personal_contribution\" ng-model=\"vm.investment.personalContribution\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"investment_detail_personal_contribution\" class=\"control-label\">Détails Apport personnel</label>\n                    <textarea class=\"form-control {{ investmentForm.investment_detail_personal_contribution.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_detail_personal_contribution\" name=\"investment_detail_personal_contribution\" ng-model=\"vm.investment.details.personalContribution\" minlength=\"0\" required></textarea>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"investment_masonry\" class=\"control-label\">Gros oeuvre</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ investmentForm.investment_masonry.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_masonry\" name=\"investment_masonry\" ng-model=\"vm.investment.masonry\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"investment_detail_masonry\" class=\"control-label\">Détails gros oeuvre</label>\n                    <textarea class=\"form-control {{ investmentForm.investment_detail_masonry.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_detail_masonry\" name=\"investment_detail_masonry\" ng-model=\"vm.investment.details.masonry\" minlength=\"0\" required></textarea>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"investment_facilityMoutingDeliveryPrice\" class=\"control-label\">Livraison et Montage du bâtiment</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ investmentForm.investment_facilityMoutingDeliveryPrice.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_facilityMoutingDeliveryPrice\" name=\"investment_facilityMoutingDeliveryPrice\" ng-model=\"vm.investment.facilityMoutingDeliveryPrice\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"investment_detail_facilityMoutingDeliveryPrice\" class=\"control-label\">Détails livraison/montage bâtiment</label>\n                    <textarea class=\"form-control {{ investmentForm.investment_detail_masonry.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_detail_facilityMoutingDeliveryPrice\" name=\"investment_detail_facilityMoutingDeliveryPrice\" ng-model=\"vm.investment.details.facilityMoutingDeliveryPrice\" minlength=\"0\" required></textarea>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"investment_equipmentMountingDeliveryPrice\" class=\"control-label\">Livraison et Montage du matériel</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ investmentForm.investment_equipmentMountingDeliveryPrice.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_equipmentMountingDeliveryPrice\" name=\"investment_equipmentMountingDeliveryPrice\" ng-model=\"vm.investment.equipmentMountingDeliveryPrice\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"investment_details_equipmentMountingDeliveryPrice\" class=\"control-label\">Détails livraison/montage matériel</label>\n                    <textarea class=\"form-control {{ investmentForm.investment_details_equipmentMountingDeliveryPrice.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_details_equipmentMountingDeliveryPrice\" name=\"investment_details_equipmentMountingDeliveryPrice\" ng-model=\"vm.investment.details.equipmentMountingDeliveryPrice\" minlength=\"0\" required></textarea>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"investment_subsidies\" class=\"control-label\">Subventions AREA PCAE</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ investmentForm.investment_subsidies.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_subsidies\" name=\"investment_subsidies\" ng-model=\"vm.investment.subsidies\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"investment_details_subsidies\" class=\"control-label\">Détails subventions</label>\n                    <textarea class=\"form-control {{ investmentForm.investment_details_subsidies.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_details_subsidies\" name=\"investment_details_subsidies\" ng-model=\"vm.investment.details.subsidies\" minlength=\"0\" required></textarea>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"investment_helpEuralis\" class=\"control-label\">Aide EURALIS Volailles</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ investmentForm.investment_helpEuralis.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_helpEuralis\" name=\"investment_helpEuralis\" ng-model=\"vm.investment.helpEuralis\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"investment_details_helpEuralis\" class=\"control-label\">Détails aides EURALIS Volailles</label>\n                    <textarea class=\"form-control {{ investmentForm.investment_details_helpEuralis.$invalid ? 'wrong' : 'valid'}}_input\" id=\"investment_details_helpEuralis\" name=\"investment_details_helpEuralis\" ng-model=\"vm.investment.details.helpEuralis\" minlength=\"0\" required></textarea>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <button class=\"btn btn-primary\" type=\"button\" ng-click=\"vm.addNewOption()\">\n                    Ajouter une option diverse\n                    <span class=\"glyphicon glyphicon-plus\"></span>\n                </button>\n            </div>\n            <div ng-repeat=\"option in vm.investment.options track by $index\">\n                <div class=\"form-group col-md-5\">\n                    <label for=\"diverse_option_{{$index}}_name\" class=\"control-label\">Nom</label>\n                    <input id=\"diverse_option_{{$index}}_name\" name=\"diverse_option_{{$index}}_name\" class=\"form-control {{ investmentForm['diverse_option_'+$index+'_name'].$invalid ? 'wrong' : 'valid'}}_input\" type=\"text\" required ng-model=\"option.name\"/>\n                </div>\n                <div class=\"form-group col-md-5\">\n                    <label for=\"diverse_option_{{$index}}_amount\" class=\"control-label\">Montant</label>\n                    <input id=\"diverse_option_{{$index}}_amount\" name=\"diverse_option_{{$index}}_amount\" class=\"form-control {{ investmentForm['diverse_option_'+$index+'_amount'].$invalid ? 'wrong' : 'valid'}}_input\" type=\"number\" required ng-model=\"option.amount\"/>\n                </div>\n                <div class=\"form-group col-md-2\" style=\"padding-top: 26px;\">\n                    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"vm.removeOption($index)\">\n                        <span class=\"glyphicon glyphicon-remove\"></span>\n                    </button>\n                </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-3\" ng-repeat=\"attachment in vm.investment.attachments track by attachment.name\">\n                <button type=\"button\" class=\"btn btn-default btn-block\" ng-click=\"vm.removeAttachment(attachment)\"><span class=\"glyphicon glyphicon-remove\"></span> </button>\n                <p thumb-images=\"{ file: attachment, height: 100 }\"></p>\n            </div>\n        </div>\n        <file-uploader model=\"vm.investment.attachments\"></file-uploader>\n    </div>\n    <div class=\"modal-body\" ng-if=\"vm.currentState.indexOf('remove') != -1\">\n        Confirmer la suppression du {{vm.investment.toString() }}\n    </div>\n\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-default\" type=\"button\" ng-click=\"vm.cancel()\">Annuler</button>\n        <button class=\"btn btn-primary\" type=\"submit\" ng-if=\"vm.currentState.indexOf('create') != -1\" ng-disabled=\"vm.isSaving || investmentForm.$invalid\">Créer</button>\n        <button class=\"btn btn-success\" type=\"submit\" ng-if=\"vm.currentState.indexOf('edit') != -1\" ng-disabled=\"vm.isSaving || investmentForm.$invalid\">Modifier</button>\n        <button class=\"btn btn-danger\" type=\"submit\" ng-if=\"vm.currentState.indexOf('remove') != -1\" ng-disabled=\"vm.isSaving || investmentForm.$invalid\">Supprimer</button>\n    </div>\n</form>\n");

/***/ }),

/***/ "./app/renderer/components/management/investment/investments.html":
/*!************************************************************************!*\
  !*** ./app/renderer/components/management/investment/investments.html ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\n    <div class=\"row\">\n        <h1>\n            <i class=\"glyphicon glyphicon-grain\" style=\"color:rgba(219, 226, 13, 0.88)\"></i>\n            <span style=\"color: #309f41;\">Gestion des données</span>\n            <span style=\"color: #a6ce39;\">des investissements liés aux bâtiments</span>\n        </h1><hr>\n\n        <div class=\"pull-right\">\n            <button class=\"btn btn-block btn-primary\" ui-sref=\"investment.create\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                Créer un nouveau type d'investissement\n            </button>\n        </div>\n    </div>\n    <div class=\"table-responsive\">\n        <table class=\"table table-hover\">\n            <thead>\n            <tr>\n                <th>Nom</th>\n                <th>Désignation</th>\n                <th>Description</th>\n                <th class=\"text-center\">Gros oeuvre</th>\n                <th class=\"text-center\">Coût permis de construire</th>\n                <th class=\"text-center\">Coût architecte</th>\n                <th class=\"text-center\">Livraison/Montage Bâtiment</th>\n                <th class=\"text-center\">Livraison/Montage Matériel</th>\n                <th class=\"text-center\">Total (avant subventions)</th>\n                <th class=\"text-center\">Subvention AREA PCAE</th>\n                <th class=\"text-center\">Aide EURALIS Volailles</th>\n                <th class=\"text-center\">Total</th>\n\n                <th class=\"col-md-3 text-center\">Modifier/Supprimer</th>\n            </tr>\n            </thead>\n            <tbody>\n\n            <tr ng-repeat=\"investment in $ctrl.investments\">\n                <td>{{ investment.name | uppercase}}</td>\n                <td>{{ investment.designation }}</td>\n                <td>{{ investment.description}}</td>\n                <td class=\"col-md-2 text-center\">{{ investment.masonry}}€</td>\n                <td class=\"col-md-2 text-center\">{{ investment.papers}}€</td>\n                <td class=\"col-md-2 text-center\">{{ investment.architectCost}}€</td>\n                <td class=\"col-md-2 text-center\">{{ investment.facilityMoutingDeliveryPrice}}€</td>\n                <td class=\"col-md-2 text-center\">{{ investment.equipmentMountingDeliveryPrice}}€</td>\n                <td class=\"col-md-2 text-center\">{{ investment.getTotalBeforeSubsidies()}}€</td>\n                <td class=\"col-md-2 text-center\">{{ investment.subsidies}}€</td>\n                <td class=\"col-md-2 text-center\">{{ investment.helpEuralis}}€</td>\n                <td class=\"col-md-2 text-center\">{{ investment.getTotal()}}€</td>\n                <td class=\"col-md-3 text-center\">\n                    <button class=\"btn btn-success\" ui-sref=\"investment.edit({id: investment.id})\"><span class=\"glyphicon glyphicon-pencil\"></span></button>\n                    <button class=\"btn btn-danger\" ui-sref=\"investment.remove({id: investment.id})\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</div>");

/***/ }),

/***/ "./app/renderer/components/management/management.module.js":
/*!*****************************************************************!*\
  !*** ./app/renderer/components/management/management.module.js ***!
  \*****************************************************************/
/*! exports provided: ManagementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagementModule", function() { return ManagementModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _production_production_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./production/production.module */ "./app/renderer/components/management/production/production.module.js");
/* harmony import */ var _facility_charges_facility_charges_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./facility_charges/facility_charges.module */ "./app/renderer/components/management/facility_charges/facility_charges.module.js");
/* harmony import */ var _facility_facility_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./facility/facility.module */ "./app/renderer/components/management/facility/facility.module.js");
/* harmony import */ var _video_video_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./video/video.module */ "./app/renderer/components/management/video/video.module.js");
/* harmony import */ var _prospect_prospect_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./prospect/prospect.module */ "./app/renderer/components/management/prospect/prospect.module.js");
/* harmony import */ var _service_on_change_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/on-change.directive */ "./app/renderer/service/on-change.directive.js");
/* harmony import */ var _toastr_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./toastr.service */ "./app/renderer/components/management/toastr.service.js");








var departmentNames = [];
departmentNames.push({
  key: 'Landes',
  value: 'Landes'
});
departmentNames.push({
  key: 'Pyrenees',
  value: 'Pyrénées'
});
departmentNames.push({
  key: 'HautePyrenees',
  value: 'Hautes-Pyrénées'
});
departmentNames.push({
  key: 'Gers',
  value: 'Gers'
});
departmentNames.push({
  key: 'HauteGaronne',
  value: 'Haute-Garonne'
});
departmentNames.push({
  key: 'Tarn',
  value: 'Tarn'
});
departmentNames.push({
  key: 'LotGaronne',
  value: 'Lot-Et-Garonne'
});
departmentNames.push({
  key: 'Gironde',
  value: 'Gironde'
});
var ManagementModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('Management', [_production_production_module__WEBPACK_IMPORTED_MODULE_1__["ProductionModule"], _facility_facility_module__WEBPACK_IMPORTED_MODULE_3__["FacilityModule"], _facility_charges_facility_charges_module__WEBPACK_IMPORTED_MODULE_2__["FacilityChargesModule"], _video_video_module__WEBPACK_IMPORTED_MODULE_4__["VideoModule"], _prospect_prospect_module__WEBPACK_IMPORTED_MODULE_5__["ProspectModule"]]).config(["$locationProvider", "$stateProvider", "$compileProvider", function ($locationProvider, $stateProvider, $compileProvider) {
  'ngInject';

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|blob):/);
  $stateProvider.state('management', {
    parent: 'components',
    "abstract": true
  });
}]).directive('customOnChange', _service_on_change_directive__WEBPACK_IMPORTED_MODULE_6__["CustomOnChangeDirective"]).service('ToastrService', _toastr_service__WEBPACK_IMPORTED_MODULE_7__["ToastrService"]).constant('DEPARTMENTS', departmentNames).name;

/***/ }),

/***/ "./app/renderer/components/management/production/production.component.js":
/*!*******************************************************************************!*\
  !*** ./app/renderer/components/management/production/production.component.js ***!
  \*******************************************************************************/
/*! exports provided: ProductionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductionComponent", function() { return ProductionComponent; });
/* harmony import */ var _productions_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./productions.html */ "./app/renderer/components/management/production/productions.html");

var ProductionComponent = {
  bindings: {
    productions: '<'
  },
  template: _productions_html__WEBPACK_IMPORTED_MODULE_0__["default"]
};

/***/ }),

/***/ "./app/renderer/components/management/production/production.module.js":
/*!****************************************************************************!*\
  !*** ./app/renderer/components/management/production/production.module.js ***!
  \****************************************************************************/
/*! exports provided: ProductionModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductionModule", function() { return ProductionModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _production_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./production_form.component */ "./app/renderer/components/management/production/production_form.component.js");
/* harmony import */ var _production_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./production.component */ "./app/renderer/components/management/production/production.component.js");
/* harmony import */ var _production_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./production.scss */ "./app/renderer/components/management/production/production.scss");
/* harmony import */ var _production_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_production_scss__WEBPACK_IMPORTED_MODULE_3__);




var ProductionModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('Production', []).config(["$locationProvider", "$stateProvider", function ($locationProvider, $stateProvider) {
  'ngInject';

  var ENTITY_NAME = 'production';
  $stateProvider.state('production', {
    parent: 'management',
    url: '/productions',
    resolve: {
      productions: ["PouchDbService", function productions(PouchDbService) {
        return PouchDbService.find(ENTITY_NAME);
      }]
    },
    views: {
      'content@': {
        template: '<productions productions="$resolve.productions"></productions>'
      }
    },
    onEnter: ["SidebarService", function onEnter(SidebarService) {
      return SidebarService.closeNav();
    }]
  }).state('production.create', {
    parent: 'production',
    url: '/create',
    onEnter: ["ModalService", "PouchDbService", "$state", function onEnter(ModalService, PouchDbService, $state) {
      return ModalService.open('productionForm', {
        production: {},
        facilities: PouchDbService.find('facility')
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  }).state('production.edit', {
    parent: 'production',
    url: '/:id/edit',
    onEnter: ["ModalService", "PouchDbService", "$stateParams", "$state", function onEnter(ModalService, PouchDbService, $stateParams, $state) {
      return ModalService.open('productionForm', {
        production: PouchDbService.find(ENTITY_NAME, $stateParams.id),
        facilities: PouchDbService.find('facility')
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  }).state('production.remove', {
    parent: 'production',
    url: '/:id/remove',
    onEnter: ["ModalService", "PouchDbService", "$stateParams", "$state", function onEnter(ModalService, PouchDbService, $stateParams, $state) {
      return ModalService.open('productionForm', {
        production: PouchDbService.find(ENTITY_NAME, $stateParams.id)
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  });
}]).component('productionForm', _production_form_component__WEBPACK_IMPORTED_MODULE_1__["ProductionFormComponent"]).component('productions', _production_component__WEBPACK_IMPORTED_MODULE_2__["ProductionComponent"]).name;

/***/ }),

/***/ "./app/renderer/components/management/production/production.scss":
/*!***********************************************************************!*\
  !*** ./app/renderer/components/management/production/production.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--7-1!../../../../../node_modules/sass-loader/dist/cjs.js!./production.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/management/production/production.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/management/production/production_form.component.js":
/*!************************************************************************************!*\
  !*** ./app/renderer/components/management/production/production_form.component.js ***!
  \************************************************************************************/
/*! exports provided: ProductionFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductionFormComponent", function() { return ProductionFormComponent; });
/* harmony import */ var _production_form_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./production_form.html */ "./app/renderer/components/management/production/production_form.html");
/* harmony import */ var _model_production__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../model/production */ "./app/renderer/model/production.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ProductionFormComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<'
  },
  template: _production_form_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    ProductionFormController.$inject = ["PouchDbService", "$state", "DEPARTMENTS", "ToastrService"];

    function ProductionFormController(PouchDbService, $state, DEPARTMENTS, ToastrService) {
      'ngInject';

      _classCallCheck(this, ProductionFormController);

      this.state = $state;
      this.PouchDbService = PouchDbService;
      this.isSaving = false;
      this.currentState = this.state.current.name;
      this.departments = DEPARTMENTS;
      this.ToastrService = ToastrService;
      this.pickerIsOpen = false;
      this.format = 'dd/MM/yyyy';
      this.dateOptions = {
        showWeeks: true
      };
      this.entityName = 'production';
    }

    _createClass(ProductionFormController, [{
      key: "$onInit",
      value: function $onInit() {
        this.production = this.convertToShow(this.resolve.production);
        this.facilities = this.resolve.facilities;
      }
    }, {
      key: "openPicker",
      value: function openPicker() {
        this.pickerIsOpen = true;
      }
    }, {
      key: "convertToShow",
      value: function convertToShow(production) {
        production.vaccinesPrice *= 1000;
        production.foodPrice *= 1000;
        production.classedPrice *= 1000;
        production.declassedPrice *= 1000;
        production.breedingDeclassedPercent *= 100;
        production.mortalityPercent *= 100;
        production.restraintPercent *= 100;
        production.updateDate = production.updateDate || new Date().toISOString();
        return production;
      }
    }, {
      key: "convertToSave",
      value: function convertToSave(production) {
        production.vaccinesPrice /= 1000;
        production.foodPrice /= 1000;
        production.classedPrice /= 1000;
        production.declassedPrice /= 1000;
        production.breedingDeclassedPercent /= 100;
        production.mortalityPercent /= 100;
        production.restraintPercent /= 100;
        return production;
      }
    }, {
      key: "removeAttachment",
      value: function removeAttachment(attachment) {
        var index = this.production.attachments.indexOf(attachment);
        this.production.attachments.splice(index, 1);
      }
    }, {
      key: "onSubmit",
      value: function onSubmit() {
        var _this = this;

        this.isSaving = true;
        var prod = this.convertToSave(this.production);
        var formState = this.currentState.replace("production.", "");

        switch (formState) {
          case 'edit':
          case 'create':
            var attachments = {};

            for (var i = 0; i < prod.attachments.length; i++) {
              attachments[prod.attachments[i].name] = prod.attachments[i];
            }

            prod.attachments = attachments;
            this.PouchDbService.save(this.entityName, prod).then(function () {
              _this.ToastrService[formState](new _model_production__WEBPACK_IMPORTED_MODULE_1__["Production"](prod));

              _this.modalInstance.close();
            });
            break;

          case 'remove':
            this.PouchDbService.remove(this.entityName, prod).then(function () {
              _this.ToastrService.remove(_this.production);

              _this.modalInstance.close();
            });
            break;

          default:
            break;
        }

        this.isSaving = false;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.modalInstance.close()();
      }
    }]);

    return ProductionFormController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/management/production/production_form.html":
/*!****************************************************************************!*\
  !*** ./app/renderer/components/management/production/production_form.html ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form name=\"productionForm\" ng-submit=\"vm.onSubmit()\">\n    <div class=\"modal-header\">\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('create') != -1\">Création d'une nouvelle production.</h3>\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('edit') != -1\">Modification d'une production existante.</h3>\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('remove') != -1\">Suppression d'une production.</h3>\n    </div>\n    <div class=\"modal-body\" ng-if=\"vm.currentState.indexOf('remove') == -1\">\n        <div class=\"row\">\n            <h2 class=\"text-center\">Production</h2><hr>\n            <div class=\"col-md-12\">\n                    <label>Date de mise à jour de la production</label>\n                    <p class=\"input-group\">\n                        <button type=\"button\" class=\"btn btn-block btn-default {{ !vm.production.updateDate ? 'wrong' : 'valid'}}_input\" ng-click=\"vm.openPicker()\"\n                                uib-datepicker-popup=\"{{vm.format}}\" ng-model=\"vm.production.updateDate\" is-open=\"vm.pickerIsOpen\" datepicker-options=\"vm.dateOptions\"\n                                close-text=\"Close\">\n                            <span class=\"glyphicon glyphicon-calendar\"></span>&nbsp;&nbsp;{{vm.production.updateDate | date }}\n                        </button>\n                    </p>\n            </div>\n\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"name\" class=\"control-label\">Appellation</label>\n                    <input type=\"text\" class=\"form-control {{ productionForm.name.$invalid ? 'wrong' : 'valid'}}_input\" id=\"name\" name=\"name\" ng-model=\"vm.production.name\" required>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"facility\" class=\"control-label\">Type de bâtiment</label>\n                    <select class=\"form-control {{ productionForm.facility.$invalid ? 'wrong' : 'valid'}}_input\" id=\"facility\" name=\"facility\" ng-model=\"vm.production.facility\" required\n                            ng-options=\"facility as facility.type.toUpperCase() +' '+facility.size+'m² '+facility.facilityCharges.name for facility in vm.facilities track by facility.id\">\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"department\" class=\"control-label\">Département</label>\n                    <select class=\"form-control {{ productionForm.department.$invalid ? 'wrong' : 'valid'}}_input\" id=\"department\" name=\"department\" ng-model=\"vm.production.department\" required>\n                        <option ng-selected=\"vm.production.department === department.key\" ng-repeat=\"department in vm.departments\" value=\"{{department.key}}\">{{department.value}}</option>\n                        <option ng-selected=\"vm.departments.indexOf(vm.production.department) === -1\" value=\"Others\">Tous</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"chickBySquare\" class=\"control-label\">M²/Poulet</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.chickBySquare.$invalid ? 'wrong' : 'valid'}}_input\" id=\"chickBySquare\" name=\"chickBySquare\" ng-model=\"vm.production.chickBySquare\" min=\"0\" required>\n                        <span class=\"input-group-addon\">m²/poulet</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"chickNb\" class=\"control-label\">Nombre de poussins / bâtiment</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.chickNb.$invalid ? 'wrong' : 'valid'}}_input\" id=\"chickNb\" name=\"chickNb\" ng-model=\"vm.production.chickNb\" min=\"0\" required>\n                        <span class=\"input-group-addon\">poussins/bâtiment</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"avgWeight\" class=\"control-label\">Poids moyen</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.avgWeight.$invalid ? 'wrong' : 'valid'}}_input\" id=\"avgWeight\" name=\"avgWeight\" ng-model=\"vm.production.avgWeight\" min=\"0\" required>\n                        <span class=\"input-group-addon\">kg</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"age\" class=\"control-label\">Age</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.age.$invalid ? 'wrong' : 'valid'}}_input\" id=\"age\" name=\"age\" ng-model=\"vm.production.age\" min=\"0\" required>\n                        <span class=\"input-group-addon\">j</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"breedingPerYear\" class=\"control-label\">Nombre de bandes par an</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.breedingPerYear.$invalid ? 'wrong' : 'valid'}}_input\" id=\"breedingPerYear\" name=\"breedingPerYear\" ng-model=\"vm.production.breedingPerYear\" min=\"0\" required>\n                        <span class=\"input-group-addon\">bandes/an</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"consumptionIndex\" class=\"control-label\">Indice de consommation</label>\n                    <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.consumptionIndex.$invalid ? 'wrong' : 'valid'}}_input\" id=\"consumptionIndex\" name=\"consumptionIndex\" ng-model=\"vm.production.consumptionIndex\" min=\"0\" required>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"mortalityPercent\" class=\"control-label\">Taux de mortalité (%)</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.mortalityPercent.$invalid ? 'wrong' : 'valid'}}_input\" id=\"mortalityPercent\" name=\"mortalityPercent\" ng-model=\"vm.production.mortalityPercent\" min=\"0\" max=\"20\" required>\n                        <span class=\"input-group-addon\">%</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"foodPrice\" class=\"control-label\">Prix de l'aliment</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.foodPrice.$invalid ? 'wrong' : 'valid'}}_input\" id=\"foodPrice\" name=\"foodPrice\" ng-model=\"vm.production.foodPrice\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€/t</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"classedPrice\" class=\"control-label\">Prix du classé</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.classedPrice.$invalid ? 'wrong' : 'valid'}}_input\" id=\"classedPrice\" name=\"classedPrice\" ng-model=\"vm.production.classedPrice\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€/t</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"declassedPrice\" class=\"control-label\">Prix du déclassé (€/1000)</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.declassedPrice.$invalid ? 'wrong' : 'valid'}}_input\" id=\"declassedPrice\" name=\"declassedPrice\" ng-model=\"vm.production.declassedPrice\" min=\"0\" required>\n                        <span class=\"input-group-addon\">€/t</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"breedingDeclassedPercent\" class=\"control-label\">Taux de déclassé (%)</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.breedingDeclassedPercent.$invalid ? 'wrong' : 'valid'}}_input\" id=\"breedingDeclassedPercent\" name=\"breedingDeclassedPercent\" ng-model=\"vm.production.breedingDeclassedPercent\" min=\"0\" max=\"20\" required>\n                        <span class=\"input-group-addon\">%</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"restraintPercent\" class=\"control-label\">Taux de saisie (%)</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" step=\"any\" class=\"form-control {{ productionForm.restraintPercent.$invalid ? 'wrong' : 'valid'}}_input\" id=\"restraintPercent\" name=\"restraintPercent\" ng-model=\"vm.production.restraintPercent\" min=\"0\" max=\"20\" required>\n                        <span class=\"input-group-addon\">%</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-3\" ng-repeat=\"attachment in vm.production.attachments track by attachment.name\">\n                <button type=\"button\" class=\"btn btn-default btn-block\" ng-click=\"vm.removeAttachment(attachment)\"><span class=\"glyphicon glyphicon-remove\"></span> </button>\n                <p thumb-images=\"{ file: attachment, height: 100 }\"></p>\n            </div>\n        </div>\n        <file-uploader model=\"vm.production.attachments\"></file-uploader>\n    </div>\n    <div class=\"modal-body\" ng-if=\"vm.currentState.indexOf('remove') != -1\">\n        Confirmer la suppression de la production {{vm.production.toString()}}\n    </div>\n\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-default\" type=\"button\" ng-click=\"vm.cancel()\">Annuler</button>\n        <button class=\"btn btn-primary\" type=\"submit\" ng-if=\"vm.currentState.indexOf('create') != -1\" ng-disabled=\"vm.isSaving || productionForm.$invalid\">Créer</button>\n        <button class=\"btn btn-success\" type=\"submit\" ng-if=\"vm.currentState.indexOf('edit') != -1\" ng-disabled=\"vm.isSaving || productionForm.$invalid\">Modifier</button>\n        <button class=\"btn btn-danger\" type=\"submit\" ng-if=\"vm.currentState.indexOf('remove') != -1\" ng-disabled=\"vm.isSaving || productionForm.$invalid\">Supprimer</button>\n    </div>\n</form>\n");

/***/ }),

/***/ "./app/renderer/components/management/production/productions.html":
/*!************************************************************************!*\
  !*** ./app/renderer/components/management/production/productions.html ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\n    <div class=\"row\">\n            <h1>\n                <i class=\"glyphicon glyphicon-grain\" style=\"color:rgba(219, 226, 13, 0.88)\"></i>\n                <span style=\"color: #309f41;\">Gestion des données</span>\n                <span style=\"color: #a6ce39;\">de productions</span>\n            </h1><hr>\n\n        <div class=\"pull-right\">\n            <button class=\"btn btn-block btn-primary\" ui-sref=\"production.create\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                Créer un nouveau type de production\n            </button>\n        </div>\n    </div>\n\n    <div class=\"table-responsive\">\n        <table class=\"table table-hover\">\n            <thead>\n            <tr>\n                <th>Date de màj</th>\n                <th>M²/poulet</th>\n                <th>Nom de production</th>\n                <th>Département</th>\n                <th>Taille</th>\n                <th>Type</th>\n                <th>Nombre de poussins</th>\n                <th>Poids moyen</th>\n                <th>Age</th>\n                <th>Nb. bandes/an</th>\n                <th>I.C.</th>\n                <th>% Mortalité</th>\n                <th>Prix aliment</th>\n                <th>Prix du classé</th>\n                <th>Prix du déclassé</th>\n                <th>Taux de déclassé</th>\n                <th>Taux de saisie</th>\n\n                <th>Modifier/Supprimer</th>\n            </tr>\n            </thead>\n            <tbody>\n\n            <tr ng-repeat=\"production in $ctrl.productions\">\n                <td>{{ production.updateDate | date }}</td>\n                <td>{{ production.chickBySquare }}</td>\n                <td>{{ production.name }}</td>\n                <td>\n                    <span ng-if=\"production.department != 'Others'\">{{ production.department }}</span>\n                    <span ng-if=\"production.department == 'Others'\">Tous</span>\n                </td>\n                <td>{{ production.facility.size }}m²</td>\n                <td>{{ production.facility.type.value | uppercase }}</td>\n                <td class=\"aligntd\">{{ production.chickNb }}</td>\n                <td class=\"aligntd\">{{ production.avgWeight }}</td>\n                <td class=\"aligntd\">{{ production.age }} j.</td>\n                <td class=\"aligntd\">{{ production.breedingPerYear }}</td>\n                <td class=\"aligntd\">{{ production.consumptionIndex }}</td>\n                <td class=\"aligntd\">{{ production.mortalityPercent * 100}}%</td>\n                <td class=\"aligntd\">{{ production.foodPrice * 1000 | number: 0}}€</td>\n                <td class=\"aligntd\">{{ production.classedPrice * 1000 | number: 0}}€</td>\n                <td class=\"aligntd\">{{ production.declassedPrice * 1000 | number: 0}}€</td>\n                <td class=\"aligntd\">{{ production.breedingDeclassedPercent * 100}}%</td>\n                <td class=\"aligntd\">{{ production.restraintPercent * 100}}%</td>\n                <td class=\"aligntd\">\n                    <button class=\"btn btn-success\" ui-sref=\"production.edit({id: production.id})\"><span class=\"glyphicon glyphicon-pencil\"></span></button>\n                    <button class=\"btn btn-danger\" ui-sref=\"production.remove({id: production.id})\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n");

/***/ }),

/***/ "./app/renderer/components/management/prospect/prospect.module.js":
/*!************************************************************************!*\
  !*** ./app/renderer/components/management/prospect/prospect.module.js ***!
  \************************************************************************/
/*! exports provided: ProspectModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProspectModule", function() { return ProspectModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _prospect_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prospect_form.component */ "./app/renderer/components/management/prospect/prospect_form.component.js");


var ProspectModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('Prospect', []).component('prospectForm', _prospect_form_component__WEBPACK_IMPORTED_MODULE_1__["ProspectFormComponent"]).name;

/***/ }),

/***/ "./app/renderer/components/management/prospect/prospect_form.component.js":
/*!********************************************************************************!*\
  !*** ./app/renderer/components/management/prospect/prospect_form.component.js ***!
  \********************************************************************************/
/*! exports provided: ProspectFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProspectFormComponent", function() { return ProspectFormComponent; });
/* harmony import */ var _prospect_form_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prospect_form.html */ "./app/renderer/components/management/prospect/prospect_form.html");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var ProspectFormComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<'
  },
  template: _prospect_form_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    ProspectFormController.$inject = ["PouchDbService", "ToastrService"];

    function ProspectFormController(PouchDbService, ToastrService) {
      'ngInject';

      _classCallCheck(this, ProspectFormController);

      this.PouchDbService = PouchDbService;
      this.isSaving = false;
      this.ToastrService = ToastrService;
      this.entityName = 'prospect';
    }

    _createClass(ProspectFormController, [{
      key: "$onInit",
      value: function $onInit() {
        this.prospect = this.resolve.prospect;
      }
    }, {
      key: "onSubmit",
      value: function onSubmit() {
        var _this = this;

        this.isSaving = true;
        this.PouchDbService.save(this.entityName, this.prospect).then(function () {
          _this.ToastrService.speak("Pr\xE9vionnel pour ".concat(_this.prospect.name), 'Impression');

          _this.isSaving = false;

          _this.modalInstance.close(_this.prospect);
        });
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.modalInstance.close();
      }
    }]);

    return ProspectFormController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/management/prospect/prospect_form.html":
/*!************************************************************************!*\
  !*** ./app/renderer/components/management/prospect/prospect_form.html ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form name=\"prospectForm\" ng-submit=\"vm.onSubmit()\">\n    <div class=\"modal-header\">\n        <h3 class=\"modal-title\">Saisies des informations prospect.</h3>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"row\">\n            <h2 class=\"text-center\">Prospect</h2><hr>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-6\">\n                <div class=\"form-group\">\n                    <label for=\"name\" class=\"control-label\">Nom</label>\n                    <input type=\"text\" class=\"form-control {{ prospectForm.name.$invalid ? 'wrong' : 'valid'}}_input\" id=\"name\" name=\"name\" ng-model=\"vm.prospect.name\" required>\n                </div>\n            </div>\n            <div class=\"col-md-6\">\n                <div class=\"form-group\">\n                    <label for=\"address\" class=\"control-label\">Adresse</label>\n                    <input type=\"text\" class=\"form-control\" id=\"address\" name=\"address\" ng-model=\"vm.prospect.address\">\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"company\" class=\"control-label\">Société</label>\n                    <input type=\"text\" class=\"form-control\" id=\"company\" name=\"company\" ng-model=\"vm.prospect.company\">\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"email\" class=\"control-label\">Email</label>\n                    <input type=\"email\" class=\"form-control\" id=\"email\" name=\"email\" ng-model=\"vm.prospect.email\">\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label for=\"phone\" class=\"control-label\">Téléphone</label>\n                    <input type=\"text\" class=\"form-control\" id=\"phone\" name=\"phone\" ng-model=\"vm.prospect.phone\">\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-default\" type=\"button\" ng-click=\"vm.cancel()\">Annuler</button>\n        <button class=\"btn btn-primary\" type=\"submit\" ng-disabled=\"vm.isSaving || prospectForm.$invalid\">Imprimer</button>\n    </div>\n</form>\n");

/***/ }),

/***/ "./app/renderer/components/management/toastr.service.js":
/*!**************************************************************!*\
  !*** ./app/renderer/components/management/toastr.service.js ***!
  \**************************************************************/
/*! exports provided: ToastrService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToastrService", function() { return ToastrService; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var ToastrService = /*#__PURE__*/function () {
  function ToastrService() {
    _classCallCheck(this, ToastrService);
  }

  _createClass(ToastrService, [{
    key: "speak",
    value: function speak(info, title) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(info, title);
    }
  }, {
    key: "edit",
    value: function edit(object) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success('a été mis à jour.', object.toString());
    }
  }, {
    key: "create",
    value: function create(object) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info('a été créé.', object.toString());
    }
  }, {
    key: "remove",
    value: function remove(object) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info('a été supprimé.', object.toString());
    }
  }]);

  return ToastrService;
}();

/***/ }),

/***/ "./app/renderer/components/management/video/video.component.js":
/*!*********************************************************************!*\
  !*** ./app/renderer/components/management/video/video.component.js ***!
  \*********************************************************************/
/*! exports provided: VideoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoComponent", function() { return VideoComponent; });
/* harmony import */ var _videos_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./videos.html */ "./app/renderer/components/management/video/videos.html");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var VideoComponent = {
  bindings: {
    videos: '<'
  },
  template: _videos_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    VideoController.$inject = ["VideoService"];

    function VideoController(VideoService) {
      'ngInject';

      _classCallCheck(this, VideoController);

      this.VideoService = VideoService;
    }

    _createClass(VideoController, [{
      key: "$onInit",
      value: function $onInit() {
        if (this.videos.length > 0) {
          this.VideoService.load(this.videos[0].getFile());
        }
      }
    }, {
      key: "load",
      value: function load(video) {
        this.VideoService.load(video.getFile());
      }
    }]);

    return VideoController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/management/video/video.module.js":
/*!******************************************************************!*\
  !*** ./app/renderer/components/management/video/video.module.js ***!
  \******************************************************************/
/*! exports provided: VideoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoModule", function() { return VideoModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _video_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./video_form.component */ "./app/renderer/components/management/video/video_form.component.js");
/* harmony import */ var _video_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./video.component */ "./app/renderer/components/management/video/video.component.js");
/* harmony import */ var _video_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./video.service */ "./app/renderer/components/management/video/video.service.js");




var VideoModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('Video', []).config(["$locationProvider", "$stateProvider", function ($locationProvider, $stateProvider) {
  'ngInject';

  var ENTITY_NAME = 'video';
  $stateProvider.state('video', {
    parent: 'management',
    url: '/videos',
    resolve: {
      videos: ["PouchDbService", function videos(PouchDbService) {
        return PouchDbService.find(ENTITY_NAME);
      }]
    },
    views: {
      'content@': {
        template: '<videos videos="$resolve.videos"></videos>'
      }
    },
    onEnter: ["SidebarService", function onEnter(SidebarService) {
      return SidebarService.closeNav();
    }]
  }).state('video.create', {
    parent: 'video',
    url: '/create',
    onEnter: ["ModalService", "$state", function onEnter(ModalService, $state) {
      return ModalService.open('videoForm', {
        video: {}
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  }).state('video.edit', {
    parent: 'video',
    url: '/:id/edit',
    onEnter: ["ModalService", "PouchDbService", "$stateParams", "$state", function onEnter(ModalService, PouchDbService, $stateParams, $state) {
      return ModalService.open('videoForm', {
        video: PouchDbService.find(ENTITY_NAME, $stateParams.id)
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  }).state('video.remove', {
    parent: 'video',
    url: '/:id/remove',
    onEnter: ["ModalService", "PouchDbService", "$stateParams", "$state", function onEnter(ModalService, PouchDbService, $stateParams, $state) {
      return ModalService.open('videoForm', {
        video: PouchDbService.find(ENTITY_NAME, $stateParams.id)
      }).then(function () {
        return $state.go('^', null, {
          reload: true
        });
      })["catch"](function () {
        return $state.go('^');
      });
    }]
  });
}]).component('videoForm', _video_form_component__WEBPACK_IMPORTED_MODULE_1__["VideoFormComponent"]).component('videos', _video_component__WEBPACK_IMPORTED_MODULE_2__["VideoComponent"]).service('VideoService', _video_service__WEBPACK_IMPORTED_MODULE_3__["VideoService"]).name;

/***/ }),

/***/ "./app/renderer/components/management/video/video.service.js":
/*!*******************************************************************!*\
  !*** ./app/renderer/components/management/video/video.service.js ***!
  \*******************************************************************/
/*! exports provided: VideoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoService", function() { return VideoService; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VideoService = /*#__PURE__*/function () {
  VideoService.$inject = ["$timeout"];

  function VideoService($timeout) {
    "ngInject";

    _classCallCheck(this, VideoService);

    this.timeout = $timeout;
  }

  _createClass(VideoService, [{
    key: "load",
    value: function load(file) {
      this.timeout(function () {
        var myVideo = document.getElementsByTagName('video')[0];
        myVideo.src = URL.createObjectURL(file);
        myVideo.load();
      });
    }
  }]);

  return VideoService;
}();

/***/ }),

/***/ "./app/renderer/components/management/video/video_form.component.js":
/*!**************************************************************************!*\
  !*** ./app/renderer/components/management/video/video_form.component.js ***!
  \**************************************************************************/
/*! exports provided: VideoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoFormComponent", function() { return VideoFormComponent; });
/* harmony import */ var _video_form_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video_form.html */ "./app/renderer/components/management/video/video_form.html");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var VideoFormComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<'
  },
  template: _video_form_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    VideoFormController.$inject = ["PouchDbService", "$state", "ToastrService", "$scope", "VideoService"];

    function VideoFormController(PouchDbService, $state, ToastrService, $scope, VideoService) {
      'ngInject';

      var _this = this;

      _classCallCheck(this, VideoFormController);

      this.state = $state;
      this.PouchDbService = PouchDbService;
      this.VideoService = VideoService;
      this.isSaving = false;
      this.currentState = this.state.current.name;
      this.ToastrService = ToastrService;
      this.entityName = 'video';
      this.formData = {
        file: null
      };

      $scope.fileNameChanged = function (elem) {
        _this.formData.file = elem.files[0];

        _this.VideoService.load(elem.files[0]);
      };
    }

    _createClass(VideoFormController, [{
      key: "$onInit",
      value: function $onInit() {
        this.video = this.resolve.video;

        if (this.video.id) {
          this.VideoService.load(this.video.getFile());
          this.formData.file = this.video.getFile();
          this.video.name = this.video.getName();
        }
      }
    }, {
      key: "onSubmit",
      value: function onSubmit() {
        var _this2 = this;

        this.isSaving = true;
        var formState = this.currentState.replace("video.", "");

        switch (formState) {
          case 'edit':
          case 'create':
            this.video.attachments = _defineProperty({}, this.video.name, this.formData.file);
            this.PouchDbService.save(this.entityName, this.video).then(function () {
              _this2.ToastrService[formState]("Vid\xE9o ".concat(_this2.video.name));

              _this2.modalInstance.close();
            });
            break;

          case 'remove':
            this.PouchDbService.remove(this.entityName, this.video).then(function () {
              _this2.ToastrService.remove(_this2.video);

              _this2.modalInstance.close();
            });
            break;

          default:
            break;
        }

        this.isSaving = false;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.modalInstance.close();
      }
    }]);

    return VideoFormController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/management/video/video_form.html":
/*!******************************************************************!*\
  !*** ./app/renderer/components/management/video/video_form.html ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form name=\"videoForm\" ng-submit=\"vm.onSubmit()\">\n    <div class=\"modal-header\">\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('create') != -1\">Création d'une nouvelle video.</h3>\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('edit') != -1\">Modification d'une video existante.</h3>\n        <h3 class=\"modal-title\" ng-if=\"vm.currentState.indexOf('remove') != -1\">Suppression d'une video.</h3>\n    </div>\n    <div class=\"modal-body\" ng-if=\"vm.currentState.indexOf('remove') == -1\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <div ng-if=\"vm.currentState.indexOf('remove') == -1\">\n                        <label>Vidéo actuelle: </label>\n                        <div class=\"form-group\">\n                            <video width=\"100%\" id=\"create\" controls>\n                                <source src=\"\" type=\"video/mp4\">\n                                Your browser does not support HTML5 video.\n                            </video>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"load-file\" ng-if=\"vm.currentState.indexOf('edit') != -1\">Changer la vidéo:</label>\n                        <label for=\"load-file\" ng-if=\"vm.currentState.indexOf('create') != -1\">Choisir une vidéo:</label>\n                        <input type=\"file\" id=\"load-file\"  onchange=\"angular.element(this).scope().fileNameChanged(this)\">\n                    </div>\n                    <!--custom-on-change=\"vm.fileChanged\"-->\n                    <div class=\"form-group\">\n                        <label for=\"video_name\">Nom de la vidéo</label>\n                        <input type=\"text\" id=\"video_name\" ng-model=\"vm.video.name\" required class=\"form-control\" />\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-body\" ng-if=\"vm.currentState.indexOf('remove') != -1\">\n        Confirmer la suppression de la video <strong>{{vm.video.name}}</strong>\n    </div>\n\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-default\" type=\"button\" ng-click=\"vm.cancel()\">Annuler</button>\n        <button class=\"btn btn-primary\" type=\"submit\" ng-if=\"vm.currentState.indexOf('create') != -1\" ng-disabled=\"vm.isSaving || videoForm.$invalid\">Créer</button>\n        <button class=\"btn btn-success\" type=\"submit\" ng-if=\"vm.currentState.indexOf('edit') != -1\" ng-disabled=\"vm.isSaving || videoForm.$invalid\">Modifier</button>\n        <button class=\"btn btn-danger\" type=\"submit\" ng-if=\"vm.currentState.indexOf('remove') != -1\" ng-disabled=\"vm.isSaving || videoForm.$invalid\">Supprimer</button>\n    </div>\n</form>");

/***/ }),

/***/ "./app/renderer/components/management/video/videos.html":
/*!**************************************************************!*\
  !*** ./app/renderer/components/management/video/videos.html ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container\">\n    <h1>\n        <i class=\"glyphicon glyphicon-facetime-video\" style=\"color:rgba(219, 226, 13, 0.88)\"></i>\n        <span style=\"color: #309f41;\">Gestion</span>\n        <span style=\"color: #a6ce39;\">des vidéos</span>\n    </h1><hr>\n\n    <div class=\"row\">\n        <div class=\"col-md-9\">\n            <video width=\"100%\" controls>\n                <source src=\"\" type=\"video/mp4\">\n                Your browser does not support HTML5 video.\n            </video>\n        </div>\n\n        <div class=\"col-md-3\">\n            <button class=\"btn btn-block btn-primary\" ui-sref=\"video.create\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                Ajouter une vidéo\n            </button>\n            <div style=\"height:40%; overflow: auto;\" ng-if=\"vm.videos.length > 0\">\n                <table class=\"table table-hovered\">\n                <thead>\n                <tr>\n                    <th>Nom</th>\n                    <th colspan=\"2\">Taille (Mo)</th>\n                    <th></th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr ng-repeat=\"video in vm.videos\" ng-click=\"vm.load(video)\" style=\"cursor: pointer;\">\n                    <td>{{video.getName()}}</td>\n                    <td colspan=\"2\">{{video.getSize() / 1000000 | number:1}}</td>\n                    <td>\n                        <a href ui-sref=\"video.edit({id: video.id})\">\n                            <span class=\"glyphicon glyphicon-pencil\"></span>\n                        </a>\n                        <a href ui-sref=\"video.remove({id: video.id})\">\n                            <span class=\"glyphicon glyphicon-remove\"></span>\n                        </a>\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./app/renderer/components/navbar/navbar.component.js":
/*!************************************************************!*\
  !*** ./app/renderer/components/navbar/navbar.component.js ***!
  \************************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _navbar_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navbar.html */ "./app/renderer/components/navbar/navbar.html");
/* harmony import */ var _navbar_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navbar.scss */ "./app/renderer/components/navbar/navbar.scss");
/* harmony import */ var _navbar_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_navbar_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _images_logo_euralis_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/logo_euralis.gif */ "./app/renderer/images/logo_euralis.gif");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var NavbarComponent = {
  bindings: {},
  template: _navbar_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  restrict: 'E',
  controller: /*#__PURE__*/function () {
    NavbarController.$inject = ["SidebarService", "$scope"];

    function NavbarController(SidebarService, $scope) {
      'ngInject';

      var _this = this;

      _classCallCheck(this, NavbarController);

      this.logo = _images_logo_euralis_gif__WEBPACK_IMPORTED_MODULE_2__["default"];
      this.sidebar = SidebarService;
      this.isOpen = false;
      $scope.$watch('vm.sidebar.isOpen', function (n, o) {
        _this.isOpen = n;
      });
    }

    _createClass(NavbarController, [{
      key: "openSidebar",
      value: function openSidebar() {
        this.sidebar.toggle();
      }
    }]);

    return NavbarController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/navbar/navbar.html":
/*!****************************************************!*\
  !*** ./app/renderer/components/navbar/navbar.html ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<nav class=\"navbar navbar-fixed-top\">\n\n    <div class=\"container nav-container\">\n        <a class=\"effect_fade\" ui-sref=\"home\">\n            <img src=\"{{vm.logo}}\" style=\"height: 80px;\" id=\"logo_euralis\"/>\n        </a>\n\n        <search-bar></search-bar>\n\n        <a class=\"effect_fade\" style=\"color:green; cursor:pointer;padding:20px;\" ng-click=\"vm.openSidebar()\">\n            <span ng-if=\"vm.isOpen\" class=\"glyphicon glyphicon-arrow-right\" style=\"font-size: 1.5em;\"></span>\n            <span ng-if=\"!vm.isOpen\" class=\"glyphicon glyphicon-arrow-left\" style=\"font-size: 1.5em;\"></span>\n        </a>\n    </div>\n</nav>\n");

/***/ }),

/***/ "./app/renderer/components/navbar/navbar.module.js":
/*!*********************************************************!*\
  !*** ./app/renderer/components/navbar/navbar.module.js ***!
  \*********************************************************/
/*! exports provided: NavbarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarModule", function() { return NavbarModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _navbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navbar.component */ "./app/renderer/components/navbar/navbar.component.js");
/* harmony import */ var _search_bar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search-bar.component */ "./app/renderer/components/navbar/search-bar.component.js");



var NavbarModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('NavbarModule', []).component('searchBar', _search_bar_component__WEBPACK_IMPORTED_MODULE_2__["SearchBarComponent"]).component('navbar', _navbar_component__WEBPACK_IMPORTED_MODULE_1__["NavbarComponent"]).name;

/***/ }),

/***/ "./app/renderer/components/navbar/navbar.scss":
/*!****************************************************!*\
  !*** ./app/renderer/components/navbar/navbar.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--7-1!../../../../node_modules/sass-loader/dist/cjs.js!./navbar.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/navbar/navbar.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/navbar/search-bar.component.js":
/*!****************************************************************!*\
  !*** ./app/renderer/components/navbar/search-bar.component.js ***!
  \****************************************************************/
/*! exports provided: SearchBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBarComponent", function() { return SearchBarComponent; });
/* harmony import */ var _search_bar_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search-bar.scss */ "./app/renderer/components/navbar/search-bar.scss");
/* harmony import */ var _search_bar_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_search_bar_scss__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var SearchBarComponent = {
  bindings: {},
  restrict: 'E',
  template: "\n        <div class=\"search-bar\">\n            <div class=\"input\">\n                <input type=\"text\" ng-model=\"searchQuery.name\" class=\"field\" />\n                <span class=\"glyphicon glyphicon-remove\" ng-if=\"vm.searchQuery\" ng-click=\"vm.close()\" style=\"cursor: pointer;\"></span>\n                <span class=\"glyphicon glyphicon-search\"></span>\n            </div>\n            <div class=\"search-result\" ng-if=\"searchQuery.name && vm.isOpen\">\n                <ul class=\"list-box\">\n                    <li ng-repeat=\"result in vm.productions | filter: searchQuery\" ng-click=\"vm.goToProduction(result)\">\n                        {{ result.name.toUpperCase() }} - {{ result.facility.size }}m\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
  controller: /*#__PURE__*/function () {
    SearchBarController.$inject = ["PouchDbService", "$state", "$scope"];

    function SearchBarController(PouchDbService, $state, $scope) {
      'ngInject';

      var _this = this;

      _classCallCheck(this, SearchBarController);

      this.productions = [];
      this.dbService = PouchDbService;
      this.state = $state;
      this.isOpen = false;
      this.searchProductions();
      $scope.$watch('searchQuery.name', function () {
        _this.isOpen = true;
      });
    }

    _createClass(SearchBarController, [{
      key: "searchProductions",
      value: function searchProductions() {
        var _this2 = this;

        return this.dbService.find('production').then(function (productions) {
          _this2.productions = productions;
        });
      }
    }, {
      key: "goToProduction",
      value: function goToProduction(result) {
        var _this3 = this;

        this.state.go('presentation', {
          department: result.department,
          production: {
            name: result.name,
            size: result.facility.size
          }
        }).then(function () {
          return _this3.close();
        });
      }
    }, {
      key: "close",
      value: function close() {
        this.searchQuery = null;
        this.isOpen = false;
      }
    }]);

    return SearchBarController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/navbar/search-bar.scss":
/*!********************************************************!*\
  !*** ./app/renderer/components/navbar/search-bar.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--7-1!../../../../node_modules/sass-loader/dist/cjs.js!./search-bar.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/navbar/search-bar.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/presentation/highlighter.directive.js":
/*!***********************************************************************!*\
  !*** ./app/renderer/components/presentation/highlighter.directive.js ***!
  \***********************************************************************/
/*! exports provided: HighlighterDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighlighterDirective", function() { return HighlighterDirective; });
var HighlighterDirective = function HighlighterDirective($timeout) {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      model: '=highlighter'
    },
    link: function link(scope, element) {
      scope.$watch('model', function (nv, ov) {
        if (nv !== ov) {
          // apply class
          element.removeClass('highlighted');
          element.addClass('highlight'); // auto remove after some delay

          $timeout(function () {
            element.removeClass('highlight');
            element.addClass('highlighted');
          }, 250);
        }
      });
    }
  };
};
HighlighterDirective.$inject = ["$timeout"];

/***/ }),

/***/ "./app/renderer/components/presentation/presentation.component.js":
/*!************************************************************************!*\
  !*** ./app/renderer/components/presentation/presentation.component.js ***!
  \************************************************************************/
/*! exports provided: PresentationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentationComponent", function() { return PresentationComponent; });
/* harmony import */ var _presentation_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./presentation.html */ "./app/renderer/components/presentation/presentation.html");
/* harmony import */ var _presentation_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presentation.scss */ "./app/renderer/components/presentation/presentation.scss");
/* harmony import */ var _presentation_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_presentation_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _images_poulet_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/poulet.jpg */ "./app/renderer/images/poulet.jpg");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var PresentationComponent = {
  bindings: {
    productionsByFacilityType: '<',
    production: '<'
  },
  template: _presentation_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    function PresentationComponent() {
      _classCallCheck(this, PresentationComponent);
    }

    _createClass(PresentationComponent, [{
      key: "$onInit",
      value: function $onInit() {
        this.facilityIndexActive = 0;
        this.active = this.production ? this.findProductionIndexByName(this.production.name, this.production.size) : 0;
      }
    }, {
      key: "findProductionIndexByName",
      value: function findProductionIndexByName(name, size) {
        if (!name) return 0;
        var isFixed = indexOfByNameAndSize(this.productionsByFacilityType.fixed);
        var isMovable = indexOfByNameAndSize(this.productionsByFacilityType.movable);
        this.facilityIndexActive = isFixed !== -1 ? 0 : 1;
        return this.facilityIndexActive === 0 ? isFixed : isMovable;

        function indexOfByNameAndSize(productions) {
          if (!productions) return -1;
          return productions.map(concatProdNameAndFacilitySize()).indexOf(concatNameAndSize(name, size));
        }

        function concatProdNameAndFacilitySize() {
          return function (prod) {
            return concatNameAndSize(prod.name, prod.facility.size);
          };
        }

        function concatNameAndSize(name, size) {
          return name + '' + size;
        }
      }
    }]);

    return PresentationComponent;
  }()
};

/***/ }),

/***/ "./app/renderer/components/presentation/presentation.html":
/*!****************************************************************!*\
  !*** ./app/renderer/components/presentation/presentation.html ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br /><br />\n<div class=\"container\">\n    <uib-tabset active=\"$ctrl.facilityIndexActive\" justified=\"true\" type=\"pills\" class=\"tab-animation\">\n        <uib-tab ng-repeat=\"productions in $ctrl.productionsByFacilityType track by $index\" index=\"$index\"\n                 ng-if=\"productions.length > 0\"\n                 heading=\"{{ productions[0].facility.type.value | uppercase }}\">\n            <previsionnel-batiment active=\"$ctrl.active\" productions=\"productions\"></previsionnel-batiment>\n        </uib-tab>\n    </uib-tabset>\n</div>\n\n<div class=\"parallax\"></div>\n");

/***/ }),

/***/ "./app/renderer/components/presentation/presentation.module.js":
/*!*********************************************************************!*\
  !*** ./app/renderer/components/presentation/presentation.module.js ***!
  \*********************************************************************/
/*! exports provided: PresentationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentationModule", function() { return PresentationModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular_animate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-animate */ "./node_modules/angular-animate/index.js");
/* harmony import */ var angular_animate__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular_animate__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angularjs_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angularjs-slider */ "./node_modules/angularjs-slider/dist/rzslider.js");
/* harmony import */ var angularjs_slider__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angularjs_slider__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var angularjs_slider_dist_rzslider_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularjs-slider/dist/rzslider.css */ "./node_modules/angularjs-slider/dist/rzslider.css");
/* harmony import */ var angularjs_slider_dist_rzslider_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angularjs_slider_dist_rzslider_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _image_loader_image_loader_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../image-loader/image_loader.module */ "./app/renderer/components/image-loader/image_loader.module.js");
/* harmony import */ var _presentation_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./presentation_data.service */ "./app/renderer/components/presentation/presentation_data.service.js");
/* harmony import */ var _presentation_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./presentation.component */ "./app/renderer/components/presentation/presentation.component.js");
/* harmony import */ var _previsionnel_previsionnel_batiment_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./previsionnel/previsionnel_batiment.component */ "./app/renderer/components/presentation/previsionnel/previsionnel_batiment.component.js");
/* harmony import */ var _service_file_input_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../service/file_input.directive */ "./app/renderer/service/file_input.directive.js");
/* harmony import */ var _highlighter_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./highlighter.directive */ "./app/renderer/components/presentation/highlighter.directive.js");
/* harmony import */ var _previsionnel_investment_investments_presentation_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./previsionnel/investment/investments_presentation.component */ "./app/renderer/components/presentation/previsionnel/investment/investments_presentation.component.js");











var PresentationModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('PresentationModule', [angularjs_slider__WEBPACK_IMPORTED_MODULE_2___default.a, _image_loader_image_loader_module__WEBPACK_IMPORTED_MODULE_4__["ImageLoaderModule"], angular_animate__WEBPACK_IMPORTED_MODULE_1___default.a]).config(["$stateProvider", function ($stateProvider) {
  'ngInject';

  $stateProvider.state('presentation', {
    parent: 'components',
    url: '/presentation/:department',
    params: {
      production: null
    },
    resolve: {
      productions: ["PresentationDataService", "$stateParams", function productions(PresentationDataService, $stateParams) {
        return PresentationDataService.getProdByDeptAndFacilityType($stateParams.department);
      }],
      production: ["$stateParams", function production($stateParams) {
        return $stateParams.production;
      }]
    },
    views: {
      'content@': {
        template: '<presentation production="$resolve.production" productions-by-facility-type="$resolve.productions"></presentation>'
      }
    }
  });
}]).component('presentation', _presentation_component__WEBPACK_IMPORTED_MODULE_6__["PresentationComponent"]).service('PresentationDataService', _presentation_data_service__WEBPACK_IMPORTED_MODULE_5__["PresentationDataService"]).directive('fileInput', _service_file_input_directive__WEBPACK_IMPORTED_MODULE_8__["FileInputDirective"]).directive('highlighter', _highlighter_directive__WEBPACK_IMPORTED_MODULE_9__["HighlighterDirective"]).component('previsionnelBatiment', _previsionnel_previsionnel_batiment_component__WEBPACK_IMPORTED_MODULE_7__["PrevisionnelBatimentComponent"]).component('investmentsPresentation', _previsionnel_investment_investments_presentation_component__WEBPACK_IMPORTED_MODULE_10__["InvestmentsPresentationComponent"]).name;

/***/ }),

/***/ "./app/renderer/components/presentation/presentation.scss":
/*!****************************************************************!*\
  !*** ./app/renderer/components/presentation/presentation.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--7-1!../../../../node_modules/sass-loader/dist/cjs.js!./presentation.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/presentation/presentation.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/presentation/presentation_data.service.js":
/*!***************************************************************************!*\
  !*** ./app/renderer/components/presentation/presentation_data.service.js ***!
  \***************************************************************************/
/*! exports provided: PresentationDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentationDataService", function() { return PresentationDataService; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ANY_DEPARTMENT = 'Others';
var PresentationDataService = /*#__PURE__*/function () {
  PresentationDataService.$inject = ["PouchDbService"];

  function PresentationDataService(PouchDbService) {
    'ngInject';

    _classCallCheck(this, PresentationDataService);

    this.PouchDbService = PouchDbService;
  }

  _createClass(PresentationDataService, [{
    key: "getProdByDeptAndFacilityType",
    value: function getProdByDeptAndFacilityType(department) {
      return this.PouchDbService.getProductionsByDepartment(department).then(function (productions) {
        var filterByDepartment = productions.filter(function (prod) {
          return prod.department === department || prod.department === ANY_DEPARTMENT;
        });
        var fixedProductions = filterByDepartment.filter(function (prod) {
          return prod.facility.type.key === 'fixed';
        });
        var movableProductions = filterByDepartment.filter(function (prod) {
          return prod.facility.type.key === 'movable';
        });
        return {
          fixed: fixedProductions,
          movable: movableProductions
        };
      });
    }
  }]);

  return PresentationDataService;
}();

/***/ }),

/***/ "./app/renderer/components/presentation/previsionnel/functions.js":
/*!************************************************************************!*\
  !*** ./app/renderer/components/presentation/previsionnel/functions.js ***!
  \************************************************************************/
/*! exports provided: DEFAULT_INVESTMENT_CHOOSEN, NO_INVESTMENT_ANNUITY, processInvestmentAnnuity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_INVESTMENT_CHOOSEN", function() { return DEFAULT_INVESTMENT_CHOOSEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NO_INVESTMENT_ANNUITY", function() { return NO_INVESTMENT_ANNUITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processInvestmentAnnuity", function() { return processInvestmentAnnuity; });
var DEFAULT_INVESTMENT_CHOOSEN = 'none';
var NO_INVESTMENT_ANNUITY = 0;
function processInvestmentAnnuity(investment, _ref) {
  var duration = _ref.duration,
      interest = _ref.interest;
  return investment !== DEFAULT_INVESTMENT_CHOOSEN ? investment.getAnnuity(duration, interest) : NO_INVESTMENT_ANNUITY;
}

/***/ }),

/***/ "./app/renderer/components/presentation/previsionnel/investment/investments_presentation.component.js":
/*!************************************************************************************************************!*\
  !*** ./app/renderer/components/presentation/previsionnel/investment/investments_presentation.component.js ***!
  \************************************************************************************************************/
/*! exports provided: InvestmentsPresentationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvestmentsPresentationComponent", function() { return InvestmentsPresentationComponent; });
/* harmony import */ var _investments_presentation_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./investments_presentation.html */ "./app/renderer/components/presentation/previsionnel/investment/investments_presentation.html");
/* harmony import */ var _model_facility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../model/facility */ "./app/renderer/model/facility.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var InvestmentsPresentationComponent = {
  bindings: {
    investments: '<',
    investmentChosen: '<',
    facilityType: '<'
  },
  template: _investments_presentation_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    function InvestmentPresentationController($scope) {
      _classCallCheck(this, InvestmentPresentationController);

      this.scope = $scope;
    }

    _createClass(InvestmentPresentationController, [{
      key: "$onInit",
      value: function $onInit() {
        var _this = this;

        this.addedAdditionalInvestment = null; // tmp var use to watch on change

        this.scope.$watch('$ctrl.addedAdditionalInvestment', function (newValue) {
          if (_this.investmentChosen === 'none') return;

          _this.investmentChosen.selectOneAdditionalInvestment(newValue);
        });
      }
    }, {
      key: "active",
      value: function active() {
        var index = this.investments.indexOf(this.investmentChosen);
        return index !== -1 ? index : 0;
      }
    }, {
      key: "$onChange",
      value: function $onChange(currentValue) {
        this.investmentChosen = currentValue;
      }
    }, {
      key: "selectInvestment",
      value: function selectInvestment(investment) {
        this.investmentChosen = investment;
      }
    }, {
      key: "isFacilityMovable",
      value: function isFacilityMovable() {
        return _model_facility__WEBPACK_IMPORTED_MODULE_1__["Facility"].isMovable(this.facilityType);
      }
    }]);

    return InvestmentPresentationController;
  }()
};

/***/ }),

/***/ "./app/renderer/components/presentation/previsionnel/investment/investments_presentation.html":
/*!****************************************************************************************************!*\
  !*** ./app/renderer/components/presentation/previsionnel/investment/investments_presentation.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 ng-if=\"$ctrl.investments.length == 1\">Investissement</h1>\n<h1 ng-if=\"$ctrl.investments.length > 1\">Investissements</h1>\n<hr />\n\n<uib-tabset active=\"$ctrl.active()\" justified=\"true\" type=\"pills\">\n    <uib-tab index=\"$index\" ng-repeat=\"investment in $ctrl.investments\"\n             heading=\"{{investment.name | uppercase}}\" select=\"$ctrl.selectInvestment(investment)\">\n        <br /> <br />\n        <table class=\"table table-condensed table-hover table-responsive\">\n            <tr>\n                <th>Description</th>\n                <td>{{ $ctrl.investmentChosen.description }}</td>\n                <td></td>\n            </tr>\n            <tr>\n                <th>Designation</th>\n                <td>{{ $ctrl.investmentChosen.designation | uppercase}}</td>\n                <td>{{ $ctrl.investmentChosen.details.designation }}</td>\n            </tr>\n            <tr>\n                <th>Permis de construire</th>\n                <td class=\"input-group\">\n                    <input ng-model=\"$ctrl.investmentChosen.papers\" type=\"number\" class=\"form-control\"/>\n                    <span class=\"input-group-addon\">€</span>\n                </td>\n                <td>{{ $ctrl.investmentChosen.details.papers }}</td>\n            </tr>\n            <tr>\n                <th>Coût architecte</th>\n                <td class=\"input-group\">\n                    <input ng-model=\"$ctrl.investmentChosen.architectCost\" type=\"number\" class=\"form-control\"/>\n                    <span class=\"input-group-addon\">€</span>\n                </td>\n                <td>{{ $ctrl.investmentChosen.details.architectCost }}</td>\n            </tr>\n            <tr>\n                <th>Gros oeuvre</th>\n                <td class=\"input-group\">\n                    <input ng-value=\"$ctrl.investmentChosen.getMasonry()\" ng-model=\"$ctrl.investmentChosen.customMasonry\" ng-model-options=\"{ getterSetter: true }\" type=\"number\" class=\"form-control\"/>\n                    <span class=\"input-group-addon\">€</span>\n                </td>\n                <td>{{ $ctrl.investmentChosen.details.masonry }}</td>\n            </tr>\n            <tr>\n                <th>\n                    <span ng-if=\"$ctrl.isFacilityMovable()\">Livraison du batîment</span>\n                    <span ng-if=\"!$ctrl.isFacilityMovable()\">Livraison et montage du batîment</span>\n                </th>\n                <td>{{ $ctrl.investmentChosen.getFacilityMountingDeliveryPrice() | number: 0}} €</td>\n                <td>{{ $ctrl.investmentChosen.details.facilityMoutingDeliveryPrice }}</td>\n            </tr>\n            <tr>\n                <th>\n                    <span ng-if=\"$ctrl.isFacilityMovable()\">Livraison du matériel</span>\n                    <span ng-if=\"!$ctrl.isFacilityMovable()\">Livraison et montage du matériel</span>\n                </th>\n                <td>{{ $ctrl.investmentChosen.getEquipmentMountingDeliveryPrice() | number: 0}} €</td>\n                <td>{{ $ctrl.investmentChosen.details.equipmentMountingDeliveryPrice }}</td>\n            </tr>\n            <tr ng-if=\"$ctrl.investmentChosen.options.length > 0\">\n                <th>\n                    Investissements Supplémentaires\n                    <select class=\"form-control\"\n                            id=\"additional_investments\"\n                            style=\"margin-top: 20px; font-weight: normal;\"\n                            name=\"additional_investments\"\n                            ng-model=\"$ctrl.addedAdditionalInvestment\">\n                        <option disabled ng-value=\"null\">Ajouter un investissement supplémentaire</option>\n                        <option ng-repeat=\"option in $ctrl.investmentChosen.options\" ng-value=\"option\">{{option.name}}</option>\n                    </select>\n                    <a href=\"#\"\n                       style=\"margin-top: 20px; font-weight: normal;\"\n                       ng-click=\"$ctrl.showAdditionalInvestmentForm = true\"\n                       ng-if=\"!$ctrl.showAdditionalInvestmentForm\">Ajouter un investissement supplémentaire</a>\n                    <a href=\"#\"\n                       style=\"margin-top: 20px; font-weight: normal;\"\n                       ng-click=\"$ctrl.showAdditionalInvestmentForm = false\"\n                       ng-if=\"$ctrl.showAdditionalInvestmentForm\">Cacher</a>\n                </th>\n                <td colspan=\"2\">\n                    <table style=\"width:100%;\">\n                        <tbody>\n                            <tr ng-repeat=\"option in $ctrl.investmentChosen.additionalInvestmentsSelected track by $index\" style=\"display: flex;margin-top: 10px;\">\n                                <td class=\"flex align-items-center\" style=\"justify-content: space-between; flex-basis: 36%;padding-right: 10px;\">\n                                    <span>{{option.amount * option.count }} €</span>\n                                    <div class=\"input-group\" style=\"max-width: 100px;\">\n                                        <input class=\"form-control\" type=\"number\" ng-model=\"option.count\" min=\"0\">\n                                        <span class=\"input-group-addon\">u.</span>\n                                    </div>\n                                </td>\n                                <td class=\"flex align-items-center\" style=\"flex-basis: 64%;\">\n                                    <span style=\"flex-basis: 20%;\">{{option.amount}} €/u.</span>\n                                    <span style=\"flex-basis: 80%;\">{{option.name}}</span>\n                                </td>\n                            </tr>\n                        <tr ng-if=\"$ctrl.showAdditionalInvestmentForm\" style=\"margin-top: 10px;\">\n                            <td>\n                                <form ng-init=\"newAdditionalInvestment\"\n                                      ng-submit=\"$ctrl.investmentChosen.addAdditionalInvestment(newAdditionalInvestment)\"\n                                      class=\"form-inline\">\n\n                                    <input class=\"form-control\"\n                                           type=\"text\"\n                                           ng-model=\"newAdditionalInvestment.name\"\n                                           required>\n\n                                    <div class=\"input-group\">\n                                        <input class=\"form-control\"\n                                               type=\"number\"\n                                               ng-model=\"newAdditionalInvestment.amount\"\n                                               min=\"0\" required>\n                                        <span class=\"input-group-addon\">€</span>\n                                    </div>\n\n                                    <button class=\"btn btn-primary\" type=\"submit\">Ajouter</button>\n                                </form>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </td>\n            </tr>\n            <tr>\n                <th>Investissement total</th>\n                <td>\n                    <strong>{{ $ctrl.investmentChosen.getTotalBeforeSubsidies() | number: 0}} € </strong>\n                </td>\n                <td></td>\n            </tr>\n            <tr>\n                <th>Subventions AREA PCAE</th>\n                <td>\n                    <div class=\"input-group\">\n                        <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.investmentChosen.subsidies\" />\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </td>\n                <td>{{ investment.details.subsidies  }}</td>\n            </tr>\n            <tr>\n                <th>Aides EURALIS Volailles</th>\n                <td>\n                    <div class=\"input-group\">\n                        <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.investmentChosen.helpEuralis\" />\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </td>\n                <td>{{ investment.details.helpEuralis  }}</td>\n            </tr>\n            <tr>\n                <th>Apport personnel</th>\n                <td>\n                    <div class=\"input-group\">\n                        <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.investmentChosen.personalContribution\" />\n                        <span class=\"input-group-addon\">€</span>\n                    </div>\n                </td>\n                <td>{{ investment.details.personalContribution  }}</td>\n            </tr>\n            <tr>\n                <th>Emprunt bancaire (aides et apport déduits)</th>\n                <td>\n                    <strong>{{ investment.getTotal() | number: 0 }} €</strong>\n                </td>\n            </tr>\n        </table>\n    </uib-tab>\n</uib-tabset>\n");

/***/ }),

/***/ "./app/renderer/components/presentation/previsionnel/previsionnel_batiment.component.js":
/*!**********************************************************************************************!*\
  !*** ./app/renderer/components/presentation/previsionnel/previsionnel_batiment.component.js ***!
  \**********************************************************************************************/
/*! exports provided: PrevisionnelBatimentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrevisionnelBatimentComponent", function() { return PrevisionnelBatimentComponent; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _previsionnel_batiment_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./previsionnel_batiment.html */ "./app/renderer/components/presentation/previsionnel/previsionnel_batiment.html");
/* harmony import */ var _model_prospect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../model/prospect */ "./app/renderer/model/prospect.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions */ "./app/renderer/components/presentation/previsionnel/functions.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var PrevisionnelBatimentComponent = {
  bindings: {
    productions: '<',
    active: '<'
  },
  template: _previsionnel_batiment_html__WEBPACK_IMPORTED_MODULE_1__["default"],
  controller: /*#__PURE__*/function () {
    PrevisionnelBatimentController.$inject = ["$scope", "$timeout", "PDFGenerator", "ModalService"];

    function PrevisionnelBatimentController($scope, $timeout, PDFGenerator, ModalService) {
      'ngInject';

      _classCallCheck(this, PrevisionnelBatimentController);

      this.scope = $scope;
      this.ModalService = ModalService;
      this.PDFGenerator = PDFGenerator;
    }

    _createClass(PrevisionnelBatimentController, [{
      key: "$onInit",
      value: function $onInit() {
        var _this = this;

        this.facilityNb = 2;
        this.investmentChosen = _functions__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_INVESTMENT_CHOOSEN"];
        this.annuityDuration = 15;
        this.interest = 2.5;
        this.insuranceCostPercent = 0;
        this.sliderOptions = {
          floor: 1,
          ceil: 20
        };
        this.pickerIsOpen = false;
        this.format = 'dd/MM/yyyy';
        this.scope.date = new Date();
        this.dateOptions = {
          showWeeks: true
        };

        if (this.productions[0].facility.type.key === 'movable') {
          this.facilityNb = 8;
        }

        this.scope.$watch('vm.facilityNb', function () {
          _this.update();
        });
      }
    }, {
      key: "onNewTabSelected",
      value: function onNewTabSelected() {
        this.investmentChosen = _functions__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_INVESTMENT_CHOOSEN"];
      }
    }, {
      key: "hasUser",
      value: function hasUser() {
        return !!this.PDFGenerator.UserService.getUser();
      }
    }, {
      key: "openPicker",
      value: function openPicker() {
        this.pickerIsOpen = true;
      }
    }, {
      key: "startPrint",
      value: function startPrint(production) {
        var _this2 = this;

        this.ModalService.open('prospectForm', {
          prospect: new _model_prospect__WEBPACK_IMPORTED_MODULE_2__["Prospect"]({})
        }).then(function (prospect) {
          _this2.generatePDF(production, prospect);
        });
      }
    }, {
      key: "generatePDF",
      value: function generatePDF(production, prospect) {
        var annuity = {
          duration: this.annuityDuration,
          interest: this.interest
        };
        this.PDFGenerator.generatePrevisionnel(production, this.insuranceCostPercent, this.investmentChosen, this.scope.date, annuity, prospect);
      }
    }, {
      key: "update",
      value: function update() {
        var _this3 = this;

        angular__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(this.productions, function (production) {
          production.setFacilitiesNb(_this3.facilityNb);
        });
      }
    }, {
      key: "currentInvestmentAnnuity",
      value: function currentInvestmentAnnuity() {
        return Object(_functions__WEBPACK_IMPORTED_MODULE_3__["processInvestmentAnnuity"])(this.investmentChosen, {
          duration: this.annuityDuration,
          interest: this.interest
        });
      }
    }]);

    return PrevisionnelBatimentController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/presentation/previsionnel/previsionnel_batiment.html":
/*!**************************************************************************************!*\
  !*** ./app/renderer/components/presentation/previsionnel/previsionnel_batiment.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\" id=\"sliderBatiment\">\n    <div class=\"col-md-2\" style=\"padding-top: 20px;\">\n        <button type=\"button\" class=\"btn btn-block btn-default\" ng-click=\"vm.openPicker()\"\n                uib-datepicker-popup=\"{{vm.format}}\" ng-model=\"date\" is-open=\"vm.pickerIsOpen\" datepicker-options=\"vm.dateOptions\" ng-required=\"true\"\n                close-text=\"Close\" style=\"border-color:#309f41; color:#309f41;\">\n            <span class=\"glyphicon glyphicon-calendar\" style=\"color:#309f41;\"></span>&nbsp;&nbsp;{{date | date }}\n        </button>\n    </div>\n    <div class=\"col-md-7\">\n        <rzslider rz-slider-model=\"vm.facilityNb\" rz-slider-options=\"vm.sliderOptions\"></rzslider>\n    </div>\n    <div class=\"col-md-1 text-center\">\n            <a href style=\"color:#309f41;\" ng-click=\"vm.facilityNb = vm.facilityNb + 1\">\n                <span class=\"glyphicon glyphicon-plus\" style=\"padding-top: 29px;\"></span>\n            </a>\n    </div>\n    <div class=\"col-md-2\" style=\"padding-top: 20px;\">\n        <button type=\"button\" style=\"border-color:#309f41; color:#309f41;\" ui-sref=\"rotation\" class=\"btn btn-default btn-block\">\n            Rotations\n            <i class=\"glyphicon glyphicon-chevron-right\"></i>\n        </button>\n    </div>\n</div>\n\n<br /><br />\n\n<uib-tabset active=\"vm.active\" justified=\"true\" type=\"pills\" class=\"tab-animation\">\n    <uib-tab index=\"$index\" ng-repeat=\"production in vm.productions\"\n             heading=\"{{production.name | uppercase}} ({{production.facility.size}}m²)\" select=\"vm.onNewTabSelected()\">\n        <br /><br />\n        <div class=\"row\">\n            <div class=\"col-md-1\">\n                <button\n                    ng-click=\"vm.startPrint(production)\"\n                    ng-disabled=\"!production || !vm.investmentChosen || !date || !vm.annuityDuration || !vm.interest || !vm.hasUser()\"\n                    class=\"btn btn-default\">\n                    <span class=\"glyphicon glyphicon-print\"></span>\n                </button>\n            </div>\n        </div>\n        <br><br>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-xs-12\">\n                <image-loader model=\"production\" height=\"350\"></image-loader>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-xs-12\">\n                    <table class=\"table table-condensed table-hover table-responsive\">\n                        <tr highlighter=\"production.getChickNb()\">\n                            <th>Poussins mis en places</th>\n                            <td>{{ production.getChickNb() }}</td>\n                        </tr>\n                        <tr>\n                            <th>Mortalité</th>\n                            <td>{{ production.mortalityPercent * 100 }} %</td>\n                        </tr>\n                        <tr>\n                            <th>Age</th>\n                            <td>{{ production.age }} j.</td>\n                        </tr>\n                        <tr>\n                            <th>Nombre de bandes par année</th>\n                            <td class=\"input-group\">\n                                <input ng-model=\"production.breedingPerYear\" type=\"number\" class=\"form-control\"/>\n                                <span class=\"input-group-addon\">/ an</span>\n                            </td>\n                        </tr>\n                        <tr>\n                            <th>Indice de consommation</th>\n                            <td class=\"input-group\">\n                                <input ng-model=\"production.consumptionIndex\" type=\"number\" class=\"form-control\"/>\n                                <span class=\"input-group-addon\">kg</span>\n                            </td>\n                        </tr>\n                        <tr>\n                            <th>Poids moyen</th>\n                            <td class=\"input-group\">\n                                <input ng-model=\"production.avgWeight\" type=\"number\" class=\"form-control\"/>\n                                <span class=\"input-group-addon\">kg</span>\n                            </td>\n                        </tr>\n                        <tr>\n                            <th>Prix poussins vaccinés (€/1000) <span class=\"pull-right\">| indexé </span></th>\n                            <td>{{ production.getVaccinesPrice() }} €</td>\n                        </tr>\n                        <tr>\n                            <th>Prix aliment producteur (€/t) <span class=\"pull-right\">| indexé </span></th>\n                            <td>{{ production.getFoodPrice() }} €</td>\n                        </tr>\n                        <tr>\n                            <th>Prix reprise classé (€/t) <span class=\"pull-right\">| indexé </span></th>\n                            <td>{{ production.getClassedPrice() }} €</td>\n                        </tr>\n                        <tr>\n                            <th>Prix reprise déclassé (€/t)</th>\n                            <td>{{ production.getDeclassedPrice() }} €</td>\n                        </tr>\n                        <tr ng-init=\"showDeclassedInput = false\" ng-dblclick=\"showDeclassedInput = !showDeclassedInput\">\n                            <th>Taux de déclassé</th>\n                            <td>\n                                <div class=\"input-group\" ng-show=\"showDeclassedInput\">\n                                    <input ng-model=\"production.breedingDeclassedPercent\" type=\"number\" class=\"form-control\"/>\n                                    <span class=\"input-group-addon\">%</span>\n                                </div>\n                                <span ng-hide=\"showDeclassedInput\">{{ production.breedingDeclassedPercent * 100 }} %</span>\n                            </td>\n                        </tr>\n                        <tr>\n                            <th>Taux de saisie</th>\n                            <td>{{ production.restraintPercent * 100 }} %</td>\n                        </tr>\n                    </table>\n                </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-xs-12\">\n                <h1>Critères économiques</h1>\n                <br />\n                <table class=\"table table-condensed table-hover table-responsive\" highlighter=\"production.getChickNb()\">\n                    <tr>\n                        <th></th>\n                        <th>Prix (/tête)</th>\n                        <th>Total (pour {{production.getChickNb()}})</th>\n                    </tr>\n                    <tr>\n                        <th>Poussins</th>\n                        <td>{{ production.facility.facilityCharges.chickPrice | number:3 }} €</td>\n                        <td>{{ production.getChicksPaid() * production.facility.facilityCharges.chickPrice | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <th>Aliment (€)</th>\n                        <td>{{ production.foodPrice | number:3 }} €</td>\n                        <td>{{ production.getTotalFoodCost() | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <th>Cotisations</th>\n                        <td>{{ production.facility.facilityCharges.contributions | number:3 }} €</td>\n                        <td>{{ production.facility.facilityCharges.contributions * production.getChickNb() | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <td><i>Marge PAC / poulet MEP</i></td>\n                        <td><i>{{ production.getMargePACByChickPIP() | number: 3 }} €</i></td>\n                        <td></td>\n                    </tr>\n                    <tr>\n                        <th>Chauffage <span class=\"pull-right\">| Prime GAZ MEP Hiver </span></th>\n                        <td>{{ production.facility.facilityCharges.warming }} €</td>\n                        <td>{{ production.facility.facilityCharges.warming * production.getChickNb() | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <th>Frais vétérinaires</th>\n                        <td>{{ production.facility.facilityCharges.vetPrice }} €</td>\n                        <td>{{ production.facility.facilityCharges.vetPrice * production.getChickNb() | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <th>Désinfection</th>\n                        <td>{{ production.facility.facilityCharges.disinfection }} €</td>\n                        <td>{{ production.facility.facilityCharges.disinfection * production.getChickNb() | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <th>Eau - Electricité - Divers</th>\n                        <td>{{ production.facility.facilityCharges.commodities }} €</td>\n                        <td>{{ production.facility.facilityCharges.commodities * production.getChickNb() | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <th>Litière</th>\n                        <td>{{ production.facility.facilityCharges.litter }} €</td>\n                        <td>{{ production.facility.facilityCharges.litter * production.getChickNb() | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <th>Attrapage</th>\n                        <td>{{ production.facility.facilityCharges.catching }} €</td>\n                        <td>{{ production.facility.facilityCharges.catching * production.getChickNb() | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <th>Assurances</th>\n                        <td>{{ production.facility.facilityCharges.insurances }} €</td>\n                        <td>{{ production.facility.facilityCharges.insurances * production.getChickNb() | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <td><i>Charges / tête</i></td>\n                        <td> <i>{{ production.facility.facilityCharges.getChargesByChick() | number: 2 }}€</i> </td>\n                        <td> </td>\n                    </tr>\n                    <tr>\n                        <th>Total charges par bande</th>\n                        <td></td>\n                        <td> {{ production.getTotalCosts() | number:0 }} €</td>\n                    </tr>\n                    <tr>\n                        <td>Marge Brute / poulet MEP</i></td>\n                        <td> {{ production.getBrutMarginPerChickPIP() | number: 2}}€</td>\n                        <td> </td>\n                    </tr>\n                </table>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-xs-12\" style=\"margin-top:5%;\">\n                <image-loader model=\"production.facility\" height=\"350\"></image-loader>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-12 col-xs-12 col-lg-12\">\n                <h1>Produit Total des ventes par bande</h1>\n                <br />\n                <table class=\"table table-condensed table-hover table-responsive\" highlighter=\"production.getChickNb()\">\n                    <tr>\n                        <th>{{ \"produit total par bande\" | uppercase }}</th>\n                        <th class=\"table-number\">{{ production.getTotalWages() | number:0 }} €</th>\n                    </tr>\n\n                    <tr>\n                        <th>{{ \"marge brute par bande\" | uppercase }}</th>\n                        <th class=\"table-number\"> {{ production.getBrutMargin() | number:0 }} €</th>\n                    </tr>\n\n                    <tr>\n                        <th>{{ \"marge brute annuelle\" | uppercase }} avec {{ production.breedingPerYear }} bandes par année</th>\n                        <th class=\"table-number\"> {{ production.getAnnualBrutMargin() | number:0 }} €</th>\n                    </tr>\n                    <tr>\n                        <td><i>Marge par m²</i></td>\n                        <td class=\"table-number\"><i>{{ production.getAnnualBrutMargin() / ( production.facilitiesNb * production.facility.size ) | number:0 }} €</i></td>\n                    </tr>\n                    <tr>\n                        <th>\n                            <form class=\"form-inline\">\n                                <div class=\"col-md-1\">Annuité</div>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" id=\"annuity\" ng-model=\"vm.investmentChosen\" required>\n                                        <option ng-value=\"'none'\">Pas d'investissement</option>\n                                        <option ng-repeat=\"investment in production.facility.investments\" ng-value=\"investment\">{{investment.name | uppercase}}</option>\n                                    </select>\n                                </div>\n                                <div class=\"col-md-3 input-group\">\n                                    <span class=\"input-group-addon\">/</span>\n                                    <input class=\"form-control\" ng-model=\"vm.annuityDuration\" type=\"number\" min=\"0\"/>\n                                    <span class=\"input-group-addon\">ans</span>\n                                </div>\n                                <div class=\"col-md-3 input-group\">\n                                    <span class=\"input-group-addon\">à</span>\n                                    <input class=\"form-control\" ng-model=\"vm.interest\" type=\"number\" min=\"0\"/>\n                                    <span class=\"input-group-addon\">%</span>\n                                </div>\n                            </form>\n                        </th>\n                        <th class=\"table-number\">{{ vm.currentInvestmentAnnuity() | number:0 }} €</th>\n                    </tr>\n                    <tr>\n                        <th>{{ \"Marge de trésorerie annuelle\" | uppercase }} avant MSA</th>\n                        <th class=\"table-number\">{{ production.getAnnualNetMargin(vm.currentInvestmentAnnuity()) | number:0 }} €</th>\n                    </tr>\n                    <tr>\n                        <th class=\"flex align-items-center\">\n                            <span>{{ \"Marge Nette de trésorerie\" | uppercase }}</span>\n                            <div class=\"input-group insurance-cost-box\">\n                                <input class=\"form-control\"\n                                       ng-model=\"vm.insuranceCostPercent\"\n                                       type=\"number\"\n                                       min=\"0\" max=\"100\"\n                                       placeholder=\"MSA\"/>\n                                <span class=\"input-group-addon\">%</span>\n                            </div>\n                        </th>\n                        <th class=\"table-number\">{{ production.getAnnualNetMargin(vm.currentInvestmentAnnuity(), vm.insuranceCostPercent) | number:2 }} €</th>\n                    </tr>\n                </table>\n                <p>Temps travail: {{production.facility.workHours * vm.facilityNb | number: 1}} h/jour en moyenne</p>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-12 col-xs-12 col-lg-12\">\n                <investments-presentation\n                        investments=\"production.facility.investments\"\n                        investment-chosen=\"vm.investmentChosen\"\n                        facility-type=\"production.facility.type\"\n                ></investments-presentation>\n            </div>\n        </div>\n\n    </uib-tab>\n</uib-tabset>\n");

/***/ }),

/***/ "./app/renderer/components/ribbon/ribbon.component.js":
/*!************************************************************!*\
  !*** ./app/renderer/components/ribbon/ribbon.component.js ***!
  \************************************************************/
/*! exports provided: RibbonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RibbonComponent", function() { return RibbonComponent; });
/* harmony import */ var _ribbon_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ribbon.scss */ "./app/renderer/components/ribbon/ribbon.scss");
/* harmony import */ var _ribbon_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ribbon_scss__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var RibbonComponent = {
  bindings: {},
  template: "<div class=\"ribbon\" ng-if=\"vm.ribbonEnv != 'prod'\"><a href>{{vm.ribbonEnv}}</div>",
  controller: ["PouchDbService", function RibbonController(PouchDbService) {
    'ngInject';

    _classCallCheck(this, RibbonController);

    this.ribbonEnv = PouchDbService.env;
  }],
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/ribbon/ribbon.scss":
/*!****************************************************!*\
  !*** ./app/renderer/components/ribbon/ribbon.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--7-1!../../../../node_modules/sass-loader/dist/cjs.js!./ribbon.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/ribbon/ribbon.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/rotation/facility.filter.js":
/*!*************************************************************!*\
  !*** ./app/renderer/components/rotation/facility.filter.js ***!
  \*************************************************************/
/*! exports provided: facility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "facility", function() { return facility; });
var facility = function facility() {
  var filter = function filter(productions, facilityType, facilityNb) {
    if (!facilityType || !facilityNb) return productions;
    var out = [];
    productions.forEach(function (production) {
      if (production.facility.type.key === facilityType.key) {
        production.setFacilitiesNb(facilityNb);
        out.push(production);
      }
    });
    return out;
  };

  return filter;
};

/***/ }),

/***/ "./app/renderer/components/rotation/production.rotation.js":
/*!*****************************************************************!*\
  !*** ./app/renderer/components/rotation/production.rotation.js ***!
  \*****************************************************************/
/*! exports provided: ProductionRotation, PintadesDemareesRotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductionRotation", function() { return ProductionRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PintadesDemareesRotation", function() { return PintadesDemareesRotation; });
/* harmony import */ var _model_production__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/production */ "./app/renderer/model/production.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



Number.prototype.toFixedDown = function (digits) {
  var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
      m = this.toString().match(re);
  return m ? parseFloat(m[1]) : this.valueOf();
};

var ProductionRotation = /*#__PURE__*/function (_Production) {
  _inherits(ProductionRotation, _Production);

  function ProductionRotation(productionParams) {
    var _this;

    _classCallCheck(this, ProductionRotation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProductionRotation).call(this, productionParams));
    _this.brutMarginPerSoldChick = (_get(_getPrototypeOf(ProductionRotation.prototype), "getBrutMargin", _assertThisInitialized(_this)).call(_assertThisInitialized(_this)) / _this.getSoldChicks()).toFixedDown(5);
    _this.breedingPerYear = 1;
    return _this;
  }

  _createClass(ProductionRotation, [{
    key: "getAnnualBrutMargin",
    value: function getAnnualBrutMargin() {
      return this.breedingPerYear * this.brutMarginPerSoldChick * this.getSoldChicks();
    }
  }]);

  return ProductionRotation;
}(_model_production__WEBPACK_IMPORTED_MODULE_0__["Production"]);
var PintadesDemareesRotation = /*#__PURE__*/function (_ProductionRotation) {
  _inherits(PintadesDemareesRotation, _ProductionRotation);

  function PintadesDemareesRotation() {
    var _this2;

    _classCallCheck(this, PintadesDemareesRotation);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(PintadesDemareesRotation).call(this, {
      name: 'Pintades 6 sem',
      facility: {
        size: 400,
        type: {
          key: 'fixed'
        },
        facilityCharges: {},
        investments: []
      },
      chickBySquare: 0,
      chickNb: 8000
    }));
    _this2.breedingPerYear = 1;
    _this2.brutMarginPerSoldChick = 0.4;
    return _this2;
  }

  _createClass(PintadesDemareesRotation, [{
    key: "getSoldChicks",
    value: function getSoldChicks() {
      return 15200 * this.facilitiesNb / 2;
    }
  }]);

  return PintadesDemareesRotation;
}(ProductionRotation);

/***/ }),

/***/ "./app/renderer/components/rotation/rotation.component.js":
/*!****************************************************************!*\
  !*** ./app/renderer/components/rotation/rotation.component.js ***!
  \****************************************************************/
/*! exports provided: RotationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotationComponent", function() { return RotationComponent; });
/* harmony import */ var _rotation_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rotation.html */ "./app/renderer/components/rotation/rotation.html");
/* harmony import */ var _production_rotation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./production.rotation */ "./app/renderer/components/rotation/production.rotation.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var RotationComponent = {
  bindings: {
    productions: '<'
  },
  template: _rotation_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    RotationController.$inject = ["FACILITIES_TYPES", "facilityFilter", "$scope", "$timeout", "PDFGenerator"];

    function RotationController(FACILITIES_TYPES, facilityFilter, $scope, $timeout, PDFGenerator) {
      'ngInject';

      var _this = this;

      _classCallCheck(this, RotationController);

      this.facilityTypes = FACILITIES_TYPES;
      this.facilityType = null;
      this.facilityNb = 2;
      this.productionsChosen = [];
      this.filter = facilityFilter;
      this.timeout = $timeout;
      this.investmentChosen = 'none';
      this.showDialog = false;
      this.investment = {
        annuityDuration: 15,
        interest: 2.5
      };
      this.PDFGenerator = PDFGenerator;
      $scope.$watch('vm.facilityType', function () {
        _this.timeout(function () {
          $('#production_selector').multiselect('rebuild');
        });
      });
    }

    _createClass(RotationController, [{
      key: "$onInit",
      value: function $onInit() {
        this.productions = this.productions.map(function (prod) {
          return new _production_rotation__WEBPACK_IMPORTED_MODULE_1__["ProductionRotation"](prod);
        });
        this.productions.push(new _production_rotation__WEBPACK_IMPORTED_MODULE_1__["PintadesDemareesRotation"]());
        this.timeout(function () {
          $('#production_selector').multiselect({
            onChange: function onChange() {
              var selectedOptions = $('#production_selector option:selected');

              if (selectedOptions.length >= 3) {
                // Disable all other checkboxes.
                var nonSelectedOptions = $('#production_selector option').filter(function () {
                  return !$(this).is(':selected');
                });
                nonSelectedOptions.each(function () {
                  var input = $('input[value="' + $(this).val() + '"]');
                  input.prop('disabled', true);
                  input.parent('li').addClass('disabled');
                });
              } else {
                // Enable all checkboxes.
                $('#production_selector option').each(function () {
                  var input = $('input[value="' + $(this).val() + '"]');
                  input.prop('disabled', false);
                  input.parent('li').addClass('disabled');
                });
              }
            }
          });
        });
      }
    }, {
      key: "hasUser",
      value: function hasUser() {
        return !!this.PDFGenerator.UserService.getUser();
      }
    }, {
      key: "getTotalProductionsChosen",
      value: function getTotalProductionsChosen() {
        return this.productionsChosen.reduce(function (acc, production) {
          return acc + production.getAnnualBrutMargin();
        }, 0);
      }
    }, {
      key: "generatePDF",
      value: function generatePDF(nbFacilities, productions, investment, annuity) {
        this.PDFGenerator.generateRotations(nbFacilities, productions, investment, annuity);
      }
    }, {
      key: "getNetMarginForChosenProductions",
      value: function getNetMarginForChosenProductions(annuity) {
        return this.getTotalProductionsChosen() - annuity;
      }
    }, {
      key: "addProduction",
      value: function addProduction(production) {
        this.productionsChosen.push(production);
      }
    }, {
      key: "removeProduction",
      value: function removeProduction(production) {
        for (var i = 0; i < this.productionsChosen.length; i++) {
          if (this.productionsChosen[i].id === production.id) {
            this.productionsChosen.splice(i, 1);
            break;
          }
        }
      }
    }, {
      key: "getInvestmentsAvailable",
      value: function getInvestmentsAvailable() {
        var out = [];
        var tmp = [];
        this.productionsChosen.forEach(function (production) {
          production.facility.investments.forEach(function (investment) {
            if (tmp.indexOf(investment.id) === -1) {
              tmp.push(investment.id);
              out.push(investment);
            }
          });
        });
        tmp = null;
        return out;
      }
    }]);

    return RotationController;
  }(),
  controllerAs: 'vm'
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./app/renderer/components/rotation/rotation.html":
/*!********************************************************!*\
  !*** ./app/renderer/components/rotation/rotation.html ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\n    <h1>\n        <i class=\"glyphicon glyphicon-refresh\" style=\"color:rgba(219, 226, 13, 0.88)\"></i>\n        <span style=\"color: #309f41;\">Rotation</span>\n        <span style=\"color: #a6ce39;\">des productions</span>\n    </h1><hr>\n\n    <div class=\"row text-center\">\n        <div class=\"col-md-3\">\n            <label for=\"facility_nb\" class=\"control-label\">Nombre de bâtiment</label>\n            <input class=\"form-control\" type=\"number\" id=\"facility_nb\" name=\"facility_nb\" ng-model=\"vm.facilityNb\" required />\n        </div>\n        <div class=\"col-md-3\">\n            <label for=\"facility_type\" class=\"control-label\">Type de bâtiment</label>\n            <select class=\"form-control\" id=\"facility_type\" name=\"facility_type\" ng-model=\"vm.facilityType\" required>\n                <option ng-repeat=\"facilityType in vm.facilityTypes\"\n                        ng-value=\"facilityType\">{{facilityType.value | uppercase}}</option>\n            </select>\n\n        </div>\n\n        <div class=\"col-md-3 pull-right\" style=\"padding-top: 3%\">\n            <div class=\"input-group\" id=\"input_options\">\n                <button ng-click=\"showDialog = !showDialog\" class=\"btn btn-info\">\n                    <span class=\"glyphicon glyphicon-plus\"></span>\n                </button>\n                <button ng-click=\"vm.generatePDF(vm.facilityNb, vm.productionsChosen, vm.investmentChosen, {interest: vm.investment.interest, duration: vm.investment.annuityDuration})\"\n                        ng-if=\"vm.productionsChosen.length > 0 && vm.investment.interest && vm.investment.annuityDuration\"\n                        class=\"btn btn-default\"\n                        ng-disabled=\"!vm.hasUser()\">\n                    <span class=\"glyphicon glyphicon-print\"></span>\n                </button>\n            </div>\n\n            <div ng-if=\"showDialog\">\n                <div class=\"form-group\">\n                    <label for=\"help_euralis\" class=\"control-label\">Aides EURALIS</label>\n                    <input class=\"form-control\" type=\"number\" id=\"help_euralis\" name=\"help_euralis\" ng-model=\"vm.investmentChosen.helpEuralis\" required />\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"subsidies\" class=\"control-label\">Subventions AREA PCAE</label>\n                    <input class=\"form-control\" type=\"number\" id=\"subsidies\" name=\"subsidies\" ng-model=\"vm.investmentChosen.subsidies\" required />\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12 text-center\" ng-if=\"vm.facilityType\" style=\"padding-top: 10px;\">\n            <ul class=\"nav nav-pills\">\n                <li ng-repeat=\"production in vm.productions | facility: vm.facilityType : vm.facilityNb track by production.id\"\n                    ng-class=\"{'active': vm.productionsChosen.indexOf(production) != -1}\">\n                    <a href ng-click=\"vm.addProduction(production)\">{{production.name}} ({{production.facility.size}})</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <hr>\n    <table class=\"table\" ng-if=\"vm.productionsChosen.length > 0\">\n        <thead>\n            <tr>\n                <th>Type de production</th>\n                <th>Surface bâtiment (m²)</th>\n                <th>Surface parcours (ha)</th>\n                <th>Densité (m²)</th>\n                <th>Nbre de bande / an</th>\n                <th>Nbre / bande</th>\n                <th>Nbre vendus / an</th>\n                <th>Marge brute / sujet vendus (€)</th>\n                <th>Marge brute / an (€)</th>\n                <th>Supprimer</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr ng-repeat=\"production in vm.productionsChosen track by $index\">\n                <td>{{production.name}}</td>\n                <td>{{production.facility.size * vm.facilityNb | number:0}}</td>\n                <td>{{production.chickBySquare * production.getChickNb() / 10000 | number:0}}</td>\n                <td>{{production.chickNb / production.facility.size | number: 0}}</td>\n                <td>\n                    <input type=\"number\" ng-model=\"production.breedingPerYear\" class=\"form-control\" />\n                </td>\n                <td>{{production.chickNb * vm.facilityNb | number:0}}</td>\n                <td>{{production.getSoldChicks() | number:2}}</td>\n                <td>\n                    <input type=\"number\" class=\"form-control\" ng-model=\"production.brutMarginPerSoldChick\" step=\"0.00001\"/>\n                </td>\n                <td>{{ production.getAnnualBrutMargin() | number:2 }}</td>\n                <td>\n                    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"vm.removeProduction(production)\">\n                        <span class=\"glyphicon glyphicon-remove\"></span>\n                    </button>\n                </td>\n            </tr>\n            <tr ng-if=\"vm.productionsChosen.length > 0\">\n                <td colspan=\"8\"></td>\n                <td>{{ vm.getTotalProductionsChosen() | number: 0 }}€</td>\n            </tr>\n            <tr ng-if=\"vm.productionsChosen.length > 0\">\n                <td colspan=\"8\">\n                    <form class=\"form-inline\">\n                        <div class=\"col-md-1\"><strong>Annuité</strong></div>\n                        <div class=\"col-md-4\">\n                            <select class=\"form-control\" id=\"annuity\" ng-model=\"vm.investmentChosen\" required>\n                                <option disabled selected value>selectionner un investissement</option>\n                                <option ng-value=\"'none'\">PAS D'INVESTISSEMENT</option>\n                                <option ng-repeat=\"investment in vm.getInvestmentsAvailable()\" ng-value=\"investment\">{{investment.name | uppercase}}</option>\n                            </select>\n                            <strong>(AREA et aides EURALIS déduites)</strong>\n                        </div>\n                        <div class=\"col-md-3\" ng-if=\"vm.investmentChosen != 'none'\">\n                            <div class=\"input-group\">\n                                <span class=\"input-group-addon\">/</span>\n                                <input class=\"form-control\" ng-model=\"vm.investment.annuityDuration\" type=\"number\" min=\"0\"/>\n                                <span class=\"input-group-addon\">ans</span>\n                            </div>\n                            <strong ng-if=\"vm.investmentChosen\"> Investissement de\n                                {{vm.investmentChosen.getTotal()|number:0}}€</strong>\n                        </div>\n                        <div class=\"col-md-3 input-group\" ng-if=\"vm.investmentChosen != 'none'\">\n                            <span class=\"input-group-addon\">à</span>\n                            <input class=\"form-control\" ng-model=\"vm.investment.interest\" type=\"number\" min=\"0\"/>\n                            <span class=\"input-group-addon\">%</span>\n                        </div>\n                    </form>\n                </td>\n                <td>\n                    <strong ng-if=\"vm.investmentChosen != 'none'\">\n                        {{ vm.investmentChosen.getAnnuity(vm.investment.annuityDuration, vm.investment.interest) | number:0 }} €\n                    </strong>\n                </td>\n            </tr>\n            <tr ng-if=\"vm.productionsChosen.length > 0\">\n                <td colspan=\"8\">\n                    <strong class=\"pull-right\">Marge Nette avant MSA</strong>\n                </td>\n                <td>\n                    <strong ng-if=\"vm.investmentChosen != 'none'\">\n                        {{vm.getNetMarginForChosenProductions(vm.investmentChosen.getAnnuity(vm.investment.annuityDuration, vm.investment.interest)) | number:0 }} €\n                    </strong>\n                    <strong ng-if=\"vm.investmentChosen == 'none'\">\n                        {{vm.getNetMarginForChosenProductions(0) | number:0 }} €\n                    </strong>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n");

/***/ }),

/***/ "./app/renderer/components/rotation/rotation.module.js":
/*!*************************************************************!*\
  !*** ./app/renderer/components/rotation/rotation.module.js ***!
  \*************************************************************/
/*! exports provided: RotationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotationModule", function() { return RotationModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rotation_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rotation.component */ "./app/renderer/components/rotation/rotation.component.js");
/* harmony import */ var _facility_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./facility.filter */ "./app/renderer/components/rotation/facility.filter.js");
/* harmony import */ var _production_rotation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./production.rotation */ "./app/renderer/components/rotation/production.rotation.js");




var RotationModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('RotationModule', []).config(["$stateProvider", function ($stateProvider) {
  'ngInject';

  $stateProvider.state('rotation', {
    parent: 'components',
    url: '/rotation',
    resolve: {
      productions: ["PouchDbService", function productions(PouchDbService) {
        return PouchDbService.find('production');
      }]
    },
    views: {
      'content@': {
        template: '<rotation productions="$resolve.productions"></rotation>'
      }
    }
  });
}]).component('rotation', _rotation_component__WEBPACK_IMPORTED_MODULE_1__["RotationComponent"]).filter('facility', _facility_filter__WEBPACK_IMPORTED_MODULE_2__["facility"]).name;

/***/ }),

/***/ "./app/renderer/components/sidebar/sidebar.component.js":
/*!**************************************************************!*\
  !*** ./app/renderer/components/sidebar/sidebar.component.js ***!
  \**************************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _sidebar_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar.html */ "./app/renderer/components/sidebar/sidebar.html");
/* harmony import */ var _images_production_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../images/production_logo.png */ "./app/renderer/images/production_logo.png");
/* harmony import */ var _images_facility_charges_logo_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/facility_charges_logo.png */ "./app/renderer/images/facility_charges_logo.png");
/* harmony import */ var _images_facility_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/facility_logo.png */ "./app/renderer/images/facility_logo.png");
/* harmony import */ var _images_investment_logo_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../images/investment_logo.png */ "./app/renderer/images/investment_logo.png");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var SidebarComponent = {
  template: _sidebar_html__WEBPACK_IMPORTED_MODULE_0__["default"],
  controller: /*#__PURE__*/function () {
    SidebarController.$inject = ["$uibModal", "UserService", "$state"];

    function SidebarController($uibModal, UserService, $state) {
      'ngInject';

      _classCallCheck(this, SidebarController);

      this.productionLogo = _images_production_logo_png__WEBPACK_IMPORTED_MODULE_1__["default"];
      this.facilityChargesLogo = _images_facility_charges_logo_png__WEBPACK_IMPORTED_MODULE_2__["default"];
      this.facilityLogo = _images_facility_logo_png__WEBPACK_IMPORTED_MODULE_3__["default"];
      this.investmentLogo = _images_investment_logo_png__WEBPACK_IMPORTED_MODULE_4__["default"];
      this.modal = $uibModal;
      this.state = $state;
      this.userService = UserService;
    }

    _createClass(SidebarController, [{
      key: "openSyncDialog",
      value: function openSyncDialog() {
        var _this = this;

        this.modal.open({
          size: 'lg',
          animation: true,
          backdrop: 'static',
          component: 'syncDialog'
        }).result.then(function () {
          _this.state.go('home');
        }, function () {
          _this.state.go('home');
        });
      }
    }]);

    return SidebarController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/sidebar/sidebar.html":
/*!******************************************************!*\
  !*** ./app/renderer/components/sidebar/sidebar.html ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"mySidenav\" class=\"sidenav text-center\">\n    <h2 class=\"text-center\" style=\"color:green\">Gestions</h2>\n\n    <h4 class=\"text-center\" style=\"color:green\" ng-if=\"vm.userService.isAuthenticated()\">Bonjour {{vm.userService.getUser()}}</h4>\n    <p ng-if=\"!vm.userService.isAuthenticated()\">\n        <label for=\"username\">Entrez votre nom</label>\n        <input id=\"username\" type=\"text\" ng-model=\"username\" class=\"form-control\"/>\n        <button type=\"button\" ng-click=\"vm.userService.storeCurrentUser(username)\">Save</button>\n    </p>\n\n    <a ui-sref=\"production\" tooltip-placement=\"top\" uib-tooltip=\"Productions\">\n        <img src=\"{{vm.productionLogo}}\" alt=\"productionLogo\">\n    </a>\n    <a ui-sref=\"facility\" tooltip-placement=\"top\" uib-tooltip=\"Bâtiments\">\n        <img src=\"{{vm.facilityLogo}}\" alt=\"facilityLogo\">\n    </a>\n    <a ui-sref=\"facility_charges\" tooltip-placement=\"top\" uib-tooltip=\"Grille de critères\">\n        <img src=\"{{vm.facilityChargesLogo}}\" alt=\"facilityChargesLogo\">\n    </a>\n    <a ui-sref=\"investment\" tooltip-placement=\"top\" uib-tooltip=\"Investissements\">\n        <img src=\"{{vm.investmentLogo}}\" alt=\"investmentLogo\">\n    </a>\n    <a ui-sref=\"video\" tooltip-placement=\"top\" uib-tooltip=\"Vidéos\" class=\"text-center\">\n        <span class=\"glyphicon glyphicon-facetime-video big\" style=\"color:#a6ce39;\"></span>\n    </a>\n\n    <hr>\n    <button ng-click=\"vm.openSyncDialog()\" class=\"btn btn-block btn-success\">\n        <i class=\"glyphicon glyphicon-refresh big\"></i>\n    </button>\n</div>");

/***/ }),

/***/ "./app/renderer/components/sidebar/sidebar.module.js":
/*!***********************************************************!*\
  !*** ./app/renderer/components/sidebar/sidebar.module.js ***!
  \***********************************************************/
/*! exports provided: SidebarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarModule", function() { return SidebarModule; });
/* harmony import */ var _sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar.component */ "./app/renderer/components/sidebar/sidebar.component.js");
/* harmony import */ var _sidebar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar.service */ "./app/renderer/components/sidebar/sidebar.service.js");
/* harmony import */ var _sidebar_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar.scss */ "./app/renderer/components/sidebar/sidebar.scss");
/* harmony import */ var _sidebar_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sidebar_scss__WEBPACK_IMPORTED_MODULE_2__);



var SidebarModule = angular.module('SidebarModule', []).component('sidebar', _sidebar_component__WEBPACK_IMPORTED_MODULE_0__["SidebarComponent"]).service('SidebarService', _sidebar_service__WEBPACK_IMPORTED_MODULE_1__["SidebarService"]).name;

/***/ }),

/***/ "./app/renderer/components/sidebar/sidebar.scss":
/*!******************************************************!*\
  !*** ./app/renderer/components/sidebar/sidebar.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--7-1!../../../../node_modules/sass-loader/dist/cjs.js!./sidebar.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/sidebar/sidebar.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/sidebar/sidebar.service.js":
/*!************************************************************!*\
  !*** ./app/renderer/components/sidebar/sidebar.service.js ***!
  \************************************************************/
/*! exports provided: SidebarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarService", function() { return SidebarService; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SidebarService = /*#__PURE__*/function () {
  function SidebarService() {
    _classCallCheck(this, SidebarService);

    this.isOpen = false;
  }

  _createClass(SidebarService, [{
    key: "toggle",
    value: function toggle() {
      this.isOpen ? this.closeNav() : this.openNav();
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return this.isOpen;
    }
  }, {
    key: "openNav",
    value: function openNav() {
      document.getElementById("mySidenav").style.width = "140px";
      this.isOpen = true;
    }
  }, {
    key: "closeNav",
    value: function closeNav() {
      if (this.isOpen) {
        document.getElementById("mySidenav").style.width = "0";
        this.isOpen = false;
      }
    }
  }]);

  return SidebarService;
}();

/***/ }),

/***/ "./app/renderer/components/sync/google_loader.scss":
/*!*********************************************************!*\
  !*** ./app/renderer/components/sync/google_loader.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--7-1!../../../../node_modules/sass-loader/dist/cjs.js!./google_loader.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/sync/google_loader.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./app/renderer/components/sync/sync-dialog.component.js":
/*!***************************************************************!*\
  !*** ./app/renderer/components/sync/sync-dialog.component.js ***!
  \***************************************************************/
/*! exports provided: SyncDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SyncDialogComponent", function() { return SyncDialogComponent; });
/* harmony import */ var _google_loader_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./google_loader.scss */ "./app/renderer/components/sync/google_loader.scss");
/* harmony import */ var _google_loader_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_google_loader_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sync_dialog_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sync-dialog.html */ "./app/renderer/components/sync/sync-dialog.html");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var SyncDialogComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<'
  },
  template: _sync_dialog_html__WEBPACK_IMPORTED_MODULE_1__["default"],
  controller: /*#__PURE__*/function () {
    SyncDialogController.$inject = ["$scope", "$timeout", "PouchDbService", "SidebarService", "$state"];

    function SyncDialogController($scope, $timeout, PouchDbService, SidebarService, $state) {
      'ngInject';

      _classCallCheck(this, SyncDialogController);

      this.scope = $scope;
      this.timeout = $timeout;
      this.state = $state;
      this.PouchDbService = PouchDbService;
      this.SidebarService = SidebarService;
      this.syncHandler = null;
      this.logs = [];
      this.isSyncing = false;
    }

    _createClass(SyncDialogController, [{
      key: "synchronise",
      value: function synchronise() {
        var _this = this;

        this.PouchDbService.sync(this.username, this.password).then(function (syncHandler) {
          _this.isSyncing = true;
          _this.syncHandler = syncHandler().on('complete', function (res) {
            _this.SidebarService.closeNav();

            _this.endSync(2000);
          }).on('change', function (res) {
            if (res.direction === 'pull') _this.log("Récupération des modifications.");
            if (res.direction === 'push') _this.log("Envoi des modifications.");
          }).on('error', function (err) {
            _this.log("Erreur: ", err);

            _this.endSync(2000);
          }).then(function (res) {
            console.warn('then: ', res);
          })["catch"](function (res) {
            console.warn('catch: ', res);
          });
        }).then(function (e) {
          return console.log('then ', e);
        })["catch"](function (e) {
          if (e.error && e.error === "unauthorized") {
            _this.password = "";
            _this.username = "";

            _this.log('Mauvais identifiants.');

            _this.isSyncing = false;
          }
        });
      }
    }, {
      key: "log",
      value: function log(info) {
        this.logs.push(info);
        this.scope.$apply();
      }
    }, {
      key: "stopSync",
      value: function stopSync() {
        var _this2 = this;

        this.syncHandler.cancel().then(function () {
          return _this2.isSyncing = false;
        });
      }
    }, {
      key: "endSync",
      value: function endSync(closeBeforeTime) {
        var _this3 = this;

        this.timeout(function () {
          _this3.isSyncing = false;

          _this3.scope.$apply();

          _this3.close();
        }, closeBeforeTime);
      }
    }, {
      key: "close",
      value: function close() {
        var _this4 = this;

        this.timeout(function () {
          _this4.modalInstance.close();
        }, 1000);
      }
    }]);

    return SyncDialogController;
  }(),
  controllerAs: 'vm'
};

/***/ }),

/***/ "./app/renderer/components/sync/sync-dialog.html":
/*!*******************************************************!*\
  !*** ./app/renderer/components/sync/sync-dialog.html ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"modal-body\">\n    <div class=\"row\">\n        <div class=\"col-md-12 col-xs-12 col-lg-12 text-center vertical-align\">\n            <div class=\"showbox\" ng-if=\"vm.isSyncing\">\n                <div class=\"loader\">\n                    <svg class=\"circular\" viewBox=\"25 25 50 50\">\n                        <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n                    </svg>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12 col-xs-12 col-lg-12\">\n            <div class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label for=\"username\">Login</label>\n                    <input id=\"username\" class=\"form-control\" type=\"text\" ng-model=\"vm.username\" />\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input id=\"password\" class=\"form-control\" type=\"password\" ng-model=\"vm.password\" />\n                </div>\n            </div>\n            <button ng-click=\"vm.synchronise()\" ng-disabled=\"!vm.password || !vm.username\" class=\"btn btn-success btn-block\" ng-disabled=\"vm.isSyncing\">\n                <span class=\"glyphicon glyphicon-refresh\"></span>\n                Synchroniser\n            </button>\n        </div>\n    </div>\n    <br>\n    <div class=\"row\">\n        <div class=\"col-md-12 col-xs-12 col-lg-12\">\n            <pre style=\"margin-left:10px;\">\n                <p ng-repeat=\"log in vm.logs track by $index\">{{log}}</p>\n            </pre>\n        </div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <button ng-click=\"vm.close()\" class=\"btn btn-default pull-right\">\n        <span class=\"glyphicon glyphicon-ban-circle\"></span>\n        Annuler\n    </button>\n</div>\n");

/***/ }),

/***/ "./app/renderer/database/pouchdb.module.js":
/*!*************************************************!*\
  !*** ./app/renderer/database/pouchdb.module.js ***!
  \*************************************************/
/*! exports provided: PouchDbModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PouchDbModule", function() { return PouchDbModule; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pouchdb_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pouchdb.service */ "./app/renderer/database/pouchdb.service.js");


var PouchDbModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('PouchDbModule', []).service('PouchDbService', _pouchdb_service__WEBPACK_IMPORTED_MODULE_1__["PouchDbService"]).constant('DB_INFO', {
  name: 'euralis_volailles_db-',
  remoteUrl: 'http://178.62.34.95:11000/'
}).name;

/***/ }),

/***/ "./app/renderer/database/pouchdb.service.js":
/*!**************************************************!*\
  !*** ./app/renderer/database/pouchdb.service.js ***!
  \**************************************************/
/*! exports provided: PouchDbService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PouchDbService", function() { return PouchDbService; });
/* harmony import */ var _euralis_volailles_conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../euralis-volailles.conf */ "./app/renderer/euralis-volailles.conf.js");
/* harmony import */ var pouchdb_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pouchdb-find */ "./node_modules/pouchdb-find/lib/index-browser.es.js");
/* harmony import */ var relational_pouch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! relational-pouch */ "./node_modules/relational-pouch/lib/index.js");
/* harmony import */ var _model_production__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/production */ "./app/renderer/model/production.js");
/* harmony import */ var _model_facility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/facility */ "./app/renderer/model/facility.js");
/* harmony import */ var _model_facility_charges__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/facility_charges */ "./app/renderer/model/facility_charges.js");
/* harmony import */ var _model_investment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model/investment */ "./app/renderer/model/investment.js");
/* harmony import */ var _model_video__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../model/video */ "./app/renderer/model/video.js");
/* harmony import */ var _model_prospect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../model/prospect */ "./app/renderer/model/prospect.js");
/* harmony import */ var pouchdb_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! pouchdb-browser */ "./node_modules/pouchdb-browser/lib/index.es.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Needed for sync between pouch and couch




if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str).toString('base64');
  };
}








pouchdb_browser__WEBPACK_IMPORTED_MODULE_9__["default"].plugin(__webpack_require__(/*! pouchdb-adapter-node-websql */ "./node_modules/pouchdb-adapter-node-websql/lib/index.es.js"));
pouchdb_browser__WEBPACK_IMPORTED_MODULE_9__["default"].plugin(pouchdb_find__WEBPACK_IMPORTED_MODULE_1__["default"]);
pouchdb_browser__WEBPACK_IMPORTED_MODULE_9__["default"].plugin(relational_pouch__WEBPACK_IMPORTED_MODULE_2__["default"]);
var databaseSchema = [{
  singular: 'video',
  plural: 'videos'
}, {
  singular: 'prospect',
  plural: 'prospects'
}, {
  singular: 'production',
  plural: 'productions',
  relations: {
    'facility': {
      belongsTo: 'facility'
    }
  }
}, {
  singular: 'facility',
  plural: 'facilities',
  relations: {
    'facilityCharges': {
      belongsTo: 'facilityCharges'
    },
    'investments': {
      hasMany: 'investment'
    }
  }
}, {
  singular: 'facilityCharges',
  plural: 'facilitiesCharges'
}, {
  singular: 'investment',
  plural: 'investments'
}];

function getConstructorFromEntityName(entityName) {
  var nameToConstructor = {
    video: _model_video__WEBPACK_IMPORTED_MODULE_7__["Video"],
    facilityCharges: _model_facility_charges__WEBPACK_IMPORTED_MODULE_5__["FacilityCharges"],
    investment: _model_investment__WEBPACK_IMPORTED_MODULE_6__["Investment"],
    prospect: _model_prospect__WEBPACK_IMPORTED_MODULE_8__["Prospect"],
    production: _model_production__WEBPACK_IMPORTED_MODULE_3__["Production"],
    facility: _model_facility__WEBPACK_IMPORTED_MODULE_4__["Facility"]
  };
  return nameToConstructor[entityName];
}
/**
 * This class is used to create the local database if it does not exist yet.
 * And the schema of THIS app.
 * Also provide an API in order to manipulate data.
 */


var PouchDbService = /*#__PURE__*/function () {
  PouchDbService.$inject = ["DB_INFO"];

  function PouchDbService(DB_INFO) {
    'ngInject';

    _classCallCheck(this, PouchDbService);

    this.env = "development";
    this.DB_INFO = DB_INFO;

    if (this.env === 'development') {// PouchDB.debug.enable('*');
    }

    this.dbOpts = {
      auto_compaction: true
    };
    this.dbName = this.DB_INFO.name + this.env;
    this.db = new pouchdb_browser__WEBPACK_IMPORTED_MODULE_9__["default"](this.dbName, this.dbOpts);
    this.db.createIndex({
      index: {
        fields: ['data.department']
      }
    });
    this.db.setSchema(databaseSchema);
  }
  /**
   *
   * @param entityName
   * @param object
   * @return Promise
   */


  _createClass(PouchDbService, [{
    key: "save",
    value: function save(entityName, object) {
      var _this = this;

      return this.toAttachmentFormat(entityName, object.attachments || {}).then(function (attachments) {
        delete object.attachments;
        return _this.db.rel.save(entityName, object).then(function (objects) {
          var entity = objects[Object.keys(objects)[0]][0];

          if (attachments.length > 0) {
            return attachments.reduce(function (p, attachment) {
              attachment.obj = entity;
              return p.then(function () {
                return _this.putAttachment(attachment);
              });
            }, Promise.resolve());
          }

          return entity;
        })["catch"](function (err) {
          return console.log("Save central repo : ", err);
        });
      });
    }
  }, {
    key: "find",
    value: function find(entityName, id) {
      var _this2 = this;

      return this.db.rel.find(entityName, id).then(function (data) {
        var fullObjectsPromises = [];
        var objects = data[Object.keys(data)[0]];

        for (var i = 0; i < objects.length; i++) {
          fullObjectsPromises.push(_this2.transformRelationIdByObject(Object.keys(data)[0], objects[i], data));
        }

        return Promise.all(fullObjectsPromises);
      }).then(function (objects) {
        var constructor = getConstructorFromEntityName(entityName);
        if (id && objects.length === 1) return Reflect.construct(constructor, [objects[0]]);
        return objects.map(function (obj) {
          return Reflect.construct(constructor, [obj]);
        });
      })["catch"](function (err) {
        return console.log("Find Central PouchDbService: ".concat(err));
      });
    }
  }, {
    key: "remove",
    value: function remove(entityName, object) {
      return this.db.rel.del(entityName, object);
    }
  }, {
    key: "putAttachment",
    value: function putAttachment(_ref) {
      var entityName = _ref.entityName,
          obj = _ref.obj,
          name = _ref.name,
          blob = _ref.blob,
          contentType = _ref.contentType;
      return this.db.rel.putAttachment(entityName, obj, name, blob, contentType).then(function (data) {
        return data;
      })["catch"](function (err) {
        return console.log("Find Central PouchDbService: ".concat(err));
      });
    } // it will empty the db, because we are using WebSql adapter

  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      return this.db.info().then(function () {
        return _this3.db.destroy();
      })["catch"](function () {
        return {
          ok: true
        };
      });
    }
  }, {
    key: "sync",
    value: function sync(username, password) {
      var _this4 = this;

      var auth = {
        username: username,
        password: password
      };
      var remoteDb = new pouchdb_browser__WEBPACK_IMPORTED_MODULE_9__["default"](_euralis_volailles_conf__WEBPACK_IMPORTED_MODULE_0__["REMOTE_URL"] + this.dbName, {
        auth: auth
      });
      var syncOptions = {
        retry: true
      };
      return remoteDb.info().then(function (info) {
        return function () {
          return _this4.db.sync(remoteDb, syncOptions).on('change', function (res) {
            var last_seq = res.change.last_seq;
            if (last_seq === info.update_seq) return true;
          }).on('complete', function (res) {
            var last_seq = res.pull.last_seq;
            if (last_seq === info.update_seq) return true;
          });
        };
      });
    }
  }, {
    key: "assignAttachmentsToObject",
    value: function assignAttachmentsToObject(entityName, object) {
      var _this5 = this;

      if (object.attachments) {
        var attachmentsPromises = [];
        Object.keys(object.attachments).forEach(function (key) {
          attachmentsPromises.push(_this5.db.rel.getAttachment(entityName, object.id, key).then(function (attachment) {
            object.attachments[key].data = attachment;
          }));
        });
        return Promise.all(attachmentsPromises).then(function () {
          return object;
        });
      } else {
        return Promise.resolve(object);
      }
    }
  }, {
    key: "getProductionsByDepartment",
    value: function getProductionsByDepartment(department) {
      var _this6 = this;

      var findOpts = {
        selector: {
          '$or': [{
            'data.department': {
              '$eq': department
            }
          }, {
            'data.department': {
              '$eq': 'Others'
            }
          }]
        }
      };
      return this.db.find(findOpts).then(function (data) {
        return _this6.db.rel.parseRelDocs('production', data.docs);
      }).then(function (data) {
        var fullObjectsPromises = [];
        var objects = data[Object.keys(data)[0]];

        for (var i = 0; i < objects.length; i++) {
          fullObjectsPromises.push(_this6.transformRelationIdByObject(Object.keys(data)[0], objects[i], data));
        }

        return Promise.all(fullObjectsPromises);
      }).then(function (productions) {
        if (productions.length === 1) return new _model_production__WEBPACK_IMPORTED_MODULE_3__["Production"](productions[0]);
        return productions.map(function (production) {
          return new _model_production__WEBPACK_IMPORTED_MODULE_3__["Production"](production);
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "toAttachmentFormat",
    value: function toAttachmentFormat(entityName, attachments) {
      return Promise.all(Object.keys(attachments).map(function (key) {
        var name = key;
        var attachmentFormat = {
          entityName: entityName,
          name: name,
          contentType: attachments[name].type,
          blob: attachments[name]
        };
        return Promise.resolve(attachmentFormat);
      }));
    }
  }, {
    key: "transformRelationIdByObject",
    value: function transformRelationIdByObject(entityName, desiredObject, data) {
      var findRequest = Object.keys(data);
      findRequest.splice(0, 1);
      var name = getSingularEntityName(entityName);
      if (name) entityName = name;
      var pluralNameRelationObjectFound = [];
      var singularNameRelationObjectFound;

      for (var i = 0; i < findRequest.length; i++) {
        var pluralEntityName = findRequest[i];
        var singularEntityName = getSingularEntityName(pluralEntityName);

        if (desiredObject.hasOwnProperty(singularEntityName)) {
          var relationId = desiredObject[singularEntityName];
          var relationObjectFromId = void 0;

          if (typeof relationId === 'string') {
            relationObjectFromId = arrayObjectIndexOf(data[pluralEntityName], relationId, 'id');
          } else {
            relationObjectFromId = data[pluralEntityName].indexOf(relationId);
          }

          desiredObject[singularEntityName] = data[pluralEntityName][relationObjectFromId];
          singularNameRelationObjectFound = {
            value: desiredObject[singularEntityName],
            key: singularEntityName
          };
        } else if (desiredObject.hasOwnProperty(pluralEntityName)) {
          var relationArrayIds = desiredObject[pluralEntityName];
          var relationObjects = [];

          var _relationObjectFromId = void 0;

          for (var j = 0; j < relationArrayIds.length; j++) {
            if (typeof relationArrayIds[j] === 'string') {
              _relationObjectFromId = arrayObjectIndexOf(data[pluralEntityName], relationArrayIds[j], 'id');
            } else {
              _relationObjectFromId = data[pluralEntityName].indexOf(relationArrayIds[j]);
            }

            relationObjects.push(data[pluralEntityName][_relationObjectFromId]);
            pluralNameRelationObjectFound.push({
              value: data[pluralEntityName][_relationObjectFromId],
              key: singularEntityName
            });
          }

          desiredObject[pluralEntityName] = relationObjects;
        }
      }

      var promiseRelationsFound = [];

      if (singularNameRelationObjectFound) {
        promiseRelationsFound.push(this.transformRelationIdByObject(singularNameRelationObjectFound.key, singularNameRelationObjectFound.value, data));
      }

      for (var l = 0; l < pluralNameRelationObjectFound.length; l++) {
        promiseRelationsFound.push(this.transformRelationIdByObject(pluralNameRelationObjectFound[l].key, pluralNameRelationObjectFound[l].value, data));
      }

      promiseRelationsFound.push(this.assignAttachmentsToObject(entityName, desiredObject));
      return Promise.all(promiseRelationsFound).then(function () {
        return desiredObject;
      })["catch"](function (err) {
        return console.log("Transform method error: ", err);
      });

      function getSingularEntityName(entityPluralName) {
        for (var _i = 0; _i < databaseSchema.length; _i++) {
          if (databaseSchema[_i].plural === entityPluralName) {
            return databaseSchema[_i].singular;
          }
        }
      }

      function arrayObjectIndexOf(array, searchTerm, property) {
        for (var _i2 = 0, len = array.length; _i2 < len; _i2++) {
          if (array[_i2][property] === searchTerm) return _i2;
        }

        return -1;
      }
    }
  }]);

  return PouchDbService;
}();

/***/ }),

/***/ "./app/renderer/euralis-volailles.conf.js":
/*!************************************************!*\
  !*** ./app/renderer/euralis-volailles.conf.js ***!
  \************************************************/
/*! exports provided: REMOTE_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOTE_URL", function() { return REMOTE_URL; });
var REMOTE_URL = 'http://178.62.34.95:5984/';

/***/ }),

/***/ "./app/renderer/images/accompagne.jpg":
/*!********************************************!*\
  !*** ./app/renderer/images/accompagne.jpg ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/jpeg;base64,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");

/***/ }),

/***/ "./app/renderer/images/agrocert.jpg":
/*!******************************************!*\
  !*** ./app/renderer/images/agrocert.jpg ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/jpeg;base64,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");

/***/ }),

/***/ "./app/renderer/images/avigers.png":
/*!*****************************************!*\
  !*** ./app/renderer/images/avigers.png ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./app/renderer/images/elev.png":
/*!**************************************!*\
  !*** ./app/renderer/images/elev.png ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAADAFBMVEVDp1L6/fv0+var0oQmnVGr2Lzc7+Pf8OXm8+jP6NKTzailz31GqFQ3oki13Lvm8+rx+PJtunnt9/C+4MqOypdhtGxTrmDI4q4xolp5wpO8252Oy6RQrF5ouoWj1bU1o134/PWVzZ34/PjY6sbH5czS6ts6o0r6/fibym7y+fU/qWWu1Ink8Nfy+Oy02JLm8dvC485ctXvM59DT576Fxo5xvow/pU87o0sZmEiUzJzu9uZYsGX1+vVquHaBxIvq8999wYaf0qi63r+c0KTW6cJkuIPp9Ouv2bZ0vYDg8OPu9u/M59bD48jA3aO/4MSDxpyLyJR2voEemkvK5tRyvH6s2LPO6NduvYrR6dVes2vX7NqZz6KHwFDr9OGgzXXD36bH5dKn1a45pWDe7+BWsney2rjC4sbn9OzM47Mrn1QyoEPg7tLZ6se53sat2LT2+/KRy5lLrW6GwE5ftn2w1o09pU2YyWlcsmlDqmee0rHp9O2TxmJ7wIWWx2Z/xJhLq1vb68uJx5GQxV2EvkrO5bdmtnK43b01oUVZsWbr9vDr9e18w5V6v4RRsHP8/fq42Zj5/Pr3+/gXl0aMwlep1rGj06ub0a9UsnXZ68lwu3u13cMwn0Gf07IjnE5HqVZ2wI+Ow1pFq2mFv0y03MJHrGya0K2DvkkTlkP9/v39/v7b68ljtXCDvkrc7t8zoETa7d3o9OqIx5Hj8eUUlkT1+/eVzZzx+fJYsWYxn0LZ7dz+/v3b7d3A4cW+4MPt9u5ot3TI5czs9u5SsXTi8ef8/vyl1a3V69h/w4nW69nk8uk8qGM7pmGt1Ii43sWDxYyk1Kzw+PFUr2KJwVKVx2T7/fvE5M+Gv01Or3Ch06lNrFzk8uZiuIDZ7eCdy3Dw9+lKqlm94MLG5Mr8/v3Q5rnB4szF48nF5NDQ6dmYz6xPr3Ko17nU69yr17Kz27ix27/b7t6KyaC74Mggm02y15DW7N7c7MySxV9IrW2hzXbY7eGKwlXN5LWfzHOjznhEq2j////BNpxcAAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AU/cHJQAAC1FJREFUaN61m3lAFNcZwAcUXdBFQVhJggdRQTyCrsiCoCKgQBRlV1ABrfEIyloVI9GmUYkXGNR6NGrJKhrb7lECCsJ6oeIRTUSJmjWmGmNMqaZNTFutrW2Svs5e896beXPtku+/nffm++27v+9731BAnlyo908piA1aWRXpkqqVQbEFKf71PjIVUXIq1z+qG33PQJR7Z2If1f8k4GD/gkSNQVA0iQnq4HYGX0zYZJAkm0JmtB/4bOBGjUGyROYFnm0XsGJcuEGmhBcovAafjehq8EC6RlR4Bd4+548GD+XeB0meg5vyDF7IyiYPwRNihRW/rtG8Llwj9rYn4CaeOaXXqDKK50zu73/y+PGT/v0nzynOUGn05LqlKbLB1mzyfK0smPSymV3Z/PKkgkry/8y2ygMfqiZN1bpCgWWiKKwjLYDqQ3LATVUcBXE5XyaJrc2kL7VxnBerJksHL+FsVFRjvrSdML+R4mxl30oE+xRw/nSCQvqxU5HK6a4IHylgcx3rNWVIvbyjtr5RyVJRZxYHX2BzRx8HsiW/kk2+IAa2sbhdlwCPZAlrhtfZRMARrObWAA+lZjSuqVgY/A5Wuba4AXgs5ohaTNkcIXATNiuUgcArCcS0lZ/iB8/DBqbKH3gp/tjCijvOBw4OReslzgNey7xEVGNeMA8YOwaP1oN2kPqjqM4xZHDZMbS9t0G7yG2szWUksKIUHd8a0E5Sg45zqYIAXoXu6zNAu8kM9MBaxQU3oeu3DLSjpKDrOYUNDlYhpY2gXaURUa0KZoE/QwrP2EivfxPQ671BgwZt3dzmyymz3Rw5yCHDey/gvmlDd89UHHwYOb4p0gLuNH2nyS23HrAKP1/OlJnC9lq4iwrVfhgDo2cD6Tya1seEiM4PK5xYhBaa9nPJS1CrAAWjDa4kcDtjXJMp/rdI4fkwvNAUwFVQyWmyE5yAnAwkq3AkS7UprBtTtmM5u7Dj51yrFTkvEiB4AsV+zBrgeLZu02amcACnjNRkpGnUBAacizwlbZW9WYp14/dOZArf7tF7Pqt8+FdcfwjZwHLdYBuyn35MWkkvYGof/529ZGxtLViNX7zI1fEBcg7YXGA13FqqromC+7TZHw3907aX7LJt4Sz7z25bxcDd4VFQq3aB13LmugA4bAD94Isnvza65UaXGHuHzxUBA8Rab3WCT0N3K+5vouDv6N8/X2dEZeZC+tmwxyLgefCwCD/tABfCc1gLxMDD6Z/9ZhpZ0hNfckQw0DKYY4UOMNLThaJgeucY+i821/jpEADa4kXAhZCz1g62wJ7umiQGDusMwGwjV66cAD5FIuAGGE8Jt9Dgk3BTiQVi4Fu+4MSbBPB/xwKwXASMbCLKkzQ4V7SnEXAvekbfIICNTwF4TgxciO4hFEiGHXBYFDwdgCGvkcB/kAA+DAc1GVAN0JgOMksBp73vKdicw6BCG6hM6D0UACngfh6DwTg4jTMpNRMp0k/6qcHNzN6sV1OBcKrxDTH4vUzw/K94Yt6RDCyQgkZPKa+ZOO2IPPALfIqgKRtBXYJzixdsOScLXNSJT1EGA7tEbUT3MT4ZppMD/ppXTzED20jBkP84AZv8r/HSwWtsvGqgNbCJgofVq0LewNW5EsF99gp5M/AApuBE6y/oh/wyTBJ431QhJc3QLUTAzcIeUIskcNFHQjrURLBwi8Fc1yHRzygI7iYYeFPKB+9wdPUeG3h6UAj8+B9CSg5p5ILPB/zF4bQtiwazZvKANzvdiOV+0bxqjssDL7h6Z59rqbR0A1EHCNzXaNtnP2OmbJ7qyxN/OiZjck2cctmEmT5PCOAf6GPh34gtujXgI+mzmnRx0bn3Mh1qqh8ZBoh9nUY7WDrcc7uzuELABomkVALey7sjO7L9sefoxz053Cf00zUc361lygDAFypVUaG88dWpW3dyHUEdvUGcmL0e55ZE0ZGKjtzKpn1TcLs1FZoglJbPmvfbZyLJXPvg9buLYFd/f4K2XW8Ra5vOYQ4etO+0VAh04ojHAkfeO0+XLoVezMy36N/RvXhqm851R5TC7g2hoHWrQe+mHvJx6Zm92F7hZ4zTRq+kzoN4aztmhft6CN7u5FL3YUAZCRO/OJ9XkW7+MA64IiDsCF/9nQ8JO6bhPnUInovvQPArfA0O2/9PZ42BTFcPcbi/u5fxkUcyWmHvxh2ighMJgUYQQNYx92unVdN3xI+fusHv/5D2K/uzaL//kV9qYUZ5DJxPwRSAVvZRJhxguUPqs3N+zp0wJovlPg38fqjjmvs74gAVfePSeg0Gr3NoFwauLSUTs93xO87r8dPbnKM/ogvBeVox24G2LN7DBce3ueO4SiSwSAF1OSfOCBpa2H285j+OgrFZbxrJcmDbWEerH4zXsd49stil9WM4j9U0uIHCwzEO8GV86e52bAMX0q7cMPLLjZJFjpcf9DpCBFvg1TDVYI8IbIEhgnwSuKWH/YA9MWv2J0YRmfnsLYfzchP73/E9XItJj26SNBg6MYYQAniro7X9Ohw0SpFnG+wu5wI0+tTnbadSuEca0h3gTNjX4Wc54D527tAr641SpcsoVmDV5dAgwSWq3gG2abG/wppc9rjkqNVGGfJJDBaFLHI1OB1StDZngA3p67zt7OVEBy37/miUJSu+oEN9TJPfcF2HI1kHga7InhUJcLp85N7MxJxGxwCMMqWEXlbD3SviGicAUmV1R2+RYc9LYh0SE8lGlqAcpOObrnNyZw/OWnJOYQe4RskZ5Zp9EHxFLtiYBcB4PK79KhKKr2HA6PQKd53KuyF4sGzwMzf4smtmWcPxqeW+GkB2UbfpZenlBXhglBOsm8pxjN0nAsV21Q0a11FRcdl78Bvu4wFJLMnArn8u1nLmF3hY5C14jdvkQdKzyi9iYPMYA/c+pIfOO/B4H+5NiCHZjF/x1SB3nnr3bf67Om/A490O1Ckk6SruJPs2NRVN/nBf8l197DF4/p5oUuZBKuca1xe92k7szrT5Fc/ANj+352RF8+8Sk7gX1+pIpEKQOwHkZiePwH1heDwIvRBXk3IEitHb/FbEuJe/c92FwcxWnvQXBNyAZWO0wnc7yOYOYRwDjLupgZyO8SGWA9bKJCQNuSsLu37bUiZCjXGpD/kyX1LK0Xo5jCEelXVAxj69CN6uaVF9xx7x5/o0YmlBeTAHZWyJNJPLuHpDFLwozxPIb8LB5kt4MiRyOxIzWEKrBy5EQuR/xhMmV9mE0qqsQXjWXCqSbRcjYt8eHJwWhdywfoZnHI62CieSVaxkZZKhmQpLn5as5jHp1z3rOQq7SWQlz62cIJazp2CljlO7sC6KWtSzZAULvq7L8yNG4RfKu1hJkpsU4lmKClabDaH3WddCS0fFpPXMeqlDhw5Xns/a8JtZQ6NY1zz3Q9mJxwopeZmKM+y8yoxmOYkuzRmcNFiFtExU3y3sN5WV6u3SqNvVleykTIPWKjn3NoKbvHsmXUI2qiL9DPfNEJuMbOP0OEKKc/IpqxDVeiqZkOqs+VZOtjFtnh0lZUtTybn+xE8wgv1zkynSG0f5MsN4M8qD15KTxJWJOdm5/WusPo6pbvax1vTPzc5JVJJrt/J+KSKQQ194nTc5Xq/UxKmqaVHFaZR63moqgYQ0oa8GTmeXe/PVQHn2aeAZmD6hg/SeYvWjhfP+xL4MmRzqGTd0sohi0W9hkso21sql1m4sE823l/L1T1OyRtbYrmqSoFTa906Zu/jWC2e1qVKl5ZJK/cLL0pxQLTrR9NUJzRaJCmV80+abn55cGsn7fVVpcnq+r3Rtsj6moxueGZiwpfo6hXS8krpevSUhMNMiT5NMMB2WVuSXjVurrVa5pFq7dlxZviJarp7/A5OOWjSWlI7HAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./app/renderer/images/eurvol.jpg":
/*!****************************************!*\
  !*** ./app/renderer/images/eurvol.jpg ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/jpeg;base64,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");

/***/ }),

/***/ "./app/renderer/images/facility_charges_logo.png":
/*!*******************************************************!*\
  !*** ./app/renderer/images/facility_charges_logo.png ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAADAFBMVEXQ5Jew006u0krr89O63r/t9+/H5MvI4ITS5p282mrO5JWy1FLy9+FhtGyv0ky+225TrmDm8cqOypfW6Ka/4cTD4sff7Ljd67Pz+OVcsmnO45PN4pDb7d2t0Ug/pU/G34ByvH2TzJvF33+BxIv4/PB6v4Sozzzh7run1q+/23Dq89HK5s5GqVW01Vmz1Vb8/vw6o0q42GKFxo7u9dlIqVhLq1vB3Xbg7bp+wYc9pU31+vXx+PLp9Ous0UXN45O312DK4YnT6tfc6rFYsWbX7Nqj06tDp1EyoEPm8+h7wIVRrV90vYCmzjik1Kuc0KREqFPj8uU3okiAw4na6q52voFWr2Og0qgwn0Gq0EH6/ftot3Q7o0v5/PlktXDP6NOv2bbM4o39/vupzz+nzzu11Vr+/v3+/vzj78G31l7E3nuq0EL5/PKpzz36/fX6/PTt9NdUr2Lb6rDw9t7+//3z9+S72WfR5Zrv9dv2+/fn8cq52WTQ5Zm21l30+Oez1FbU5qCp0EDp8s73+++nzzrV56PA3HO62Wbw+PHD3nrr9e2z1FX4/PinzjrB3HX3++35/POr0UQ8pEz0+Oi311+w2bf9/vr1+en3++77/femzjnQ6dTk8MP9/v7y9+PP6NLw9t/r9ew7pEzY6Knp89D3+u3l8Mbb6q/7/far0EPu9dvT6tb8/fjl8MWu0kys0Uf2+uvk78L1+OjE3nzh7r3n8svt9u7M4o692my838Hv9tzl8MTZ6ar2+erJ4YjL4owzoETo9Or7/fv5/Pqy1FTm8cjV69j3+/jd7+D1+/Zuunqt2LTC3XhsuXjf7+G11lvk8MTJ4Ib8/vno8s3S5ZzO6NJpuHW43b2az6Pz+fTZ6azT5p7a6a3j78A2oUXD3XiExY3f7bns9u7E48lltnGMyZTe7Lbt9djS6dWd0aYxn0Lv9t3N59GZz6Gz27hNrFzx9uDx+fKs2LTi8eT3++1nt3Pr9NSRy5mVzZyYzp9xu3z8/vrF3n3L4YvA3HTY6ar///9FjJ4/AAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AU/cHJQAACcZJREFUaN61m3lYFEcWwJtRwBEMILuwSAweCyiBREWjcaOSdTVqRrMmKgiIM+AwDMN9CkqQS1iQj1sREUFEvO8oXtEYiatEzX2Qw9z37mbDmr23dzicet1dVX3M+P6ab6Ze/aa7q9579d5rhpUnsRntJ3tDSqbahQ2J3dSSkN6T7RmxMidi5AzO+FLrYrddgxO7ydovM+4LeFvAm3HxGqrEx70ZsM3G4GRmnkaSzJubbDvwnk/OxGskS/yZT/bYBJxX/LxGpjxfnGc1eE+WnUaB2GXtsQr8+vmXNQrl5d2JysE7cjVWyNQdCsFH/0OfuHrfvmr6iJBfKQEfewQ/25b4oDLmvMGt/ez+/Wfb3QznmbKgsC34sU7HZINN3vj1Wjmio0/PH6y/0DGiEr/2vU3ywNlq3FLV3qZsk7zbWtwGUGfLAV8VTjG258NEsb2Z+GHPWOHfNUgHp+7ja6s2BEuzhMEbVHzdsOckght6BX+aOS7d7RxnBLert0EKWK/lqUWPyZDnajPGRPOm0OrFwbEv8pQm32Vly/7JvElejBUD63jXOzaVVSSpD/CuWScC5j1fl2xWoaS5cGfKooM/4AyOGdnJKpbOkTGcyc7TwDs2cVaVB2uVeHDWmJ+BDE7jbAS7ANZKCeDMN3Y/CVy4GY6L28VaLbvi4Iy5hQRwCBxVt5O1geysg3O+hgf7w4g5Lk/CtM2t127evHntcjPFdWyE5Jk4cK0TdKTOIszfdNdP81r4+JR+qVnoNWtB02XCtoLP2akWA/YBA+YMo2MPjPd6KpQnS2bVv4cbOywMTOwjBO+A+9efRn304etTQrEyffSPmPH+cD+f5IML14FfN9C4TeNCyfIgTmMDmDqokAd2h25BR8a+Mr6Nwh01G6ejgy4jnwveCty3iuIFfwoPpcnPBD8JZ9/KAWeB/0TxRy0zqNynuki+SugtGMEF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");

/***/ }),

/***/ "./app/renderer/images/facility_logo.png":
/*!***********************************************!*\
  !*** ./app/renderer/images/facility_logo.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAADAFBMVEW43b6Qypg/pk/N4o97wIWw2bdLq1uJx5Gc0KSv005mtnI1oUXJ4IaMyZTH4IJZsWaozz3z+OXm8cl6v4Sp1rGj06u+225+wohzvH5xu3xitW+y2rgwn0G82mtIqViv0kz7/ffg7bq62WanzzqmzjjA3HLP5JY6o0r7/fv9/v03okj1+vVktXDc7t87o0szoES13LtYsGVEp1LH5czx+fLM59BGqFRUrmHX7Nrn8st9wYY3okas2LNHqVb9/v44okkyoEPG339XsGSVzZ3R6dWTzJsxn0Ln8+j6/ftPrF3j8eWUzJzo9OpSrmBQrF45o0nm8+h0vYDa7d2Ix5E+pU7t9+9htGzu9/B3voKVzZz2+/fI5cxYsWYyoELy+fNtunlot3Rcsmm/4MTZ7dzt9u7A4cVvu3t1voBds2o8pEyDxYxDp1Hb7d1es2ve7+C+4MM7pEyOypfi8eS63r+t2LSaz6ORy5r8/vzJ5c3B4sbs9u7g8OOs2LRhtG3W69nO6NLX6Kf1+/ZCplH0+vWg0qjx+PLD4sd2voGn1a7D48jC4sZHqVWRy5np9OtEqFPA4cSl1a272WeFxY7V69jn8+mBxItUr2KExY1xvH3d7+Dw+PFFqFSWzZ75/PnP6NJ/w4lQrV7L5s9puHVruXeb0KO33byw2rdTrmCZz6LP6NOk1KxRrV/O45PQ6dSh06lKqlnG5Mq94MLn8cqHxpCNyZb8/vnk8ubH5Mv8/fir0UTz+fTr89OFxo6Gxo/l8ueu0kpuunru9u/h8OP0+Ofr9e1NrFzv9t2KyJPS6dXd67S72mj4/Piz27hquHY9pU1bsmj9/vq11lv9/vu/23C23LvC3Xjm8cimzjnq9evG34HU5qD3++7y9+Ps9Nar17L1+Oiu2bXV56LW56TQ5JfE3nve7LbK4Ym738DO5JXY7Nvj78H5/Prt9Nfb7t75/POf0qfF48nL4Yu027nr9eyd0abY6aqt0kiYzp/2+eq53r7f7+Hu9dr6/PTc6rGz1Fb////i7BSXAAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AU/cHJQAACFFJREFUaN61m2dAFEcUxzcWQEhiQY0hZ+oZrnD0Sy4HIpGOEKVJFZAiIijSrKCxgr2XaNTYeze2aHpCoum99957TybHATtvZ3t7n9i5mfdj995Oee9/FJJnU5Nn1zeuLnr+ev9Ou/75otWN9bOTE2U6ouR0Tn4mY8dRA6cdLb7wTLIu4Kytv4cEGgQtMCTOnqUxeE1cb4Mk610bqx14xivegQbJNnJi8AxNwKO+v8sg0+5qTFANnhFzm0GB3RbzuCrwltYnDArt6EqrcnD5RIMKG1uuEPzGRWHHz02e/JxwjwunlYBX3MftbUxgatqU1pKw2dWlpdWzw0pap6SlBo7h7uvxuWxweBt3vI7bt+gRM9nZ/MiifeO4Y78tXB44PYArVDOmjxJ47aZncL0AAelywOVLWA66DTpuFXs3rccrurEGLimRDm6YTI6em+uQNhM6cueyprL3JIITG8mhQ+PWSl92HvcaSo6PSZQCNmcQwyy1yfKW2uTcYYSLDLM4eOpJYtDOUiTbvhxHODk5VQxsIu53cwNSZA2biXs2iYBjmP132JBCs+1kerpCGNyf0Tlo6Ryk2MwxQQxnrULgckZUWIKRKgu2QG8+NfzgexhTz9CtSKVtZbxY3Ur5wNmjYb+QSUi1TQqBHsdn84BXw14FdUgDqyuAPtdxg6l40Gf4g0gTe3A4JO/mAid4wO/XhjQyG/yePRI4wD1AB/9YpJnF+gPHPdjgcvj+UkhDo+D7XE+Cs28Hn+YiTS0XuN6bTYCPgA+LTdqCTc8C515McEoV/ih0EtLYkkOx96oUBhiuDeR69He/Ozqs35NKyQ1wVwDBKWC/Mo4c9bKxywaeVUoG6/PcFAAegduHsXaFQ2hwr75Kwelg9RmBwcuWk83cYOMDir9mcGvLl9HgJhBZp4XAnyoGLwMb5qYusAnMpweQEPgz5ZG9EqwDpk7wdjy1LNkkCL6kHLwALwVB2zvBnvifuRcJgn+7Xzl5H6ZM6ACXHaRbMr8VBvdRHl1oEj7dHCxzgxfjdTgHCYON/6qYv3JoTPxiNxg86cVi4O4qwIsxx7MdHIUP4JutYuCBLygH5+F8yn1RLnB1BH19EYmB/3tfxS3jSSSi2gWOxE9guii4z7sqwAsxKdIFvoa+SkoRBRtvUgFOSaJR1yBqDt5MP2wWB3+sAmweRKNGz6Fm4tNDIxIHv6pmQzAfp1NmUnY6UzRmkQTwDZLmLp5O+fTcPMZOBeOVOEUC+HViF/LPR+xX+7u33uTJeY+kYcHUvXi3jSSAiejqN9j4Cdn/xCrjQB5XqXhRoLbh2JIE/gJ88tiVfYzGO5m93W1DeFyl0bBtlDecxySA8c28cHev9gYG+KWONj7wFBrmTeGU/3xJ4Bff7my+4+aOBgg+0dk2RHQ30JvKpP++ThL43DfuxneufN1Igvte3dWJD1yPF2AKB1qYJLDxK1fT2V970ddd4Bvvxm184Gk43Ufhs1y+NPCHrli+BK47wa+tAm184Hx8HgVgiXf85h/d+xhJsDuWxcGzhqkAn3uIeX1n+1Mm2vjA6ZUqwKRdjfqtItv4wKWTNQQP/PEWo1Tw9ngMxlE9TRmYy8SDC0Z1vf7ghSCqU4VOL1qDcao0lWqm/16qP3gXDWumWoR389qCnTSsharFhzj9wXh/V0vh3W1guN5gK67uRFLHcEJ5v95gBz47HKPS8brYX28wfrqZ6VR2CEeiUSfwOpwMz6YQ3mUXbNIXvAknrwe5jjBeuAZxWF/wYQtILFLI7kNf7tIXfADHsd0FzqtipmN0A0fh0nBVXntGwBenCBx6gh24rN7iTkXgQ4zhlJ7gU5izxw1+FCd1k2boBy7DtfzQOjfYVIH/lQ/0A+/BlApTR4INPOuJX+sFTgSqg+DOzF44qNAs0gsMEiBDw7uyt7WgDGfVBxzlhxm1dNrYZmEEnB7g60CR1kaDTTlAYhKuBzgcyFNyTLg0EAtumbX1GiwfPJj0sRTccCyswqQB5d1TxKCnD90q0w49Tbh4Cijg0hjlnzVBgvGl0qzjQeF8DQNsXmcQqoeoNFAJMTjNzBKfDYh0omu05dZEY9+Z1WQ11QvKmO7RkstQHuxilXHnwdJ2yALtuOHjYSHeyi5c22GBuShPK25eESyI27k0AlfAav4ErcATeOQvAJzHUGNMuKwF9jKD23sOJxjNCoW9NkxVzzVvgB6rZiFuMPrTB/bbqDrCFuRAf/E/IT4wo5rv2hWo1KDUMfWkUxA/2LyN0TVpoRruD0kMZz1MAmBUWMToHOGVqBRrOsKURu8oREJg9PNYpv7r2b8UVhIJ8dzYZUgYjEYR0vHQAQrEGaYBoYTQnKUkZWtcEoh7Now+Y5b5Ep0ZTQqP2UJvDnHNqGJSV5mWL4ebn8aSwXIoZ7lUPfN8yZGWa+1bpFG32K+1kKNbuJIr3HKimHiWhLa4pwQ16tqexWzZby1nkPDomCIr2Q6SnDWFQtTCGmcSe1Tle9y9+QRUsQVcaulQZ9N+zp9gZO1vcoZyjSjgU4bxKreyPLlF4hEhG6+KDLMVJrpD3ZxYaAuLvGpjSAR37w28vxQRkIxNX88rjo+2VGamBvj5BaRmVlqiebvtFfAupFUra/NR86sBn7YypAzsWqGLopVio3cK6/7E1Hklzcq4zSUijkVlgVbKO0guNcibEj2NSNEjrnAGyvpue6yQ4FSaEPLRAXzvC+tt2/uLNC2pVAVm1LS4ANFAiw6ImxYl0aEM6ec8R0+nhz8f1N/D2dMxT7o3mZrTqJnBcb4B65cDCd6w5esDfOOCZ0bJ8yRb7Ho+wbF7vmeF3+2d5lfhOX+3I+G8XD//Axz1ks+utAYSAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./app/renderer/images/fd_good.jpg":
/*!*****************************************!*\
  !*** ./app/renderer/images/fd_good.jpg ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/fd_good.jpg");

/***/ }),

/***/ "./app/renderer/images/gers_tag.png":
/*!******************************************!*\
  !*** ./app/renderer/images/gers_tag.png ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./app/renderer/images/investment_logo.png":
/*!*************************************************!*\
  !*** ./app/renderer/images/investment_logo.png ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAADAFBMVEVDp1FltnGnzzvS5p0/pU++4MPP6NLi77/3++/W69mv0kzb6rDf7Lff7+LM4o2x1FKv003I5czr89P6/fuozzxyvH3k8ubm8cmu0kq52GO+225Kq1n0+vXO5JXQ5JfV56Pz9+Ty9+Hi7rvd67PT6tfH34Ks0UVitW+WzZ7N4pDz+OXr9e1YsGW82mp9wYfl8cf4/PAyoELN45NQrV74/PjF33/O45PK4YnA3HKt0UhpuHXn8cqOypez1Vbl8ufk78Lc6rG412G312DG34Buunpcsmnn8+g4oki62WU9pU3h7rvx+PLg7bq01Vm/23HW6KXq89Hn8svB3HX8/vza6q1TrmDD3Xno8s1Ur2JGqVWCxIzp8s71+vU7o0up1rHB3Xa92my11lvt9u5tuXjp9Ovs9NXc7t/R6dWLyJQ5o0mc0KTt9div2baf0qfv+PCt2LTx9+Cmzjh7wIXd7+A1oUV2voGSzJswn0Gq0EGFxY6Ry5r9/vv+/vz6/PSmzjm31l6pzz+q0EK11Vrj78Hw9t6pzz3+/v2nzjrE3nvt9Nf+//36/fW21l3D3nqp0ED7/fb1+emr0UT5/PP9/vr5/PL0+Of7/ffU5qBot3S72WfQ5Znv9dv3+u2z1FXR5ZrE3nzu9du311+z1Fb8/fjY6Kmr0EP0+OjZ6ary9+P1+Oju9dn3++3p89D2+uv3++3k8MP8/vnw9t/l8MTv9tys0UfC3XjL4ozF3n3f7Ljk8MT2+er5/Prh7r3l8MXV69iy1FT8/vqw00/X6Kfl8Ma72mjv9t2u0kzJ4YiGxo/J4IaHxpDa6a3T5p73+/iFxo6y2rje7Lam1a71+/b9/v7Y6KiVzZxnt3PS5Zz8/fzT6tbL5s+x01Hz+fS838GExY3L4YvA3HOs2LS23LvI4IXW56T4+/Da6qyi06rv9drc6q/C4sbP5Jjr89J/w4mZz6H3+uz6/fSJx5Le67Waz6O33b3Z6azZ7dzA4cXl8Mfl8MLY6arw9t3N59Ky2rm03Lr////ThD0OAAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AU/cHJQAADDlJREFUaN61W3dcFHcWH4oeii4Wwm4wNIkgiWgQlVhyBgEhKFKiIGBHo5yau7Uca2ApLr1Ih9AUo4L6UcSOiijWxGBiiemFhLvL1Vy/XJ+btvMrU3Zm2Xt/zc6+ed/5zbzf60OQ6ijL+0TvQMhgaL+Bo/7QwZCB3hPeWSoFEWqYvR9o3Pv1otTvrnng/X8Bdor7KCdPL0t5OR/FOdkYuMRzkV4RLZpZYjvg1p51eXrFlLeup9UmwPVeb+lV0lte9cMGbt0/Tm8FjdvfOizg7s5reivp2uEy64FPRemHQaGnrAQ++ZW84OojR6rlOUKeswZ44Uvi0oryYio8Ok3aE2fb28+e0Jo6PSpiDEXivC4LVQPXBYjra4LDza5CnLnw8k2HBHHdD6hTB9wSKKaqmksy26T+kkZsAwS2qAHWCi3y3POmMkt7s8x0fq7wdk3KgZ2P4Ffrmo8rs4THm3X4tYblCoFrBwSux/OYcrdzzFPwuAZqlQAXarDLcud4q3O13nNyMRGaQsvAWRewi5ZtIlVT+zJMyIUsS8CZ2HrnOpNWkfNobM2ZFoCx9+veQlpJ+e6opP3ywO8izPYelaTVVOlhjwjrlAM+tQ/Rqh5yWNSD6JirSRo4HzE9/XHkMCkO2Vhz26WAnRAvmHOaHDadzoElRjlJAIfAXAePkjagowdhme+IA0dnw+utJ21C9eUw8lIx4A4X2JH+hLQR5cPv2aVDBDgMYvCbQNqMJhggwWFC4FPw/o0mbUjR8H7uxYGd9kL/NpM2pWZIdIwTBhwLu4VM2wJnwi6jEQWugty3zpu0MXnD0qsQ4P3QPZn90eYFKXtk6Msvv3mk2FcJvQUhWHACx/x+hkVKm6gUOUGwZBbYE5zfxznCiR9aBs4YyUueOOuxHHAL5H08AfDlO/hpknwUoQD4e4555B8jVob/TQ4ZWtqdyzww9Ap0fNYx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");

/***/ }),

/***/ "./app/renderer/images/landes_tag.png":
/*!********************************************!*\
  !*** ./app/renderer/images/landes_tag.png ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./app/renderer/images/logo_bio.png":
/*!******************************************!*\
  !*** ./app/renderer/images/logo_bio.png ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./app/renderer/images/logo_euralis.gif":
/*!**********************************************!*\
  !*** ./app/renderer/images/logo_euralis.gif ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/gif;base64,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");

/***/ }),

/***/ "./app/renderer/images/logo_sequoia.jpg":
/*!**********************************************!*\
  !*** ./app/renderer/images/logo_sequoia.jpg ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wAARCABWAEEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aoLq8gsovMuH2qTgDGSx64AHJPHQUy+vVs0UKpknkyIoVPzSEDPH+NcyH+3ebqN+87QwgBoowVMjq2fkBORtKgj+LO4ZINBjUq8ui3Lp16+u4pI9Pt1lmUECRMFc43IcE/dZSvPv2xTZotYT5ri/WGN5AoBYBm+ZgoXapwSpX15X0NS3UdzcT2baNtSzCZSSFgEO7IbI9gQy8HkEVM+nOun2aXsskt1DOJUePLZcA/3uxG7jtmkZKMpd3+RFqFlfajcxz2k6PFCysiOSuJE35yMc5Yr+ANSXN3qNpplskjD7ZPKqGQoNkS9WLYOOAD3GSRUS6T9pm3G8ulnVXBSVjlctnKkHtnA68YqGaPVtNO6RpLmIbFJRwBtUc8HoWc4J6BQaAalG7aeppaXrkGoQg5w5ZhgA/dBOGP8AdBAB59RWpXLXNtaazBLNp/ltcHM0lsx/1p6Lk8HYSgOONwA6ZrT0fUo5v9CbAmhBUFVIVwpwdufTjPoTjJpmlOo9pff3Naiiig3OcstMe/u1l1C2uY3T/XJLJvidwch4+cr07Y4OCK1r3TYrx4ZS8iPAxZfLYDOeoP5DnqOxpupGYSW3ls6xlz5mwHpj25qNLaB0Bhd0VhglGI3fX1PWolJR3IhRVrD7O8VbVc2rRKBkLFGSuOoxgVJGskrJNOcEcrGOiZHf1Nc7b63dpDbTiS3a2e5+yrbsD52AxXcWz94YyRjpU48VRkLK1tMkLQrIoYKGbc2FOd2ADz19KlyYlWpm7NEs6gNkEcqw6qfUVFA8tojJOJbgZyJAATj3FYx8WRoskj2s5ULuEYUB1AjDtuyccBh+eKvWWtwX97NbwxzfusjzGTCEggEZ9cn+dJSaKVWnJ2T1LNtptl9vN/bnLEHAU/KGb7zY/vEADnsO1VNZ0+VLqK+sI83BkUSAEjcACBkjsM5xjk4+tW5okkljCqFkdsb14IA5PI+laNaRlzK4p0o2sYv9s3//AEBbr81/xoraoqieSX835BWbqVv5YS4g/dMHHmuv909cjv2rSpCAQQRkHtSaurGqMC8bTdPl+1z28SzSnZ5ixZdsjnoM9AagezstcsVCRvDGj7AVQKSEJAH+6DnFY+seIjY3rW62lrc2quTGxJ4IJ4x2I6Uqa1Hq+mXFrYR/Zrtzu8pWCmQZBba3qRmvPc+V8rOueCqeydXlTha+m50iWFqkQRoUk+XazSAMz8AHce5IAz9KlSGCGaSZIo0kk++4UAt9TXKWM0gmludHtZILXfHHJb8byQSXO0ng4wPXvUrza7IqJKj4MXzhVTDZRiQT1B3bQMU29dzkjVjZPkfyR1tlAZGF1IWyf9WmeFHrj1P9avVw2lwaxazpHaiYJGG+QFdjERKqb8nOCwbpXR+HIruLTm+3DErSM+CgU88nOCc855rug04qxkqspS5XFo1qKKKo1Co7iZLa3kmkICRqWJPoKrXt+IIbsQjfPbwGXaRx0OAT74NZbo+qaQbW/uWMdzAkn2gKEUM3RffnH+cVLlbQ2jRbXM9jzOaXzp5JMY3sWx6Zp1rcyWd1HcRH5423D39q2NR8HarYSERwG5i7PEM5/DqKzNQ0u90zaL22eHfnaW6H8a8yVOavzI+upV6FSKjCSd+n9anfwXIngjlAwJFDYPbIqTzKj0K0XULSNmk2RoigovU/KO/YVfl0NgMw3BznpIARj8Kyjhqs488T52danCbj2E0u4WO6aM7v3uNuOmRnP6fyrZrHEJ0e3N1LC1zLuC4ixlQeOMkd6mt9f0+4m8kz+TcdDDODG+fTB6/hXpULwgoz3OSpBzbnBXRpUUUV0GBQ1O1t7oLFNPLAZgYt0bbd4/uk4+vv6VlSxPqFx5Udsf7O0zA+zOMNO4HHB7KMYzwT9K2b21aVTJCqGcLtUycgD2Hr71UllhldRfwvHKgB3q+3IzwCQe+Cccjg1EoXN6VZw0f/AA39fgJDePbXgsoY3lldBL5TMALdOmGbnqc4HP5CpZdSsjDIb5AphkEbo6b9rHG3oD1yMH3qtLcR6ZqLX4R5odQEcYZAPkYZCg5xgHPX1+tVbvTbv+ydRupo911czxzGKM7tiIy4UepwD071HM1sbKnCbTlonbXz6/dr/TNpZLSxZIEjEQdS4Cx4GB1yeg/GqVzq80emjUBbE2TKHYo/71Yz/HjGOnOM5qfzYdRu4jCfMiEbhzggfNjj69aq21jfW2lPpTCOSMIYorgt/ARgbl9QPTg47VTb6EQjBW5t9Lp9tf8AgDdPmW2lk0q9k8yKZTJazu3+ujbqpPdhn8QQavWVqEt4ku4kMkchKOx3FyM/P9SOahD2lvbQYhaUWmIonZe4GDgnvxjP4U+Cxe4nM94oHzblQHocYz/n2z0pxjbcipVUvh6/1+PU0qKKKswCo5reKcYlRW+tFFAFJtMdVKx3DFD1RwCCOOMYx69u9OtnulEsTeSTGg2AZAzjvRRQFymJ7l7MytO+7yUbAIA3Ennp7VYTT55Z1mmnGFlLpgZIBOce3QD6Z9aKKALsVpBDK0kcYV2zk59euPSpqKKACiiigD//2Q==");

/***/ }),

/***/ "./app/renderer/images/poulet.jpg":
/*!****************************************!*\
  !*** ./app/renderer/images/poulet.jpg ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/poulet.jpg");

/***/ }),

/***/ "./app/renderer/images/production_logo.png":
/*!*************************************************!*\
  !*** ./app/renderer/images/production_logo.png ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAADAFBMVEWCvXxRpUjt8sa727XZ4oHV33PJ4sa3ywP5+erO5cszlynQ22L6++zp8+dEnzys06bR5869zx3W6dIpkx/y9dc1mCzk6qbT3m2Vxo73+OVAnTeLwoVirVvt8cJZqVFIoT/8/fbM2VP09tra69f29+L9/vzH4cPf55bE1DdytWrn8uWjzp36/Pq0167s9Org6JkulSMmkRvY4X7o7bLh79/x9NPv9u0slCLA0ipMo0So0aL3+vbc5Inw885dq1TM2lbq7rq1ygDm661Up0zt9evi6J7l66nb44Te5pPj8OHs776/3bq+0B/N2lrl8eMvlSS7zhHd5Y3J2Eo7mzPv88ugzJrh6Jz5/Pjp7bXi6aHF1T3199+32bHy+PGPxInI1kZpsWK1ygCFv38slCF5uXIqkyD6/PF1t2212K9+u3ecyZW6zQookh/D37/x9+6x1qvS3Wn0+fMlkRrd7NqYx5H7/PNus2bd7dvy+PJkr12ayZO0yQB7uXSzyQDB0y/l66uyyADc7Nkokh7K2E3w9u+yyAAxlijg7t3C0zP2+vW4zAaHwILi79/9/vn7/PTH1UJCnjp3uHAjkRq/0SbX6tWlz59LokLE4MHX4HrP21w6mjH19t7s8cQxlifd5pBcqlMjkBmey5idy5axxwCyyAApkx2vxwCuxgCxxwAwliWxyAArlCEwlSWtxgArkyH///4rlCIqkyH+//2vxgD+/vz+/vutxQD8/fWuxwD7/fv6/Pn+//6sxQAqlCH3+/b9/vr1+vQvlSX+/v3////9/fjx+PDx9NAxliWAvHmyyAD6/O/+/v78/fz09t0wlidOpEaxyAAwlijd5pJwtGjU6NHf7dzT59DE1DxXqE/f7ty7zhPu8skvliexxwD4+/jw9NC0ygDd5ZK8zhjq7bg9nDQ5mi75+ejR3Gbj6qTp7rjq7rhnsGBfrFdtsmV8u3V8unbF4MAqlCLW4HfY4X7Y4Xwylij4+ejH1kI+nDVBnjdqsmP6++/u9ezu9u2/0CP////5BcjzAAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AU/cHJQAAD3NJREFUaN61W3lUFEcaHwQRRhiREfEEPPDAgMMz2kBY9YkXXmNURFRQiBMvRFGji5rNc/ApGt3VRE00YhLfs/vNm2EYLkUFFI9Iq5FJPGKONq7RTXbXXbMxXtHNbM9MV3V1d1UzJG7/ocxMV/26vvqO3/fV1xpXa6/C9OD4JXkDbzTruj3VJadd0ayOD3w5+3Rrp9G05ubYuMCPf9GVUiargzIYLaWlFqOBclhNlGVn0er30o/9f4Az+6T00NpNlBtQfvEPYDWVfnhod8OLBr65KiON0lMYTASdl0Ty6t2nXiBw3J40Kp8q9eEy6Km9S6a8IOC4Llq9odTny6i/nLfqBQCnv92ot5S26rJYqYV9fidwwqBvTK2E9VyOxu6hvwP41KC7+Tbywmw28jNZTJ/lDPutwOF+WFgb5ah32Cmblr8sFOWooKhG3G36ncG/CfhmhkGhyOeNdj21f3hTxtzgtRu3hCakb1wV6D9Ic++OQe8wWJQqnpPdeuBrPczymQwVhub7y8OHKTzUpYI+izakNZoUD5qfHN5aYH+HQy45a9SeL1U8U+aUDvcok1E6iqL2xLYG+HiO3iYzzuk54Zktmcixjeueykzekr+40Hfg7CtmqYzNOwc9980TZndorpBKXB8V6itwQZpeKuTm+ELfw86p5cPzJQK360J9A05PrkDHmSJSXsEidH2dAH187lOJ16Gmh/kCvOqOVbK5TXGE+SNHEFe9Kace3WrD5X4tA4feQbfItL/fCcLkM2jmExXno0O3y2gIbwm4MNqK7u4aYojreYvj2v2NjLypSY/sNHXnv+rADaheGezxsaR5hzg5luVy/6CiZcsiKHSfC9SAYwcidkTdvUqcdCzjZFk38qcqyBu7IdIzpWWqAK9e+RB5RnI4/4T24LIs3fGsCnKoH4JsXnCRCLxsJWJ9aeSA+nouxwoXs69SBfnc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");

/***/ }),

/***/ "./app/renderer/images/qualisud.png":
/*!******************************************!*\
  !*** ./app/renderer/images/qualisud.png ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./app/renderer/images/sanders.jpg":
/*!*****************************************!*\
  !*** ./app/renderer/images/sanders.jpg ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/jpeg;base64,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");

/***/ }),

/***/ "./app/renderer/images/sudouest_tag.png":
/*!**********************************************!*\
  !*** ./app/renderer/images/sudouest_tag.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./app/renderer/model/facility.js":
/*!****************************************!*\
  !*** ./app/renderer/model/facility.js ***!
  \****************************************/
/*! exports provided: Facility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Facility", function() { return Facility; });
/* harmony import */ var _investment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./investment */ "./app/renderer/model/investment.js");
/* harmony import */ var _facility_charges__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./facility_charges */ "./app/renderer/model/facility_charges.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Facility = /*#__PURE__*/function () {
  _createClass(Facility, null, [{
    key: "isMovable",
    value: function isMovable(facilityType) {
      return facilityType.key === "movable";
    }
  }]);

  function Facility(facility) {
    _classCallCheck(this, Facility);

    this.id = facility.id;
    this.rev = facility.rev;
    this.size = facility.size;
    this.type = facility.type;
    this.workHours = facility.workHours;
    this.facilityCharges = new _facility_charges__WEBPACK_IMPORTED_MODULE_1__["FacilityCharges"](facility.facilityCharges);
    this.investments = [];

    if (facility.investments) {
      for (var i = 0; i < facility.investments.length; i++) {
        this.investments.push(new _investment__WEBPACK_IMPORTED_MODULE_0__["Investment"](facility.investments[i]));
      }
    }

    if (facility.attachments) {
      this.attachments = Object.keys(facility.attachments).map(function (key) {
        var fileName = key;
        var type = facility.attachments[fileName].content_type;
        var size = facility.attachments[fileName].length;
        var file = new Blob([facility.attachments[fileName].data], {
          size: size,
          type: type
        });
        file.name = fileName;
        return file;
      });
    } else {
      this.attachments = [];
    }
  }

  _createClass(Facility, [{
    key: "getAnnuity",
    value: function getAnnuity() {
      if (this.type === 'movable') {
        return {
          totalCost: 63856,
          duration: 12,
          interest: 2.5,
          value: 6225
        };
      } else {
        return {
          totalCost: 114401,
          duration: 15,
          interest: 2.5,
          value: 9239
        };
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      return "B\xE2timent ".concat(this.type.value || "NON-DEFINI", " de ").concat(this.size || "pas de taille", " m2");
    }
  }]);

  return Facility;
}();

/***/ }),

/***/ "./app/renderer/model/facility_charges.js":
/*!************************************************!*\
  !*** ./app/renderer/model/facility_charges.js ***!
  \************************************************/
/*! exports provided: FacilityCharges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilityCharges", function() { return FacilityCharges; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FacilityCharges = /*#__PURE__*/function () {
  function FacilityCharges(facilityCharges) {
    _classCallCheck(this, FacilityCharges);

    this.id = facilityCharges.id;
    this.rev = facilityCharges.rev;
    this.name = facilityCharges.name;
    this.warming = facilityCharges.warming;
    this.chickPrice = facilityCharges.chickPrice;
    this.vetPrice = facilityCharges.vetPrice;
    this.contributions = facilityCharges.contributions;
    this.disinfection = facilityCharges.disinfection;
    this.commodities = facilityCharges.commodities;
    this.litter = facilityCharges.litter;
    this.catching = facilityCharges.catching;
    this.insurances = facilityCharges.insurances;
  }

  _createClass(FacilityCharges, [{
    key: "getChargesByChick",
    value: function getChargesByChick() {
      return this.warming + this.vetPrice + this.disinfection + this.commodities + this.litter + this.catching + this.insurances;
    }
  }, {
    key: "getUnitPricesSum",
    value: function getUnitPricesSum() {
      return this.warming + this.contributions + this.vetPrice + this.disinfection + this.commodities + this.litter + this.catching + this.insurances;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Grille de crit\xE8res ".concat(this.name || 'NON-DEFINIE');
    }
  }]);

  return FacilityCharges;
}();

/***/ }),

/***/ "./app/renderer/model/investment.js":
/*!******************************************!*\
  !*** ./app/renderer/model/investment.js ***!
  \******************************************/
/*! exports provided: Investment, AdditionalInvestment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Investment", function() { return Investment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdditionalInvestment", function() { return AdditionalInvestment; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Investment = /*#__PURE__*/function () {
  function Investment(investment) {
    _classCallCheck(this, Investment);

    this.id = investment.id;
    this.rev = investment.rev;
    this.name = investment.name;
    this.designation = investment.designation;
    this.description = investment.description;
    this.papers = investment.papers;
    this.architectCost = investment.architectCost || 0;
    this.masonry = investment.masonry;
    this.customMasonry = null; // user custom definition of masonry price

    this.facilityMoutingDeliveryPrice = investment.facilityMoutingDeliveryPrice;
    this.equipmentMountingDeliveryPrice = investment.equipmentMountingDeliveryPrice;
    this.personalContribution = investment.personalContribution || 0;
    this.subsidies = investment.subsidies;
    this.helpEuralis = investment.helpEuralis;
    this.details = new InvestmentDescription(investment.details);

    if (investment.options && investment.options.length > 0) {
      this.options = investment.options.map(function (_ref) {
        var name = _ref.name,
            amount = _ref.amount;
        return new AdditionalInvestment(name, amount);
      });
    } else {
      this.options = [];
    }

    if (investment.attachments) {
      this.attachments = Object.keys(investment.attachments).map(function (key) {
        var fileName = key;
        var type = investment.attachments[fileName].content_type;
        var size = investment.attachments[fileName].length;
        var file = new Blob([investment.attachments[fileName].data], {
          size: size,
          type: type
        });
        file.name = fileName;
        return file;
      });
    } else {
      this.attachments = [];
    }

    this._facilityNb = 1;
  }

  _createClass(Investment, [{
    key: "toString",
    value: function toString() {
      return "Investissement ".concat(this.name || 'NON-DEFINIE', ", ").concat(this.designation || 'NON-DEFINIE');
    }
  }, {
    key: "getAnnuity",
    value: function getAnnuity(duration, interest) {
      return this.getTotal() * (interest / 100) / (1 - Math.pow(1 + interest / 100, -duration));
    }
  }, {
    key: "getMasonry",
    value: function getMasonry() {
      return this.customMasonry || this._facilityNb * this.masonry;
    }
  }, {
    key: "getFacilityMountingDeliveryPrice",
    value: function getFacilityMountingDeliveryPrice() {
      return this._facilityNb * this.facilityMoutingDeliveryPrice;
    }
  }, {
    key: "getEquipmentMountingDeliveryPrice",
    value: function getEquipmentMountingDeliveryPrice() {
      return this._facilityNb * this.equipmentMountingDeliveryPrice;
    }
  }, {
    key: "addAdditionalInvestment",
    value: function addAdditionalInvestment(_ref2) {
      var name = _ref2.name,
          amount = _ref2.amount;
      var additionalInvestment = new AdditionalInvestment(name, amount);
      additionalInvestment.count = 1;
      this.options.push(additionalInvestment);
    }
  }, {
    key: "selectOneAdditionalInvestment",
    value: function selectOneAdditionalInvestment(addedOption) {
      var option = this.options.find(function (o) {
        return o.name === addedOption.name;
      });
      if (!option) return;
      option.count = addedOption.isSelected ? addedOption.count + 1 : 1;
    }
  }, {
    key: "getTotalAdditionalInvestmentsSelected",
    value: function getTotalAdditionalInvestmentsSelected() {
      return this.additionalInvestmentsSelected.reduce(function (sum, opt) {
        sum += opt.amount * opt.count;
        return sum;
      }, 0);
    }
  }, {
    key: "getTotal",
    value: function getTotal() {
      return this.getTotalBeforeSubsidies() - this.subsidies - this.helpEuralis - this.personalContribution;
    }
  }, {
    key: "getTotalBeforeSubsidies",
    value: function getTotalBeforeSubsidies() {
      return this.getTotalAdditionalInvestmentsSelected() + this.getMasonry() + this.getFacilityMountingDeliveryPrice() + this.getEquipmentMountingDeliveryPrice() + this.papers + this.architectCost;
    }
  }, {
    key: "facilityNb",
    set: function set(nb) {
      this._facilityNb = nb; // reset custom masonry in order to not fool user

      this.customMasonry = null;
    }
  }, {
    key: "additionalInvestmentsSelected",
    get: function get() {
      return this.options.filter(function (opt) {
        return opt.isSelected;
      });
    }
  }]);

  return Investment;
}();

var InvestmentDescription = function InvestmentDescription(details) {
  _classCallCheck(this, InvestmentDescription);

  if (!details) return;
  this.name = details.name;
  this.designation = details.designation;
  this.description = details.description;
  this.papers = details.papers;
  this.architectCost = details.architectCost;
  this.masonry = details.masonry;
  this.facilityMoutingDeliveryPrice = details.facilityMoutingDeliveryPrice;
  this.equipmentMountingDeliveryPrice = details.equipmentMountingDeliveryPrice;
  this.personalContribution = details.personalContribution;
  this.subsidies = details.subsidies;
  this.helpEuralis = details.helpEuralis;
};

var AdditionalInvestment = /*#__PURE__*/function () {
  _createClass(AdditionalInvestment, null, [{
    key: "DEFAULT_COUNT",
    value: function DEFAULT_COUNT() {
      return 0;
    }
  }]);

  function AdditionalInvestment(name, amount) {
    _classCallCheck(this, AdditionalInvestment);

    this.name = name;
    this.amount = amount;
    this.count = AdditionalInvestment.DEFAULT_COUNT();
  }

  _createClass(AdditionalInvestment, [{
    key: "isSelected",
    get: function get() {
      return this.count > AdditionalInvestment.DEFAULT_COUNT();
    }
  }]);

  return AdditionalInvestment;
}();

/***/ }),

/***/ "./app/renderer/model/production.js":
/*!******************************************!*\
  !*** ./app/renderer/model/production.js ***!
  \******************************************/
/*! exports provided: Production */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Production", function() { return Production; });
/* harmony import */ var _facility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./facility */ "./app/renderer/model/facility.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Production = /*#__PURE__*/function () {
  function Production(production) {
    _classCallCheck(this, Production);

    this.facilitiesNb = 1;
    this.id = production.id;
    this.rev = production.rev;
    this.chickBySquare = production.chickBySquare;
    this.updateDate = production.updateDate;
    this.department = production.department;
    this.name = production.name;
    this.chickNb = production.chickNb;
    this.avgWeight = production.avgWeight;
    this.age = production.age;
    this.breedingPerYear = production.breedingPerYear;
    this.consumptionIndex = production.consumptionIndex;
    this.mortalityPercent = production.mortalityPercent;
    this.vaccinesPrice = production.vaccinesPrice;
    this.foodPrice = production.foodPrice;
    this.classedPrice = production.classedPrice;
    this.declassedPrice = production.declassedPrice;
    this.breedingDeclassedPercent = production.breedingDeclassedPercent;
    this.restraintPercent = production.restraintPercent;
    this.chickPurchaseReduction = 0.02;

    if (!(typeof production.facility === 'string' || typeof production.facility === 'number')) {
      this.facility = new _facility__WEBPACK_IMPORTED_MODULE_0__["Facility"](production.facility);
    }

    if (production.attachments) {
      this.attachments = Object.keys(production.attachments).map(function (key) {
        var fileName = key;
        var type = production.attachments[fileName].content_type;
        var size = production.attachments[fileName].length;
        var file = new Blob([production.attachments[fileName].data], {
          size: size,
          type: type
        });
        file.name = fileName;
        return file;
      });
    } else {
      this.attachments = [];
    }
  }

  _createClass(Production, [{
    key: "getMargePACByChickPIP",
    value: function getMargePACByChickPIP() {
      var charges = this.getTotalFoodCost() + (this.facility.facilityCharges.chickPrice + this.facility.facilityCharges.contributions) * this.getChickNb();
      return (this.getTotalWages() - charges) / this.getChickNb();
    }
  }, {
    key: "setFacilitiesNb",
    value: function setFacilitiesNb(nb) {
      this.facilitiesNb = nb;
      this.facility.investments.forEach(function (entity) {
        entity.facilityNb = nb;
      });
    }
  }, {
    key: "getVaccinesPrice",
    value: function getVaccinesPrice() {
      return this.facility.facilityCharges.chickPrice * 1000;
    }
  }, {
    key: "getFoodPrice",
    value: function getFoodPrice() {
      return this.foodPrice * 1000;
    }
  }, {
    key: "getClassedPercent",
    value: function getClassedPercent() {
      return (100 - this.breedingDeclassedPercent) / 100;
    }
  }, {
    key: "getClassedPrice",
    value: function getClassedPrice() {
      return this.classedPrice * 1000;
    }
  }, {
    key: "getDeclassedPrice",
    value: function getDeclassedPrice() {
      return this.declassedPrice * 1000;
    }
  }, {
    key: "getChickNb",
    value: function getChickNb() {
      return this.chickNb * this.facilitiesNb;
    }
  }, {
    key: "getChicksPaid",
    value: function getChicksPaid() {
      return this.getChickNb() - this.getChickNb() * this.chickPurchaseReduction;
    }
  }, {
    key: "getDeliveredChicks",
    value: function getDeliveredChicks() {
      return this.getChickNb() - this.getChickNb() * this.mortalityPercent;
    }
  }, {
    key: "getSoldChicks",
    value: function getSoldChicks() {
      return this.getDeliveredChicks() - this.getDeliveredChicks() * this.restraintPercent;
    }
  }, {
    key: "getClassedChicksSold",
    value: function getClassedChicksSold() {
      return this.getSoldChicks() - this.getDeclassedChicksSold();
    }
  }, {
    key: "getDeclassedChicksSold",
    value: function getDeclassedChicksSold() {
      return this.getSoldChicks() * this.breedingDeclassedPercent;
    }
  }, {
    key: "getTotalClassedWages",
    value: function getTotalClassedWages() {
      return this.getClassedChicksSold() * this.avgWeight * this.classedPrice;
    }
  }, {
    key: "getTotalDeclassedWages",
    value: function getTotalDeclassedWages() {
      return this.getDeclassedChicksSold() * this.avgWeight * this.declassedPrice;
    }
  }, {
    key: "getTotalWages",
    value: function getTotalWages() {
      return this.getTotalClassedWages() + this.getTotalDeclassedWages();
    }
  }, {
    key: "getAvgWagesPerTon",
    value: function getAvgWagesPerTon() {
      return (this.declassedPrice * this.breedingDeclassedPercent + this.classedPrice * (1 - this.breedingDeclassedPercent)) * 1000;
    }
  }, {
    key: "getTotalFoodCost",
    value: function getTotalFoodCost() {
      return this.getFoodEaten() * this.foodPrice;
    }
  }, {
    key: "getTotalCosts",
    value: function getTotalCosts() {
      return this.getChicksPaid() * this.facility.facilityCharges.chickPrice + this.facility.facilityCharges.getUnitPricesSum() * this.getChickNb() + this.getTotalFoodCost();
    }
  }, {
    key: "getBrutMarginPerChickPIP",
    value: function getBrutMarginPerChickPIP() {
      return Math.round((this.getMargePACByChickPIP() - this.facility.facilityCharges.getChargesByChick()) * 100) / 100;
    }
  }, {
    key: "getBrutMargin",
    value: function getBrutMargin() {
      return this.getTotalWages() - this.getTotalCosts();
    }
  }, {
    key: "getFoodEaten",
    value: function getFoodEaten() {
      return this.getChickNb() * this.consumptionIndex * this.avgWeight;
    }
  }, {
    key: "getAnnualBrutMargin",
    value: function getAnnualBrutMargin() {
      return this.getBrutMargin() * this.breedingPerYear;
    }
  }, {
    key: "getAnnualBrutMarginPerSquareMeter",
    value: function getAnnualBrutMarginPerSquareMeter() {
      return this.getAnnualBrutMargin() / this.facility.size;
    }
  }, {
    key: "getAnnualNetMargin",
    value: function getAnnualNetMargin(annuity, insuranceCostPercent) {
      var annualNetMarginBeforeInsurance = this.getBrutMargin() * this.breedingPerYear - annuity;
      if (!insuranceCostPercent) return annualNetMarginBeforeInsurance;
      return annualNetMarginBeforeInsurance * ((100 - insuranceCostPercent) / 100);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Production ".concat(this.name || 'NON-DEFINIE');
    }
  }]);

  return Production;
}();

/***/ }),

/***/ "./app/renderer/model/prospect.js":
/*!****************************************!*\
  !*** ./app/renderer/model/prospect.js ***!
  \****************************************/
/*! exports provided: Prospect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prospect", function() { return Prospect; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Prospect = function Prospect(prospect) {
  _classCallCheck(this, Prospect);

  this.name = prospect.name;
  this.email = prospect.email;
  this.phone = prospect.phone;
  this.company = prospect.company;
  this.address = prospect.address;
};

/***/ }),

/***/ "./app/renderer/model/video.js":
/*!*************************************!*\
  !*** ./app/renderer/model/video.js ***!
  \*************************************/
/*! exports provided: Video */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Video", function() { return Video; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Video = /*#__PURE__*/function () {
  function Video(video) {
    _classCallCheck(this, Video);

    this.id = video.id;
    this.rev = video.rev;
    var fileName = Object.keys(video.attachments)[0];
    var type = video.attachments[fileName].content_type;
    var size = video.attachments[fileName].length;
    var file = new Blob([video.attachments[fileName].data], {
      size: size,
      type: type
    });
    file.name = fileName;
    this.attachments = [file];
  }

  _createClass(Video, [{
    key: "getFile",
    value: function getFile() {
      return this.attachments[0];
    }
  }, {
    key: "setFile",
    value: function setFile(file) {
      this.attachments[0] = file;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.attachments[0].name;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return this.attachments[0].size;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Vid\xE9o ".concat(this.getName() || 'NON-DEFINIE');
    }
  }]);

  return Video;
}();

/***/ }),

/***/ "./app/renderer/service/file_input.directive.js":
/*!******************************************************!*\
  !*** ./app/renderer/service/file_input.directive.js ***!
  \******************************************************/
/*! exports provided: FileInputDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileInputDirective", function() { return FileInputDirective; });
var FileInputDirective = function FileInputDirective($parse) {
  'ngInject';

  return {
    restrict: 'A',
    link: function link(scope, element, attributes) {
      element.bind('change', function (o) {
        $parse(attributes.fileInput).assign(scope, element[0].files);
        scope.$apply();
      });
    }
  };
};
FileInputDirective.$inject = ["$parse"];

/***/ }),

/***/ "./app/renderer/service/modal.service.js":
/*!***********************************************!*\
  !*** ./app/renderer/service/modal.service.js ***!
  \***********************************************/
/*! exports provided: ModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return ModalService; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Created by alexandre on 5/19/17.
 */
var ModalService = /*#__PURE__*/function () {
  ModalService.$inject = ["$uibModal", "$state"];

  function ModalService($uibModal, $state) {
    'ngInject';

    _classCallCheck(this, ModalService);

    this.modal = $uibModal;
    this.state = $state;
  }

  _createClass(ModalService, [{
    key: "open",
    value: function open(component, resolveInModal) {
      return this.modal.open({
        size: 'lg',
        animation: true,
        component: component,
        resolve: resolveInModal
      }).result;
    }
  }]);

  return ModalService;
}();

/***/ }),

/***/ "./app/renderer/service/on-change.directive.js":
/*!*****************************************************!*\
  !*** ./app/renderer/service/on-change.directive.js ***!
  \*****************************************************/
/*! exports provided: CustomOnChangeDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomOnChangeDirective", function() { return CustomOnChangeDirective; });
var CustomOnChangeDirective = function CustomOnChangeDirective() {
  var directive = {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler.bind(scope));
    }
  };
  return directive;
};

/***/ }),

/***/ "./app/renderer/service/pdf-generator.service.js":
/*!*******************************************************!*\
  !*** ./app/renderer/service/pdf-generator.service.js ***!
  \*******************************************************/
/*! exports provided: PDFGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PDFGenerator", function() { return PDFGenerator; });
/* harmony import */ var pdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pdfmake/build/pdfmake.min */ "./node_modules/pdfmake/build/pdfmake.min.js");
/* harmony import */ var pdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pdfmake/build/vfs_fonts */ "./node_modules/pdfmake/build/vfs_fonts.js");
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_presentation_previsionnel_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/presentation/previsionnel/functions */ "./app/renderer/components/presentation/previsionnel/functions.js");
/* harmony import */ var _model_facility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/facility */ "./app/renderer/model/facility.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





pdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_0___default.a.vfs = pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_1___default.a.pdfMake.vfs;
var PDFGenerator = /*#__PURE__*/function () {
  PDFGenerator.$inject = ["UserService", "$filter"];

  function PDFGenerator(UserService, $filter) {
    'ngInject';

    _classCallCheck(this, PDFGenerator);

    this.UserService = UserService;
    this.numberFilter = $filter('number');
  }

  _createClass(PDFGenerator, [{
    key: "generate",
    value: function generate() {
      var docDefinition = {};
      docDefinition.content = putHeader('\n\nPrévisionnel production avec batiment');
      pdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_0___default.a.createPdf(docDefinition).download();
    }
  }, {
    key: "putHeader",
    value: function putHeader(title) {
      var logo = PDFGenerator.getLogoAsBase64();
      return [{
        alignment: 'left',
        columns: [logo, {
          text: title,
          style: 'header'
        }]
      }];
    }
  }, {
    key: "generatePrevisionnel",
    value: function generatePrevisionnel(production, insuranceCostPercent, investment, date, annuity, prospect) {
      var nameWithOutSpaces = function nameWithOutSpaces(someWithName) {
        return someWithName.name.replace(/\s+/g, '');
      };

      var investmentName = investment.name ? nameWithOutSpaces(investment) : '';
      var pdfName = "previsionnel_".concat(nameWithOutSpaces(prospect), "_").concat(production.facilitiesNb, "_").concat(production.facility.size, "_").concat(investmentName, "_").concat(nameWithOutSpaces(production));
      var docDefinition = {
        content: this.putHeader("\n                PREVISIONNEL ".concat(production.facilitiesNb, " * ").concat(production.facility.size, " m\xB2\n                \n                ").concat(production.name)),
        styles: {
          header: {
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15],
            bold: true,
            alignement: 'center'
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        }
      };
      var displayedDate = new Date(date);
      var updateDate = new Date(production.updateDate);
      var contentToConcat = [{
        columns: [{
          text: this.UserService.getUser(),
          bold: true,
          alignment: 'left'
        }, {
          text: 'le ' + displayedDate.toLocaleDateString("fr-FR"),
          bold: true,
          alignement: 'right'
        }]
      }, '\n', {
        columns: [{
          text: "\n                        \n                                Parcours: ".concat(production.chickBySquare, " m\xB2/poulet soit ").concat(production.chickBySquare * production.getChickNb() / 10000, "ha\n                                Mis \xE0 jour le ").concat(updateDate.toLocaleDateString("fr-FR")),
          alignement: 'right',
          bold: true
        }, {
          text: "".concat(prospect.company || '', "\n                                ").concat(prospect.name, "\n                                ").concat(prospect.email || '', " ").concat(prospect.email && prospect.phone ? '-' : '', " ").concat(prospect.phone || '', "\n                                ").concat(prospect.address || ''),
          alignment: 'left',
          bold: true
        }]
      }, {
        style: 'tableExample',
        table: {
          widths: ['*', 75],
          headerRows: 1,
          body: [[{
            text: "EURALIS Volailles      ".concat(production.facilitiesNb * production.facility.size, " m\xB2"),
            style: 'tableHeader',
            colSpan: 2,
            alignment: 'center'
          }, ''], ["Poussins mis en places        factur\xE9s: ".concat(this.numberFilter(Math.round(production.getChicksPaid()))), this.numberFilter(production.getChickNb())], ['Mortalité', "".concat(production.mortalityPercent * 100, " %")], ['Age', "".concat(production.age, " j.")], ['Nombre de bandes par année', "".concat(production.breedingPerYear)], ['Indice de consommation', "".concat(production.consumptionIndex)], ['Poids moyen', "".concat(production.avgWeight, " kg")], ['Prix poussins vaccinés (€/1000)', "".concat(production.getVaccinesPrice(), " \u20AC")], ['Prix aliment producteur (€/t) indexé', "".concat(production.getFoodPrice(), " \u20AC")], ['Prix reprise classé (€/t) indexé', "".concat(this.numberFilter(production.getClassedPrice()), " \u20AC")], ['Prix reprise déclassé (€/t) indexé', "".concat(this.numberFilter(production.getDeclassedPrice()), " \u20AC")], ['Taux de déclassé', "".concat(production.breedingDeclassedPercent * 100, " %")], ['Taux de saisie', "".concat(production.restraintPercent * 100, " %")]]
        }
      }, {
        style: 'tableExample',
        table: {
          widths: ['*', 75, 75],
          headerRows: 1,
          body: [[{
            text: "CRITERES ECONOMIQUES en \u20AC HT",
            style: 'tableHeader',
            alignment: 'left'
          }, {
            text: "\u20AC/t\xEAte",
            style: 'tableHeader',
            alignment: 'center'
          }, {
            text: "Total (\u20AC HT)",
            style: 'tableHeader',
            alignment: 'center'
          }], ["Poussins", production.facility.facilityCharges.chickPrice, this.numberFilter(Math.round(production.getChicksPaid() * production.facility.facilityCharges.chickPrice))], ['Aliment (€/t)', production.foodPrice, this.numberFilter(Math.round(production.getTotalFoodCost()))], ['Cotisations', production.facility.facilityCharges.contributions, this.numberFilter(Math.round(production.facility.facilityCharges.contributions * production.getChickNb()))], [{
            text: "Marge PAC / poulet MEP",
            italic: true
          }, {
            text: Math.round(production.getMargePACByChickPIP() * 100) / 100,
            colSpan: 2,
            alignement: 'left'
          }, ''], ['Chauffage (conso + loc cuves) indexé', production.facility.facilityCharges.warming, this.numberFilter(Math.round(production.facility.facilityCharges.warming * production.getChickNb()))], ['Frais vétérinaires', production.facility.facilityCharges.vetPrice, this.numberFilter(Math.round(production.facility.facilityCharges.vetPrice * production.getChickNb()))], ['Désinfection', production.facility.facilityCharges.disinfection, this.numberFilter(Math.round(production.facility.facilityCharges.disinfection * production.getChickNb()))], ['Eau - Electricité - Divers', production.facility.facilityCharges.commodities, this.numberFilter(Math.round(production.facility.facilityCharges.commodities * production.getChickNb()))], ['Litière', production.facility.facilityCharges.litter, this.numberFilter(Math.round(production.facility.facilityCharges.litter * production.getChickNb()))], ['Attrapage', production.facility.facilityCharges.catching, this.numberFilter(Math.round(production.facility.facilityCharges.catching * production.getChickNb()))], ['Assurances (incendie, tempête, dégâts des eaux, étouffements, etc...)', production.facility.facilityCharges.insurances, this.numberFilter(Math.round(production.facility.facilityCharges.insurances * production.getChickNb()))], [{
            text: "Charges / t\xEAte",
            italic: true
          }, {
            text: production.facility.facilityCharges.getChargesByChick(),
            colSpan: 2,
            alignement: 'left'
          }, ''], ["Marge Brute / poulet MEP", {
            text: Math.round(production.getBrutMarginPerChickPIP() * 100) / 100,
            colSpan: 2,
            alignement: 'left'
          }, ''], [{
            text: "TOTAL CHARGES PAR BANDE"
          }, {
            text: "".concat(this.numberFilter(Math.round(production.getTotalCosts()))),
            colSpan: 2,
            alignement: 'center'
          }, '']]
        }
      }];
      contentToConcat.push({
        text: '',
        pageBreak: 'before'
      });
      contentToConcat.push(this.putHeader(''));
      contentToConcat.push({
        style: 'tableExample',
        table: {
          widths: ['*', 130],
          headerRows: 1,
          body: [["PRODUIT TOTAL PAR BANDE (Ventes)", "".concat(this.numberFilter(Math.round(production.getTotalWages())), " \u20AC")], ["MARGE BRUTE PAR BANDE", "".concat(this.numberFilter(Math.round(production.getBrutMargin())), " \u20AC")], ["MARGE BRUTE ANNUELLE avec ".concat(production.breedingPerYear, " bandes par ann\xE9e"), "".concat(this.numberFilter(Math.round(production.getAnnualBrutMargin())), " \u20AC")], [{
            text: "Marge par m\xB2",
            fontSize: 10
          }, {
            text: "".concat(this.numberFilter(Math.round(production.getAnnualBrutMargin() / (production.facilitiesNb * production.facility.size))), " \u20AC"),
            fontSize: 10
          }]]
        }
      });
      contentToConcat.push(this.generateLastTotalLine(investment, annuity, production, insuranceCostPercent));
      contentToConcat.push('Temps de travail ' + production.facility.workHours * production.facilitiesNb + ' h/j en moyenne');

      if (investment !== _components_presentation_previsionnel_functions__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_INVESTMENT_CHOOSEN"]) {
        contentToConcat.push.apply(contentToConcat, _toConsumableArray(this.generateInvestmentTable(investment, production.facility.type)));
      }

      contentToConcat.push('Document non contractuel');
      docDefinition.content = docDefinition.content.concat(contentToConcat);
      pdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_0___default.a.createPdf(docDefinition).download("".concat(pdfName, ".pdf"));
    }
  }, {
    key: "generateLastTotalLine",
    value: function generateLastTotalLine(investment, annuity, production, insuranceCostPercent) {
      var investmentAnnuity = Object(_components_presentation_previsionnel_functions__WEBPACK_IMPORTED_MODULE_2__["processInvestmentAnnuity"])(investment, annuity);
      var annualNetMarginBeforeInsuranceCost = production.getAnnualNetMargin(investmentAnnuity);
      var annualNetMargin = production.getAnnualNetMargin(investmentAnnuity, insuranceCostPercent);
      var annualNetMarginBlock = {
        style: 'tableExample',
        table: {
          widths: ['*', 130],
          headerRows: 1,
          body: [["MARGE DE TRESORERIE ANNUELLE avant MSA (".concat(insuranceCostPercent, "%)"), "".concat(this.numberFilter(Math.round(annualNetMarginBeforeInsuranceCost)), " \u20AC")], ["MARGE NETTE DE TRESORERIE", "".concat(this.numberFilter(Math.round(annualNetMargin)), " \u20AC")]]
        }
      };
      if (investment === _components_presentation_previsionnel_functions__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_INVESTMENT_CHOOSEN"]) return [annualNetMarginBlock];
      return [this.createAnnuityLine(investment, annuity), annualNetMarginBlock];
    }
  }, {
    key: "generateRotations",
    value: function generateRotations(nbFacilities, productions, investment, annuity) {
      var docDefinition = {
        content: this.putHeader('\n ROTATIONS REALISABLES \n  POUR UNE SURFACE DE ' + productions[0].facility.size * nbFacilities + 'm²'),
        styles: {
          header: {
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15],
            bold: true,
            alignement: 'center',
            fontSize: 11
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        }
      };
      var displayedDate = new Date();
      docDefinition.content.push({
        columns: [{
          text: this.UserService.getUser(),
          bold: true,
          alignment: 'left'
        }, {
          text: 'le ' + displayedDate.toLocaleDateString("fr-FR"),
          bold: true,
          alignement: 'right'
        }]
      }, '\n');
      var table = {
        style: 'tableExample',
        table: {
          width: 'auto',
          headerRows: 1,
          body: [['Type de production', 'Surface bâtiment (m²)', 'Surface parcours minimum (ha)', 'Densité (m²/poulet)', 'Nombre de bandes / an', 'Nombre / bandes', 'Nbre vendus / an', 'Marge brute / sujet vendu (€ HT)', 'Marge brute / an (€ HT)']]
        }
      };

      for (var i = 0; i < productions.length; i++) {
        table.table.body.push([productions[i].name, productions[i].facility.size * nbFacilities, productions[i].chickBySquare * productions[i].getChickNb() / 10000, Math.round(productions[i].chickNb / productions[i].facility.size * 100) / 100, productions[i].breedingPerYear, productions[i].chickNb * nbFacilities, Math.round(productions[i].getSoldChicks()), Math.round(productions[i].brutMarginPerSoldChick * 100) / 100, Math.round(productions[i].getAnnualBrutMargin())]);
      }

      var total = productions.reduce(function (acc, production) {
        return acc + production.getAnnualBrutMargin();
      }, 0);
      table.table.body.push(['', '', '', '', '', '', '', '', {
        text: Math.round(total) + '€',
        fontSize: 13
      }]);
      docDefinition.content = docDefinition.content.concat(table);

      if (investment !== 'none') {
        docDefinition.content.push({
          columns: [{
            width: 50,
            text: 'Annuité ',
            bold: true
          }, {
            width: 110,
            text: ' (Investissement de '
          }, {
            width: 60,
            text: Math.round(investment.getTotal()) + '€',
            bold: true
          }, {
            width: 30,
            text: ' sur '
          }, {
            width: 40,
            text: annuity.duration + ' ans ',
            bold: true
          }, {
            width: 10,
            text: ' à'
          }, {
            width: 60,
            text: annuity.interest + '%)'
          }, {
            width: 100,
            text: ''
          }, {
            width: 100,
            text: Math.round(investment.getAnnuity(annuity.duration, annuity.interest)) + '€',
            bold: true,
            fontSize: 13
          }]
        });
        docDefinition.content.push({
          columns: [{
            width: 330,
            text: 'Avec ' + investment.name + ' ' + investment.designation + '\n(AREA et aides EURALIS déduites)'
          }, {
            width: 100,
            text: ''
          }]
        });
        docDefinition.content.push('\n');
        docDefinition.content.push({
          columns: [{
            width: 300,
            text: ''
          }, {
            width: 160,
            text: 'Marge nette avant MSA',
            bold: true
          }, {
            width: 100,
            text: Math.round(total - investment.getAnnuity(annuity.duration, annuity.interest)) + '€',
            bold: true,
            fontSize: 13
          }]
        });
        docDefinition.content.push('\n');
      } else {
        docDefinition.content.push({
          columns: [{
            width: 300,
            text: ''
          }, {
            width: 160,
            text: 'Marge nette avant MSA',
            bold: true
          }, {
            width: 100,
            text: Math.round(total) + '€',
            bold: true,
            fontSize: 13
          }]
        });
        docDefinition.content.push('\n');
      }

      docDefinition.content.push({
        text: '\n\nMarge brute = Ventes - poussins, aliment, cotis, prophylaxie, gaz, eau, edf, paille, attrapage, chaponnage, assurances',
        bold: true,
        fontSize: 9
      });
      docDefinition.content.push({
        text: '\n\n\n(document non contractuel)',
        fontSize: 9
      });
      pdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_0___default.a.createPdf(docDefinition).download('rotations.pdf');
    }
  }, {
    key: "generateInvestmentTable",
    value: function generateInvestmentTable(investment, facilityType) {
      var mountingDeliveryLabel = function mountingDeliveryLabel(suffix) {
        return (_model_facility__WEBPACK_IMPORTED_MODULE_3__["Facility"].isMovable(facilityType) ? 'Livraison' : 'Livraison et montage') + suffix;
      };

      var baseBody = [["INVESTISSEMENT", "\u20AC HT"], ['Désignation', investment.designation], ["Description", investment.description], ["Permis", this.numberFilter(investment.papers)], ["Co\xFBt architecte", this.numberFilter(investment.architectCost)], ["Gros oeuvre", this.numberFilter(investment.getMasonry())], [mountingDeliveryLabel(' du bâtiment'), this.numberFilter(investment.getFacilityMountingDeliveryPrice())], [mountingDeliveryLabel(' du matériel'), this.numberFilter(Math.round(investment.getEquipmentMountingDeliveryPrice()))]];
      var baseBodyTable = {
        style: 'tableExample',
        table: {
          widths: ['*', 130],
          headerRows: 1,
          body: baseBody
        }
      };
      var totalBody = [["Investissement total", "".concat(this.numberFilter(Math.round(investment.getTotalBeforeSubsidies())), " \u20AC")], ["Subventions AREA PCAE", "".concat(this.numberFilter(investment.subsidies), " \u20AC")], ["Aides EURALIS Volailles", "".concat(this.numberFilter(investment.helpEuralis), " \u20AC")], ["Apport personnel", "".concat(this.numberFilter(investment.personalContribution), " \u20AC")], ["Emprunt bancaire (aides et apport d\xE9duits)", "".concat(this.numberFilter(Math.round(investment.getTotal())), " \u20AC")]];
      var hasOptions = investment.additionalInvestmentsSelected.length > 0;
      var totalTable = {
        style: 'tableExample',
        table: {
          widths: ['*', 130],
          headerRows: 1,
          body: [['Total des investissements supplémentaires', "".concat(this.numberFilter(investment.getTotalAdditionalInvestmentsSelected()), " \u20AC")]].concat(totalBody)
        }
      };
      return hasOptions ? [baseBodyTable, this.createAdditionalInvestmentTable(investment), totalTable] : [baseBodyTable, totalTable];
    }
  }, {
    key: "createAdditionalInvestmentTable",
    value: function createAdditionalInvestmentTable(investment) {
      var _this = this;

      var additionalInvestmentsBody = [['INVESTISSEMENT SUPPLEMENTAIRES', '€/u.', 'u.', '€ HT']].concat(_toConsumableArray(investment.additionalInvestmentsSelected.map(function (_ref) {
        var name = _ref.name,
            amount = _ref.amount,
            count = _ref.count;
        return [name, _this.numberFilter(amount), count, _this.numberFilter(amount * count)];
      })));
      return {
        style: 'tableExample',
        table: {
          widths: ['*', 50, 50, 130],
          headerRows: 1,
          body: additionalInvestmentsBody
        }
      };
    }
  }, {
    key: "createAnnuityLine",
    value: function createAnnuityLine(investment, annuity) {
      return {
        columns: [{
          width: '*',
          text: [{
            text: 'Annuité',
            bold: true
          }, ' pour un investissement de', {
            text: " ".concat(this.numberFilter(investment.getTotal()), " \u20AC"),
            bold: true
          }, {
            text: " sur ".concat(annuity.duration, " ans"),
            bold: true
          }, " \xE0 ".concat(annuity.interest, "%")]
        }, {
          width: 135,
          text: "".concat(this.numberFilter(Math.round(investment.getAnnuity(annuity.duration, annuity.interest))), " \u20AC"),
          bold: true
        }]
      };
    }
  }], [{
    key: "getLogoAsBase64",
    value: function getLogoAsBase64() {
      var mycanvas = document.createElement("canvas");
      var ctx = mycanvas.getContext("2d");
      var img = document.getElementById("logo_euralis");
      ctx.width = img.width;
      ctx.height = img.height;
      ctx.drawImage(img, 0, 0);
      return {
        image: mycanvas.toDataURL(),
        width: ctx.width,
        height: ctx.height
      };
    }
  }]);

  return PDFGenerator;
}();

/***/ }),

/***/ "./app/renderer/service/state.handler.js":
/*!***********************************************!*\
  !*** ./app/renderer/service/state.handler.js ***!
  \***********************************************/
/*! exports provided: StateHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateHandler", function() { return StateHandler; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StateHandler = /*#__PURE__*/function () {
  StateHandler.$inject = ["$rootScope", "$state"];

  function StateHandler($rootScope, $state) {
    'ngInject';

    var _this = this;

    _classCallCheck(this, StateHandler);

    this.previousState = null;
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from) {
      _this.previousState = from;
    }); // if ESC go home

    $(document).keyup(function (e) {
      if (e.keyCode === 27) $state.go('home');
    });
  }

  _createClass(StateHandler, [{
    key: "getPrevious",
    value: function getPrevious() {
      return this.previousState;
    }
  }]);

  return StateHandler;
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./app/renderer/service/user.service.js":
/*!**********************************************!*\
  !*** ./app/renderer/service/user.service.js ***!
  \**********************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserService = /*#__PURE__*/function () {
  UserService.$inject = ["$localStorage"];

  function UserService($localStorage) {
    'ngInject';

    _classCallCheck(this, UserService);

    this.localStorage = $localStorage;
  }

  _createClass(UserService, [{
    key: "isAuthenticated",
    value: function isAuthenticated() {
      return this.localStorage.username !== undefined;
    }
  }, {
    key: "getUser",
    value: function getUser() {
      return this.localStorage.username;
    }
  }, {
    key: "storeCurrentUser",
    value: function storeCurrentUser(username) {
      this.localStorage.username = username;
    }
  }]);

  return UserService;
}();

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/app.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/app.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".ui-view-container {\n  position: relative; }\n\n[ui-view].ng-enter, [ui-view].ng-leave {\n  position: absolute;\n  left: 0;\n  right: 0;\n  -webkit-transition: all 1s ease-in-out;\n  -moz-transition: all 1s ease-in-out;\n  -o-transition: all 1s ease-in-out;\n  transition: all 1s ease-in-out; }\n\n[ui-view].ng-enter {\n  opacity: 0;\n  -webkit-transform: scale3d(0.5, 0.5, 0.5);\n  -moz-transform: scale3d(0.5, 0.5, 0.5);\n  transform: scale3d(0.5, 0.5, 0.5); }\n\n[ui-view].ng-enter-active {\n  opacity: 1;\n  -webkit-transform: scale3d(1, 1, 1);\n  -moz-transform: scale3d(1, 1, 1);\n  transform: scale3d(1, 1, 1); }\n\n[ui-view].ng-leave {\n  opacity: 1;\n  -webkit-transform: translate3d(0, 0, 0);\n  -moz-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0); }\n\n[ui-view].ng-leave-active {\n  opacity: 0;\n  -webkit-transform: translate3d(100px, 0, 0);\n  -moz-transform: translate3d(100px, 0, 0);\n  transform: translate3d(100px, 0, 0); }\n\nmain {\n  padding-top: 78px; }\n\nsvg path.st0 {\n  -webkit-transition: stroke 0.5s, stroke-width 0.5s;\n  -o-transition: stroke 0.5s, stroke-width 0.5s;\n  transition: stroke 0.5s, stroke-width 0.5s; }\n\nsvg path.st0:hover, path.st0.active {\n  cursor: pointer;\n  stroke-width: 6;\n  stroke: #399528; }\n\nfooter {\n  padding-top: 60px; }\n\nbody {\n  font-family: Calibri;\n  color: #666666 !important;\n  background-color: white !important; }\n\n.table-hover > tbody > tr:hover {\n  background-color: rgba(48, 159, 65, 0.22) !important; }\n\n.valid_input {\n  border-color: #309f41 !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(48, 159, 65, 0.6) !important;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(48, 159, 65, 0.6) !important; }\n\n.wrong_input {\n  border-color: #ff4d5d !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 77, 93, 0.6) !important;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 77, 93, 0.6) !important; }\n\n.slide-right {\n  position: absolute;\n  left: -100px;\n  -webkit-animation: slide-right 0.5s forwards;\n  -webkit-animation-delay: 1s;\n  animation: slide-right 0.5s forwards;\n  animation-delay: 1s;\n  width: 100%; }\n\n@-webkit-keyframes slide-right {\n  100% {\n    left: 0; } }\n\n@keyframes slide-right {\n  100% {\n    left: 0; } }\n\n.fade-in {\n  -webkit-animation: fadein 5s;\n  animation: fadein 5s; }\n\n.slide-left {\n  right: -100px;\n  -webkit-animation: slide-left 0.5s forwards;\n  -webkit-animation-delay: 1s;\n  animation: slide-left 0.5s forwards;\n  animation-delay: 1s;\n  width: 100%; }\n\n@-webkit-keyframes slide-left {\n  100% {\n    right: 0; } }\n\n@keyframes slide-left {\n  100% {\n    right: 0; } }\n\n@keyframes fadein {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@-webkit-keyframes fadein {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.flex {\n  display: flex; }\n\n.align-items-center {\n  align-items: center; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/file_uploader/file_uploader.scss":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/file_uploader/file_uploader.scss ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".my-drop-zone {\n  border: dotted 3px lightgray; }\n\n.nv-file-over {\n  border: dotted 3px red; }\n\n/* Default class applied to drop zones on over */\n.another-file-over-class {\n  border: dotted 3px green; }\n\nhtml, body {\n  height: 100%; }\n\ncanvas {\n  background-color: #f3f3f3;\n  -webkit-box-shadow: 3px 3px 3px 0 #e3e3e3;\n  -moz-box-shadow: 3px 3px 3px 0 #e3e3e3;\n  box-shadow: 3px 3px 3px 0 #e3e3e3;\n  border: 1px solid #c3c3c3;\n  height: 100px;\n  margin: 6px 0 0 6px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/home/arrow.scss":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/home/arrow.scss ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".arrow {\n  width: 40px;\n  height: 40px;\n  position: relative;\n  display: inline-block;\n  margin: 10px 10px; }\n\n.arrow:before, .arrow:after {\n  content: '';\n  border-color: transparent;\n  border-style: solid;\n  position: absolute; }\n\n.arrow .curve {\n  position: absolute;\n  overflow: hidden; }\n\n.arrow .curve:before {\n  content: '';\n  position: absolute; }\n\n.arrow-up:before {\n  border: none;\n  background-color: #555;\n  height: 50%;\n  width: 30%;\n  top: 50%;\n  left: 35%; }\n\n.arrow-up:after {\n  left: 0;\n  top: -50%;\n  border-width: 20px 20px;\n  border-bottom-color: #555; }\n\n.arrow-right:before {\n  border: none;\n  background-color: #555;\n  height: 30%;\n  width: 50%;\n  top: 35%;\n  left: 0; }\n\n.arrow-right:after {\n  left: 50%;\n  top: 0;\n  border-width: 20px 20px;\n  border-left-color: #555; }\n\n.arrow-down:before {\n  border: none;\n  background-color: #555;\n  height: 50%;\n  width: 30%;\n  top: 0;\n  left: 35%; }\n\n.arrow-down:after {\n  left: 0;\n  top: 50%;\n  border-width: 20px 20px;\n  border-top-color: #555; }\n\n.arrow-left:before {\n  border: none;\n  background-color: #555;\n  height: 30%;\n  width: 50%;\n  top: 35%;\n  left: 46%; }\n\n.arrow-left:after {\n  left: -50%;\n  top: 0;\n  border-width: 20px 20px;\n  border-right-color: #555; }\n\n.arrow-up.curve-right:before {\n  border: none;\n  width: 0;\n  height: 0; }\n\n.arrow-up.curve-right .curve {\n  height: 20px;\n  width: 26px;\n  top: 20px;\n  left: 14px; }\n\n.arrow-up.curve-right .curve:before {\n  -moz-border-radius: 2000px;\n  -webkit-border-radius: 2000px;\n  border-radius: 2000px;\n  border: 12.01201px solid #555;\n  height: 15.97598px;\n  width: 27.97598px;\n  top: -20px;\n  left: 0; }\n\n.arrow-right.curve-right:before {\n  border: none;\n  width: 0;\n  height: 0; }\n\n.arrow-right.curve-right .curve {\n  height: 26px;\n  width: 20px;\n  top: 14px;\n  left: 0; }\n\n.arrow-right.curve-right .curve:before {\n  -moz-border-radius: 2000px;\n  -webkit-border-radius: 2000px;\n  border-radius: 2000px;\n  border: 12.01201px solid #555;\n  height: 27.97598px;\n  width: 15.97598px;\n  top: 0;\n  left: 0; }\n\n.arrow-down.curve-right:before {\n  border: none;\n  width: 0;\n  height: 0; }\n\n.arrow-down.curve-right .curve {\n  height: 20px;\n  width: 26px;\n  top: 0;\n  left: 0; }\n\n.arrow-down.curve-right .curve:before {\n  -moz-border-radius: 2000px;\n  -webkit-border-radius: 2000px;\n  border-radius: 2000px;\n  border: 12.01201px solid #555;\n  height: 15.97598px;\n  width: 27.97598px;\n  top: 0;\n  left: -26px; }\n\n.arrow-left.curve-right:before {\n  border: none;\n  width: 0;\n  height: 0; }\n\n.arrow-left.curve-right .curve {\n  height: 26px;\n  width: 20px;\n  top: 0;\n  left: 20px; }\n\n.arrow-left.curve-right .curve:before {\n  -moz-border-radius: 2000px;\n  -webkit-border-radius: 2000px;\n  border-radius: 2000px;\n  border: 12.01201px solid #555;\n  height: 27.97598px;\n  width: 15.97598px;\n  top: -26px;\n  left: -20px; }\n\n.arrow-up.curve-left:before {\n  border: none;\n  width: 0;\n  height: 0; }\n\n.arrow-up.curve-left .curve {\n  height: 20px;\n  width: 26px;\n  top: 20px;\n  left: 0; }\n\n.arrow-up.curve-left .curve:before {\n  -moz-border-radius: 2000px;\n  -webkit-border-radius: 2000px;\n  border-radius: 2000px;\n  border: 12.01201px solid #555;\n  height: 15.97598px;\n  width: 27.97598px;\n  top: -20px;\n  left: -26px; }\n\n.arrow-right.curve-left:before {\n  border: none;\n  width: 0;\n  height: 0; }\n\n.arrow-right.curve-left .curve {\n  height: 26px;\n  width: 20px;\n  top: 0;\n  left: 0; }\n\n.arrow-right.curve-left .curve:before {\n  -moz-border-radius: 2000px;\n  -webkit-border-radius: 2000px;\n  border-radius: 2000px;\n  border: 12.01201px solid #555;\n  height: 27.97598px;\n  width: 15.97598px;\n  top: -26px;\n  left: 0; }\n\n.arrow-down.curve-left:before {\n  border: none;\n  width: 0;\n  height: 0; }\n\n.arrow-down.curve-left .curve {\n  height: 20px;\n  width: 26px;\n  top: 0;\n  left: 14px; }\n\n.arrow-down.curve-left .curve:before {\n  -moz-border-radius: 2000px;\n  -webkit-border-radius: 2000px;\n  border-radius: 2000px;\n  border: 12.01201px solid #555;\n  height: 15.97598px;\n  width: 27.97598px;\n  top: 0;\n  left: 0; }\n\n.arrow-left.curve-left:before {\n  border: none;\n  width: 0;\n  height: 0; }\n\n.arrow-left.curve-left .curve {\n  height: 26px;\n  width: 20px;\n  top: 14px;\n  left: 20px; }\n\n.arrow-left.curve-left .curve:before {\n  -moz-border-radius: 2000px;\n  -webkit-border-radius: 2000px;\n  border-radius: 2000px;\n  border: 12.01201px solid #555;\n  height: 27.97598px;\n  width: 15.97598px;\n  top: 0;\n  left: -20px; }\n\n.arrow-animate {\n  -webkit-animation: spin 2s infinite linear;\n  margin-left: 20px;\n  height: 170px;\n  width: 170px;\n  /*\n    i{\n    @include border-radius(2000px);\n    position: absolute;\n    top: $h*.115;\n    left:$h*.115;\n    width: $w*.57;\n    height: $h*.57;\n    border:$h*.1 solid rgba(255,0,0,.5);\n    z-index: 1000;\n  }*/ }\n\n.arrow-animate .arrow-item {\n  width: 170px;\n  height: 85px;\n  position: absolute; }\n\n.arrow-animate .arrow-item:before {\n  content: '';\n  height: 0;\n  width: 0;\n  position: absolute;\n  border: 30.6px solid transparent; }\n\n.arrow-animate .arrow-item .curve {\n  height: 71.4px;\n  width: 170px; }\n\n.arrow-animate .arrow-item .curve:before {\n  -moz-border-radius: 2000px;\n  -webkit-border-radius: 2000px;\n  border-radius: 2000px;\n  border: 17px solid #555;\n  height: 96.9px;\n  width: 96.9px;\n  left: 19.55px; }\n\n.arrow-animate .arrow-item:first-child {\n  top: 0;\n  left: 0; }\n\n.arrow-animate .arrow-item:first-child:before {\n  border-top-color: #555;\n  bottom: -30.6px; }\n\n.arrow-animate .arrow-item:first-child .curve {\n  top: 0;\n  left: 0; }\n\n.arrow-animate .arrow-item:first-child .curve:before {\n  top: 19.55px; }\n\n.arrow-animate .arrow-item:last-child {\n  top: 85px;\n  left: 0; }\n\n.arrow-animate .arrow-item:last-child:before {\n  border-bottom-color: #555;\n  top: -34px;\n  right: 0; }\n\n.arrow-animate .arrow-item:last-child .curve {\n  bottom: 0;\n  left: 0; }\n\n.arrow-animate .arrow-item:last-child .curve:before {\n  bottom: 19.55px; }\n\n@-webkit-keyframes spin {\n  0% {\n    -moz-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -moz-transform: rotate(-360deg);\n    -ms-transform: rotate(-360deg);\n    -webkit-transform: rotate(-360deg);\n    transform: rotate(-360deg); } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/home/home.scss":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/home/home.scss ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, "div#menu.row {\n  width: 50%;\n  float: right;\n  margin-top: -23%;\n  margin-right: 5%; }\n\n.btn.btn-main {\n  font-size: large;\n  white-space: normal; }\n\n.btn.btn-raised {\n  background-color: #399528 !important; }\n\n.btn.btn-raised:hover {\n  background-color: #a6ce39 !important; }\n\n.align-center > tr {\n  text-align: center; }\n\n.banner {\n  width: 100%; }\n\n.eva1 {\n  color: #399528;\n  font-weight: bold;\n  font-size: large; }\n\n.eva2 {\n  color: #a6ce39;\n  font-weight: bold;\n  font-size: large; }\n\n.custom-bullet li {\n  display: block;\n  padding-top: 5px; }\n\n.custom-bullet li:before {\n  /*Using a Bootstrap glyphicon as the bullet point*/\n  content: \"\\E080\";\n  font-family: 'Glyphicons Halflings';\n  font-size: 9px;\n  float: left;\n  margin-top: 4px;\n  margin-left: -17px; }\n\n.vmid {\n  margin-top: 120px !important; }\n\n/* ===== Select Box ===== */\n.sel {\n  font-size: 1rem;\n  display: inline-block;\n  margin: 3em 2em;\n  width: 350px;\n  background-color: transparent;\n  position: relative;\n  cursor: pointer; }\n\n.sel::before {\n  position: absolute;\n  content: '\\F063';\n  font-family: 'FontAwesome';\n  font-size: 2em;\n  color: #FFF;\n  right: 20px;\n  top: calc(50% - 0.5em); }\n\n.sel.active::before {\n  transform: rotateX(-180deg); }\n\n.sel__placeholder {\n  display: block;\n  font-family: 'Quicksand';\n  font-size: 2.3em;\n  color: #838e95;\n  padding: 0.2em 0.5em;\n  text-align: left;\n  pointer-events: none;\n  user-select: none;\n  visibility: visible; }\n\n.sel.active .sel__placeholder {\n  visibility: hidden; }\n\n.sel__placeholder::before {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 0.2em 0.5em;\n  content: attr(data-placeholder);\n  visibility: hidden; }\n\n.sel.active .sel__placeholder::before {\n  visibility: visible; }\n\n.sel__box {\n  position: absolute;\n  top: calc(100% + 4px);\n  left: -4px;\n  display: none;\n  list-style-type: none;\n  text-align: left;\n  font-size: 1em;\n  background-color: #FFF;\n  width: calc(100% + 8px);\n  box-sizing: border-box; }\n\n.sel.active .sel__box {\n  display: block;\n  animation: fadeInUp 500ms; }\n\n.sel__box__options {\n  display: list-item;\n  font-family: 'Quicksand';\n  font-size: 1.5em;\n  color: #838e95;\n  padding: 0.5em 1em;\n  user-select: none; }\n\n.sel__box__options::after {\n  content: '\\F00C';\n  font-family: 'FontAwesome';\n  font-size: 0.5em;\n  margin-left: 5px;\n  display: none; }\n\n.sel__box__options.selected::after {\n  display: inline; }\n\n.sel__box__options:hover {\n  background-color: #ebedef; }\n\n/* ----- Select Box Black Panther ----- */\n.sel {\n  border-bottom: 4px solid rgba(0, 0, 0, 0.3); }\n\n.sel--black-panther {\n  z-index: 3; }\n\n/* ----- Select Box Superman ----- */\n.sel--superman {\n  /*   display: none; */\n  z-index: 2; }\n\n/* ===== Keyframes ===== */\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 1;\n    transform: none; } }\n\n@keyframes fadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.qualisud-centered {\n  height: 35%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/management/production/production.scss":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/management/production/production.scss ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".aligntd {\n  text-align: center; }\n\n.management-table {\n  margin-left: -13%; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/navbar/navbar.scss":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/navbar/navbar.scss ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, "nav {\n  background-color: white;\n  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.26); }\n\n#Aquitaine {\n  width: 200%; }\n\n.navbar-default {\n  background-color: #fff !important;\n  border-bottom-color: #a6ce39 !important; }\n\n#settings {\n  margin-top: 27px; }\n\n#logo {\n  width: 300px;\n  height: 112px; }\n\n#logo img {\n  width: 100%;\n  height: 100%; }\n\n.effect_fade {\n  opacity: 1;\n  /*Transition*/\n  -webkit-transition: all 0.5s ease;\n  -moz-transition: all 0.5s ease;\n  -o-transition: all 0.5s ease; }\n\n.effect_fade:hover {\n  opacity: 0.5;\n  /*Glow*/\n  -webkit-box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.8);\n  -moz-box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.8);\n  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.8); }\n\n.nav-container {\n  display: flex;\n  align-items: center;\n  justify-content: space-around; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/navbar/search-bar.scss":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/navbar/search-bar.scss ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".search-bar {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding-right: 10em;\n  padding-left: 10em;\n  position: relative; }\n\n.input {\n  width: 622px;\n  border-radius: 2px;\n  border: 1px solid white;\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);\n  transition: 0.3s;\n  height: 3em;\n  display: flex;\n  align-items: center; }\n\n.input input {\n  flex-grow: 1;\n  padding-left: 1em;\n  border: none; }\n\n.input span {\n  width: 5%;\n  color: #009900; }\n\n.search-result {\n  padding-left: 0;\n  position: absolute;\n  top: 97%;\n  width: 622px;\n  border-top: 1px solid #e1e1e1;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n  background-color: white; }\n\n.input input:focus {\n  outline: none !important; }\n\n.input:hover {\n  transition: 0.3s;\n  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3); }\n\n.list-box {\n  padding: 0;\n  list-style: none; }\n\n.list-box li {\n  line-height: 3em;\n  vertical-align: middle;\n  padding-left: 1em;\n  transition: 0.3s; }\n\n.list-box li:hover {\n  box-shadow: 0 0 2px 1px rgba(128, 128, 128, 0.26);\n  transition: 0.3s; }\n\n.list-box li:not(:first-child) {\n  border-top: 1px solid rgba(128, 128, 128, 0.26); }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/presentation/presentation.scss":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/presentation/presentation.scss ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".parallax {\n  background-image: url(" + __webpack_require__(/*! ../../images/poulet.jpg */ "./app/renderer/images/poulet.jpg") + ");\n  height: 20%;\n  background-attachment: fixed;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover; }\n\n.table-header {\n  text-transform: uppercase;\n  font-size: 12pt; }\n\n.table-number {\n  font-size: 14pt;\n  font-weight: bold; }\n\n.rzslider .rz-bubble {\n  color: #309f41;\n  font-size: 1em; }\n\n.rzslider .rz-bar {\n  background: #a6ce39; }\n\n.rzslider .rz-pointer {\n  background-color: #309f41; }\n\n.rzslider .rz-bubble.rz-limit {\n  color: rgba(48, 159, 65, 0.32); }\n\n.rzslider .rz-pointer.rz-active:after {\n  background-color: #a8cf3e; }\n\n.nav-pills > li.active > a, .nav-pills > li.active > a:focus, .nav-pills > li.active > a:hover {\n  color: #fff;\n  background-color: #a8cf3e !important; }\n\n.nav > li > a {\n  color: #309f41; }\n\n#sliderBatiment {\n  margin-top: 2%; }\n\n.highlight {\n  -moz-transition: all .2s ease-in;\n  -o-transition: all .2s ease-in;\n  -webkit-transition: all .2s ease-in;\n  transition: all .2s ease-in;\n  color: #a8cf3e;\n  padding: 20px; }\n\n.highlighted {\n  -moz-transition: all .2s ease-in;\n  -o-transition: all .2s ease-in;\n  -webkit-transition: all .2s ease-in;\n  transition: all .2s ease-in; }\n\n.affix {\n  top: 20px; }\n\n.tab-animation > .tab-content {\n  position: relative; }\n\n/* set animate effect */\n.tab-animation > .tab-content > .tab-pane {\n  transition: 0.4s linear opacity; }\n\n/* overwrite display: none and remove from document flow */\n.tab-animation > .tab-content > .tab-pane.active-remove {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  display: block; }\n\n/* opacity=0 when removing \"active\" class */\n.tab-animation > .tab-content > .tab-pane.active-remove-active {\n  opacity: 0; }\n\n/* opacity=0 when adding \"active\" class */\n.tab-animation > .tab-content > .tab-pane.active-add {\n  opacity: 0; }\n\n.table-hover > tbody > tr.no-hover-invest:hover {\n  background-color: white !important; }\n\n.insurance-cost-box {\n  max-width: 100px;\n  margin-left: 50px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/ribbon/ribbon.scss":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/ribbon/ribbon.scss ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, "/* ==========================================================================\nDevelopement Ribbon\n========================================================================== */\n.ribbon {\n  background-color: rgba(170, 0, 0, 0.78);\n  left: -3.5em;\n  -moz-transform: rotate(-45deg);\n  -ms-transform: rotate(-45deg);\n  -o-transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n  overflow: hidden;\n  position: fixed;\n  top: 40px;\n  white-space: nowrap;\n  width: 15em;\n  z-index: 1000000;\n  pointer-events: none;\n  opacity: 0.75; }\n  .ribbon a {\n    color: #fff;\n    display: block;\n    font-weight: bold;\n    margin: 1px 0;\n    padding: 10px 50px;\n    text-align: center;\n    text-decoration: none;\n    text-shadow: 0 0 5px #444;\n    pointer-events: none; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/sidebar/sidebar.scss":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/sidebar/sidebar.scss ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".sidenav {\n  height: 100%;\n  width: 0;\n  position: fixed;\n  z-index: 9000;\n  top: 0;\n  right: 0;\n  background-color: white;\n  overflow-x: hidden;\n  transition: 0.5s;\n  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.26); }\n\n.sidenav a {\n  padding: 8px 8px 8px 10px;\n  display: block;\n  transition: 0.3s; }\n\n.sidenav a:hover, .offcanvas a:focus {\n  color: #f1f1f1; }\n\n@media screen and (max-height: 450px) {\n  .sidenav {\n    padding-top: 15px; }\n  .sidenav a {\n    font-size: 18px; } }\n\n.big {\n  font-size: 3em; }\n\n#closeOffcanvas {\n  padding: 8px 8px 8px 32px;\n  text-decoration: none !important;\n  font-size: 25px;\n  color: #818181;\n  display: block;\n  transition: .3s; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/sync/google_loader.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/dist/cjs.js!./app/renderer/components/sync/google_loader.scss ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".modal-body {\n  background-color: white; }\n\n.showbox {\n  margin-top: 5%;\n  height: 20%; }\n\n.loader {\n  position: relative;\n  margin: 0 auto;\n  width: 100px; }\n  .loader:before {\n    content: '';\n    display: block;\n    padding-top: 100%; }\n\n.circular {\n  animation: rotate 2s linear infinite;\n  height: 100%;\n  transform-origin: center center;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto; }\n\n.path {\n  stroke-dasharray: 1, 200;\n  stroke-dashoffset: 0;\n  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;\n  stroke-linecap: round; }\n\n@keyframes rotate {\n  100% {\n    transform: rotate(360deg); } }\n\n@keyframes dash {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0; }\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px; }\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px; } }\n\n@keyframes color {\n  100%,\n  0% {\n    stroke: #d62d20; }\n  40% {\n    stroke: #0057e7; }\n  66% {\n    stroke: #008744; }\n  80%,\n  90% {\n    stroke: #ffa700; } }\n", ""]);

// exports


/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ })

/******/ });
//# sourceMappingURL=renderer.bundle.js.map