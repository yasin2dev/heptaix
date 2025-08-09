import { Router } from "express";


const categoriesRouter = Router();


categoriesRouter.post("/create", async (req, res) => {
    // Logic to create a new category
    res.status(201).send({ message: "Category created successfully" });
});

export default categoriesRouter;