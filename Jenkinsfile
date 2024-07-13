pipeline {
    agent any
    tools {
        nodejs 'Jenkins-NodeJS'
    }
    stages {
        stage('install') {
            steps {
                sh "npm install"
            }
        }
        stage('build') {
            steps {
                script {
                    // 빌드 단계에서 CI=true 환경 변수 설정
                    withEnv(['CI=true']) {
                        sh 'npm run build'
                    }
                }
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
