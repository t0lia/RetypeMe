pipeline {
    agent any
    parameters {
        string(name: 'VERSION', defaultValue: 'latest', description: 'Application version number')
    }
    environment {
        VERSION = "${params.VERSION}"
    }
    stages {
        stage('Deploy to PROD') {
            steps {
                withCredentials([string(credentialsId: 'JASYPT_ENCRYPTOR_PASSWORD_PROD', variable: 'JASYPT_ENCRYPTOR_PASSWORD')]) {
                    sh '''
                    /var/lib/jenkins/.local/bin/ansible-playbook -i /var/lib/jenkins/inventory.yml --extra-vars "env=prod" --extra-vars "version=${VERSION}" deploy/deploy_prod.yml
                    '''
                }
            }
        }
    }
}