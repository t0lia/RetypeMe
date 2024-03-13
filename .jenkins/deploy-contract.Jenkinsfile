pipeline {
    agent any

    stages {
        stage('Deploy contract') {
            steps {
                sh "/var/lib/jenkins/.local/bin/ansible-playbook deploy/deploy_contract.yml"
            }
        }
    }
}
