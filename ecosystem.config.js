module.exports = {
    apps : [{
      name: 'jaco-chef-new',
      script: './server/index.js',
      instances : "max",
      exec_mode : "cluster",
      ignore_watch: ["node_modules", "./**/*.log", "*.log"],
      env_production : {
          NODE_ENV: "production"
      },
      "watch_options": {
        "usePolling": true,
        "useFsEvents": false,
        "atomic": false,
        "followSymLinks": false
      },
    }],
  
    deploy : {
      production : {
        user : 'root',
        host : '95.163.243.157',
        ref  : 'origin/main',
        repo : 'git@github.com:vito3315/jaco-chef-new1.git',
        path : '/root/jaco-chef-new1',
        key: '~/.ssh/id_rsa.pub',
        'pre-deploy-local': '',
        'post-deploy' : 'pm2 reload all',
        'pre-setup': ''
      }
    }
  };