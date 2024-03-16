pipeline {
    agent any
    stages {
        stage('Deploy Contract') {
            steps {
                withCredentials([string(credentialsId: 'JASYPT_ENCRYPTOR_PASSWORD_GEN', variable: 'JASYPT_ENCRYPTOR_PASSWORD')]) {
                    sh '''
                    /var/lib/jenkins/.local/bin/ansible-playbook deploy/deploy_contract.yml
                    '''
                }
            }
        }
    }
}