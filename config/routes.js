/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'post /category/add' : 'TestController.add',
  'post /item/add' : 'TestController.itemadd',
  'get /category/show' : 'TestController.categoryshow',
  'get /item/show' : 'TestController.itemshow',
  'get /item/shows' : 'TestController.itemshows',
  'post /login' : 'TestController.login',
  'post /loginadd' : 'TestController.login',
  'get /logout' : 'TestController.logout',
  'post /login/add' : 'TestController.loginadd',
  'post /category/delete/:id' : 'TestController.delete',
  'get /category/update/:id' : 'TestController.edit',
  'post /item/update/:id' : 'TestController.update',
  'post /category/search' : 'TestController.search'


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
