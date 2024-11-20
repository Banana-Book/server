const Post = require("../models/Post.model");
const debug = require("debug")("app:post-controller");
const sendEmail = require("../utils/email");

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

controller.sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    //Enviar email
    await sendEmail(to, subject, text);

    res.status(200).json({ message: "Email enviado" });
  } catch (error) {
    debug({ error });
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
      "name lastName email"
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

controller.filterByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    const posts = await Post.find({ title: RegExp(title, "i") }).populate(
      "user",
      "name lastName"
    );

    if (posts.length === 0) {
      return res.status(404).json({ error: "No se encontraron posts" });
    }

    res.status(200).json(posts);
  } catch (error) {
    debug({ error });
    res.status(500).json({ error: "Error interno de servidor" });
  }
};

controller.delete = async (req, res) => {
  try {
    const { identifier } = req.params;
    const { _id: userID } = req.user;

    const post = await Post.findById(identifier);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    if (post.user.toString() !== userID.toString()) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para actualizar este post" });
    }

    const deletedPost = await Post.findByIdAndDelete(identifier);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.status(200).json(deletedPost);
  } catch (error) {
    debug({ error });
    res.status(500).json({ error: "Error interno de servidor" });
  }
};

controller.filterByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Post.find({ category: RegExp(category, "i") }).populate(
      "user",
      "name lastName"
    );
    if (posts.length === 0) {
      return res.status(404).json({ error: "No se encontraron posts" });
    }

    res.status(200).json(posts);
  } catch (error) {
    debug({ error });
    res.status(500).json({ error: "Error interno de servidor" });
  }
};

controller.update = async (req, res) => {
  try {
    const { identifier } = req.params;
    const { title, price, description, category, condition, image } = req.body;
    const updateFields = {};
    if (title) updateFields.title = title;
    if (price) updateFields.price = price;
    if (description) updateFields.description = description;
    if (category) updateFields.category = category;
    if (condition) updateFields.condition = condition;
    if (image) updateFields.image = image;

    const { _id: userID } = req.user;
    const post = await Post.findById(identifier);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    if (post.user.toString() !== userID.toString()) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para actualizar este post" });
    }

    const updatedPost = await Post.findByIdAndUpdate(identifier, updateFields, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    debug({ error });
    res.status(500).json({ error: "Error interno de servidor" });
  }
};

controller.findByUser = async (req, res) => {
  try {
    const { identifier } = req.params;
    const posts = await Post.find({ user: identifier }).populate(
      "user",
      "name lastName"
    );

    if (posts.length === 0) {
      return res.status(404).json({ error: "No se encontraron posts" });
    }

    res.status(200).json(posts);
  } catch (error) {
    debug({ error });
    res.status(500).json({ error: "Error interno de servidor" });
  }
};

module.exports = controller;
