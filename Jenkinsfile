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
                    bat """
                        mvn clean package -DskipTests
                    """
                }
            }
        }

        stage('Install Frontend Dependencies & Build') {
            steps {
                dir('spotify-api-ui') {
                    bat """
                        npm ci
                        npm run build
                    """
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat """
                    docker-compose build
                """
            }
        }

        stage('Run Containers') {
            steps {
                bat """
                    docker-compose down
                    docker-compose up -d
                """
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
