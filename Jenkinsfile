pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    APP_NAME       = "bachtv-portfolio"
    IMAGE_TAG      = "latest"
    DOCKER_IMAGE   = "${APP_NAME}:${IMAGE_TAG}"
    DEPLOY_PORT    = "3005"
    CONTAINER_NAME = "${APP_NAME}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh """
          echo "Building Docker image: ${DOCKER_IMAGE}..."
          docker build -t ${DOCKER_IMAGE} .
        """
      }
    }

    stage('Deploy') {
      steps {
        sh """
          echo "Deploying container: ${CONTAINER_NAME} on port ${DEPLOY_PORT}..."
          docker stop ${CONTAINER_NAME} || true
          docker rm ${CONTAINER_NAME} || true
          docker run -d \\
            --name ${CONTAINER_NAME} \\
            --restart unless-stopped \\
            -p ${DEPLOY_PORT}:3000 \\
            ${DOCKER_IMAGE}
        """
      }
    }

    stage('Healthcheck') {
      steps {
        sh """
          set -e
          echo "Checking health at http://127.0.0.1:${DEPLOY_PORT}/..."
          for i in \$(seq 1 30); do
            if curl -fsS "http://127.0.0.1:${DEPLOY_PORT}/" >/dev/null 2>&1; then
              echo "✅ Application is healthy!"
              exit 0
            fi
            echo "Attempt \$i/30 - waiting 2s..."
            sleep 2
          done
          echo "❌ Healthcheck failed for ${CONTAINER_NAME}"
          docker logs --tail=100 ${CONTAINER_NAME} || true
          exit 1
        """
      }
    }

    stage('Cleanup') {
      steps {
        sh """
          echo "Cleaning up dangling images..."
          docker image prune -f || true
        """
      }
    }
  }

  post {
    success {
      echo "✅ Deployment successful! App is running at http://127.0.0.1:${DEPLOY_PORT} and reverse-proxied via http://bachtv.aistudio.com.vn"
    }
    failure {
      echo "❌ Deployment failed! Inspect logs above."
      sh "docker logs --tail=100 ${CONTAINER_NAME} || true"
    }
  }
}
