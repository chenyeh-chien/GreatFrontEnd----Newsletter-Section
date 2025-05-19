import './AlertMessage.scss';

interface Props {
    category: string;
    message: string;
    categoryColor: string;
    messageColor: string;
    containerBgColor: string;
}

export default function AlertMessage({ 
    category, 
    message,
    categoryColor,
    messageColor,
    containerBgColor 
}: Props) {
    return (
        <div className="alert-message">
            <div 
                className="alert-message__content"
                style={{ backgroundColor: containerBgColor }}>
                <span 
                    className="alert-message__category"
                    style={{ color: categoryColor }}>
                    { category }
                </span>
                <span 
                    className="alert-message__message"
                    style={{ color: messageColor }}>
                    { message }
                </span>
            </div>
        </div>
    )
}