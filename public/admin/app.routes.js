/**
 * Created by Admin on 29.09.2016.
 */



app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');

  $stateProvider


      .state('main', {
        url: '/main',
        view: {

          templateUrl: 'main.html'

        }

      })



      .state('marketplace', {
        url: '/marketplace',
        templateUrl: 'components/marketplace/marketplace.html'
      })

      .state('footer', {
        url: '/footer',
        templateUrl: 'components/footer/footer.html'
      })

      .state('clients', {
        url: '/clients',
        templateUrl: 'components/clients/client.html'
      })

});