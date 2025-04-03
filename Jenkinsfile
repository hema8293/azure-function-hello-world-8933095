pipeline {
  agent any

  environment {
    AZURE_CLIENT_ID = credentials('azure-client-id')
    AZURE_CLIENT_SECRET = credentials('azure-client-secret')
    AZURE_TENANT_ID = credentials('azure-tenant-id')
    AZURE_SUBSCRIPTION_ID = '919dde06-713d-458a-a28f-5e2d36f69dbb'  // your subscription
    FUNCTIONAPP_NAME = 'hello-world-func-8933095'  // update if needed
    RESOURCE_GROUP = 'your-resource-group-name'    // update with your RG name
  }

  stages {
    stage('Build') {
      steps {
        echo 'Installing dependencies...'
        bat 'npm install' // use `bat` instead of `sh` for Windows
      }
    }

    stage('Test') {
      steps {
        echo 'Running tests...'
        bat 'npm test'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying to Azure Function App...'
        bat """
          az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
          az functionapp deployment source config-zip -g %RESOURCE_GROUP% -n %FUNCTIONAPP_NAME% --src function.zip
        """
      }
    }
  }
}
