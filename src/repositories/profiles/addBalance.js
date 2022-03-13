exports.addBalance = async (profile, amount) => {
  return await profile.increment('balance', { by: amount });
};
