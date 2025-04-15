const express = require ('express');
const helmet = require ('helmet');
const rateLimit = require ('express-rate-Limit');
const cors = require ('cors');
const bodyParser = require ('body-Parser');
const xss = require ('xss-clean'); //pour nettoyer les inputs
const mongoSanitize = require ('express-mongo-sanitize');

const app = express ();

//utiliser helmet pour configurer des en-tetes HTTP sécurisés
app.use(helmet());

// configure cors de manière restreinte
app.use(cors({
  origin: 'https://siteweb.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

//limiter le nombre de requete pour eviter d'attaque Dos
const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000, // 15 minutes
  max: 100, //limite chaque IP à 10 requete par fenetre
});
app.use(limiter);

//Parser le corps des requetes
app.use(bodyParser.json());

//proteger contre les attaques xss
app.use(xss());

//proteger contre noSQL injection
app.use(mongoSanitize());

//endpoint sécurisé
app.post('/api/users', async(req,res) =>{
  //recuperer la liste des produits depuis la BDD
  res.json([{ id: 1, name: 'T-shirt'}, {id:2, name: 'Casquette'}]);
});

//exemple endpoint pour créer un utilisateur
app.post 
