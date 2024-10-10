'use strict'

const vet = require('../seeds/task');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Tasks", vet("Tasks"), {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Tasks', null, {})
    }
};