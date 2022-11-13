import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';

// Внутри компонента будет состояние. Когда будем делать запрос, эти данные будем там сохранять.

class RandomChar extends Component {
    // 9) updateChar нужно запускать в начале, когда приложение загружается. Ну а также когда приложение будет кликать на кнопку TRY IT
    constructor(props) {
        super(props);
        // 10) Мы хотим вызвать updateChar, когда будет создается наш объект
        this.updateChar();
    }
    // Мы не можем вызывать setState, на компоненте ктр еще не появился на странице.
    // !!! НЕВЕРНЫЙ ВАРИАНТ ВЫШЕ(9-10). Конструктор вызывается до того как была построена наша верстка.
    // Вызов методов в конструкторах(ктр общаются с сервером, подписываются на сервисы и т.д.) плохая практика.

    // 1) Создаем состояние. Используем синтаксис полей классов. Имена беру из API
    state = {
        // name: null,
        // description: null,
        // thumbnail: null,
        // homepage: null,
        // wiki: null
        char: {},
        // 19) Св-во, ктр будет отвечать - идет загрузка или нет
        // Когда идет загрузка true
        loading: true,
        error: false
    }
    // 14) В state могут быть и другие данные, не только про персонажа(ошибка, индикатор загрузки)
    // 15) Поэтому закоментированные в state данные, засунем в отдельный объект ктр будет характиризовать нашего персонажа

    
    // 3) Следующая задача получить данные из сервера и записать в state. Для этого нам необходим сервис.
    // 4) Создаем новое св-во.
    marvelService = new MarvelService();

    // 16) Создаем метод onCharLoaded(Наш персонаж загрузился). Если он загрузился
    onCharLoaded = (char) => {
        this.setState({
            char, 
            // Когда закончилась загрузка false
            loading: false
        })
    }
    // 21) Созд метод onError. Эта ошибка может произойти, когда у нас ошибка внутри запроса. Необходим catch
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    // 5) Созд метод ктр будет обращаться к серверу, получать данные и записывать в state.
    updateChar = () => {
        // 6) Т.к. нужен только один персонаж вызываем getCharacter. Этот персонаж должен получаться по конкретному id
        // 7) Далее обработаем рез-т этого метода then и запустим callback для формирования state
        // 8) Меняем null на реальные данные. Смотрим в API JSON, чтобы указывать
        // 11) Реализуем случайный id с помощью Math
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            // .then(res => {
            //     // this.setState({
            //     //     name: res.data.results[0].name,
            //     //     description: res.data.results[0].description,
            //     //     thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
            //     //     homepage:  res.data.results[0].urls[0].url,
            //     //     wiki: res.data.results[0].urls[1].url
            //     // })
            //     this.setState(res)
            // })
            // 12) В таком виде эти операции нам необходимо копировать в каждый компонент по получ персонажа
            // 13) Используем сервис MarvelService.js. Перенесем закоментированный объект код туда
            // 17) Модиф. пункт 16
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {
        // 2) Используем state внутри метода render
        // const {name, description, thumbnail, homepage, wiki} = this.state;
        // 18) Деструктризация
        // const {char: {name, description, thumbnail, homepage, wiki}, loading} = this.state;
        const {char, loading, error} = this.state;

        // if (loading) {
        //     return <Spinner/>
        // }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> :null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="randomchar">
                {/* {loading ? <Spinner/> : <View char={char} />} */}
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

// 20) Этот компонент будет отображать кусочек верстки
const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
        
}

export default RandomChar;