import AlertMessage from "../Message/AlertMessage";

interface Props {
    category: string;
    message: string;
}

export default function ErrorMessage({ category, message }: Props) {
    return (
        <AlertMessage 
            category={category}
            message={message} 
            categoryColor="#a82f17"
            messageColor="#dc3e1f"
            containerBgColor="#fdefed"/>
    )
}