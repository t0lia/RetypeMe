pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh "echo update application"
                sh "ssh -o IdentitiesOnly=yes -o PreferredAuthentications=publickey -o PubkeyAuthentication=yes -i /var/lib/jenkins/jenkins wheel@retypeme.xyz 'cd retypeme;ls;docker-compose down;docker-compose pull;docker-compose up -d'"
            }
        }
    }
}
