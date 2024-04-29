export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface TwoFARequest {
    code: number;
}

export interface RegisterRequest {
    email: string;
    name: string;
    surname: string;
    date_of_birth: string;
    password: string;
}


export interface CheckRequest {
    code: number;
}