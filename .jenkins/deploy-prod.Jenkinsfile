pipeline {
    agent any

    parameters {
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Application version number')
    }

    stages {
        stage('Check Image Versions') {
            steps {
                script {
                    def backendImage = "retypeme/retypeme-backend:${params.VERSION}"
                    def frontendImage = "retypeme/retypeme-frontend:${params.VERSION}"

                    def backendImageExists = sh(script: "docker pull ${backendImage}", returnStatus: true) == 0
                    if (!backendImageExists) {
                        error "Backend image ${backendImage} does not exist. Failing build."
                    }

                    def frontendImageExists = sh(script: "docker pull ${frontendImage}", returnStatus: true) == 0
                    if (!frontendImageExists) {
                        error "Frontend image ${frontendImage} does not exist. Failing build."
                    }

                    // If both images exist, proceed
                    echo "Both images exist. Proceeding with deployment."
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying version ${params.VERSION}"

                sh ("""
                ssh -o IdentitiesOnly=yes -o PreferredAuthentications=publickey -o PubkeyAuthentication=yes \\
                   -i /var/lib/jenkins/jenkins wheel@retypeme.xyz \\
                   '
                   export VERSION=${params.VERSION};
                   cd retypeme;
                   ls;
                   docker-compose down;
                   docker-compose pull;
                   docker-compose up -d
                   docker image prune -a -f
                   '
                """)
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    sh "docker image prune -a -f"
                }
            }
        }
    }
}
