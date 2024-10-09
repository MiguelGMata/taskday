module.exports = (error, request, response, next) => {
  const { title } = error;
  let { description } = error;

  const status = error.status || 500;
  if (status == 500) {
    description = 'Serveur cassé. Revenez plus tard.'
    console.log(error.message);
  }

  response.status(status).json({
    title,
    description,
  });
};
