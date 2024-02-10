pipeline {
    agent any

    // Define parameters
    parameters {
        // Define a string parameter for VERSION
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Application version number')
    }

    stages {
        stage('Build') {
            steps {
                // Print the VERSION parameter
                echo "Building version: ${params.VERSION}"

                sh "echo update application"
                sh "ssh -o IdentitiesOnly=yes -o PreferredAuthentications=publickey -o PubkeyAuthentication=yes -i /var/lib/jenkins/jenkins wheel@retypeme.xyz 'cd retypeme;ls;docker-compose down;docker-compose pull;docker-compose up -d'"
            }
        }
    }
}
