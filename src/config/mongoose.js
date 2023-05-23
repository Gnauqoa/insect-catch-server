const database = process.env.DATABASE_URL;

const configMongoose = (mongoose) => {
  mongoose.set("strictQuery", false); // hide notify in console
  mongoose
    .connect(database)
    .then((result) => {
      console.log(`connect database with url: ${database}`);
    })
    .catch((err) => console.log(err));
};
export default configMongoose;
