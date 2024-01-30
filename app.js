const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const validationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .messages({
        "string.pattern.base":
          "Password must contain at least one alphabet, one number, one special character, and be at least 8 characters long.",
      }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res
      .status(400)
      .json({ error: error.details.map((detail) => detail.message) });
  } else {
    next();
  }
};

app.post("/", validationMiddleware, (req, res) => {
  res.send("done resopnse");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
