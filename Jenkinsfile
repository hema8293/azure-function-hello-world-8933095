pipeline {
    agent any

    environment {
        AZURE_CREDENTIALS = credentials('azure-sp-8933095')
        AZURE_SUBSCRIPTION_ID = '919dde06-713d-458a-a28f-5e2d36f69dbb'
        AZURE_TENANT_ID = '268f1faf-6075-4ba7-8c3e-acc876eaca9a'
        AZURE_CLIENT_ID = "${AZURE_CREDENTIALS_USR}"
        AZURE_CLIENT_SECRET = "${AZURE_CREDENTIALS_PSW}"
        AZURE_FUNCTIONAPP_NAME = 'jenkins-func-demo01'
        AZURE_RESOURCE_GROUP = 'jenkins-func-demo01_group'
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
                echo 'Deploying to Azure Function...'
                bat '''
                    az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
                    az account set --subscription %AZURE_SUBSCRIPTION_ID%
                    az functionapp deployment source config-zip --resource-group %AZURE_RESOURCE_GROUP% --name %AZURE_FUNCTIONAPP_NAME% --src function.zip
                '''
            }
        }
    }
}
