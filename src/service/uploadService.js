import multer from "multer";
import __dirname from "../utils.js";

const storage = multer.diskStorage({
  //Aquí va el QUÉ, el CÓMO y el DÓNDE se guarda
  destination: function (req, file, callback) {
    return callback(null, `${__dirname}/public/img`);
  },
  filename: function (req, file, callback) {
    return callback(null, `${Date.now()}-${file.originalname}`);
  },
});

//Ya tengo el almacenamiento, ahora sí, el uploader (Cargador)

const uploader = multer({ storage });

export default uploader;
