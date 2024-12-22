const { sequelize } = require('../models');

sequelize
  .sync({ force: true }) // WARNING: 'force: true' apaga os dados em todas as tabelas!
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
    process.exit(); // Finalizar o script
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
    process.exit(1); // Finalizar com erro
  });
