const Skill = require('./../models/skillModel');
const Category = require('./../models/categoryModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createSkill = catchAsync(async (req, res, next) => {
  const categories = [];
  if (!req.body.categories) {
    return next(new AppError('Please send categories field', 400));
  }
  for (let i = 0; i < req.body.categories.length; i += 1) {
    categories.push(
      // eslint-disable-next-line no-await-in-loop
      await Category.findOne({ name: req.body.categories[i] })
    );
  }

  const skill = await Skill.create({
    name: req.body.name,
    categories: categories
  });
  res.status(201).json({
    status: 'success',
    data: skill
  });
});
exports.getAllSkills = factory.getAll(Skill);

exports.getCategorySkills = catchAsync(async (req, res, next) => {
  const categoryId = req.params.id;
  const skills = await Skill.find({ categories: categoryId });
  res.status(200).json({
    status: 'success',
    data: skills
  });
});

exports.deleteSkill = factory.deleteOne(Skill);
