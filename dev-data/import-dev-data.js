const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./../models/userModel');
const Job = require('./../models/jobModel');
const Proposal = require('./../models/proposalModel');
const Skill = require('./../models/skillModel');
const Category = require('./../models/categoryModel');

dotenv.config({ path: './config.env' });

const DB = 'mongodb+srv://omar:omar@cluster0.9tnky.mongodb.net/test';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const jobs = JSON.parse(fs.readFileSync(`${__dirname}/jobs.json`, 'utf-8'));
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/categories.json`, 'utf-8')
);
const skills = JSON.parse(fs.readFileSync(`${__dirname}/skills.json`, 'utf-8'));
const proposals = JSON.parse(
  fs.readFileSync(`${__dirname}/proposals.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData1 = async () => {
  try {
    await Job.create(jobs);
    await User.create(users, { validateBeforeSave: false });
    await Category.create(categories);
    const Jobs = await Job.find();
    fs.writeFileSync(`${__dirname}/jobs.json`, JSON.stringify(Jobs), 'utf-8');
    const Categories = await Category.find();
    fs.writeFileSync(
      `${__dirname}/categories.json`,
      JSON.stringify(Categories),
      'utf-8'
    );
    console.log('Round One Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// IMPORT DATA INTO DB
const importData2 = async () => {
  try {
    await Proposal.create(proposals);
    await Skill.create(skills);
    console.log('Round Two Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM DB
const deleteData1 = async () => {
  try {
    await Job.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    console.log('Round One Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM DB
const deleteData2 = async () => {
  try {
    await Skill.deleteMany();
    await Proposal.deleteMany();
    console.log('Round Two Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  if (process.argv[3] === '1') {
    importData1();
  } else {
    importData2();
  }
} else if (process.argv[2] === '--delete') {
  if (process.argv[3] === '1') {
    deleteData1();
  } else {
    deleteData2();
  }
}
