/**
 * Test.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const mongoose = require('mongoose')
module.exports = {
   
   //create the user table in the database
   tableName: 'login',
   attributes: {
      username: {
         type: 'string',
         required : true 
      },
      password: {
         type: 'string'
      }
   }
   //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
   //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
   //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


   //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
   //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
   //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


   //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
   //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
   //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

}


