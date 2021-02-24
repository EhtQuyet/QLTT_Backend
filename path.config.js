System.config({
  'paths': {
    // file
    '@constants': './app/constants/CONSTANTS.js',
    '@url': './app/constants/URL.js',
    '@api': './app/constants/API.js',
    '@injectSaga': './app/utils/injectSaga.js',
    '@injectReducer': './app/utils/injectReducer.js',

    // folder
    '@commons/*': './app/commons/*',
    '@containers/*': './app/containers/*',
    'Pages/*': './app/containers/Pages/*',
    '@assets/*': './app/assets/*',
    '@services/*': './app/services/*',
    '@reduxApp/*': './app/reduxApp/*',
    '@components/*': './app/components/*',
    '@models/*': './app/models/*',
  },
});
