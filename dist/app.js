'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(function(resolve) {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
Object.defineProperty(exports, '__esModule', { value: true });
// tslint: disable - next - line
require('dotenv').config();
const services_1 = require('./services');
(() =>
    __awaiter(this, void 0, void 0, function*() {
        console.log('app start');
        const { GIT_HUB_REPONAME, GIT_HUB_USERNAME } = process.env;
        const gh = new services_1.GitHubService(GIT_HUB_USERNAME, GIT_HUB_REPONAME);
        const repoInfo = yield gh.getRepoInfo();
        const { owner } = repoInfo;
        console.log(owner.id);
    }))();
//# sourceMappingURL=app.js.map
