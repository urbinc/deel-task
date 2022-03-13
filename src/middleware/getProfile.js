const { Profiles } = require('../repositories/profiles');
const { AppError } = require('../errors/AppError');

exports.getProfile = async (req, res, next) => {
  const profileId = req.get('profile_id');

  if (!profileId) {
    return next(new AppError(400, 'Missing porfile_id header'));
  }

  const profile = await Profiles.getById(profileId);

  if (!profile) {
    return next(new AppError(401, 'User does not exist'));
  }

  req.profile = profile;

  return next();
};
