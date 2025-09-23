pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Spring Boot Backend') {
            steps {
                dir('spotify-api-server') {
                    sh '''
                    export PATH=$PATH:/opt/homebrew/bin
                    mvn clean package -DskipTests
                    '''
                }
            }
        }

        stage('Install Frontend Dependencies & Build') {
            steps {
                dir('spotify-api-ui') {
                    withEnv([
                        'PATH+HOME=/opt/homebrew/bin',
                    ]) {
                        sh '''
                        npm ci
                        npm run build
                        '''
                    }
                }
            }
        }

        stage('Build Docker Images') {
    steps {
        sh '''
           export PATH=/usr/local/bin:$PATH
           docker-compose build
        '''
    }
}

stage('Run Containers') {
    steps {
        sh '''
           export PATH=/usr/local/bin:$PATH
           docker-compose down
           docker-compose up -d
        '''
    }
}
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Something went wrong during the pipeline."
        }
    }
}