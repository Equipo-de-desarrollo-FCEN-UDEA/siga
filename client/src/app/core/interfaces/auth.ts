export interface Auth {
    username: string;
    password: string;
}

export interface Token {
    access_token: string;
    token_type: string;
    expires: number;
}