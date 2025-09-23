pipeline {
    agent any

    tools {
        maven 'MAVEN_HOME'          // Maven configured in Jenkins Global Tool Config
    }

    environment {
        DOCKER_IMAGE = "music_app:latest"
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

        stage('Install Frontend Dependencies & Build') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKER_IMAGE% ."
            }
        }

        stage('Run Containers') {
            steps {
                bat "docker-compose up -d"
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
