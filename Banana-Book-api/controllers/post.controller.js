const Post = require("../models/Post.model");
const debug = require("debug")("app:post-controller");

const controller = {};

controller.create = async (req, res) => {
  try {
    const { title, price, description, category, condition, image } = req.body;
    const { _id: userID } = req.user;

    //Validación de los campos
    const post = new Post({
      title: title,
      price: price,
      description: description,
      category: category,
      condition: condition,
      image: image,
      user: userID,
    });

    const newPost = await post.save();

    if (!newPost) {
      return res.status(409).json({ error: "No se pudo crear el post" });
    }

    res.status(201).json(newPost);
  } catch (error) {
    debug(error);
    res.status(500).json({ error: "Error interno de servidor" });
  }
};

controller.findAll = async (req, res) => {
  try {
    const posts = await Post.find({ hidden: false }).populate(
      "user",
      "name lastName"
    );
    return res.status(200).json({ posts });
  } catch (error) {
    debug({ error });
    res.status(500).json({ error: "Error interno de servidor" });
  }
};

controller.findOneByID = async (req, res) => {
  try {
    const { identifier } = req.params;

    const post = await Post.findById(identifier).populate(
      "user",
      "name lastName"
    );

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.status(200).json(post);
  } catch (error) {
    debug({ error });
    res.status(500).json({ error: "Error interno de servidor" });
  }
};

module.exports = controller;
