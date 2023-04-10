const express = require('express');

const app = express();

//testing samples json
let xReq = `{
    "first_name": {
        "value": "12345",
        "rules": "alpha|required"
    },
    "last_name": {
        "value": "Doe",
        "rules": "alpha|required"
    },
    "email": {
        "value": "Doe",
        "rules": "email"
    },
    "phone": {
        "value": "08175020329",
        "rules": "numbers"
    }
}`


//validate middleware
const validate = (req, res, next) => {
    let errorExists = false;
    let errors = {};
  
    for (key in req.body) {
      let value = req.body[key].value;
      let rules = req.body[key].rules ? req.body[key].rules.split("|") : [];
  
      let errs = [];
      rules.forEach(rule => {
        let result = check(key, value, rule);
        if (result) {
          errs.push(result);
        }
      });
  
      if (errs.length) {
        errorExists = true;
        errors[key] = errs;
      }
    }
  
    if (errorExists) {
      res.status(400).json({
        "message": "Error validating payload",
        errors
      });
      return;
    }
  
    next();
  };
  
  //check function for the rules
  function check(key, val, rule) {
    switch (rule) {
      case "required":
        if (!isRequired(val)) {
          return `The ${key} is required`
        }
        return "";
      case "email":
        if (!isEmail(val)) {
          return `The ${key} must be a valid email`
        }
        return "";
      case "number":
        if (!isNumber(val)) {
          return `The ${key} must be a number`
        }
        return "";
      case "alpha":
        if (!isAlpha(val)) {
          return `The ${key} must contain only alphabets`
        }
        return "";
      default:
        return "";
    }
  }
  
  //check for required fields
  function isRequired(val) {
    return val ? true : false;
  }
  
  //check for alphabet fields
  function isAlpha(val) {
    const alpha = /^[A-Za-z\s]+$/;
    return alpha.test(val);
  }
  
  //check for email fields
  function isEmail(val) {
    const email =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return email.test(val);
  }
    
  //check for number fields
  function isNumber(val) {
    const number = /^-?\d*(\.\d+)?$/;
    return number.test(val);
  }

module.exports = { validate };