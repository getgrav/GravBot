"use strict";
/*!
 * @file The starting point of Tesseract, exposing the framework.
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Constants = require("./utils/Constants");
exports.Constants = Constants;
const TesseractClient_1 = require("./structures/TesseractClient");
exports.Client = TesseractClient_1.default;
const discord_js_1 = require("discord.js");
exports.Shard = discord_js_1.Shard;
exports.ShardClientUtil = discord_js_1.ShardClientUtil;
exports.ShardingManager = discord_js_1.ShardingManager;
exports.WebhookClient = discord_js_1.WebhookClient;
exports.Collection = discord_js_1.Collection;
exports.Permissions = discord_js_1.Permissions;
exports.SnowflakeUtil = discord_js_1.SnowflakeUtil;
exports.Util = discord_js_1.Util;
//# sourceMappingURL=Tesseract.js.map