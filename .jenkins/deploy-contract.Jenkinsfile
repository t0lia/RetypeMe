pipeline {
    agent any

        stages {
                stage('Load Secrets') {
                    steps {
                        script {
                            withCredentials([file(credentialsId: 'env', variable: 'ENV_FILE')]) {
                                sh '''
                                # Export secrets from file to environment variables
                                set -a  # automatically export all variables
                                . "$ENV_FILE" > /dev/null 2>&1
                                set +a
                                echo $CONTRACT_ADDRESS
                                /var/lib/jenkins/.local/bin/ansible-playbook deploy/deploy_contract.yml
                                '''
                            }
                        }
                    }
                }
                }
}


