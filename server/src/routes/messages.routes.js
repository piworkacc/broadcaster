const express = require('express');

const router = express.Router();
const { Message, User } = require('../../db/models');

/* GET home page. */
router.get('/:stream_id', async (req, res, next) => {
  try {
    const chatMessages = await Message.findAll({
      include: { model: User, as: 'User' },
      where: {
        stream_id: req.params.stream_id,
      },
    });
    res.json(chatMessages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
