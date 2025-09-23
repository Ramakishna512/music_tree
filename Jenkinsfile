pipeline {
    agent any
    tools {
        maven 'MAVEN_HOME'
    }

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
                    bat "mvn clean package -DskipTests || exit 1"
                }
            }
        }

        stage('Install Frontend Dependencies & Build') {
            steps {
                dir('spotify-api-ui') {
                    bat "npm ci || exit 1"
                    bat "npm run build || exit 1"
                }
            }
        }

        stage('Run Containers') {
            steps {
                bat """
                    docker-compose down
                    docker-compose up --build -d
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
