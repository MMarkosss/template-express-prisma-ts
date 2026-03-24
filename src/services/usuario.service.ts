import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Pegamos a URL de conexão do ambiente
const connectionString = process.env.DATABASE_URL as string;

// 2. Instanciamos o Adaptador específico do Postgres
const adapter = new PrismaPg({ connectionString });

// 3. Injetamos o Adaptador no Prisma Client (Exigência absoluta do Prisma v7)
const prisma = new PrismaClient({ adapter });

export class UsuarioService {
    // ... os seus métodos (como o de salvar usuário) continuam normais aqui
}

export const criarUsuario = async (email: string) => {
    return await prisma.usuario.create({
        data: { email }
    });
};

export const listarUsuarios = async () => {
    return await prisma.usuario.findMany();
};