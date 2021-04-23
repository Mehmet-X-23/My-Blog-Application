import express from "express";
import {getPosts} from "../controller/blogPosts.js";

const router = express.Router();

router.get("/" , getPosts)

export default router;
