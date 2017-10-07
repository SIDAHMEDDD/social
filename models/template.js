var mongoose = require('mongoose');

var TemplateSchema = mongoose.Schema({
  name: {
    type: String
  },
  category: {
    type: String
  },
  pictureLink: {
    type: String
  },
  downloadRank: {
    type: Number
  },
  downloadLink: {
    type: String
  },
  uploadedBy: {
    type: String
  },
  previewLink: {
    type: String
  },
  language: {
    type: String
  },
  features: {
    type: String
  },
  software: {
    type: String
  },
  Temptype: {
    type: String
  },
  tag1: {
    type: String
  },
  tag2: {
      type: String
  },
  tag3: {
      type: String
  },
  tag4: {
      type: String
  },
  tag5: {
      type: String
  },
  tag6: {
      type: String
  },
  planguages: {
    type: String
  },
  requiredcpu: {
    type: String
  },
  requiredram: {
      type: String
  },
  requiredgraphics: {
      type: String
  },
  requiredos: {
      type: String
  }
});


var Template = module.exports = mongoose.model('Template', TemplateSchema);
