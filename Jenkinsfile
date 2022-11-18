pipeline {
	agent any
    stages {
		stage ('Load functions') {      // Define the function files will be used
            steps {
                script {
                    emailFunction = load "Email/emailFunction.groovy"
                }
            }
        }
        stage('Build') { 
            steps {
                sh 'npm install' 
				sh 'npm run build' 
            }
        }
		stage('Deploy') { 
            steps {
				sh 'sudo systemctl enable cmd-fe.service'
				sh 'sudo systemctl stop cmd-fe'
				sh 'sudo systemctl start cmd-fe'
				sh 'sudo systemctl status cmd-fe'
				sh 'rm -rf changelog*'
				sh "mv /var/lib/jenkins/jobs/CMD-FE/builds/${env.BUILD_NUMBER}/changelog* /var/lib/jenkins/workspace/CMD-FE/changelogFE.xml"
            }
        }
    }
	post ('Send e-mail') {          // Stage for send an email
        always {
                script {
                    emailFunction.emailSendingnoattachment("comaydorm@gmail.com;19130128@st.hcmuaf.edu.vn;adamwilling.2002@gmail.com")       // Define the emails address should be received the mail
                }
        }
    }
}