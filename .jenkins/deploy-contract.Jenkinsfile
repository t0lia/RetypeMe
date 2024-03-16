pipeline {
    agent any
    stages {
        stage('Deploy Contract') {
            steps {
                withCredentials([string(credentialsId: 'JASYPT_ENCRYPTOR_PASSWORD_GEN', variable: 'JASYPT_ENCRYPTOR_PASSWORD')]) {
                    echo "The secret text is: ${env.JASYPT_ENCRYPTOR_PASSWORD}"
                }
            }
        }
    }
}


