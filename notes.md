pass mongo : w2jsCxgeSTrqSmp8

ssh -i "71-server-personal-key.pem" ubuntu@ec2-52-63-139-28.ap-southeast-2.compute.amazonaws.com


module.exports = {
  apps: [
    {
      name: "P3-GC1",
      script: "./app.js",
      env: {
        NODE_ENV: "development",
        PORT: 80,
        MONGODB_URI : "mongodb+srv://jundihn:w2jsCxgeSTrqSmp8@cluster0.imdjvhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        JWT_SECRET : "kiwkiw",
        REDIS_PASSWORD : "kRXIvlalqEMRxjIeax3P7D9wnNltsEHp"
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 80,
       MONGODB_URI : "mongodb+srv://jundihn:w2jsCxgeSTrqSmp8@cluster0.imdjvhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        JWT_SECRET : "kiwkiw",
        REDIS_PASSWORD : "kRXIvlalqEMRxjIeax3P7D9wnNltsEHp"
      }
    }
  ]
};