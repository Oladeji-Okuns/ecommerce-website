pipeline {
    agent any

    environment {
        // Define environment variables for Docker
        DOCKER_IMAGE = 'dejdocka/ecommerce-website'
        DOCKER_TAG = 'latest'
    }

    stages {
        // Checkout code
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Oladeji-Okuns/ecommerce-website.git'
            }
        }

        // Build stage: Build the application
        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        // Docker build stage: Build Docker image
        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    '''
                }
            }
        }

        // Run Tests stage (optional, can run inside Docker)
        stage('Test') {
            steps {
                script {
                    sh 'npm run test'
                }
            }
        }

        // Deploy the web app stage (running container locally)
        stage('Run Docker Container Locally') {
            steps {
                script {
                    sh '''
                    docker run -d -p 8080:8080 ${DOCKER_IMAGE}:${DOCKER_TAG}
                    '''
                }
            }
        }

        // Push Docker image to registry
        stage('Push Docker Image to Registry') {
            steps {
                script {
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USER --password-stdin'
                    }
                    // Push the image to Docker Hub
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

