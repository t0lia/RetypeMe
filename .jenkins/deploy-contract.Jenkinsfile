pipeline {
    agent any

        stages {
                stage('Load Secrets') {
                    steps {
                        script {
                            // Assuming your secret file is stored as a 'Secret File' credential with ID 'env-file-secret'
                            withCredentials([file(credentialsId: 'env', variable: 'ENV_FILE')]) {
                                sh '''
                                # Export secrets from file to environment variables
                                set -a  # automatically export all variables
                                if [ -f "$ENV_FILE" ]; then
                                    . "$ENV_FILE" > /dev/null 2>&1
                                else
                                    echo "Environment file not found: $ENV_FILE"
                                    exit 1
                                fi
                                set +a
                                # Now you can use the environment variables in your CLI programs
                                echo $CONTRACT_ADDRESS
                                '''
                            }
                        }
                    }
                }
                }
}


