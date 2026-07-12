import { log } from "node:console";

export function register(userData) {
    log('Registering user:', userData);
}

const authService = {
    register,
};

export default authService;