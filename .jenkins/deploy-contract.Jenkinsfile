pipeline {
    agent any

    stages {
        stage('Deploy contract') {
            steps {
                sh "set -o allexport; source /var/lib/jenkins/workspace/.env; set +o allexport;ansible-playbook deploy/deploy_contract.yml"
            }
        }
    }
}


