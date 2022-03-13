const { db } = require('../../db');

exports.doPayment = async ({ job, client, contractor }) => {
  return await db.transaction(async (transaction) => {
    job.paid = true;
    job.paymentDate = Date.now();
    await job.save({ transaction });

    await client.decrement('balance', { by: job.price, transaction });
    await contractor.increment('balance', { by: job.price, transaction });
  });
};
