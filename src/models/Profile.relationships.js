const { Contract } = require('./Contract.model');
const { Profile } = require('./Profile.model');

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
