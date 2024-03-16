pipeline {
    agent any
    parameters {
        choice(name: 'network', choices: ['polygon-mumbai', 'sepolia'])
    }
    environment {
        CONTRACT_NETWORK = "${params.network}"
    }
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