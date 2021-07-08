"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lzutf8 = require("lzutf8");
const TesseractDataResolver_1 = require("./TesseractDataResolver");
class TesseractClientUtils {
    constructor(client) {
        this.client = client;
        this.resolver = new TesseractDataResolver_1.default(this.client);
    }
    compressString(string) {
        return new Promise((resolve, reject) => {
            lzutf8.compressAsync(string.toString(), { outputEncoding: "StorageBinaryString" }, (res, err) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    }
    decompressString(string) {
        return new Promise((resolve, reject) => {
            lzutf8.decompressAsync(string.toString(), { inputEncoding: "StorageBinaryString" }, (res, err) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    }
    fetchMember(guild, id, cache = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.client.fetchUser(id, cache);
            return guild.fetchMember(user, cache);
        });
    }
}
exports.default = TesseractClientUtils;
;
//# sourceMappingURL=TesseractClientUtils.js.map