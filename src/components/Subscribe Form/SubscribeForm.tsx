import { useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import SuccessMessage from '../Alert Message/Success/SuccessMessage';
import './SubscribeForm.scss';
import image from '../../assets/abstract.jpg';

type Condition = {
    id: number;
    message: string;
}

type SubscribeResponse = {
    message: string;
}

class FetchError extends Error {
    status: number;
    statusText: string;
    body: Record<string, string>;

    constructor(
        status?: number,
        statusText?: string,
        body?: Record<string, string>
    ) {
        super();
        this.status = status === undefined ? 200 : status;
        this.statusText = statusText === undefined ? "" : statusText;
        this.body = body === undefined ? { message: "" } : body;
    }
}



interface Props {
    header: string;
    conditions: Condition[];
}

export default function SubscribeForm({ header, conditions }: Props) {
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("Info");
    const [message, setMessage] = useState("Default message");
    const [showMessage, setShowMessage] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const emailInput = useRef<HTMLInputElement>(null);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (showMessage === true) {
            setShowMessage(false);
        }

        if (validationMessage.length > 0) {
            setValidationMessage("");
        }

        setEmail(event.target.value);
    }

    const handleClickButton = () => {
        if (emailInput.current === null) {
            return;
        }

        if (emailInput.current.value.length === 0) {
            setValidationMessage("Email address is required.");
            return;
        }

        if (!emailInput.current.checkValidity()) {
            setValidationMessage("Please enter a valid email address.");
            return;
        }

        setValidationMessage("");
    }

    const subscribeToGFE = (email: string): Promise<SubscribeResponse> => {
        return new Promise((resolve, reject) => {
            const url = 
                "https://www.greatfrontend.com/api/projects/challenges/newsletter";

            fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: "samddd6718"
                    })
                }
            )
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(errData => {
                      throw new FetchError(
                        response.status,
                        response.statusText,
                        errData
                      )
                    });
                }

                return response.json();
            })
            .then((data) => resolve(data))
            .catch((error) =>reject(error))
        })
    }

    const handleSubscription = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        try {
            event.preventDefault();

            const result = await subscribeToGFE(email)
            setCategory("Success");
            setMessage(result.message);
            setShowMessage(true);
        } catch(error) {
            if (error instanceof FetchError) {
                setCategory("Error");
                setMessage(
                    error.body?.error ?? 
                    "Fail to subscribe. Please ensure your email is correct or try again later."
                )
            }
        } 
        
    }

    return (
        <div className='subscribe-form'>
            {
                showMessage &&
                <SuccessMessage 
                    category={category}
                    message={message}/>
            }
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
                            <div className='subscribe-form__input--format'>
                                <input 
                                    ref={emailInput}
                                    type='email'
                                    placeholder='Enter your email' 
                                    required
                                    value={email}
                                    onChange={handleInputChange}/>
                                <span className='subscribe-form__validation-message'>
                                    { validationMessage }
                                </span>
                            </div>
                            <label>We only send you the best! No spam.</label>
                        </div>
                        <div className='subscribe-form__button'>
                            <button onClick={handleClickButton}>Subscribe</button>
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