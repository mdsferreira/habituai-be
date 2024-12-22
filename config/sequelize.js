const { Sequelize } = require('sequelize');
const config = require('./database'); // Arquivo de configuração

// Usar a configuração de ambiente (desenvolvimento, produção, etc.)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Inicializar Sequelize
const sequelize =
  process.env.NODE_ENV === 'test'
    ? new Sequelize('sqlite::memory:', { logging: true })
    : new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        logging: false, // Desativar logs (opcional)
      }
    );;


// Testar a conexão
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

module.exports = sequelize;
