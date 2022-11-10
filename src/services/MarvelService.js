class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // При каждом запросе мы должны public key подставлять, чтобы сервис понимал, 
    // что это авторизированный пользователь, у него есть определенное кол-во запросов и мы его пропускаем.
    _apiKey = 'apikey=00eba70e7bd77457f0644a1f7c7376da';

    // 1) По определенному url будем запрашивать данные через fetch, ждать ответа res
    getResource = async (url) => {
        let res = await fetch(url);
        // 2) Если серверная ошибка(напр. 404), то выкенем ошибку
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        // 3) Если все в порядке, будем возвращать ответ, ктр будет преобразован json
        return await res.json();
    }

    // 4) Следующим этапом будем делать запросы к API
    // 5) Получаем всех персонажей
    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }
    // 6) Получаем одного персонажа
    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

    }
}

export default MarvelService;