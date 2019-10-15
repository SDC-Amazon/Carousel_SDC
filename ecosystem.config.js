module.exports = {
  apps: [{
    name: 'Carousel',
    script: './server/server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-191-245-73.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/AmishonCarousel.pem',
      ref: 'origin/master',
      repo: 'git@github.com:Amishon/Carousel.git',
      path: '/home/ubuntu/Carousel',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}