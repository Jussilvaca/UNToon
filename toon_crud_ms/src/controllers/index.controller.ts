import {Request,response,Response} from "express";
import { QueryResult } from "pg";

import { pool } from "../database";



export const getUsers = async(req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users');
        return res.status(200).json(response.rows);
    } 
    catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error');
    }
}

export const getUserbyId = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.json(response.rows);
}

export const createUser = async (req:Request, res:Response): Promise<Response> => {
    const {nickname,name,lastname,email,password,birthday} = req.body;

    const newemail: QueryResult = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
    if(newemail.rowCount != 0)
    {
        return res.json({
            message: 'This email is already in use'
        })
        
    }
    else
    {
        
        const response: QueryResult = await pool.query('INSERT INTO users (nickname, name, lastname, email, password, birthday) VALUES ($1, $2, $3, $4, $5, $6)', [nickname, name, lastname, email, password, birthday])
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
        })
      

    
    }
}


export const updateUser = async (req:Request, res:Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const {nickname, name,lastname, email, password, birthday} = req.body;

    await pool.query('UPDATE users SET nickname = $1, name = $2, lastname = $3, email = $4, password = $5, birthday = $6 WHERE id = $7', [nickname, name, lastname, email, password, birthday,id])
    return res.json(`User ${id} updated successfully`)
}

export const deleteUser = async (req:Request, res:Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users WHERE id = $1',[id]);
    return res.json(`User ${id} deleted successfully`);

} 



export const login = async (req:Request, res:Response): Promise<Response> => {
    const email = req.body.email;
    const password = req.body.password;
    const response: QueryResult = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2',[email, password]);
    if(response.rowCount == 0)
    {
        return res.json(`User not found`);
    }
    else
    {
        return res.json(response.rows);
    }
}

