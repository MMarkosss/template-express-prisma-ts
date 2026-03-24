import type { Request, Response } from 'express';
import * as UsuarioService from '../services/usuario.service';


export const criar = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const novoUsuario = await UsuarioService.criarUsuario(email);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar usuário" });
    }
};

export const listar = async (req: Request, res: Response) => {
    try {
        const usuarios = await UsuarioService.listarUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar usuários" });
    }
};