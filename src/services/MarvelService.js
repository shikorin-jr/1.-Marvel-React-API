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
    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }
    // 6) Получаем одного персонажа.
    getCharacter = async (id) => {
        // 8) Сохр в промежуточный рез-т.
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }
    // 7) Создаем метод(из RandomChar). В этом методе будем получать данные и возвр трансформир объект 
    _transformCharacter = (char) => {
        return {
            // name: res.data.results[0].name,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:  char.urls[0].url,
            wiki: char.urls[1].url
        }   
    }
}

export default MarvelService;