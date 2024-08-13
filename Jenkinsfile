pipeline {
    agent any
    tools {
        nodejs 'Jenkins-NodeJS'
    }
    stages {
        stage('build') {
            steps {
                sh "npm install"
                sh "npm run build:dev"
            }
        }
        stage('deploy') {
            steps {
                sh "rm -r /web/* || true"
                sh "mv ./dist/* /web"
            }
        }
    }
}
