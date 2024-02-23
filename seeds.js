const mongoose = require('mongoose');
const { Post, User, Comment } = require('./models.js');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://Rahul:Vid24Siv@myfirstcluster.gmr3a.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function () {
    console.log('Database connected');
    // Call the seed function after successfully connecting
    seed()
      .then(() => {
        console.log('Seeding completed');
      })
      .catch(err => {
        console.error('Seeding error:', err);
      })
      .finally(() => {
        // Close the MongoDB connection
        mongoose.connection.close();
      });
  })
  .catch(function (err) {
    console.error(err);
  });

async function seed() {
  try {
    await Post.deleteMany({});
    // const post1 = new Post({
    //   title: "Dog",
    //   content: "Go watch death note",
    //   likes: 69,
    //   comments: []
    // });
    // await post1.save();

    // const post2 = new Post({
    //   title: "Engineering Wablics",
    //   content: "Games should be written in C",
    //   likes: 0,
    //   comments: []
    // });
    // await post2.save();

    // const post3 = new Post({
    //   title: "Tooppperrsszzz",
    //   content: "Go to room 511",
    //   likes: 420,
    //   comments: []
    // });

    // await post3.save();
  } catch (error) {
    console.error('Seeding error:', error);
  }
}