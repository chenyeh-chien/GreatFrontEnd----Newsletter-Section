import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import SuccessMessage from '../Alert Message/Success/SuccessMessage';
import './SubscribeForm.scss';
import image from '../../assets/abstract.jpg'

type Condition = {
    id: number;
    message: string;
}

interface Props {
    header: string;
    conditions: Condition[];
}

export default function SubscribeForm({ header, conditions }: Props) {
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("Info");
    const [message, setMessage] = useState("Default message");

    const subscribeToGFE = (email: string) => {
        return new Promise((resolve, reject) => {
            const url = "https://www.greatfrontend.com/api/projects/challenges/newsletter";

            fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email
                    })
                }
            )
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        })
    }

    const handleSubscription = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const result = await subscribeToGFE(email)
        setCategory("Success");
        setMessage((result as any).message);
    }

    return (
        <div className='subscribe-form'>
            <SuccessMessage 
                category={category}
                message={message}/>
            <div className='subscribe-form__content'>
                <article className='subscribe-form__info'>
                    <h1>{ header }</h1>
                    {
                        conditions.map(item => {
                            return (
                                <ul 
                                    className='subscribe-form__list--item'
                                    key={item.id}>
                                    <div className='subscribe-form__check'>
                                        <FaCheck style={{ color: "#6f5dd5" }}/>
                                    </div>
                                    { item.message }
                                </ul>
                            )
                        })
                    }
                    <form
                        onSubmit={handleSubscription}>
                        <div className='subscribe-form__input'>
                            <input 
                                type='email'
                                placeholder='Enter your email' 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                            <label>We only send you the best! No spam.</label>
                        </div>
                        <div className='subscribe-form__button'>
                            <button>Subscribe</button>
                        </div>
                    </form>
                </article>
                <figure className='subscribe-form__figure'>
                    <img src={ image }/>
                </figure>
            </div>
        </div>
    )
}