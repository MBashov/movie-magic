import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {

    const userData = req.body;

    await authService.register(userData);

    res.redirect('/');
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        console.log(token);
        
    } catch (error) {
        console.log(error.message);
        return res.redirect('/404');
    }

    res.redirect('/');
});

export default authController;