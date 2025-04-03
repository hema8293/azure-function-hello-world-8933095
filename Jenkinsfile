pipeline {
    agent any

    environment {
        AZURE_CREDENTIALS = credentials('azure-sp') // Jenkins credential ID
        AZURE_FUNCTIONAPP_NAME = 'azure-function-hello-world-8933095'
        AZURE_SUBSCRIPTION_ID = '919dde06-713d-458a-a28f-5e2d36f69dbb'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
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
                echo 'Deploying to Azure...'
                withCredentials([
                    string(credentialsId: 'azure-client-id', variable: 'AZURE_CLIENT_ID'),
                    string(credentialsId: 'azure-client-secret', variable: 'AZURE_CLIENT_SECRET'),
                    string(credentialsId: 'azure-tenant-id', variable: 'AZURE_TENANT_ID')
                ]) {
                    bat """
                    az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
                    az functionapp deployment source config-zip --resource-group myResourceGroup --name %AZURE_FUNCTIONAPP_NAME% --src function.zip
                    """
                }
            }
        }
    }
}
