import { FaCheck } from 'react-icons/fa';
import './SubscribeForm.scss';
import image from '../../assets/abstract.jpg'

interface Props {
    header: string;
    conditions: string[];
}

export default function SubscribeForm({ header, conditions }: Props) {


    return (
        <div className='subscribe-form'>
            <article className='subscribe-form__info'>
                <h1>{ header }</h1>
                {
                    conditions.map(item => {
                        return (
                            <ul className='subscribe-form__list--item'>
                                <FaCheck style={{ color: "#6f5dd5" }}/>
                                { item }
                            </ul>
                        )
                    })
                }
                <form>
                    <div className='subscribe-form__input'>
                        <input 
                            type='input'
                            placeholder='Enter your email' />
                        <label>We only send you the best! No spam.</label>
                    </div>
                    <div>
                        <button>Subscribe</button>
                    </div>
                </form>
            </article>
            <figure className='subscribe-form__figure'>
                <img src={ image }/>
            </figure>
        </div>
    )
}