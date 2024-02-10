pipeline {
    agent any

    parameters {
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Application version number')
    }

    stages {
        stage('Check Image Versions') {
            steps {
                script {
                    // Define your image names with the repository
                    def backendImage = "retypeme/retypeme-backend:${params.VERSION}"
                    def frontendImage = "retypeme/retypeme-frontend:${params.VERSION}"

                    // Check if the backend image exists
                    def backendImageExists = sh(script: "docker pull ${backendImage}", returnStatus: true) == 0

                    // Check if the frontend image exists
                    def frontendImageExists = sh(script: "docker pull ${frontendImage}", returnStatus: true) == 0

                    // Set an environment variable based on the existence of images
                    if (backendImageExists && frontendImageExists) {
                        env.DEPLOY = 'true'
                    } else {
                        env.DEPLOY = 'false'
                        echo "One or more images do not exist for version ${params.VERSION}. Skipping deployment."
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                // Only proceed with deployment if both images exist
                expression { env.DEPLOY == 'true' }
            }
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
                   '
                """)
            }
        }
    }
}
