const joi = require("joi");
// const event = require("./models/event");

module.exports.eventSchema = joi.object({
  event: joi
    .object({
      name: joi.string().required(),
      shortdescription: joi.string().required(),
      fulldescription: joi.string().required(),
      rule: joi.string().required(),
      coordinator_name: joi.string().required(),
      teacher_name: joi.string().required(),
      image: joi.string().required(),
      register_link: joi.string().required(),
      date: joi.string().required(),
      time: joi.string().required(),
    })
    .required(),
});
