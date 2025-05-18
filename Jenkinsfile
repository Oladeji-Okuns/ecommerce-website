pipeline {
    agent any
    stages {
        stage('Install Nginx') {
            steps {
                script {
                    // Update package index and install Nginx
                    sh '''
                        sudo apt update
                        sudo apt install -y nginx
                    '''
                }
            }
        }
        stage('Clone Repository') {
            steps {
                // Clone your GitHub repository
                git url: 'https://github.com/Oladeji-Okuns/ecommerce-website.git', branch: 'main'
            }
        }
        stage('Deploy') {
            steps {
                // Copy index.html to the Nginx web server directory
                sh '''
                    sudo cp index.html /var/www/html/
                    sudo systemctl restart nginx
                '''
            }
        }
        stage('Health Check') {
            steps {
                script {
                    // Perform a health check to ensure Nginx is serving the page
                    def response = sh(script: 'curl -s -o /dev/null -w "%{http_code}" http://localhost', returnStdout: true).trim()
                    if (response != '200') {
                        error("Health check failed with response code: ${response}")
                    }
                }
            }
        }
    }
}

