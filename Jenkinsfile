pipeline {
    agent any
    tools {
        nodejs 'Jenkins-NodeJS'
    }
    stages {
        stage('build') {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage('deploy') {
            steps {
                sh "rm -r /web/*"
                sh "mv ./dist/* /web"
            }
        }
    }
}
