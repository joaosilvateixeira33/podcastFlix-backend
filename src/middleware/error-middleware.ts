import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    res.status(500).json({
        error: "Ocorreu um erro interno no servidor.",
        message: err.message
    });
};