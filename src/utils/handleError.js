const handleError = (err, req, res, next) => {

    console.error(err.stack);
    res.status(500);
    res.send({ mensagem: 'Erro interno no servidor.' });
  };
  
  export default handleError;
