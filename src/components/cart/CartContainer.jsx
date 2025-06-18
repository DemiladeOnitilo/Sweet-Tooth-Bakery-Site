import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainButton from '../MainButton'
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { FaTrash } from 'react-icons/fa';

const CartContainer = () => {

    const dispatch = useDispatch();

    const { cartItems, total, amount, currency, delivery_fee } = useSelector((state) => state.cart)

    
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const handleQuantityChange =  (productId, newQuantity) => {
        if (newQuantity < 1) {
            return;
        }
        dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }

    if(amount < 1) {
        return (
            <div className='flex flex-col items-center justify-center gap-30 h-150 w-screen'>
                <h1 className='text-6xl sour-gummy font-bold'>Your Cart Is Empty</h1>
                <div className='flex flex-col items-center justify-center gap-5'>
                    <p className='text-3xl sour-gummy'>Please Select Items: </p>
                    <MainButton 
                        link='/services'
                        name='GO BACK'
                    />
                </div>
                
            </div>
        )
    }

  return (
    <div className='flex flex-col items-center justify-center gap-20 h-auto w-screen mt-40'>
        
        <div className='flex flex-col gap-10 w-[80%] '>
            <div className='flex items-end justify-between gap-10 '>
                <div className='flex flex-col gap-y-35'>
                    <div className='flex justify-between w-[80%]'>
                        <h1 className='text-6xl sour-gummy font-bold'>Cart</h1>
                    </div>
                    <div className='flex items-center gap-10 w-full max-w-6xl text-4xl sour-gummy'>
                        <p>Total Items:</p>
                        <p>{amount}</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-5 bg-white border-2 border-black p-5 text-3xl sour-gummy w-[40%] h-60'>
                    <h1 className='text-4xl font-bold'>Order Summary</h1>   
                    <div className='flex justify-between  gap-10 w-full max-w-6xl '>
                        <p>Delivery Fee:</p>
                        <p>{currency}{delivery_fee}</p>
                    </div>
                    <div className='flex justify-between gap-10 w-full max-w-6xl'>
                        <p>Total Price:</p>
                        <p>{currency}{total + delivery_fee}</p>
                    </div>
                </div>
            </div>
            {cartItems.map((item => {
                return (
                    <div className='flex items-center gap-10 w-[50%] bg-white border-2 border-gray-300 p-5' key={item.id}>
                        <div>
                            <img src={item.img} alt={item.name} className='w-70 h-50 rounded-xl ' />
                        </div>
                        <div className='flex flex-col gap-5 w-full'>
                            <div className='flex items-center gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-3xl sour-gummy font-bold'>{item.name}</h1>
                                    <p className='text-2xl font-semibold'>{currency}{item.price}</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-5 w-full'>
                               <div className='flex items-center gap-2 text-xl font-bold border-2 border-black rounded-4xl p-2 w-40 h-12'>
                                    <label className='sour-gummy'>Qty:</label>
                                    <input type='number' value={item.quantity}  className='w-full h-full p-2 outline-none' min='1' onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}/>
                                </div>
                                <div onClick={() => handleRemoveFromCart(item.id)} className='text-2xl cursor-pointer'>
                                    <FaTrash />
                                </div> 
                            </div>
                        </div>
                        
                        
                    </div>
                )
            }))}
        </div>
        
    </div>
  )
}

export default CartContainer