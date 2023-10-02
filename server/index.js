"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("./models/User");
var database_1 = require("./common/database/database");
var multer_1 = require("multer");
// const express = require('express');
var cors = require('cors');
// const mongoose = require('mongoose');
// const app = express();
var bcrypt = require('bcrypt');
// const cors = require('./config/cors');
var jwt = require('jsonwebtoken');
var port = 4000;
var salt = bcrypt.genSaltSync(10);
var secret = 'LKddf(83*hNd4&92(KEFOKJLB3&*23';
var cookieParser = require('cookie-parser');
var upload = (0, multer_1.default)({ dest: 'uploads/' });
var BlogAPI = /** @class */ (function () {
    function BlogAPI() {
        this.app = (0, express_1.default)();
        this.setupRoutes();
    }
    BlogAPI.prototype.setupRoutes = function () {
        (0, database_1.connectToDB)();
        this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
        this.app.use(express_1.default.json());
        this.app.use(cookieParser());
        // Bind the method to the class instance
        this.app.post('/register', this.registerUser.bind(this));
        this.app.post('/login', this.loginUser.bind(this));
        this.app.post('/logout', this.logoutUser.bind(this));
        this.app.post('/write', upload.single('file'), this.writeNewBlog.bind(this));
        this.app.get('/profile', this.getProfile.bind(this));
        this.app.listen(port, function () {
            console.log("Server is running on port: ".concat(port));
        });
    };
    BlogAPI.prototype.registerUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, userData, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, username = _a.username, password = _a.password;
                        return [4 /*yield*/, User_1.default.create({ username: username, password: bcrypt.hashSync(password, salt) })];
                    case 1:
                        userData = _b.sent();
                        res.json(userData);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _b.sent();
                        console.error("Error while registering: ", ex_1);
                        res.status(500).json({ error: "Interval server error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    BlogAPI.prototype.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, userID, pass;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        return [4 /*yield*/, User_1.default.findOne({ username: username })];
                    case 1:
                        userID = _b.sent();
                        if (!userID) {
                            // User with the provided username was not found
                            return [2 /*return*/, res.status(400).json('Wrong credentials')];
                        }
                        pass = bcrypt.compareSync(password, userID.password);
                        if (pass) {
                            // Logged in
                            jwt.sign({ username: username, id: userID._id }, secret, {}, function (ex, token) {
                                if (ex)
                                    throw ex;
                                res.cookie('token', token).json({
                                    id: userID._id,
                                    username: username
                                });
                            });
                        }
                        else {
                            res.status(400).json('Wrong credentials');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogAPI.prototype.getProfile = function (req, res) {
        var token = req.cookies.token;
        jwt.verify(token, secret, {}, function (err, info) {
            if (err)
                throw err;
            res.json(info);
        });
        res.json(req.cookies);
    };
    BlogAPI.prototype.logoutUser = function (req, res) {
        res.cookie('token', '').json('ok');
    };
    BlogAPI.prototype.writeNewBlog = function (req, res) {
        res.json('ok');
        // req.file;
        // const uploadedFile = req.file;
        /**
         * Add this line if TS is having issues:
              npm install express @types/express multer @types/multer

         */
    };
    return BlogAPI;
}());
var startSession = new BlogAPI();
