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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserbyId = exports.getUsers = void 0;
const database_1 = require("../database");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM users');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.getUsers = getUsers;
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.json(response.rows);
});
exports.getUserbyId = getUserbyId;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, name, lastname, email, password, birthday } = req.body;
    const newemail = yield database_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (newemail.rowCount != 0) {
        return res.json({
            message: 'This email is already in use'
        });
    }
    else {
        const response = yield database_1.pool.query('INSERT INTO users (nickname, name, lastname, email, password, birthday) VALUES ($1, $2, $3, $4, $5, $6)', [nickname, name, lastname, email, password, birthday]);
        return res.json({
            message: 'User created successfully',
            body: {
                nickname,
                name,
                lastname,
                email,
                password,
                birthday
            }
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nickname, name, lastname, email, password, birthday } = req.body;
    yield database_1.pool.query('UPDATE users SET nickname = $1, name = $2, lastname = $3, email = $4, password = $5, birthday = $6 WHERE id = $7', [nickname, name, lastname, email, password, birthday, id]);
    return res.json(`User ${id} updated successfully`);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield database_1.pool.query('DELETE FROM users WHERE id = $1', [id]);
    return res.json(`User ${id} deleted successfully`);
});
exports.deleteUser = deleteUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const response = yield database_1.pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (response.rowCount == 0) {
        return res.json(`User not found`);
    }
    else {
        return res.json(response.rows);
    }
});
exports.login = login;
