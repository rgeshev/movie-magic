import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";
import { generateAuthToken } from "../utils/tokenUtils.js";

export async function register(userData) {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    const createdUser = await userRepository.create({
        ...userData,
        password: hashPassword, 
    });

    const token = generateAuthToken(createdUser);

    return result;
}

export async function login(userData) {
    const user = await userRepository.findByEmail(userData.email);

    if (!user) {
        throw new Error("User not found");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(userData.password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = generateAuthToken(user);

    return token;
}

const authService = {
    register,
    login,
};

export default authService;