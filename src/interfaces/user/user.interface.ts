export interface UserResponse {
    refresh: string
    access: string
    user: string
    id: number
    role: string
    name: string
    repo_login: boolean
    status: boolean
    two_factor: boolean
}

export interface User {
    email?: string
    name?: string
    full_name?: string
    surname?: string
    two_factor?: boolean
    repo_login?: boolean
    message?: string
    status?: boolean
    user_github?: string
}
  
export interface RegisterResponse {
    name: string
    status: boolean
    message: string
  }

export interface ResetPasswordRequest {
    code: string
    password: string
  }
  