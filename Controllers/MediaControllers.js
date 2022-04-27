const Media = require("../models/media");
const Characters = require("../models/Personage");
const Gender = require("../models/genero");

// Creacion de pelicula/serie.

const mediaCreated = async (req, res) => {
  try {
    const newMedia = await Media.create({
      title: req.body.title,
      image: req.body.image,
      dateCreate: req.body.dateCreate,
      qualification: req.body.qualification,
      associatedCharacters: req.body.associatedCharacters,
    });
    if (!newMedia)
      res.status(500).json({ msg: "The username was not created" });

    res.status(201).json(newMedia);
  } catch (error) {
    res.status(404).json(error);
  }
};

//MEDIA DELETE

const mediaDelete = (req, res) => {
  try {
    const id = req.body.id;
    Media.destroy({ where: { id: id } }).then(
      res.status(200).json({
        msg: "media delete",
        success: true,
      })
    );
  } catch (error) {
    res.status(404).json(error);
  }
};
// edicion de media

const mediaEdits = async (req, res) => {
  const { title, image, dateCreate, qualification, associatedCharacters, id } =
    req.body;

  try {
    const mediaEdit = await Media.findByPk(id);

    title ? (mediaEdit.title = title) : (mediaEdit.title = mediaEdit.title);
    image ? (mediaEdit.image = image) : (mediaEdit.image = mediaEdit.image);
    dateCreate
      ? (mediaEdit.dateCreate = dateCreate)
      : (mediaEdit.dateCreate = mediaEdit.dateCreate);
    qualification
      ? (mediaEdit.qualification = qualification)
      : (mediaEdit.qualification = mediaEdit.qualification);
    associatedCharacters
      ? (mediaEdit.associatedCharacters = associatedCharacters)
      : (mediaEdit.associatedCharacters = mediaEdit.associatedCharacters);

    mediaEdit.save();

    res.status(200).json( mediaEdit );
  } catch (error) {
    res.status(404).json(error);
  }
};

//listado de peliculas
const listMovies = async (req, res) => {
  try {
    const medias = await Media.findAll();
    if (!medias)
      res.status(500).json({
        msg: "medias does not exist",
      });

    const listM = medias.map((media) => {
      return {
        image: media.image,
        title: media.title,
        dateCreate: media.dateCreate,
      };
    });
    res.status(200).json(listM);
  } catch (error) {
    res.status(404).json(error);
  }
};

// detalle pelicula

const movieDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Media.findByPk(id);

    if (!movie) res.status(500).json({ msg: "the movie does not exist" });

    let characters = movie.associatedCharacters.map((character) => {
      return Characters.findByPk(character);
    });
    const personaje = await Promise.all(characters);

    const result = {
      atributes: {
        title: movie.title,
        image: movie.image,
        dateCreate: movie.image,
        qualification: movie.qualification,
      },
      associatedCharacters: personaje,
    };

    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json(error);
  }
};

const mediaSearch = async (req, res) => {
  try {
    const name = req.query.name;
    const order = req.query.order;
    const genre = req.params.genre;

    if (name) {
      try {
        const media = await Media.findOne({
          where: { title: name },
        });
        if (!media)
          res.status(400).json({ msg: "This movie or series does not exist" });
        res.status(200).json(media);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    if (order) {
      const media = await Media.findAll();
      if (!media)
        res
          .status(400)
          .json({ msg: "there are no series or movies available" });

      if (order === "ASC") {
        let asc = media.sort((date1, date2) => {
          return new Date(date1.dateCreate) - new Date(date2.dateCreate);
        });
        res.status(200).json(asc);
      }
      if (order === "DESC") {
        let desc = media.sort((date1, date2) => {
          return new Date(date2.dateCreate) - new Date(date1.dateCreate);
        });
        res.status(200).json(desc);
      }
    }

    if (genre) {
      const gender = await Gender.findByPk(genre);
      
      let media = gender.associatedMedia.map((medias) => {
        return Media.findByPk(medias);
      });
      const medias = await Promise.all(media);

      res.status(200).json(medias);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  mediaCreated,
  mediaDelete,
  mediaEdits,
  listMovies,
  movieDetails,
  mediaSearch,
};
