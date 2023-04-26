const { User } = require("../models");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");
const v = new Validator();
const { JWT_SECRET_KEY } = process.env;
