pipeline {
    agent any

    environment {
        AZURE_FUNCTIONAPP_NAME = 'jenkins-func-demo01'
        AZURE_RESOURCE_GROUP = 'jenkins-func-demo01_group'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to Azure...'
                withCredentials([azureServicePrincipal(
                    credentialsId: 'azure-sp-credentials',  // Set this in Jenkins → Credentials
                    subscriptionIdVariable: 'AZURE_SUBSCRIPTION_ID',
                    clientIdVariable: 'AZURE_CLIENT_ID',
                    clientSecretVariable: 'AZURE_CLIENT_SECRET',
                    tenantIdVariable: 'AZURE_TENANT_ID'
                )]) {
                    sh '''
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                        zip -r function.zip .
                        az functionapp deployment source config-zip \
                            --resource-group $AZURE_RESOURCE_GROUP \
                            --name $AZURE_FUNCTIONAPP_NAME \
                            --src function.zip
                    '''
                }
            }
        }
    }
}
