var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');
var Message = require('../models/message');
var Contact = require('../models/contact');

router.get('/', function (req, res, next) {
  Message.find()
    .populate('sender')
    .exec(function (err, messages) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred getting messages',
          error: err
        });
      }
      res.status(200).json({
        message: 'Messages succesfully retrieved',
        obj: messages
      });
    });
});

router.post('/', function (req, res, next) {
  var maxMessageId = sequenceGenerator.nextId("messages");

  Contact.findOne({'id': req.body.sender.id}, {'_id': 1}, function (err, contactId) {
    if (err) {
      return res.status(500).json({
        title: 'Invalid sender - sender not found',
        error: err
      });
    }

    if (!contactId) {
      return res.status(500).json({
        title: 'Invalid sender - sender not found',
        error: err
      });
    }


    var message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      text: req.body.text,
      sender: contactId
    });
    message.save(function (err, result) {
      res.setHeader('Content-type', 'application/json');
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
    });
  });
});


router.patch('/:id', function (req, res, next) {
  Message.findById(req.params.id, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }
    message.msgText = req.body.msgText;
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Message.findById(req.params.id, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }
    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
    });
  });
});

module.exports = router;
