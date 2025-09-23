pipeline {
    agent any

    tools {
        maven 'MAVEN_HOME' // Make sure this is configured in Jenkins
    }

    environment {
        BACKEND_IMAGE = "music-backend:latest"
        FRONTEND_IMAGE = "music-frontend:latest"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Spring Boot Backend') {
            steps {
                dir('spotify-api-server') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('spotify-api-ui') {
                    // Avoid CI=true breaking the build
                    bat 'set CI=false && npm install'
                    bat 'set CI=false && npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                // Build backend image
                dir('spotify-api-server') {
                    bat "docker build -t ${BACKEND_IMAGE} ."
                }

                // Build frontend image
                dir('spotify-api-ui') {
                    bat "docker build -t ${FRONTEND_IMAGE} ."
                }
            }
        }

        stage('Run Containers') {
            steps {
                // Run both containers via docker-compose
                bat "docker-compose up -d --build"
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Something went wrong during the pipeline."
        }
    }
}
