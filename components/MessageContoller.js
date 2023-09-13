import MessageModel from '../models/Message.js';

export const getAllMessage = async (req, res) => {
  try {
    const messages = await MessageModel.find().populate('user').exec();

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not get the messages',
    });
  }
};

// export const getOne = async (req, res) => {
//   try {
//     const messageId = req.params.id;

//     PostModel.findOneAndUpdate(
//       {
//         _id: postId,
//       },
//       {
//         $inc: { viewsCount: 1 },
//       },
//       {
//         returnDocument: 'after',
//       }
//     )
//       .populate('user')
//       .exec()
//       .then((doc) => {
//         if (!doc) {
//           return res.status(404).json({
//             message: 'Article not found',
//           });
//         }
//         res.json(doc);
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json({
//           message: 'Could not get the article',
//         });
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: 'Could not get the article',
//     });
//   }
// };

export const createMessage = async (req, res) => {
  try {
    const doc = new MessageModel({
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const message = await doc.save();
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not create message',
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;

    await MessageModel.findOneAndDelete({
      _id: messageId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Message not found',
          });
        }
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'Could not reamove the message',
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not remove the message',
    });
  }
};

export const editMessage = async (req, res) => {
  try {
    const messageId = req.params.id;

    await MessageModel.findOneAndUpdate(
      {
        _id: messageId,
      },
      {
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not update the message',
    });
  }
};
