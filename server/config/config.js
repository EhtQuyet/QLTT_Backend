const config = {

  development: {
    secret: 'AIBOLIT',

    // MONGO_URI: 'mongodb+srv://hbien1999:1@cluster0.rhmeb.mongodb.net/NCKH?retryWrites=true&w=majority',
    MONGO_URI: 'mongodb://hbien1999:1@cluster0-shard-00-00.rhmeb.mongodb.net:27017,cluster0-shard-00-01.rhmeb.mongodb.net:27017,cluster0-shard-00-02.rhmeb.mongodb.net:27017/NCKH?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    port: 27017,
    'cos': {
      'credentials': {
        'serviceInstanceId': 'crn:v1:bluemix:public:cloud-object-storage:global:a/c8892a299ea04a629bf4ed7f5ed8a5b1:cbf00124-96fd-48d5-be8f-f195a70420b2::',
        'endpoint': 'https://s3.ap.cloud-object-storage.appdomain.cloud',
        'apiKeyId': 'rki429NHwsuGE2zwKLWdgDUoJvK7EJtrpdrXCG0-wPSV',
        'ibmAuthEndpoint': 'https://iam.ng.bluemix.net/oidc/token',
      },
      'bucketName': 'aibolit-collect',
    },
  },
};


export const getConfig = env => config[env] || config.development;
