// Импорт параметров
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
const ALLOWED_CORS = [
  "http://filmissio.nomoredomainsmonster.ru/",
  "https://filmissio.nomoredomainsmonster.ru/",
  "http://api.filmissio.nomoredomainsmonster.ru/",
  "https://api.filmissio.nomoredomainsmonster.ru/",
  "http://localhost:3001",
  "http://localhost:3000",
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // проверяем, что источник запроса есть среди разрешённых
  if (ALLOWED_CORS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", true);

  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers["access-control-request-headers"];
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === "OPTIONS") {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header("Access-Control-Allow-Headers", requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};
