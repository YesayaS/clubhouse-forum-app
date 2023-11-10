const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String },
  post_date: { type: Date, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

PostSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.post_date).toFormat("dd-MM-yy"); // format 'YYYY-MM-DD'
});

// PostSchema.virtual("auth_username").get(function () {
//   return DateTime.fromJSDate(this.post_date).toFormat("dd-MM-yy"); // format 'YYYY-MM-DD'
// });

// Virtual for bookinstance's URL
PostSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/post/${this._id}`;
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
