import AlertMessage from "../Message/AlertMessage";

interface Props {
    category: string;
    message: string;
}

export default function SuccessMessage({ category, message }: Props) {
    return (
        <AlertMessage 
            category={category}
            message={message} 
            categoryColor="#22b07a"
            messageColor="#128e5f"
            containerBgColor="#e6fcf4"/>
    )
}