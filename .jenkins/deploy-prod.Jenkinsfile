pipeline {
    agent any

    parameters {
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Application version number')
    }

    stages {
        stage('Build') {
            steps {
                echo "Updating PROD environment with version ${params.VERSION}"

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
