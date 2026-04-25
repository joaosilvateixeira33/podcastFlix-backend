import { HttpResponse } from "../models/http-response-model";

export const ok = async (data: any): Promise<HttpResponse> => {
    return {
        statusCode: 200,
        body: data
    };
};

export const created = async (data: any): Promise<HttpResponse> => {
    return {
        statusCode: 201,
        body: data
    };
};

export const noContent = async (): Promise<HttpResponse> => {
    return {
        statusCode: 204,
        body: null
    };
};

export const badRequest = async (error: Error | string): Promise<HttpResponse> => {
    return {
        statusCode: 400,
        body: {
            message: error instanceof Error ? error.message : error
        }
    };
};

export const unauthorized = async (message: string = "Unauthorized access"): Promise<HttpResponse> => {
    return {
        statusCode: 401,
        body: {
            message
        }
    };
};

export const forbidden = async (message: string = "Access denied"): Promise<HttpResponse> => {
    return {
        statusCode: 403,
        body: {
            message
        }
    };
};

export const notFound = async (resource?: string): Promise<HttpResponse> => {
    return {
        statusCode: 404,
        body: {
            message: `${resource || "Resource"} not found.`
        }
    };
};

export const conflict = async (message: string): Promise<HttpResponse> => {
    return {
        statusCode: 409,
        body: {
            message
        }
    };
};

export const serverError = async (error: unknown): Promise<HttpResponse> => {
    return {
        statusCode: 500,
        body: {
            error: "Internal Server Error",
            message: error instanceof Error ? error.message : "An unexpected error occurred."
        }
    };
};