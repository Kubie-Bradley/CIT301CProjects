var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');
var Contact = require('../models/contact');

router.get('/', function (req, res, next) {
  Contact.find()
    .populate('group')
    .exec(function (err, contacts) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred getting the contacts',
          error: err
        });
      }
      res.status(200).json({
        contact: 'Contacts successfully retrieved',
        obj: contacts
      });
    });
});

router.post('/', function (req, res, next) {
  var maxContactId = sequenceGenerator.nextId("contacts");

  var contactIds = [];
  // for(var contact in req.body.group){
  //   contact.findOne
  // }

  var contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: contactIds
  });

  contact.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      contact: 'Saved contact',
      obj: result
    });
  });
});

router.patch('/:id', function (req, res, next) {
  Contact.findById(req.params.id, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {contact: 'Contact not found'}
      });
    }
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        contact: 'Updated contact',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Contact.findById(req.params.id, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {contact: 'Contact not found'}
      });
    }
    contact.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        contact: 'Deleted contact',
        obj: result
      });
    });
  });
});

module.exports = router;
