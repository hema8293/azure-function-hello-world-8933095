pipeline {
    agent any

    environment {
        AZURE_CLIENT_ID = credentials('azure-client-id')
        AZURE_CLIENT_SECRET = credentials('azure-client-secret')
        AZURE_TENANT_ID = credentials('azure-tenant-id')
        AZURE_SUBSCRIPTION_ID = '919dde06-713d-458a-a28f-5e2d36f69dbb' // Replace if different
        FUNCTION_APP_NAME = 'hello-world-func8933095' // Update if your app name is different
        RESOURCE_GROUP = 'myResourceGroup'
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
                echo 'Deploying to Azure Function App...'
                sh '''
                az login --service-principal \
                    --username "$AZURE_CLIENT_ID" \
                    --password "$AZURE_CLIENT_SECRET" \
                    --tenant "$AZURE_TENANT_ID"

                az account set --subscription "$AZURE_SUBSCRIPTION_ID"

                func azure functionapp publish $FUNCTION_APP_NAME --typescript
                '''
            }
        }
    }
}
