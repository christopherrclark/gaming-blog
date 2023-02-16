const router = require('express').Router();
const express = require('express');


router.get('/', async (req, res) => {
  console.log("games route working")
  try {
    res.render("games") 
} catch {
    console.log(err);
    res.status(500).json(err);
}
})

module.exports = router;