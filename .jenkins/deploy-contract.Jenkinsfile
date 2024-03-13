pipeline {
    agent any

    stages {
        stage('Deploy contract') {
            steps {
                sh "ansible-playbook deploy/deploy_contract.yml"
            }
        }
    }
}
