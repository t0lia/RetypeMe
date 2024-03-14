pipeline {
    agent any

    stages {
        stage('Read Env File') {
                    steps {
                        withCredentials([file(credentialsId: 'env', variable: 'ENV_FILE')]) {
                            script {
                                sh 'bash -c "set -o allexport; source $ENV_FILE; set +o allexport"'
                            }
                        }
                    }
                }
        stage('Deploy contract') {
            steps {
                sh "echo $CONTRACT_CHAIN_ID"
//                 sh "/var/lib/jenkins/.local/bin/ansible-playbook deploy/deploy_contract.yml"
            }
        }
    }
}


