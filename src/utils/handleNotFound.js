const handleNotFound = (req, res) => {
    res.status(404);
    res.send({ message: 'URL inválida!' });
  }
  
  export default handleNotFound;
