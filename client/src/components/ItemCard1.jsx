import { Link } from 'react-router-dom'
import '../styles/ItemCard1.css'

function ItemCard1(props) {
  return (
    props.item && (
    <div className='item-card1-container'>
        <Link className='link-contain' to={`/product/${props.item?._id}`}><img className='item-img' src={props.img} alt=""  /></Link>
        <div className="item-name">{props.name}</div>
    </div>)
  )
}

export default ItemCard1