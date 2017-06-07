/**
 * Здесь настраиваем роутеры, разделяем на файлы
 *
 */
module.exports = function (app) {
    app.use('/', require('./authrouter'));

    app.use('/', require('./marketRouter'));
    app.use('/', require('./siteRouter'));





};