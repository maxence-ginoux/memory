import "./SingleCard.css"
import dosCartes from "../assets/dosCartes.png"
import "../App.js"

export default function SingleCard({card, handleChoice, flipped}) {

    const handleClick = () => {
        handleChoice(card)
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img 
                    className="front" 
                    src={card.src} 
                    alt="card front"
                />
                <img 
                    className="back" 
                    src={dosCartes} 
                    alt="card back" 
                    onClick={handleClick}
                />
            </div>        
        </div>
    )
}