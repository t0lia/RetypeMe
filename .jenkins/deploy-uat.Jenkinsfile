pipeline {
    agent any
    parameters {
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Application version number')
    }
    environment {
        VERSION = "${params.VERSION}"
    }
    stages {
        stage('Deploy to UAT') {
            steps {
                withCredentials([string(credentialsId: 'JASYPT_ENCRYPTOR_PASSWORD_UAT', variable: 'JASYPT_ENCRYPTOR_PASSWORD')]) {
                    sh '''
                    /var/lib/jenkins/.local/bin/ansible-playbook -i .idea/inventory.yml --extra-vars "version=${VERSION}" deploy/deploy_uat.yml
                    '''
                }
            }
        }
    }
}