import { Router } from "express";

const artistController = Router();

artistController.get("/create", (req, res) => {
    res.render("artists/create");
});

artistController.post("/create", (req, res) => {
    const artistData = req.body;

    res.redirect('/');
});

export default artistController;