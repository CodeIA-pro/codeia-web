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
  
export interface RegisterResponse {
    name: string
    status: boolean
    message: string
  }

export interface ResetPasswordRequest {
    code: string
    password: string
  }
  